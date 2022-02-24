import React, { useContext } from "react";

import { useTheme } from "@material-ui/core/styles";
import { AppContext } from "./AppContext";
import { Grid, Paper, Typography } from "@material-ui/core";

function StatsBlock({ label, progress }) {
  const theme = useTheme();

  return (
    <Grid item xs={6}>
      <Paper elevation={1}>
        <Typography style={theme.classes.progressLabel}>{label}</Typography>
        <Typography style={theme.classes.progressSmall}>
          {String(parseFloat(progress).toFixed(2)).replace(".", ",")} km / pP
        </Typography>
      </Paper>
    </Grid>
  );
}

function StatsSidebar() {
  const appContext = useContext(AppContext);
  const theme = useTheme();

  return (
    <>
      <Grid container spacing={2} style={{ flexDirection: "row", flex: 1 }}>
        <Grid item xs={12}>
          <Paper elevation={1}>
            <Typography style={theme.classes.progressLabel}>Anzeigedatum:</Typography>
            <Typography style={theme.classes.progressLarge}>
              {(appContext.displayDate ? new Date(appContext.displayDate):new Date()).toLocaleDateString("de-DE", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={1}>
            <Typography style={theme.classes.progressLabel}>Gelaufene Kilometer:</Typography>
            <Typography style={theme.classes.progressLarge}>
              {(appContext.routeProgressInKm || 0).toLocaleString('de-DE')} km
              {" "}
              <span style={theme.classes.progressSmall}>
                von {appContext.routeTotalKm.toLocaleString('de-DE')} km
              </span>
            </Typography>
          </Paper>
        </Grid>
        <StatsBlock
          label="Team Bonn:"
          progress={appContext.meanTeamProgress.Bonn || 0}
        />
        <StatsBlock
          label="Team Berlin:"
          progress={appContext.meanTeamProgress.Berlin || 0}
        />
        <StatsBlock
          label="Team Freiburg:"
          progress={appContext.meanTeamProgress.Freiburg || 0}
        />
        <StatsBlock
          label="Hamburg:"
          progress={appContext.meanTeamProgress.Hamburg || 0}
        />
      </Grid>
    </>
  );
}

export default StatsSidebar;
