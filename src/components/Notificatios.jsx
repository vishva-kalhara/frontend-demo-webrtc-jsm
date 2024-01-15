import { useContext } from "react";
import { SocketContext } from "../contexts/SocketContext";

const Notificatios = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);

    return (
        <>
            {call.isRecievedCall && !callAccepted && (
                <div>
                    <h3>{call.name} is calling</h3>
                    <button onClick={answerCall}>Answer Call</button>
                </div>
            )}
        </>
    );
};

export default Notificatios;
