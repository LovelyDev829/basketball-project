import React, { useEffect } from "react";
import "./AnimationPage.scss";
import { useNavigate } from "react-router-dom";
import fieldLine from "../assets/field-line.png";
import fieldWithoutLine from "../assets/field-without-line.png";
import { ReactComponent as ArrowLeftIcon } from "../assets/svg/arrow-left.svg";
import { ReactComponent as MenuIcon } from "../assets/svg/menu.svg";
import { ReactComponent as LinkIcon } from "../assets/svg/link.svg";
import { ReactComponent as CameraIcon } from "../assets/svg/camera.svg";
import { ReactComponent as DownloadIcon } from "../assets/svg/download.svg";
import { ReactComponent as BookmarkIcon } from "../assets/svg/bookmark.svg";
import { ReactComponent as FieldIcon } from "../assets/svg/field.svg";
import { ReactComponent as MinimizeIcon } from "../assets/svg/minimize.svg";
import { ReactComponent as MaximizeIcon } from "../assets/svg/maximize.svg";

import { ReactComponent as PlayIcon } from "../assets/svg/play.svg";
import { ReactComponent as PlayCircleIcon } from "../assets/svg/play-circle.svg";
import { ReactComponent as PauseIcon } from "../assets/svg/pause.svg";
import { ReactComponent as SquareIcon } from "../assets/svg/square.svg";
import { ReactComponent as RepeatIcon } from "../assets/svg/repeat.svg";

import { ReactComponent as BallIcon } from "../assets/svg/basketball.svg";
import { ReactComponent as TrashIcon } from "../assets/svg/trash.svg";
import { ReactComponent as RotateIcon } from "../assets/svg/rotate-ccw.svg";

import html2canvas from "html2canvas";

function AnimationPage({
  fieldLineFlag,
  setFieldLineFlag,
  fullScreenFlag,
  setFullScreenFlag,
  fullScreenHandle
}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!document.mozFullScreen && !document.webkitIsFullScreen)
      setFullScreenFlag(false);
    else setFullScreenFlag(true);
  });
  const exportAsImage = async (element, imageFileName, downloadFlag) => {
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL("image/png", 1.0);
    if (downloadFlag) downloadImage(image, imageFileName);
    return image;
  };
  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;
    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };
  return (
    <div className="AnimationPage">
      <div className="board">
        <div className="button-line">
          <div className="button-group">
            <div className="button" onClick={() => navigate("/main")}>
              <ArrowLeftIcon />
            </div>
            <div className="button">
              <MenuIcon />
            </div>
            <div className="button">
              <LinkIcon />
            </div>
            <div
              className="button"
              onClick={() =>
                exportAsImage(
                  document.getElementById("image-to-download"),
                  "basketball-screen",
                  true
                )}
            >
              <CameraIcon />
            </div>
            <div className="button">
              <DownloadIcon />
            </div>
            <div className="button">
              <BookmarkIcon />
            </div>
            <div
              className={fieldLineFlag ? "button" : "button clicked"}
              onClick={() => {
                setFieldLineFlag(!fieldLineFlag);
              }}
            >
              <FieldIcon />
            </div>
            <div
              className={!fullScreenFlag ? "button" : "button clicked"}
              onClick={() => {
                if (fullScreenFlag) fullScreenHandle.exit();
                else fullScreenHandle.enter();
                setFullScreenFlag(!fullScreenFlag);
              }}
            >
              {!fullScreenFlag ? <MaximizeIcon /> : <MinimizeIcon />}
            </div>
          </div>
          <div className="button-group">
            <div className="button">
              <PlayIcon />
            </div>
            <div className="button">
              <PlayCircleIcon />
            </div>
            <div className="button">
              <PauseIcon />
            </div>
            <div className="button">
              <SquareIcon />
            </div>
            <div className="button">
              <RepeatIcon />
            </div>
          </div>
        </div>
        <div id="image-to-download" className="image-to-download">
          <img
            src={fieldLineFlag ? fieldLine : fieldWithoutLine}
            alt="BACKGROUND"
          />
        </div>
        <div className="button-line">
          <div className="circles">
            <div className="circle red">1</div>
            <div className="circle blue">1</div>
            <div className="circle brown">1</div>
            <div className="circle yellow">1</div>
            <div className="circle green">1</div>
            <div className="circle white">1</div>
            <div className="circle grey">1</div>
            <div className="circle black">1</div>

            <div className="point purple" />
            <div className="point orange" />
            <div className="point springgreen" />
            <div className="point cornflowerblue" />
            <div className="ball">
              <BallIcon />
            </div>
          </div>
          <div className="button-group">
            <div className="button">
              <RotateIcon />
            </div>
            <div className="button">
              <TrashIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimationPage;
