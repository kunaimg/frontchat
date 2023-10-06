import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Menu,
  ListItemIcon,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "../assets/css/_chat.scss";
import $ from "jquery";
import io from "socket.io-client";
import con from "../../public/audio/connecteed.mp3";
import mes from "../../public/audio/message.mp3";
import dis from "../../public/audio/dis.mp3";
import { ReactMediaRecorder } from "react-media-recorder";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
let socket;
let filteredData;
const messagee = new Audio(mes);
const diss = new Audio(dis);
const conn = new Audio(con);
function Chat() {
  const currentDate = new Date();

  let userdataa = JSON.parse(localStorage.getItem("useridd"));

  let currentuser = sessionStorage.getItem("currentuserr");
  let allmaindata = JSON.parse(localStorage.getItem("alldataa"));

  let currentuserdata;
  userdataa.map((item, key) => {
    if (item.id === currentuser) {
      currentuserdata = item;
    }
  });
  const navigate = useNavigate();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const chatContainerRef = useRef(null);

  const [close, setclose] = useState(false);
  const [menu, setMenu] = useState(true);
  const [message, setMessage] = useState();
  const [Online, setOnline] = useState();
  const [search, setsearch] = useState();
  const [userdata, setuserdata] = useState([]);
  const [emoji, setemoji] = useState(false);
  const [image, setImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [sendcontent, setsendcontent] = useState(true);
  const [aimage, asetImage] = useState();
  const [number, setnumber] = useState(0);
  const [aselectedFile, asetSelectedFile] = useState(null);
  const [mic, setmic] = useState(true);
  const [micc, setmicc] = useState(true);
  const [vic, setvic] = useState(true);
  const [vicc, setvicc] = useState(true);
  const [sic, setsic] = useState(true);
  const [sicc, setsicc] = useState(true);
  const [vimage, vsetImage] = useState();

  const [vselectedFile, vsetSelectedFile] = useState(null);
  const [dimage, dsetImage] = useState();

  const [dselectedFile, dsetSelectedFile] = useState(null);

  useEffect(() => {
    socket = io("https://backchatapp-63ig.onrender.com");
  }, []);
  useEffect(() => {
    setuserdata(userdataa);
  }, []);

  useEffect(() => {
    allmaindata?.map((item, key) => {
      if (item?.id === currentuser) {
        return $(".chatboxx").append(` <div   index={key} class="chatbox">
    <div class="b1">
      <h6 class="h61">
        <img
          src="https://backchatapp-63ig.onrender.com/public/uploads/${item?.image}"
          alt=""
        />
        <b>${item?.username}</b>
        :${item?.message}
      </h6>
    </div>
  </div>`);
      } else if (item?.frontimage) {
        $(".chatboxx").append(` <div class="chatbox"> <img
          class="imageset"
          src="https://backchatapp-63ig.onrender.com/public/uploads/${item?.frontimage}"
          alt=""
        /></div>`);
      } else if (item?.frontdoc) {
        $(".chatboxx").append(`<div class="chatbox">
        
          <iframe
          src="https://backchatapp-63ig.onrender.com/public/uploads/${item?.frontdoc}"
          style="
          margin-top: 2rem;
          margin-bottom: 2rem;
         
          margin-left: 1.5rem;
        "
          width="300"
          height="300"
          frameborder="0"
        ></iframe>
          
         </div> `);
      } else if (item?.frontvideo) {
        $(".chatboxx").append(`
          <div class="chatbox">
          <iframe
          width="250"
          height="200"
          style="
          margin-top: 2rem;
          margin-bottom: 2rem;
         
          margin-left: 1.5rem;
        "
          src="https://backchatapp-63ig.onrender.com/public/uploads/${item?.frontvideo}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        
      </div>  `);
      } else if (item?.frontaudio) {
        $(".chatboxx").append(`
        <div class="chatbox">
        <audio
          controls
          style="
          margin-top: 3rem;
          margin-bottom: 2rem;
          margin-left: 1rem;
         
          width: 20rem !important;
          height: 7rem !important;"
        >
          <source src="https://backchatapp-63ig.onrender.com/public/uploads/${item.frontaudio}" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>`);
      } else {
        return $(".chatboxx").append(` <div class="chatbox">
          <div class="b2">
            <h6 class="h62">
              <img
                src="https://backchatapp-63ig.onrender.com/public/uploads/${item?.image}"
                alt=""
              />
              <b>${item?.username}</b>
              :${item?.message}
            </h6>
          </div>
        </div>`);
      }
    });
  }, []);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    socket.emit(
      "snewuserjoined",
      {
        data: userdataa[userdataa?.length - 1],
      },
      conn.play()
    );
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    socket.on("susermessagedekho", (userdataa) => {
      $(".box1").append(` <div
      style="align-items: center;display: flex;justify-content: space-between;flex-direction: row;"
      class="stack stack1"
    >
      <div>
      <img
      src="https://backchatapp-63ig.onrender.com/public/uploads/${userdataa?.image}"
      alt=""
    />
      
      </div>
      <div>
        <h6
          variant="h6"
          style={{ fontSize: "1.2rem" }}
          class="h6"
        >
          User:<b> ${userdataa?.username}</b>
         </br>
          <b> Userid:${userdataa?.id}</b>
        </h6>
      </div>
    </div>`);

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
      $(".chatboxx").append(`  <div class="chatbox" >
      <div class="b2">
        <h6  class="h62">
          <img
            src="https://backchatapp-63ig.onrender.com/public/uploads/${userdataa.image}"
            alt=""
          />
          <b>${userdataa.username}</b>:user joined
        </h6>
      </div>
       
    </div>`);

      messagee.play();
    });

    socket.on("sdisusermessagedekho", (userdatadis) => {
      localStorage.removeItem("usercount");
      localStorage.removeItem("useridd");
      localStorage.removeItem("alldataa");
      sessionStorage.removeItem("currentuserr");
      setTimeout(() => {
        Swal.fire({
          title: "warning",
          text: "please  connect again because user is disconnected",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "confirm",
          cancelButtonText: "cancel",
        });
      }, 4000);
      setTimeout(() => {
        navigate("/");
      }, 7000);

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
      $(".chatboxx").append(`  <div class="chatbox" >
      <div class="b2">
        <h6  class="h62">
          <img
            src="https://backchatapp-63ig.onrender.com/public/uploads/${userdatadis.image}"
            alt=""
          />
          <b>${userdatadis.username}</b>:User disconnected
        </h6>
      </div>
       
    </div>`);

      diss.play();
    });

    socket.on("smessage", (userdataa) => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
      $(".chatboxx").append(`  <div class="chatbox" >
        <div class="b2">
          <h6  class="h62">
            <img
              src="https://backchatapp-63ig.onrender.com/public/uploads/${userdataa.image}"
              alt=""
            />
            <b>${userdataa.name}</b>:${userdataa.message}
          </h6>
        </div>
  
      </div>`);
      messagee.play();
    });
  }, []);

  function send() {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    let dataall = [];

    let storedData = localStorage.getItem("alldataa");

    dataall = storedData ? JSON.parse(storedData) : [];

    if (dataall.length === 0) {
      dataall.push({
        message: message,
        username: currentuserdata?.username,
        image: currentuserdata?.image,
        id: currentuserdata?.id,
      });
      localStorage.setItem("alldataa", JSON.stringify(dataall));
    } else {
      dataall.push({
        message: message,
        username: currentuserdata?.username,
        image: currentuserdata?.image,
        id: currentuserdata?.id,
      });
      localStorage.setItem("alldataa", JSON.stringify(dataall));
    }
    socket.emit("smessages", {
      message: message,
      name: currentuserdata?.username,
      image: currentuserdata?.image,
    });
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    $(".chatboxx").append(` <div class="chatbox">
      <div class="b1">
        <h6 class="h61">
          <img
            src="https://backchatapp-63ig.onrender.com/public/uploads/${currentuserdata.image}"
            alt=""
          />
          <b>${currentuserdata.username}</b>
          :${message}
        </h6>
      </div>
    </div>`);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    setMessage("");
    messagee.play();
  }
  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    if (message == undefined) {
      setMessage(emoji);
    } else {
      setMessage(message + emoji);
    }
  };
  const handle = (e) => {
    setsendcontent(true);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    setImage(e.target.files[0].name);
    setSelectedFile(e.target.files[0]);
    setMessage(
      `https://backchatapp-63ig.onrender.com/public/uploads/${e.target.files[0].name}`
    );
    setsendcontent(false);
  };
  function sendcontenti() {
    if (image) {
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

          $(".chatboxx").append(` <div class="chatbox"> <img
            class="imageset"
            src="https://backchatapp-63ig.onrender.com/public/uploads/${data.image}"
            alt=""
          /></div>`);
          setnumber(0);
          messagee.play();
          let dataall = [];

          let storedData = localStorage.getItem("alldataa");

          dataall = storedData ? JSON.parse(storedData) : [];

          if (dataall.length === 0) {
            dataall.push({
              frontimage: data?.image,
            });
            localStorage.setItem("alldataa", JSON.stringify(dataall));
          } else {
            dataall.push({
              frontimage: data?.image,
            });
            localStorage.setItem("alldataa", JSON.stringify(dataall));
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
    setMessage("");
    setsendcontent(true);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }

  const ahandle = (e) => {
    asetImage(e.target.files[0].name);
    asetSelectedFile(e.target.files[0]);
    setMessage(
      `https://backchatapp-63ig.onrender.com/public/uploads/${e.target.files[0].name}`
    );
    setsendcontent(false);
  };
  function sendcontenta() {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    if (aimage) {
      if (!aselectedFile) {
        return;
      }

      const formData = new FormData();

      formData.append("image", aselectedFile);

      fetch("https://backchatapp-63ig.onrender.com/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())

        .then((data) => {
          data = JSON.parse(data);
          let dataall = [];

          let storedData = localStorage.getItem("alldataa");

          dataall = storedData ? JSON.parse(storedData) : [];

          if (dataall.length === 0) {
            dataall.push({
              frontaudio: data?.image,
            });
            localStorage.setItem("alldataa", JSON.stringify(dataall));
          } else {
            dataall.push({
              frontaudio: data?.image,
            });
            localStorage.setItem("alldataa", JSON.stringify(dataall));
          }
          $(".chatboxx").append(`
            <div class="chatbox">
            <audio
              controls
              style="
              margin-top: 3rem;
              margin-bottom: 2rem;
              margin-left: 1rem;
             
              width: 20rem !important;
              height: 7rem !important;
              "
            >
              <source src="https://backchatapp-63ig.onrender.com/public/uploads/${data.image}" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>`);
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
    setMessage("");
    setsendcontent(true);

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    setnumber(0);
    messagee.play();
  }

  const vhandle = (e) => {
    vsetImage(e.target.files[0].name);
    vsetSelectedFile(e.target.files[0]);
    setMessage(
      `https://backchatapp-63ig.onrender.com/public/uploads/${e.target.files[0].name}`
    );
    setsendcontent(false);
  };
  function sendcontentv() {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    if (vimage) {
      if (!vselectedFile) {
        return;
      }

      const formData = new FormData();

      formData.append("image", vselectedFile);

      fetch("https://backchatapp-63ig.onrender.com/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())

        .then((data) => {
          data = JSON.parse(data);
          let dataall = [];

          let storedData = localStorage.getItem("alldataa");

          dataall = storedData ? JSON.parse(storedData) : [];

          if (dataall.length === 0) {
            dataall.push({
              frontvideo: data?.image,
            });
            localStorage.setItem("alldataa", JSON.stringify(dataall));
          } else {
            dataall.push({
              frontvideo: data?.image,
            });
            localStorage.setItem("alldataa", JSON.stringify(dataall));
          }

          $(".chatboxx").append(`
            <div class="chatbox">
            <iframe
            width="250"
            height="200"
            style="
            margin-top: 2rem;
            margin-bottom: 2rem;
           
            margin-left: 1.5rem;
          "
            src="https://backchatapp-63ig.onrender.com/public/uploads/${data.image}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          
        </div>  `);
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
    setMessage("");
    setsendcontent(true);
    setsendcontent(true);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    setnumber(0);
    messagee.play();
  }

  const dhandle = (e) => {
    dsetImage(e.target.files[0].name);
    dsetSelectedFile(e.target.files[0]);
    setMessage(
      `https://backchatapp-63ig.onrender.com/public/uploads/${e.target.files[0].name}`
    );
    setsendcontent(false);
  };
  function sendcontentd() {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    if (dimage) {
      if (!dselectedFile) {
        return;
      }

      const formData = new FormData();

      formData.append("image", dselectedFile);

      fetch("https://backchatapp-63ig.onrender.com/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())

        .then((data) => {
          data = JSON.parse(data);
          let dataall = [];

          let storedData = localStorage.getItem("alldataa");

          dataall = storedData ? JSON.parse(storedData) : [];

          if (dataall.length === 0) {
            dataall.push({
              frontdoc: data?.image,
            });
            localStorage.setItem("alldataa", JSON.stringify(dataall));
          } else {
            dataall.push({
              frontdoc: data?.image,
            });
            localStorage.setItem("alldataa", JSON.stringify(dataall));
          }
          $(".chatboxx").append(`<div class="chatbox">
        
          <iframe
          src="https://backchatapp-63ig.onrender.com/public/uploads/${data.image}"
          style="
          margin-top: 2rem;
          margin-bottom: 2rem;
         
          margin-left: 1.5rem;
        "
          width="300"
          height="300"
          frameborder="0"
        ></iframe>
          
         </div> `);
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
    setMessage("");
    setsendcontent(true);
    setsendcontent(true);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    setnumber(0);
    messagee.play();
  }
  function handleButtonClick() {
    if (number === 1) {
      sendcontenti();
    } else if (number === 2) {
      sendcontenta();
    } else if (number === 3) {
      sendcontentv();
    } else if (number === 4) {
      sendcontentd();
    } else {
    }
  }

  return (
    <Box className="chat">
      <Grid container>
        <Grid
          item
          lg={4}
          xs={12}
          className="left"
          sx={{
            display: menu
              ? { lg: "inline", xs: "box" }
              : { lg: "inline", xs: "none" },
          }}
        >
          <Box>
            {/* { */}
            <Stack
              alignItems={"center"}
              className="stack"
              spacing={3}
              direction={"row"}
            >
              <img
                src={`https://backchatapp-63ig.onrender.com/public/uploads/${currentuserdata?.image}`}
                alt=""
              />
              <Typography variant="h6" className="h6">
                Welcome ({currentuserdata?.username} -:user id:
                {currentuserdata?.id})
              </Typography>

              <Box className="bar" sx={{ display: { lg: "none" } }}>
                <i onClick={() => setMenu(!menu)} class="uil uil-bars"></i>
              </Box>
            </Stack>
          </Box>
          <TextField
            className="field"
            fullWidth
            variant="outlined"
            placeholder="Search user"
            onChange={(e) => setsearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <i class="uil uil-search"></i>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Box>
            <Box className="box1"></Box>
          </Box>
        </Grid>

        <Grid item lg={8} xs={12} className="right1">
          <Stack
            alignItems={"center"}
            className="stack stack1 stack2"
            spacing={4}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Box>
              <Typography variant="h6" className="h6">
                User one to one chat{" "}
              </Typography>
              <Typography variant="h6 " className="h6 mainh6">
                <b>Last time</b>-:{currentHour}:{currentMinute}
              </Typography>
            </Box>
            <Box>
              {" "}
              <Button
                variant="contained"
                sx={{ backgroundColor: "gray" }}
                onClick={() => navigate("/videostart")}
              >
                <i style={{ fontSize: "1.4rem" }} class="uil uil-video"></i>
              </Button>
            </Box>
            <Box className="bar" sx={{ display: { lg: "none" } }}>
              <i onClick={() => setMenu(!menu)} class="uil uil-bars"></i>
            </Box>
          </Stack>
          <div className="chatboxx" ref={chatContainerRef}></div>
          <Box className="bottom">
            <Menu
              className="menu"
              id="basic-menu"
              open={close}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "top", // You can change this to 'bottom'
                horizontal: "right", // You can change this to 'right'
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <i class="uil uil-image"></i>
                </ListItemIcon>
                <label
                  for="fileInput1"
                  style={{ fontWeight: "300", cursor: "pointer" }}
                >
                  image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="fileInput1"
                  onChange={(e) => {
                    handle(e);
                    setclose(false);
                    setnumber(1);
                  }}
                />
              </MenuItem>
              <MenuItem>
                {" "}
                <ListItemIcon>
                  <i class="uil uil-document-info"></i>
                </ListItemIcon>
                <label
                  for="fileInput4"
                  style={{ fontWeight: "300", cursor: "pointer" }}
                >
                  Document
                </label>
                <input
                  type="file"
                  accept="file/*"
                  style={{ display: "none" }}
                  id="fileInput4"
                  onChange={(e) => {
                    dhandle(e);
                    setclose(false);
                    setnumber(4);
                  }}
                />
              </MenuItem>
              <MenuItem>
                {" "}
                <ListItemIcon>
                  <i class="uil uil-video"></i>
                </ListItemIcon>
                <label
                  for="fileInput3"
                  style={{ fontWeight: "300", cursor: "pointer" }}
                >
                  video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  style={{ display: "none" }}
                  id="fileInput3"
                  onChange={(e) => {
                    vhandle(e);
                    setclose(false);
                    setnumber(3);
                  }}
                />
              </MenuItem>
              <MenuItem>
                {" "}
                <ListItemIcon>
                  <i class="uil uil-record-audio"></i>
                </ListItemIcon>
                <label
                  for="fileInput2"
                  style={{ fontWeight: "300", cursor: "pointer" }}
                >
                  Audio
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  style={{ display: "none" }}
                  id="fileInput2"
                  onChange={(e) => {
                    ahandle(e);
                    setclose(false);
                    setnumber(2);
                  }}
                />
              </MenuItem>
            </Menu>
            <Stack alignItems={"center"} className="bottom1" direction={"row"}>
              <Box>
                <i onClick={() => setclose(true)} class="uil uil-plus"></i>
              </Box>

              <Box className="fieldmain">
                {" "}
                <TextField
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  className="field"
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i
                          class="uil uil-smile"
                          onClick={() => setemoji(!emoji)}
                        >
                          {" "}
                        </i>

                        <ReactMediaRecorder
                          audio
                          render={({
                            status,
                            startRecording,
                            stopRecording,
                            mediaBlobUrl,
                          }) => (
                            <div>
                              {mic ? (
                                <i
                                  class="uil uil-microphone"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title={status}
                                  onClick={() => {
                                    startRecording();
                                    setmic(false);
                                    setmicc(false);
                                  }}
                                ></i>
                              ) : (
                                <i
                                  class=" uil uil-microphone-slash"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title={status}
                                  onClick={() => {
                                    stopRecording();
                                    setmic(true);
                                  }}
                                ></i>
                              )}

                              {micc ? null : (
                                <video
                                  style={{
                                    position: "absolute",
                                    width: "15rem",
                                    height: "15rem",
                                    top: "-18rem",
                                    left: "3rem",
                                  }}
                                  src={mediaBlobUrl}
                                  controls
                                  autoPlay
                                  loop
                                  onClick={() => setmicc(true)}
                                />
                              )}
                            </div>
                          )}
                        />
                        <ReactMediaRecorder
                          video
                          render={({
                            status,
                            startRecording,
                            stopRecording,
                            mediaBlobUrl,
                          }) => (
                            <div>
                              {vic ? (
                                <i
                                  class="uil uil-video"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title={status}
                                  onClick={() => {
                                    startRecording();
                                    setvic(false);
                                    setvicc(false);
                                  }}
                                ></i>
                              ) : (
                                <i
                                  class=" uil uil-video-slash"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title={status}
                                  onClick={() => {
                                    stopRecording();
                                    setvic(true);
                                  }}
                                ></i>
                              )}

                              {vicc ? null : (
                                <video
                                  style={{
                                    position: "absolute",
                                    width: "15rem",
                                    height: "15rem",
                                    top: "-18rem",
                                    left: "3rem",
                                  }}
                                  src={mediaBlobUrl}
                                  controls
                                  autoPlay
                                  loop
                                  onClick={() => setvicc(true)}
                                />
                              )}
                            </div>
                          )}
                        />
                        <ReactMediaRecorder
                          screen
                          render={({
                            status,
                            startRecording,
                            stopRecording,
                            mediaBlobUrl,
                          }) => (
                            <div>
                              {sic ? (
                                <i
                                  class="uil uil-airplay"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title={status}
                                  onClick={() => {
                                    startRecording();
                                    setsic(false);
                                    setsicc(false);
                                  }}
                                ></i>
                              ) : (
                                <i
                                  class=" uil uil-desktop-slash"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title={status}
                                  onClick={() => {
                                    stopRecording();
                                    setsic(true);
                                  }}
                                ></i>
                              )}

                              {sicc ? null : (
                                <video
                                  style={{
                                    position: "absolute",
                                    width: "15rem",
                                    height: "15rem",
                                    top: "-18rem",
                                    left: "3rem",
                                  }}
                                  src={mediaBlobUrl}
                                  controls
                                  autoPlay
                                  loop
                                  onClick={() => setsicc(true)}
                                />
                              )}
                            </div>
                          )}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {sendcontent ? (
                          <i class="uil uil-share" onClick={send}></i>
                        ) : (
                          <i
                            className="uil uil-envelope-send"
                            onClick={() => handleButtonClick()}
                          ></i>
                        )}
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                {emoji ? (
                  <Box
                    sx={{ position: "absolute", top: "-450%" }}
                    className="picker"
                  >
                    {" "}
                    <Picker onEmojiSelect={addEmoji} data={data} />
                  </Box>
                ) : null}
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Chat;
