import theme from "../theme.js";

import { useEffect, useState, useCallback, useContext } from "react";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";

import makeStyles from "@mui/styles/makeStyles";

import AppContext from "../AppContext.js";
import { useMediaQuery } from "@mui/material";

import BottomSidebar from "./BottomSidebar";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: "30px",
    margin: "10px",
  },
  iconbutton: {
    padding: "0px !important",
  },
}));

function DraggableFrame(props) {
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  const [pos, setPos] = useState(props.startPos);
  const [dragging, setDragging] = useState(false);

  const classes = useStyles(theme);

  const appContext = useContext(AppContext);

  var startPos;

  useEffect(() => {
    if (props.componentId == "toolbar") {
      window.addEventListener(
        "resize",
        function (event) {
          setPos({ ...pos, x: window.innerWidth - 100 });
        },
        true
      );
    }
  });

  const onMouseDown = (e) => {
    startPos = { x: e.pageX, y: e.pageY };

    console.log("onMouseDown");

    // only left mouse button
    if (e.button !== 0) return;

    setDragging(true);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    e.preventDefault();
    e.stopPropagation();
  };

  const onMouseUp = (e) => {
    console.log("onMouseUp");
    setDragging(false);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    e.preventDefault();
    e.stopPropagation();
  };

  const onMouseMove = (e) => {
    let x = pos.x - startPos.x + e.pageX;
    let y = pos.y - startPos.y + e.pageY;
    setPos({
      x: x, //> window.innerWidth - 200 ? window.innerWidth - 200 : x,
      y: y < 0 ? 0 : y, //> window.innerHeight - 400 ? window.innerHeight - 400 : y,
    });

    e.preventDefault();
    e.stopPropagation();
  };

  const handleClick = useCallback(() => {
    let newState = props.framesEnabled.slice();

    const index = newState.indexOf(props.componentId);
    if (index > -1) {
      newState.splice(index, 1);

      if (props.componentId == "featureInfo") {
        appContext.setFeatureInfoEnabled(false);
      }
    }

    props.setFramesEnabled(newState);
  }, [props.framesEnabled]);

  return (
    <>
      {mediaIsMobile ? (
        /* <div style={{
          display: props.visible === false ? "none" : "block",
        }}>
          {props.closable && ""}
          <BottomSidebar>{props.children? props.children:""}</BottomSidebar>
        </div>
        */
        <div>
          {props.visible ? <BottomSidebar>{props.children}</BottomSidebar> : ""}
          <div
            style={{
              display: "none",
            }}
          >
            {props.closable && ""}
            {props.children}
          </div>
        </div>
      ) : (
        <div
          style={{
            minHeight: "150px",
            position: "fixed",
            background: "rgba(55,55,55,0.9)",
            zIndex: "2000",
            textAlign: "center",
            display: props.visible === false ? "none" : "block",
            left: pos.x, //"100px",
            //bottom: pos.y, //"200px",
            top: pos.y,
          }}
        >
          <div
            onMouseDown={onMouseDown}
            style={{
              height: "15px",
              marginLeft: "5px",
              marginRight: "5px",
              marginTop: "5px",
              background: theme.palette.red,
              cursor: "pointer",
            }}
          ></div>
          {props.closable && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                color="inherit"
                className={classes.iconbutton}
                style={{ float: "right", color: theme.palette.white }}
                onClick={handleClick}
              >
                <CloseOutlinedIcon className={classes.icon} />
              </IconButton>
            </div>
          )}
          {props.children}
        </div>
      )}
    </>
  );
}

export default DraggableFrame;
