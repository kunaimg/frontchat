import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/_createid.scss";
import Swal from "sweetalert2";
function CreateId() {
  const navigate = useNavigate();
  const [nameid, setNameid] = useState();
  const [username, usersetName] = useState();
  const [image, setImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [nameidd, setNameidd] = useState();
  const [usernamee, usersetNamee] = useState();
  const [imagee, setImagee] = useState();
  const [selectedFilee, setSelectedFilee] = useState(null);
  const [count, setCount] = useState(0);
  let countt = localStorage.getItem("usercount");

  const handle = (e) => {
    setImage(e.target.files[0].name);
    setSelectedFile(e.target.files[0]);
  };

  function valid(e) {
    e.preventDefault();

    if (nameid && image && username) {
      if (!selectedFile) {
        return;
      }

      const formData = new FormData();

      formData.append("image", selectedFile);

      fetch("https://backchatapp-63ig.onrender.com/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          data = JSON.parse(data);

          let userdata = [];

          let storedData = localStorage.getItem("userid");

          userdata = storedData ? JSON.parse(storedData) : [];
          if (userdata.length == 0) {
            userdata.push({
              image: data.image,
              id: nameid,
              username: username,
              online: true,
            });
            localStorage.setItem("userid", JSON.stringify(userdata));
            sessionStorage.setItem("currentuser", nameid);
            Swal.fire({
              title: "sucess",
              text: "user create successfully",
              icon: "sucess",
              showCancelButton: true,
              confirmButtonText: "confirm",
              cancelButtonText: "cancel",
            });
            navigate("/chat");
          } else {
            const result = userdata.find((element) => element.id === nameid);

            if (result) {
              Swal.fire({
                title: "warning",
                text: "already exists",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "confirm",
                cancelButtonText: "cancel",
              });
            } else {
              userdata.push({
                image: data.image,
                id: nameid,
                username: username,
                online: true,
              });

              localStorage.setItem("userid", JSON.stringify(userdata));
              sessionStorage.setItem("currentuser", nameid);
              Swal.fire({
                title: "sucess",
                text: "user create successfully",
                icon: "sucess",
                showCancelButton: true,
                confirmButtonText: "confirm",
                cancelButtonText: "cancel",
              });
              navigate("/chat");
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      Swal.fire({
        title: "warning",
        text: "please fill vaild information",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "confirm",
        cancelButtonText: "cancel",
      });
    }
  }

  const handlee = (e) => {
    setImagee(e.target.files[0].name);
    setSelectedFilee(e.target.files[0]);
    if (countt && count < 3) {
      localStorage.setItem("usercount", Number(countt) + 1);
    } else {
      localStorage.setItem("usercount", 1);
    }
  };

  function validd(e) {
    e.preventDefault();

    if (countt < 3) {
      if (nameidd && imagee && usernamee) {
        if (!selectedFilee) {
          return;
        }

        const formData = new FormData();

        formData.append("image", selectedFilee);

        fetch("https://backchatapp-63ig.onrender.com/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            data = JSON.parse(data);

            let userdata = [];

            let storedData = localStorage.getItem("useridd");

            userdata = storedData ? JSON.parse(storedData) : [];
            if (userdata.length == 0) {
              userdata.push({
                image: data.image,
                id: nameidd,
                username: usernamee,
                online: true,
              });
              localStorage.setItem("useridd", JSON.stringify(userdata));
              sessionStorage.setItem("currentuserr", nameidd);
              Swal.fire({
                title: "sucess",
                text: "user create successfully",
                icon: "sucess",
                showCancelButton: true,
                confirmButtonText: "confirm",
                cancelButtonText: "cancel",
              });
              navigate("/onechat");
            } else {
              const result = userdata.find((element) => element.id === nameidd);

              if (result) {
                Swal.fire({
                  title: "warning",
                  text: "already exists",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "confirm",
                  cancelButtonText: "cancel",
                });
              } else {
                userdata.push({
                  image: data.image,
                  id: nameidd,
                  username: usernamee,
                  online: true,
                });

                localStorage.setItem("useridd", JSON.stringify(userdata));
                sessionStorage.setItem("currentuserr", nameidd);
                Swal.fire({
                  title: "sucess",
                  text: "user create successfully",
                  icon: "sucess",
                  showCancelButton: true,
                  confirmButtonText: "confirm",
                  cancelButtonText: "cancel",
                });
                navigate("/onechat");
              }
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        Swal.fire({
          title: "warning",
          text: "please fill valid infomration",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "confirm",
          cancelButtonText: "cancel",
        });
      }
    } else {
      Swal.fire({
        title: "error",
        text: "user chat now is going wait... or sometime after again try",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "confirm",
        cancelButtonText: "cancel",
      });
    }
  }

  return (
    <div className="main">
      <button
        type="button"
        class="btn btn-primary "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ marginRight: "10px" }}
      >
        Group chat
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModall"
      >
        one chat
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
                Create user id
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
                type="number"
                label={"create  id"}
                onChange={(e) => {
                  setNameid(e.target.value);
                }}
                fullWidth
              ></TextField>
              <TextField
                type="text"
                label={"enter name"}
                sx={{ marginTop: "1rem" }}
                onChange={(e) => {
                  usersetName(e.target.value);
                }}
                fullWidth
              ></TextField>
              <label
                class="btn btn-primary"
                for="fileInput"
                style={{ marginTop: "1rem" }}
              >
                Image(dp)
              </label>
              <input
                type="file"
                accept="image/*"
                style={{ marginTop: "1.4rem", display: "none" }}
                id="fileInput"
                onChange={handle}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                class="btn btn-primary"
                onClick={valid}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade custom-modal"
        id="exampleModall"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create user id
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
                type="number"
                label={"create  id"}
                onChange={(e) => {
                  setNameidd(e.target.value);
                }}
                fullWidth
              ></TextField>
              <TextField
                type="text"
                label={"enter name"}
                sx={{ marginTop: "1rem" }}
                onChange={(e) => {
                  usersetNamee(e.target.value);
                }}
                fullWidth
              ></TextField>
              <label
                class="btn btn-primary"
                for="fileInputt"
                style={{ marginTop: "1rem" }}
              >
                Image(dp)
              </label>
              <input
                type="file"
                accept="image/*"
                style={{ marginTop: "1.4rem", display: "none" }}
                id="fileInputt"
                onChange={handlee}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                class="btn btn-primary"
                onClick={validd}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateId;
