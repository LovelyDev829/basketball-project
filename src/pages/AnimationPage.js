import React from "react";
import './AnimationPage.scss'
import { useNavigate } from 'react-router-dom';
import background from "../assets/background.png";
import { ReactComponent as ArrowLeftIcon } from "../assets/svg/arrow-left.svg";
import { ReactComponent as MenuIcon } from "../assets/svg/menu.svg";
import { ReactComponent as LinkIcon } from "../assets/svg/link.svg";
import { ReactComponent as CameraIcon } from "../assets/svg/camera.svg";
import { ReactComponent as DownloadIcon } from "../assets/svg/download.svg";
import { ReactComponent as BookmarkIcon } from "../assets/svg/bookmark.svg";
import { ReactComponent as FieldIcon } from "../assets/svg/field.svg";
// import { ReactComponent as MinimizeIcon } from "../assets/svg/minimize.svg";
import { ReactComponent as MaximizeIcon } from "../assets/svg/maximize.svg";

import { ReactComponent as PlayIcon } from "../assets/svg/play.svg";
import { ReactComponent as PlayCircleIcon } from "../assets/svg/play-circle.svg";
import { ReactComponent as PauseIcon } from "../assets/svg/pause.svg";
import { ReactComponent as SquareIcon } from "../assets/svg/square.svg";
import { ReactComponent as RepeatIcon } from "../assets/svg/repeat.svg";


function AnimationPage() {
    const navigate = useNavigate();
  return (
    <div className="AnimationPage">
      <div className="botton-line">
        <div className="button-group">
          <div className="button" onClick={()=>navigate('/main')}><ArrowLeftIcon/></div>
          <div className="button"><MenuIcon/></div>
          <div className="button"><LinkIcon/></div>
          <div className="button"><CameraIcon/></div>
          <div className="button"><DownloadIcon/></div>
          <div className="button"><BookmarkIcon/></div>
          <div className="button"><FieldIcon/></div>
          <div className="button"><MaximizeIcon/></div>
          {/* <div className="button"><MinimizeIcon/></div> */}
        </div>
        <div className="button-group">
            <div className="button"><PlayIcon/></div>
            <div className="button"><PlayCircleIcon/></div>
            <div className="button"><PauseIcon/></div>
            <div className="button"><SquareIcon/></div>
            <div className="button"><RepeatIcon/></div>
        </div>
      </div>
      <div className="image-to-download">
        <img src={background} alt="BACKGROUND" />
      </div>
      <div className="botton-line">
        <div className="button-group">
          <div className="button"><ArrowLeftIcon/></div>
          <div className="button"><MenuIcon/></div>
          <div className="button"><LinkIcon/></div>
          <div className="button"><MaximizeIcon/></div>
        </div>
        <div className="button-group">
            <div className="button"><PlayIcon/></div>
            <div className="button"><PlayCircleIcon/></div>
            <div className="button"><RepeatIcon/></div>
        </div>
        <div className="button-group">
            <div className="button"><RepeatIcon/></div>
        </div>
      </div>
    </div>
  );
}

export default AnimationPage;
