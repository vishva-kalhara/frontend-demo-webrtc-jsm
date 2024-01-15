/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { SocketContext } from "../contexts/SocketContext";

/* eslint-disable react/no-string-refs */
const VideoPlayer = () => {
    const {
        name,
        callAccepted,
        myVideo,
        remoteVideo,
        callEnded,
        stream,
        call,
    } = useContext(SocketContext);

    return (
        <div className="row" style={{ minWidth: 600, maxWidth: 600 }}>
            <div className="col-6">
                <h4>{name || "Name"}</h4>
                {stream && (
                    <video
                        ref={myVideo}
                        style={{ backgroundColor: "#000" }}
                        playsInline
                        muted
                        autoPlay
                        width="250px"
                        height={200}
                        id="myVideo"
                    ></video>
                )}
            </div>
            <div>{JSON.stringify({ callAccepted, callEnded })}</div>
            <div className="col-6">
                {/* {callAccepted && !callEnded && ( */}
                <video
                    ref={remoteVideo}
                    style={{ backgroundColor: "#000" }}
                    playsInline
                    muted
                    autoPlay
                    width="250px"
                    height={200}
                    id="remoteVideo"
                ></video>
                {/* )} */}
            </div>
        </div>
    );
};

export default VideoPlayer;
