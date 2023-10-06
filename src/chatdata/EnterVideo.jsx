import React, { useEffect } from "react";
import "../assets/css/_entervideo.scss";
import { useNavigate } from "react-router-dom";
function EnterVideo() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/loginvideo");
    }, 6000);
  }, []);

  return (
    <div className="main-enter">
      <div className="enter">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h1 className="loginvideo">Video app</h1>
            </div>
            <div className="col-6 video">
              <i class="uil uil-video"></i>
            </div>

            <div className="col-12 footer">
              <p>Created by kunal@agarwal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterVideo;
