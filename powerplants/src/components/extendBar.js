import React, { useState } from "react";
import { Button, AppBar, Grid } from "@mui/material/";
import DragHandleIcon from "@mui/icons-material/DragHandle";

const imageStyle = {
   width: 100,
   height: 100,
};

export default function ExtendBar(props) {
   const [extended, setExtended] = useState(false);

   const AllButtons = () => {
      return (
         <>
            {props.options.map((el, index) => {
               return (
                  <React.Fragment key={index}>
                     {extended | (props.current === index) ? (
                        <Button
                           key={index}
                           onClick={() => {
                              props.setter(index);
                           }}
                        >
                           <img
                              src={el.image}
                              alt={el.title + "_layer"}
                              style={{
                                 opacity:
                                    index === props.current
                                       ? props.disabled
                                          ? 0.7
                                          : 1
                                       : 0.7,
                                 ...imageStyle,
                              }}
                           />
                        </Button>
                     ) : (
                        <></>
                     )}
                  </React.Fragment>
               );
            })}
         </>
      );
   };

   return (
      <>
         <AppBar
            position="fixed"
            sx={{
               top: "auto",
               bottom: 33,
               right: 100,
               width: extended ? 410 : 180,
               height: 115,
               opacity: 0.8,
            }}
         >
            <Grid container>
               <Grid item>
                  <Button
                     sx={{ height: 115, paddingRight: 3 }}
                     onClick={() => setExtended(!extended)}
                  >
                     <DragHandleIcon
                        color="secondary"
                        sx={{
                           alignSelf: "center",
                           transform: "rotate(90deg)",
                        }}
                     />
                  </Button>
               </Grid>

               <Grid item position="fixed" alignItems="flex-end" marginLeft={5}>
                  <AllButtons />
               </Grid>
            </Grid>
         </AppBar>
      </>
   );
}

