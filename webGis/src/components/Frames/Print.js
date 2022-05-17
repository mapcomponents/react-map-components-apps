import { useEffect, useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

import makeStyles from "@mui/styles/makeStyles";
import theme from "../../theme.js";

import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import MlCreatePdfButton from "./MlCreatePdfButton/MlCreatePdfButton";

import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";

import TextField from "@mui/material/TextField";

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
    color: theme.palette.white,
  },
  iconbutton: {
    padding: "0px !important",
  },
}));

function Print(props) {
  const classes = useStyles(theme);

  return (
    <div style={{ width: "300px" }}>
      <Grid
        container
        style={{
          textAlign: "left",
          alignItems: "center",
        }}
      >
        <LocalPrintshopOutlinedIcon className={classes.iconTitle} />

        <h4 style={{ margin: "0px", color: theme.palette.white }}>Drucken</h4>
      </Grid>

      <Box m={2} style={{ textAlign: "left", color: theme.palette.white }}>
        {/*<FormControl
          fullWidth
          variant="standard"
          style={{ marginBottom: "20px" }}
        >
          <InputLabel id="select-label-1">Vorlage</InputLabel>
          <Select
            labelId="select-label-1"
            MenuProps={{
              style: { zIndex: "2001" },
            }}
            label="Vorlage"
            style={
              {
                //backgroundColor: theme.palette.green,
              }
            }
          >
            <MenuItem value={10}>nicht implementiert</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          variant="standard"
          style={{ marginBottom: "20px" }}
        >
          <InputLabel id="select-label-1">Qualität</InputLabel>
          <Select
            labelId="select-label-1"
            MenuProps={{
              style: { zIndex: "2001" },
            }}
            label="Vorlage"
            style={
              {
                //backgroundColor: theme.palette.green,
              }
            }
          >
            <MenuItem value={10}>nicht implementiert</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          variant="standard"
          style={{ marginBottom: "20px" }}
        >
          <InputLabel id="select-label-1">Vorlage</InputLabel>
            <Select
            labelId="select-label-1"
            MenuProps={{
            style: {zIndex: "2001"},
          }}
            label="Vorlage"
            style={
          {
            //backgroundColor: theme.palette.green,
          }
          }
            >
            <MenuItem value={10}>nicht implementiert</MenuItem>
            </Select>
            </FormControl>

            <FormControl
            fullWidth
            variant="standard"
            style={{marginBottom: "20px"}}
            >
            <InputLabel id="select-label-1">Drehung</InputLabel>
            <Select
            labelId="select-label-1"
            MenuProps={{
            style: {zIndex: "2001"},
          }}
            label="Vorlage"
            style={
          {
            //backgroundColor: theme.palette.green,
          }
          }
            >
            <MenuItem value={10}>nicht implementiert</MenuItem>
            </Select>
            </FormControl>

            <FormControl
            fullWidth
            variant="standard"
            style={{marginBottom: "20px"}}
            >
            <TextField id="standard-basic" label="Titel" variant="standard" />
            </FormControl>

            <FormGroup>
            <FormControlLabel
            control={<Checkbox style={{color: theme.palette.white}} />}
            label="Legende drucken"
            />
            </FormGroup>*/}

        <MlCreatePdfButton></MlCreatePdfButton>
      </Box>
    </div>
  );
}

export default Print;
