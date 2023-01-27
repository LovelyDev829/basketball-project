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
  const [dragCircleItem, setDragCircleItem] = useState(-2)
  const [dragPointItem, setDragPointItem] = useState(-2)
  const [dragBallItem, setDragBallItem] = useState(-2)

  const [dropMenuItem, setDropMenuItem] = useState(-1)
  const [mousePosX, setMousePosX] = useState(0)
  const [mousePosY, setMousePosY] = useState(0)
  
  const [newCircles, setNewCircles] = useState([])
  const [newPoints, setNewPoints] = useState([])
  const [newBalls, setNewBalls] = useState([])
  
  const [positionCircleDiff, setPositionCircleDiff] = useState([25, 75])
  const [positionPointDiff, setPositionPointDiff] = useState([25, 75])

  useEffect(() => {
    if (!document.mozFullScreen && !document.webkitIsFullScreen)
      setFullScreenFlag(false);
    else setFullScreenFlag(true);
  });
  useLayoutEffect(()=>{
    const imageWidth = window.innerWidth
    if(imageWidth > 1266)      {setPositionCircleDiff([31, 105]);                             setPositionPointDiff([24, 95])}
    else if(imageWidth > 1170) {setPositionCircleDiff([31, 120-((3/19)*(imageWidth-1170))]);  setPositionPointDiff([24, 110-((3/19)*(imageWidth-1170))])}
    else if(imageWidth > 1040) {setPositionCircleDiff([31, 80]);                              setPositionPointDiff([25, 72])}
    else if(imageWidth > 872)  {setPositionCircleDiff([31, 110-((31/167)*(imageWidth-873))]); setPositionPointDiff([25, 103-((31/167)*(imageWidth-873))])}
    else if(imageWidth > 480)  {setPositionCircleDiff([29, 80]);                              setPositionPointDiff([23, 73])}
    else                       {setPositionCircleDiff([24, 75]);                              setPositionPointDiff([20, 71])}
  }, []);
  window.scrollTo(0, 1);
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
    setDragCircleItem(index)
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
    if (dragCircleItem === -2) return
    const releasingId = dragCircleItem > -1 ? dragCircleItem : newCircles?.length - 1
    const nextNewCircles = newCircles?.map((item, index) => {
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
    setDragCircleItem(-2)
  }
  const pointPicked = (creatingFlag, index, color) => {
    setDragPointItem(index)
    if (creatingFlag) {
      const newObject = {
        color: color,
        mousePosX: mousePosX,
        mousePosY: mousePosY
      }
      newPoints.push(newObject)
    }
  }
  const pointReleased = () => {
    if (dragPointItem === -2) return
    const releasingId = dragPointItem > -1 ? dragPointItem : newPoints?.length - 1
    const nextNewPoints = newPoints?.map((item, index) => {
      if (index === releasingId) {
        return {
          ...item,
          mousePosX: mousePosX,
          mousePosY: mousePosY
        };
      }
      else return item
    })
    setNewPoints(nextNewPoints)
    setDragPointItem(-2)
  }
  const ballPicked = (creatingFlag, index) => {
    setDragBallItem(index)
    if (creatingFlag) {
      const newObject = {
        mousePosX: mousePosX,
        mousePosY: mousePosY
      }
      newBalls.push(newObject)
    }
  }
  const ballReleased = () => {
    if (dragBallItem === -2) return
    const releasingId = dragBallItem > -1 ? dragBallItem : newBalls?.length - 1
    const nextNewBalls = newBalls?.map((item, index) => {
      if (index === releasingId) {
        return {
          ...item,
          mousePosX: mousePosX,
          mousePosY: mousePosY
        };
      }
      else return item
    })
    setNewBalls(nextNewBalls)
    setDragBallItem(-2)
  }
  return (
    <div className="MainPage">
      <div className="top-user-info">
        <img src={mainLogo} alt="" />
        <div className="user-avatar">
          <UserIcon />
          Williams
        </div>
      </div>
      <div className="main">
        <div className="board"
          onMouseUp={() => {circleReleased(); pointReleased(); ballReleased()}}
          onTouchEnd={() => {circleReleased(); pointReleased(); ballReleased()}}
          onMouseLeave={() => {circleReleased(); pointReleased(); ballReleased()}}
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
              newCircles?.map((item, index) => {
                const defaultStyle = { top: `${item?.mousePosY - positionCircleDiff[1]}px`, left: `${item?.mousePosX - positionCircleDiff[0]}px` }
                const dragStyle = { top: `${mousePosY - positionCircleDiff[1]}px`, left: `${mousePosX - positionCircleDiff[0]}px` }
                var contextFlag = false
                return (
                  <div className={'circle ' + item?.color} key={"new-circle-" + index}
                    style={(dragCircleItem === index || (dragCircleItem === -1 && index === newCircles?.length - 1)) ? dragStyle : defaultStyle}
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
                    }}>
                    {item?.number}
                    <div className={(dropMenuItem === index) ? "drop-menu" : "hidden"}>
                      <p>Number <input min={1} type="number" value={item?.number} onChange={(e) => {
                        const nextNewCircles = newCircles?.map((itemM, indexX) => {
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
                        const nextNewCircles = newCircles?.map((itemM, indexX) => {
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
                      <div className="delete-button" onClick={()=>{
                        setDropMenuItem(-1)
                        setNewCircles([...newCircles?.slice(0, index), ...newCircles?.slice(index + 1)])}
                      }
                      onTouchStart={()=>{
                        setDropMenuItem(-1)
                        setNewCircles([...newCircles?.slice(0, index), ...newCircles?.slice(index + 1)])
                      }}>Delete</div>
                    </div>
                    <div className="name">{item?.name}</div>
                  </div>
                )
              })
            }
            {
              newPoints?.map((item, index) => {
                const defaultStyle = { top: `${item?.mousePosY - positionPointDiff[1]}px`, left: `${item?.mousePosX - positionPointDiff[0]}px` }
                const dragStyle = { top: `${mousePosY - positionPointDiff[1]}px`, left: `${mousePosX - positionPointDiff[0]}px` }
                var contextFlag = false
                return (
                  <div className={'point ' + item?.color} key={"new-point-" + index}
                    style={(dragPointItem === index || (dragPointItem === -1 && index === newPoints?.length - 1)) ? dragStyle : defaultStyle}
                    // style={defaultStyle}
                    onMouseDown={(e) => {
                      if (e.button === 2) return
                      pointPicked(false, index, "")
                    }}
                    onTouchStart={() => {
                      if (contextFlag) return
                      pointPicked(false, index, "")
                    }}
                    onContextMenu={(e) => {
                      contextFlag = true
                      e.preventDefault()
                      //Delete...................................................................
                      setNewPoints([...newPoints?.slice(0, index), ...newPoints?.slice(index + 1)])
                    }}
                    onTouchEnd={()=>{
                      contextFlag = false
                    }}>
                  </div>
                )
              })
            }
            {
              newBalls?.map((item, index) => {
                const defaultStyle = { top: `${item?.mousePosY - positionPointDiff[1]}px`, left: `${item?.mousePosX - positionPointDiff[0]}px` }
                const dragStyle = { top: `${mousePosY - positionPointDiff[1]}px`, left: `${mousePosX - positionPointDiff[0]}px` }
                var contextFlag = false
                return (
                  <div className='ball' key={"new-ball-" + index}
                    style={(dragBallItem === index || (dragBallItem === -1 && index === newBalls?.length - 1)) ? dragStyle : defaultStyle}
                    // style={defaultStyle}
                    onMouseDown={(e) => {
                      if (e.button === 2) return
                      ballPicked(false, index)
                    }}
                    onTouchStart={() => {
                      if (contextFlag) return
                      ballPicked(false, index)
                    }}
                    onContextMenu={(e) => {
                      contextFlag = true
                      e.preventDefault()
                      //Delete...................................................................
                      setNewBalls([...newBalls?.slice(0, index), ...newBalls?.slice(index + 1)])
                    }}
                    onTouchEnd={()=>{
                      contextFlag = false
                    }}>
                      <BallIcon />
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
              <div className="circle red" onMouseDown={() => circlePicked(true, -1, "red")} onTouchStart={() => circlePicked(true, -1, "red")}></div>
              <div className="circle blue" onMouseDown={() => circlePicked(true, -1, "blue")} onTouchStart={() => circlePicked(true, -1, "blue")}></div>
              <div className="circle brown" onMouseDown={() => circlePicked(true, -1, "brown")} onTouchStart={() => circlePicked(true, -1, "brown")}></div>
              <div className="circle yellow" onMouseDown={() => circlePicked(true, -1, "yellow")} onTouchStart={() => circlePicked(true, -1, "yellow")}></div>
              <div className="circle green" onMouseDown={() => circlePicked(true, -1, "green")} onTouchStart={() => circlePicked(true, -1, "green")}></div>
              <div className="circle white" onMouseDown={() => circlePicked(true, -1, "white")} onTouchStart={() => circlePicked(true, -1, "white")}></div>
              <div className="circle grey" onMouseDown={() => circlePicked(true, -1, "grey")} onTouchStart={() => circlePicked(true, -1, "grey")}></div>
              <div className="circle black" onMouseDown={() => circlePicked(true, -1, "black")} onTouchStart={() => circlePicked(true, -1, "black")}></div>

              <div className="point purple" onMouseDown={() => pointPicked(true, -1, "purple")} onTouchStart={() => pointPicked(true, -1, "purple")}/>
              <div className="point orange" onMouseDown={() => pointPicked(true, -1, "orange")} onTouchStart={() => pointPicked(true, -1, "orange")}/>
              <div className="point springgreen" onMouseDown={() => pointPicked(true, -1, "springgreen")} onTouchStart={() => pointPicked(true, -1, "springgreen")}/>
              <div className="point cornflowerblue" onMouseDown={() => pointPicked(true, -1, "cornflowerblue")} onTouchStart={() => pointPicked(true, -1, "cornflowerblue")}/>
              <div className="ball" onMouseDown={() => ballPicked(true, -1)} onTouchStart={() => ballPicked(true, -1)}>
                <BallIcon />
              </div>
            </div>
            <div className="button-group">
              <div className="button">
                <RotateIcon />
              </div>
              <div className="button" onClick={() => {setNewCircles([]); setNewPoints([]); setNewBalls([])}}>
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
