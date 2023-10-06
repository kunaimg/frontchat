import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
async function intilize(element) {
  let roomno = sessionStorage.getItem("roomno");
  let user = sessionStorage.getItem("user");
  const appID = 783641787;
  const serverSecret = "c9928212e2c8e0505ccce401116da168";
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomno,
    user,
    Date.now().toString()
  );
  const zp = ZegoUIKitPrebuilt.create(kitToken);

  zp.joinRoom({
    container: element,
    scenario: {
      mode: ZegoUIKitPrebuilt.VideoConference,
    },
  });
}

function Video() {
  return (
    <div>
      <div className="videomain" ref={intilize}></div>
    </div>
  );
}

export default Video;
