import React, { useState } from "react";
import { TextField } from "@mui/material";
import "../assets/css/_entervideo.scss";
import { useNavigate } from "react-router-dom";
function LoginVideo() {
  const navigate = useNavigate();
  const [roomNo, setRoomNo] = useState();
  const [user, setUser] = useState();
  function create() {
    sessionStorage.setItem("roomno", roomNo);
    sessionStorage.setItem("user", user);
    setUser("");
    setRoomNo("");
    navigate("/videochat");
  }
  return (
    <div style={{ height: "100vh" }}>
      {" "}
      <button
        type="button"
        class="btn btn-primary idwork"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        create id
      </button>
      <div
        className="modal fade custom-modal"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create id New User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <TextField
                value={user}
                label={"Enter Username"}
                onChange={(e) => setUser(e.target.value)}
                fullWidth
              ></TextField>
              <TextField
                sx={{ marginTop: "1.5rem" }}
                value={roomNo}
                label={"Enter Room Number"}
                onChange={(e) => setRoomNo(e.target.value)}
                fullWidth
              ></TextField>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                class="btn btn-primary"
                onClick={create}
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginVideo;
