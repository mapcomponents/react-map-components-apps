import { yellow, lightBlue, indigo} from "@material-ui/core/colors";

const colorTheme = {
  map: {
    highway: {
      color: "#c2f5c2",
      opacity: 0.4,
    },
    water: {
      //color: "rgb(0,222,0)",
      color: "#e02a5f",
      opacity: 1,
    },
    countryGeojson:{
      fillColor: '#01012b',
      //fillColor: '#243C7C',
      fillOpacity: 0.6,
      //lineColor: 'rgba(200,0,0,0.6)',
      lineColor: '#120458',
      lineWidth:1,
      lineOpacity:0.7
    },
  },
  classes: {
    progressLabel: {
      fontWeight: "bold",
      fontSize: "1rem",
      opacity: 0.8,
      //color: "#d1f7ff"
      color: "#a7a7a7",
    },
    progressLarge: {
      fontSize: "1.4rem",
      //color: "#d1f7ff"
      color: "#e2dddf",
    },

    progressSmall:{
      fontSize: "1.3rem",
      //color: "#d1f7ff"
      color: "#e2dddf",
    },
    participantName: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      //color: "#d1f7ff"
      color: "#e2dddf",
    },
    participantPerformance: {
      fontSize: "1.1rem",
     // fontWeight: "bold",
      color: "#e2dddf"
    },
  },

  palette: {
    type: "dark",
    primary: indigo,
    secondary: lightBlue,
    info: yellow,
    background: {
      default: "#222222",
    },
    chart: {
      gridColor: "#777",
      pointStroke: "#e02a5f",
      pointConnections: "#e02a5f",
      pointFill: "#424242",
      activePointFill: "#33bfff",
      inactivePointFill: "#00a0ff",
    },
  },
};

export default colorTheme;
