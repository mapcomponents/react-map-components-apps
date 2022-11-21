import { ListItemText } from "@mui/material";

export default function Time(props) {
   var minutes = "";
   var seconds = "";
   function setMinutes() {
      if (props.features?.Mn) {
         minutes = props.features?.Mn;
      } else {
         minutes = "00";
      }
   }
   function setSeconds() {
      if (props.features?.Sec) {
         seconds = parseInt(props.features.Sec);
      } else {
         seconds = "00";
      }
   }

   setMinutes();
   setSeconds();
   function setTime() {
      if (!props.features?.Hr) {
         return "No time available";
      } else {
         return "Time: " + props.features.Hr + ":" + minutes + ":" + seconds;
      }
   }
   return <ListItemText>{setTime()}</ListItemText>;
}
