import React, { useEffect, useState, useContext } from "react";
import { MlTransitionGeoJsonLayer } from "@mapcomponents/react-maplibre";
import * as turf from "@turf/turf";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useTheme } from "@material-ui/core/styles";
import { AppContext } from "./AppContext";

import List from "@material-ui/core/List";
import LeaderboardEntry from "./LeaderboardEntry";

const usersPerPage = 8;

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [displayLeaders, setDisplayLeaders] = useState([]);
  const [individualProgress, setIndividualProgress] = useState({});
  const [selectedProgress, setSelectedProgress] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState(false);
  const appContext = useContext(AppContext);

  const theme = useTheme();

  useEffect(() => {
    let tmpUsers = [...appContext.users];
    for (var i = 0, len = appContext.users.length; i < len; i++) {
      tmpUsers[i].distance = 0;
      if (typeof appContext.progressDataByUser[tmpUsers[i].id] !== "undefined") {
        tmpUsers[i].distance = appContext.progressDataByUser[tmpUsers[i].id];
      }
    }

    tmpUsers.sort((a, b) => {
      if (a.distance > b.distance) {
        return -1;
      }
      if (a.distance < b.distance) {
        return 1;
      }
      return 0;
    });

    setLeaders(tmpUsers);
  }, [appContext.users, appContext.progressDataByUser]);

  useEffect(() => {
    setDisplayLeaders(
      leaders.slice(
        currentPage * usersPerPage,
        currentPage * usersPerPage + usersPerPage
      )
    );
  }, [leaders, currentPage]);

  useEffect(() => {
    if (typeof selectedUser.distance !== "undefined" && selectedUser.distance > 0) {
      let tmpRouteProgess = turf.lineChunk(appContext.route, selectedUser.distance);
      if (typeof tmpRouteProgess.features[0] !== "undefined") {
        setSelectedProgress(tmpRouteProgess.features[0]);
      }
    }
  }, [selectedUser, appContext.route]);

  const showIndividualProgress = (distance) => {
    if (distance > 0) {
      let tmpRouteProgess = turf.lineChunk(appContext.route, distance);
      if (typeof tmpRouteProgess.features[0] !== "undefined") {
        setIndividualProgress(tmpRouteProgess.features[0]);
      }
    }
  };

  return (
    <>
      <div key="navbuttonsdiv" className="navigation">
        <ButtonGroup
          variant="contained"
          color="secondary"
          aria-label="contained primary button group"
          key="ButtonGroup"
        >
          <Button
            size="small"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            key="backButton"
          >
            {"<<"}
          </Button>
          <Button size="small"
            key="displayButton"
            disabled={true}>
            {currentPage + 1}
          </Button>
          <Button
            size="small"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={(currentPage + 1) * usersPerPage >= leaders.length}
            key="nextButton"
          >
            {">>"}
          </Button>
        </ButtonGroup>
      </div>
      <List
 key="leaderboardList"
      >
        {displayLeaders.map((data, idx) => (
          <React.Fragment key={data.username}>
            <LeaderboardEntry
              //onMouseOver={() => showIndividualProgress(data.distance)}
              //onMouseLeave={() => setIndividualProgress(false)}
              onClick={() => setSelectedUser(data)}
              selectedUser={selectedUser}
              key={"lb_" + data.username + idx}
              data={data}
              position={1 + idx + usersPerPage * currentPage}
            />
            {((idx === 0 ) || idx % (usersPerPage - 1) !== 0) && (
              <hr key={"lb_" + data.username + idx + '_hr'} style={{ border: "1px solid " + theme.palette.chart.gridColor,padding: 0, margin: "0 0 0 5%", width: "90%" }} />
            )}
          </React.Fragment>
        ))}
      </List>
      {selectedUser && typeof selectedProgress.geometry !== 'undefined' && (
        <MlTransitionGeoJsonLayer
          geojson={selectedProgress}
          paint={{
            "line-color": '#ffc107',
            "line-width": 6,
          }}
          type="line"
          key="selectedUserProgressLayer"
          transitionTime={1500}
          insertBeforeLayer={"routeProgressMarker"}
        />
      )}
      {false && individualProgress && typeof individualProgress.geometry !== 'undefined' && (
        <MlTransitionGeoJsonLayer
          geojson={individualProgress}
          paint={{
            "line-color": theme.palette.error.dark,
            "line-width": 6,
          }}
          type="line"
          key="individualProgressLayer"
          transitionTime={1500}
          insertBeforeLayer={"routeProgressMarker"}
        />
      )}
    </>
  );
}

export default Leaderboard;
