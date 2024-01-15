/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import { SocketContext } from "../contexts/SocketContext";

/* eslint-disable no-unused-vars */
const Options = ({ children }) => {
    const {
        me,
        callAccepted,
        name,
        setName,
        callEnded,
        leaveCall,
        callUser,
        call,
    } = useContext(SocketContext);
    const [idToCAll, setIdToCAll] = useState("");

    return (
        <div>
            <div>
                {JSON.stringify({
                    me,
                    callAccepted,
                    name,
                    setName,
                    callEnded,
                    leaveCall,
                    callUser,
                    call,
                })}
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="row" style={{ minWidth: 600, maxWidth: 600 }}>
                    <div className="col-5">
                        <input
                            type="text"
                            className="w-100 form-control"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="col-5">
                        <input
                            type="text"
                            className="w-100 form-control"
                            placeholder="ID to call"
                            value={idToCAll}
                            onChange={(e) => setIdToCAll(e.target.value)}
                        />
                    </div>
                    <div className="col-2">
                        {callAccepted && !callEnded ? (
                            <button
                                className="btn btn-primary w-100 "
                                onClick={leaveCall}
                            >
                                Hang up
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary w-100 "
                                onClick={() => {
                                    callUser(idToCAll);
                                }}
                            >
                                Call
                            </button>
                        )}
                    </div>

                    <div>My Id: {me}</div>
                </div>
                {children}
            </form>
        </div>
    );
};

export default Options;
