import React, { useEffect, useLayoutEffect, useState } from "react";
import "./MainPage.scss";
import { useNavigate } from "react-router-dom";
import fieldLine from "../assets/field-line-with-logo.png";
import fieldWithoutLine from "../assets/field-without-line.png";
// import { ReactComponent as ArrowLeftIcon } from "../assets/svg/arrow-left.svg";
import { ReactComponent as MenuIcon } from "../assets/svg/menu.svg";
import { ReactComponent as LinkIcon } from "../assets/svg/link.svg";
// import { ReactComponent as CameraIcon } from "../assets/svg/camera.svg";
import { ReactComponent as DownloadIcon } from "../assets/svg/download.svg";
// import { ReactComponent as BookmarkIcon } from "../assets/svg/bookmark.svg";
import { ReactComponent as FieldIcon } from "../assets/svg/field.svg";
import { ReactComponent as MinimizeIcon } from "../assets/svg/minimize.svg";
import { ReactComponent as MaximizeIcon } from "../assets/svg/maximize.svg";
import { ReactComponent as VideoIcon } from "../assets/svg/video.svg";
// import { ReactComponent as UsersIcon } from "../assets/svg/users.svg";

import { ReactComponent as GlobeIcon } from "../assets/svg/globe.svg";
import { ReactComponent as HelpCircleIcon } from "../assets/svg/help-circle.svg";
import { ReactComponent as LogInIcon } from "../assets/svg/log-in.svg";

// import { ReactComponent as PlayIcon } from "../assets/svg/play.svg";
// import { ReactComponent as PlayCircleIcon } from "../assets/svg/play-circle.svg";
// import { ReactComponent as PauseIcon } from "../assets/svg/pause.svg";
// import { ReactComponent as SquareIcon } from "../assets/svg/square.svg";
// import { ReactComponent as RepeatIcon } from "../assets/svg/repeat.svg";

import { ReactComponent as BallIcon } from "../assets/svg/basketball.svg";
import { ReactComponent as TrashIcon } from "../assets/svg/trash.svg";
import { ReactComponent as RotateIcon } from "../assets/svg/rotate-ccw.svg";
import { ReactComponent as UserIcon } from "../assets/svg/user.svg";

import mainLogo from "../assets/logo.png";
import html2canvas from "html2canvas";
function MainPage({
  fieldLineFlag,
  setFieldLineFlag,
  fullScreenFlag,
  setFullScreenFlag,
  fullScreenHandle
}) {
  const navigate = useNavigate();
  const [dragItem, setDragItem] = useState(-2)
  const [dropMenuItem, setDropMenuItem] = useState(-1)
  const [mousePosX, setMousePosX] = useState(0)
  const [mousePosY, setMousePosY] = useState(0)
  const [newCircles, setNewCircles] = useState([])
  const [positionDiff, setPositionDiff] = useState([25, 75])
  // const [inputNumber, setInputNumber] = useState(1)
  // const [inputName, setInputName] = useState("")

  useEffect(() => {
    if (!document.mozFullScreen && !document.webkitIsFullScreen)
      setFullScreenFlag(false);
    else setFullScreenFlag(true);
    // const imageWidth = document.getElementById("image-to-download").offsetWidth
  });
  useLayoutEffect(()=>{
    const imageWidth = window.innerWidth
    // setPositionDiff([30-((5/1520)*(1800-imageWidth)), 105-((3/152)*(1920-imageWidth))])
    if(imageWidth > 1266) setPositionDiff([31, 105])
    else if(imageWidth > 1170) setPositionDiff([31, 120-(0.05*(imageWidth-1170))])
    else if(imageWidth > 1023) setPositionDiff([31, 80])
    else if(imageWidth > 872) setPositionDiff([31, 110-(0.2*(imageWidth-872))])
    else if(imageWidth > 480) setPositionDiff([29, 80])
    else setPositionDiff([24, 75])

    // setPositionDiff([31, 80])
    window.scrollTo(0, 1);
  }, []);
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
  const circlePicked = (creatingFlag, index, color) => {
    if (dropMenuItem > -1) return
    setDragItem(index)
    setDropMenuItem(-1)
    if (creatingFlag) {
      const newObject = {
        color: color,
        number: 1,
        name: "",
        mousePosX: mousePosX,
        mousePosY: mousePosY
      }
      newCircles.push(newObject)
    }
  }
  const circleReleased = () => {
    if (dragItem === -2) return
    const releasingId = dragItem > -1 ? dragItem : newCircles.length - 1
    const nextNewCircles = newCircles.map((item, index) => {
      if (index === releasingId) {
        return {
          ...item,
          mousePosX: mousePosX,
          mousePosY: mousePosY
        };
      }
      else return item
    })
    setNewCircles(nextNewCircles)
    setDragItem(-2)
  }
  return (
    <div className="MainPage">
      <div className="top-user-info">
        <img src={mainLogo} alt="" />
        <div className="user-avatar">
          <UserIcon />
          Williams
          {/* {window.innerWidth} */}
        </div>
      </div>
      <div className="main">
        <div className="board"
          onMouseUp={() => circleReleased()}
          onTouchEnd={() => circleReleased()}
          onMouseLeave={() => circleReleased()}
          onMouseMove={(e) => {
            setMousePosX(e.clientX);
            setMousePosY(e.clientY);
          }}
          onTouchMove={(e)=>{
            setMousePosX(e.changedTouches[0].clientX)
            setMousePosY(e.changedTouches[0].clientY)
          }}
          onTouchStart={(e)=>{
            setMousePosX(e.changedTouches[0].clientX)
            setMousePosY(e.changedTouches[0].clientY)
          }}>
          <div id="new-circles">
            {
              newCircles.map((item, index) => {
                const defaultStyle = { top: `${item?.mousePosY - positionDiff[1]}px`, left: `${item?.mousePosX - positionDiff[0]}px` }
                const dragStyle = { top: `${mousePosY - positionDiff[1]}px`, left: `${mousePosX - positionDiff[0]}px` }
                var contextFlag = false
                // console.log("dragItem", dragItem)
                // console.log("index", index)
                // console.log("newCircles.length", newCircles.length)
                return (
                  <div className={'circle ' + item?.color} key={"new-circle-" + index}
                    style={(dragItem === index || (dragItem === -1 && index === newCircles.length - 1)) ? dragStyle : defaultStyle}
                    // style={defaultStyle}
                    onMouseDown={(e) => {
                      if (e.button === 2) return
                      circlePicked(false, index, "")
                    }}
                    onTouchStart={() => {
                      if (contextFlag) return
                      circlePicked(false, index, "")
                    }}
                    onContextMenu={(e) => {
                      contextFlag = true
                      e.preventDefault()
                      setDropMenuItem(index)
                    }}
                    onMouseLeave={() => {
                      setDropMenuItem(-1)
                    }}
                    onTouchEnd={()=>{
                      contextFlag = false
                    }}
                    >
                    {item?.number}
                    <div className={(dropMenuItem === index) ? "drop-menu" : "hidden"}>
                      <p>Number <input min={1} type="number" value={item?.number} onChange={(e) => {
                        const nextNewCircles = newCircles.map((itemM, indexX) => {
                          if (indexX === index) {
                            return {
                              ...itemM,
                              number: e.target.value,
                            };
                          }
                          else return itemM
                        })
                        setNewCircles(nextNewCircles)
                      }} /></p>
                      <p>Name   <input value={item?.name} onChange={(e) => {
                        const nextNewCircles = newCircles.map((itemM, indexX) => {
                          if (indexX === index) {
                            return {
                              ...itemM,
                              name: e.target.value,
                            };
                          }
                          else return itemM
                        })
                        setNewCircles(nextNewCircles)
                      }} /></p>
                    </div>
                    <div className="name">{item?.name}</div>
                  </div>
                )
              })
            }
          </div>
          <div className="button-line">
            <div className="button-group">
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
                <DownloadIcon />
              </div>
              {/* <div className="button">
              <BookmarkIcon />
            </div> */}
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
              <div className="button" onClick={() => navigate("/animation")}>
                <VideoIcon style={{ color: "red", stroke: "red" }} />
              </div>
            </div>
            <div className="button-group">
              <div className="button">
                <GlobeIcon />
              </div>
              <div className="button">
                <HelpCircleIcon />
              </div>
              <div className="button">
                <LogInIcon />
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
              <div className="circle red" onMouseDown={() => circlePicked(true, -1, "red")} onTouchStart={() => circlePicked(true, -1, "red")}>1</div>
              <div className="circle blue" onMouseDown={() => circlePicked(true, -1, "blue")} onTouchStart={() => circlePicked(true, -1, "blue")}>1</div>
              <div className="circle brown" onMouseDown={() => circlePicked(true, -1, "brown")} onTouchStart={() => circlePicked(true, -1, "brown")}>1</div>
              <div className="circle yellow" onMouseDown={() => circlePicked(true, -1, "yellow")} onTouchStart={() => circlePicked(true, -1, "yellow")}>1</div>
              <div className="circle green" onMouseDown={() => circlePicked(true, -1, "green")} onTouchStart={() => circlePicked(true, -1, "green")}>1</div>
              <div className="circle white" onMouseDown={() => circlePicked(true, -1, "white")} onTouchStart={() => circlePicked(true, -1, "white")}>1</div>
              <div className="circle grey" onMouseDown={() => circlePicked(true, -1, "grey")} onTouchStart={() => circlePicked(true, -1, "grey")}>1</div>
              <div className="circle black" onMouseDown={() => circlePicked(true, -1, "black")} onTouchStart={() => circlePicked(true, -1, "black")}>1</div>

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
              <div className="button" onClick={() => setNewCircles([])}>
                <TrashIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="roster">
          <div className="hidden">
            <img src={mainLogo} alt="" />
            <div className="user-avatar">
              <UserIcon />
              Williams
            </div>
          </div>
          <div className="table">
            <div className="top">
              <div className="left">
                <div className="title">Offense</div>
                <div className="list">
                  <div className="member">23 M.Jordan</div>
                  <div className="member">23 M.Jordan</div>
                  <div className="member">23 M.Jordan</div>
                  <div className="member">23 M.Jordan</div>
                  <div className="member">23 M.Jordan</div>
                </div>
              </div>
              <div className="right">
                <div className="title">Defense</div>
                <div className="list">
                  <div className="plan">Man-to-Man</div>
                  <div className="plan">2-3 Zone</div>
                  <div className="plan">1-3-1 Zone</div>
                  <div className="plan">3-2 Zone</div>
                  <div className="plan">Custom</div>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="title">Roster</div>
              <div className="columns">
                <div className="column">
                  <div className="sub-title">GUARDS</div>
                  <div className="list">
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                  </div>
                </div>
                <div className="column">
                  <div className="sub-title">GUARDS</div>
                  <div className="list">
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                  </div>
                </div>
                <div className="column">
                  <div className="sub-title">GUARDS</div>
                  <div className="list">
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                    <div className="item">23 M.Jordan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
