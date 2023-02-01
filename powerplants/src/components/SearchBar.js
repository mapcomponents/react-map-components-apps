import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField, IconButton, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
const pathname = window.location.pathname;

export default function SearchBar() {
  const [searchWord, setSearchWord] = useState("");
  const [showButton, setShowButton] = useState(false);
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchWord(e.target.value);
    setShowButton(true);
  };

  useEffect(() => {
    if (searchWord.length === 0) {
      setShowButton(false);
    }
  }, [searchWord]);

  const navigate = useNavigate();

  function handleX() {
    navigate("");
    setSearchWord("");
  }

  function handleClick() {
    navigate(pathname + searchWord);
  }

  return (
    <>
      {showButton && (
        <Button variant="contained" onClick={handleX}>
          <CloseIcon style={{ color: "white" }} />
        </Button>
      )}
      <TextField
        variant="outlined"
        sx={{
          paddingRight: "4px",
          paddingLeft: "4px",
          paddingTop: "2px",
          paddingBottom: "2px",
          width: mediaIsMobile ? "40%" : "15%",
          backgroundColor: "#fff",
        }}
        size="small"
        id="input"
        value={searchWord}
        placeholder="Search..."
        onChange={handleChange}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            handleClick();
          }
        }}
      />
      <IconButton aria-label="search" type="submit" onClick={handleClick}>
        <SearchIcon style={{ color: "white" }} />
      </IconButton>
    </>
  );
}
