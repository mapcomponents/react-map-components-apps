import { useCallback, useEffect, useState, useContext } from "react";

import Grid from "@mui/material/Grid";

import makeStyles from "@mui/styles/makeStyles";
import theme from "../../theme.js";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

import TextField from "@mui/material/TextField";
import AppContext from "../../AppContext.js";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: "40px",
    margin: "10px",
  },
  iconTitle: {
    width: "40px",
    margin: "10px",
    marginTop: "0px",
    marginBottom: "0px",
  },
  iconbutton: {
    padding: "0px !important",
  },
}));

function WmsLoader(props) {
  const classes = useStyles(theme);

  const appContext = useContext(AppContext);

  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usingBasicAuth, setUsingBasicAuth] = useState(false);

  const handleClick = useCallback((el, username, password) => {
    let newState = appContext.includedWms.slice();
    newState.push({ url: el, username: username, password: password });
    appContext.setIncludedWms(newState);
    setText("");
    setUsername("");
    setPassword("");
    /*
    appContext.setwmsOrGeoJSONVisible({
      ...appContext.wmsOrGeoJSONVisible,
      [el + "?"]: true,
    });
    */
  });

  return (
    <div style={{ width: "300px" }}>
      <Grid
        container
        style={{
          textAlign: "left",
          alignItems: "center",
        }}
      >
        <AddPhotoAlternateOutlinedIcon className={classes.iconTitle} />

        <h4 style={{ margin: "0px" }}>WMS Loader</h4>
      </Grid>

      <Box m={2} style={{ textAlign: "left" }}>
        <TextField
          onChange={(e) => {
            setText(e.target.value);
          }}
          style={{ marginBottom: "20px" }}
          fullWidth
          label="URL eingeben"
          variant="standard"
          value={text}
        ></TextField>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={usingBasicAuth}
                onChange={() => setUsingBasicAuth(!usingBasicAuth)}
              />
            }
            label="Basic Auth"
          />
        </FormGroup>

        {usingBasicAuth && (
          <>
            <TextField
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              style={{ marginBottom: "20px" }}
              fullWidth
              label="Nutzername"
              variant="standard"
              value={username}
            ></TextField>

            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              style={{ marginBottom: "20px" }}
              fullWidth
              label="Passwort"
              variant="standard"
              type="password"
              value={password}
            ></TextField>
          </>
        )}

        <Button
          variant="contained"
          disableElevation
          style={{
            backgroundColor: theme.palette.blue,
            marginTop: "20px",
            color: "white",
            float: "right",
            marginBottom: "20px",
          }}
          onClick={() => {
            handleClick(text, username, password);
          }}
        >
          Einbinden
        </Button>
      </Box>
    </div>
  );
}

export default WmsLoader;
