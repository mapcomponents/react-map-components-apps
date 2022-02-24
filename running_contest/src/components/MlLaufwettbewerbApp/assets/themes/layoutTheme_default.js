import "typeface-ubuntu";

const colorTheme = {
  map: {
    background:{
   // color: 'rgba(12,60,12,1)',
    color: 'rgba(36, 60, 124, 1)'
      //color: '#0A1931'
    },
    route:{
      //lineColor: 'red',
      //lineColor: '#ff2a6d',
      lineColor: '#860029',
      lineWidth:3,
      lineOpacity: 1
    },
    routeProgress:{
      lineColor: 'rgb(57,239,253)',
      lineWidth:6,
      lineOpacity: 1
    },
    countryGeojson:{
      fillColor: '#01012b',
      //fillColor: '#243C7C',
      fillOpacity: 0.6,
      //lineColor: 'rgba(200,0,0,0.6)',
      lineColor: '#120458',
      lineWidth:1,
      lineOpacity:0.5
    },
    cityLabels:{
      textColor:'#fdfdfd',
      textSize:22,
      textHaloColor:'rgba(0,0,0,0.6)',
      textHaloWidth:2,
    },
    highway: {
      color: '#d1f7ff',
      opacity: 0.15,
    },
    water: {
      color: '#d1f7ff',
      opacity: 1,
    },
  },
  classes: {
    progressLabel: {
      fontWeight: "bold",
      fontSize: "1rem",
      opacity: 0.8,
      //color: '#222222'
      //color: "rgba(36, 60, 124, 1)"
      color:"#c73f67"
    },
    progressLarge: {
      fontSize: "1.4rem",
      //color: '#222222'
      color: "rgba(36, 60, 124, 1)"
    },
    progressSmall:{
      fontSize: "1.3rem",
      color: "rgba(36, 60, 124, 1)"
    },
    participantName: {
      fontWeight: "bold",
      fontSize: "1.1rem",
      color: "rgba(36, 60, 124, 1)"
    },
    participantPerformance: {
      fontSize: "1.1rem",
      //fontWeight: "bold",
      color: "rgba(36, 60, 124, 0.7)"
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: "10px",
      },
    },
  },
  typography: {
    fontFamily: "Ubuntu",
    h3: {
      fontWeight: "300",
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "2.0rem",
      },
    },
    h2: {
      fontWeight: "300",
      fontSize: "2.3rem",
      "@media (min-width:600px)": {
        fontSize: "3.5rem",
      },
    },
    h5: {
      fontSize: "1.0rem",
      "@media (min-width:600px)": {
        fontSize: "1.3rem",
      },
    },
  },
};

export default colorTheme;
