import { io } from "socket.io-client";
import Peer from "simple-peer";
import { createContext, useEffect, useRef, useState } from "react";

const SocketContext = createContext();

const socket = io("https://demo-webtrc-jsm.onrender.com/");
// const socket = io("https://api-demo-webrtc-jsm.vercel.app/");

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState("");
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");

    let myVideo = useRef();
    myVideo.current = document.getElementById("myVideo");
    let remoteVideo = useRef();
    remoteVideo.current = document.getElementById("remoteVideo");
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                try {
                    if (myVideo.current)
                        myVideo.current.srcObject = currentStream;
                } catch (error) {
                    console.log(error);
                }
            });

        socket.on("me", (id) => setMe(id));

        socket.on("callUser", ({ signal, from, name: callerName }) => {
            setCall({ isRecievedCall: true, signal, from, callerName });
        });
    }, []);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on("signal", (data) => {
            console.log("before AnswerCall", data);
            socket.emit("answerCall", { signal: data, to: call.from });
        });

        peer.on("stream", (currentStream) => {
            remoteVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        console.log("CAll user touched");
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on("signal", (data) => {
            console.log("SIgnal got: ", data);
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name,
            });
        });

        peer.on("stream", (currentStream) => {
            remoteVideo.current.srcObject = currentStream;
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    };

    return (
        <SocketContext.Provider
            value={{
                call,
                callAccepted,
                myVideo,
                remoteVideo,
                stream,
                name,
                setName,
                callEnded,
                me,
                callUser,
                answerCall,
                leaveCall,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
