import React, { useContext, useState } from "react";
import { AppContext } from "./AppContext";

import DistanceEntryForm from "./DistanceEntryForm";
import LoginForm from "./LoginForm";
import {
  Button,
  Grid,
  FormControlLabel,
  Switch,
  Dialog,
  Avatar,
  Chip,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

function Header() {
  const appContext = useContext(AppContext);
  const theme = useTheme();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showDistanceEntryForm, setShowDistanceEntryForm] = useState(false);

  return (
    <Grid container>
      <Grid xs={6} item>
        <img
          src={"/assets/wheregroup-logo-icon.svg"}
          style={{
            maxWidth: "38px",
            float: "left",
            marginRight: "10px",
          }}
          alt=""
        />
        <h1 style={{ fontWeight: 'normal',margin: 0, padding: 0, fontSize: "1.8em", lineHeight: "1.8em", color: theme.palette.text.primary }}>running contest</h1>
      </Grid>
      <Grid xs={6} item style={{ display: "flex", alignItems:'center', justifyContent: "flex-end" }}>
        <FormControlLabel
          style={{ marginBottom: 0, color: theme.palette.text.primary }}
          labelPlacement="start"
          control={
            <Switch
              checked={appContext.darkMode}
              onChange={() => {
                appContext.setDarkMode(!appContext.darkMode);
              }}
              name="dark_mode_switch"
            />
          }
          label="Dark Mode"
        />
        {/**
          appContext.loggedIn || (
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                window.open('/backend', '_blank').focus();
              }}
            >
              Registrieren
            </Button>
            )
            */}
        {appContext.user && appContext.loggedIn && (
          <>
            {/*
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setShowDistanceEntryForm(!showDistanceEntryForm);
              }}
            >
              Neuer Eintrag
            </Button>
            */}
            <a href="/backend">
              <Dialog
                fullScreen={false}
                open={showDistanceEntryForm}
                onClose={() => {
                  setShowDistanceEntryForm(false);
                }}
                aria-labelledby="responsive-dialog-title"
              >
                <DistanceEntryForm />
              </Dialog>

              <Chip
                variant="outlined"
                size="medium"
                color="primary"
                style={{marginLeft: "10px",padding:'2px', fontSize:'0.875rem', fontWeight:'500',}}
                avatar={
                  <Avatar
                    alt={appContext.user.name}
                    style={{}}
                    src={
                      appContext.user.avatar_url ||
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAAAAAAdJSU2AAACNElEQVR4AdXYBa7jMBCA4b3/JZahzIkjp2qt+BWUWnG5ln2XxaJJb2b5F2ukL4wvzK/rP7bUcbf92u6oftLSe1ldk8efsfaVeEjusZZeC6e1RllaCk/yG6ag1lZ4WwPX69uyD6tAe/g2ipAlNMRS37awDLaFrpcMWxXQOi0jnWCWjFkSZomYJWDWKmatYNZyEWkJsvQimoZYah5NgdaLxagCtF6GRy0DshZPkeYwS/KIJWGWYjwYUzDLxCwDtJ54OKglimBLqHWahii2g1pmHLLGBmwVoRjcKlmgOdw65H5qKuGWCVi5Qlhs6m1sENZi4q3AWNvca5UYy2RjT/SAsiZey6CsIvc0wVlV5lJ0ibPMyLUGCmlxQq0IM0hLdWyro7CWEc3sXsqaK4O2zLxOsmtpfW5Q1u68ZrVmepaaNXEewawtI9X5Xl3U3n1qND6+rfPzvqoIWz/fklNCSLY153YV53J/XUxGCJnKZ1lajsn3/Ffegf6Y5pV2LUsSNL2UHzxUfh3TlYpZqqTpXZm0KZk9zJcqaEmaWPHDw0pxe05K7bWOLHFLWXVetqpYmrjle4+1y0aBaF4UOQ1NU+lYezJClkjLUnSEjqhH6zjAW4OjtY39Ibq+sawUb6W2RQfoqG0VeKuwrRJvlba17faRdbe2pTtYq6Nty/S7yAbGsQjWIq41wVoT1+IdZNy1djUcVdu5lklQWC0xHkt1X31qNEE1Pr3qKv/9XiSNj6Aaifj3/69+AYujsR/MvkpZAAAAAElFTkSuQmCC"
                    }
                  />
                }
                label={appContext.user.name}
              />
            </a>
          </>
        )}
        {false && (
          <>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setShowLoginForm(!showLoginForm);
              }}
            >
              Login
            </Button>
            <Dialog
              fullScreen={false}
              open={showLoginForm}
              onClose={() => {
                setShowLoginForm(false);
              }}
              aria-labelledby="responsive-dialog-title"
            >
              <LoginForm />
            </Dialog>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default Header;
