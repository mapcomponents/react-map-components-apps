import React, { useCallback, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import * as turf from "@turf/turf";

// https://repo.wheregroup.com/api/v4/users?per_page=100&page=2&exclude_external=true&exclude_internal=true
// https://docs.gitlab.com/ee/api/users.html
// https://docs.gitlab.com/ce/api/#pagination
import route from "./route.json";
//const routeTotalKm = Math.round(turf.length(route)*10)/10;
const routeTotalKm = 1751.3;
const debug = false;
const useMercureServer = false;

const backendUrl = "";
//const backendUrl = 'http://localhost:6060';
const AppContext = React.createContext({});
const AppStateProvider = AppContext.Provider;

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [orderedDates, setOrderedDates] = useState([]);
  const [displayDate, setDisplayDate] = useState("");
  const [routeProgressInKm, setRouteProgressInKm] = useState(0);
  //const [routeTotalKm, setRouteTotalKm] = useState(0);
  const [progressDataByDate, setProgressDataByDate] = useState({});
  const [progressDataByUser, setProgressDataByUser] = useState({});
  const [routeProgressFeature, setRouteProgressFeature] = useState();
  const [rawProgressData, setRawProgressData] = useState([]);
  const [routeProgressPosition, setRouteProgressPosition] = useState(false);
  const [users, setUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [goalMarkerPosition, setGoalMarkerPosition] = useState(false);
  const meanTeamProgress = useMemo(() => {
    let displayDateDateObj = new Date(displayDate);

    let byTeam = {};
    let userIdsByTeam = {};
    for (var i = 0, len = rawProgressData.length; i < len; i++) {
      if (typeof byTeam[rawProgressData[i].team] === "undefined") {
        byTeam[rawProgressData[i].team] = 0;
        userIdsByTeam[rawProgressData[i].team] = [];
      }
      if (displayDateDateObj - new Date(rawProgressData[i].date) >= 0) {
        let distance = Math.round(rawProgressData[i].distance * 100) / 100;

        // by team
        byTeam[rawProgressData[i].team] += distance;

      }
      if (
        userIdsByTeam[rawProgressData[i].team].indexOf(
          rawProgressData[i].user_id
        ) === -1
      ) {
        userIdsByTeam[rawProgressData[i].team].push(
          rawProgressData[i].user_id
        );
      }
    }

    for (let key in byTeam) {
      byTeam[key] =
        Math.round((byTeam[key] / userIdsByTeam[key].length) * 100) / 100;
    }

    return byTeam;
  }, [displayDate, rawProgressData]);

  useEffect(() => {
    if (rawProgressData.length) {
      // process raw progress data
      let byDate = {};
      let byUser = {};
      let totalKm = 0;
      for (var i = 0, len = rawProgressData.length; i < len; i++) {
        let distance = Math.round(rawProgressData[i].distance * 100) / 100;

        totalKm += distance;

        // by date
        if (typeof byDate[rawProgressData[i].date] === "undefined") {
          byDate[rawProgressData[i].date] = 0;
        }
        byDate[rawProgressData[i].date] += distance;

        // by user
        if (typeof byUser[rawProgressData[i].user_id] === "undefined") {
          byUser[rawProgressData[i].user_id] = 0;
        }
        byUser[rawProgressData[i].user_id] += distance;
      }

      for (let key in byUser) {
        byUser[key] = Math.round(byUser[key] * 100) / 100;
      }
      for (let key in byDate) {
        byDate[key] = Math.round(byDate[key] * 100) / 100;
      }

      setRouteProgressInKm(Math.round(totalKm * 100) / 100);
      setProgressDataByDate(byDate);
      setProgressDataByUser(byUser);

      let datesArray = Object.keys(byDate);

      datesArray.sort(function (a, b) {
        return new Date(a) - new Date(b);
      });

      setOrderedDates(datesArray);
      window.orderedDates = datesArray;
    }
  }, [rawProgressData]);

  useEffect(() => {
    if (routeProgressInKm > 0) {
      let tmpRouteProgess = turf.lineChunk(route, routeProgressInKm);
      if (typeof tmpRouteProgess.features[0] !== "undefined") {
        setRouteProgressFeature(tmpRouteProgess.features[0]);
      }
    }
  }, [routeProgressInKm]);

  useEffect(() => {
    fetchUserInfo();
    fetchProgressData();
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1500);

    setGoalMarkerPosition(turf.point(turf.getCoords(route.features[0])[0][0]));

    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
    };
  }, []);

  const fetchUserInfo = () => {
    fetch(backendUrl + "/user_info", {
      mode: "cors",
      referrerPolicy: "origin-when-cross-origin",
      credentials: "include",
    })
      .then((response) => {
        if (response.status !== 200) {
          return false;
        }
        return response.json();
      })
      .then((statsData) => {
        if (statsData) {
          setLoggedIn(true);
          setUser(statsData);
        }
      });
  };

  const fetchProgressData = () => {
      fetch(backendUrl + "runningData.json")
        .then((response) => response.json())
        .then((statsData) => {
          setUsers(statsData.user);
          setRawProgressData(statsData.uploads);
        });
    if (useMercureServer) {
      // subscribe to mercure server topic providing running data
      const url = new URL('http://localhost/.well-known/mercure');
      url.searchParams.append("topic", "/stat");
      // The URL class is a convenient way to generate URLs such as https://localhost/.well-known/mercure?topic=https://example.com/books/{id}&topic=https://example.com/users/dunglas
      const eventSource = new EventSource(url, { withCredentials: false });

      // The callback will be called every time an update is published
      eventSource.onmessage = (e) => {
        console.log("New Data Event"); // do something with the payload
        let data = JSON.parse(e.data); // do something with the payload
        console.log(data);
        setUsers(data.user);
        setRawProgressData(data.uploads);
      };
    }
  };

  const calculateProgressDataByUser = useCallback(
    (_rawProgressData) => {
      let displayDateDateObj = new Date(displayDate);

      let byUser = {};
      for (var i = 0, len = _rawProgressData.length; i < len; i++) {
        if (displayDateDateObj - new Date(_rawProgressData[i].date) >= 0) {
          let distance = Math.round(_rawProgressData[i].distance * 100) / 100;

          if (typeof byUser[_rawProgressData[i].user_id] === "undefined") {
            byUser[_rawProgressData[i].user_id] = 0;
          }
          byUser[_rawProgressData[i].user_id] += distance;
        }
      }

      for (let key in byUser) {
        byUser[key] = Math.round(byUser[key] * 100) / 100;
      }

      return byUser;
    },
    [displayDate]
  );

  useEffect(() => {
    if (progressDataByDate) {
      let displayDateDateObj = new Date(displayDate);
      let totalKm = 0;
      for (var key in progressDataByDate) {
        if (displayDateDateObj - new Date(key) >= 0) {
          totalKm += progressDataByDate[key];
        }
      }

      setRouteProgressInKm(Math.round(totalKm * 100) / 100);

      setProgressDataByUser(calculateProgressDataByUser(rawProgressData));
    }
  }, [
    displayDate,
    calculateProgressDataByUser,
    rawProgressData,
    progressDataByDate,
  ]);

  const value = {
    route,
    displayDate,
    setDisplayDate: (data) => {
      //console.trace();
      setDisplayDate(data);
    },
    routeProgressInKm,
    setRouteProgressInKm,
    progressDataByDate,
    setProgressDataByDate,
    progressDataByUser,
    setProgressDataByUser,
    routeProgressFeature,
    setRouteProgressFeature,
    rawProgressData,
    setRawProgressData,
    routeProgressPosition,
    setRouteProgressPosition,
    users,
    setUsers,
    darkMode,
    setDarkMode,
    orderedDates,
    setOrderedDates,
    routeTotalKm,
    loggedIn,
    user,
    goalMarkerPosition,
    meanTeamProgress,
  };

  return <AppStateProvider value={value}>{children}</AppStateProvider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppContextProvider };
