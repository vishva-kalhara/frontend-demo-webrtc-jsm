import "./App.css";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notificatios from "./components/Notificatios";
import { useContext, useEffect } from "react";
import { SocketContext } from "./contexts/SocketContext";

function App() {
    const { callEnded } = useContext(SocketContext);

    // useEffect(() => {
    //     window.location.reload();
    // }, [callEnded]);

    return (
        <>
            <div>updated 20:01</div>
            <div className="container-md">
                <VideoPlayer></VideoPlayer>
                <Options>
                    <Notificatios></Notificatios>
                </Options>
            </div>
        </>
    );
}

export default App;
