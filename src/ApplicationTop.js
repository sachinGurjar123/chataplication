import React from "react";
import {
  TopBoxes,
  TopLeftBox,
  TopRightTBox,
  TopRightLeftBox,
  TopRightRightRtBox,
} from "./style";
import Avatar from "@mui/material/Avatar";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import SearchIcon from "@material-ui/icons/Search";
import VideocamTwoToneIcon from "@mui/icons-material/VideocamTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import { FormControl, InputAdornment, TextField } from "@material-ui/core";

const ApplicationTop = (props) => {
  const { firstName, lastName } = props;
  // console.log(firstName);
  const topRightTBox = () => {
    return (
      <>
        <TopRightLeftBox>
          <Avatar sx={{ backgroundColor: "#9f78fa", marginLeft: "5px" }}>
            {firstName.match(/\b(\w)/g)}
            {lastName.match(/\b(\w)/g)}
          </Avatar>
          <span>
            <span style={{ marginLeft: "15px" }}>{firstName}</span>
            <br />
            <span
              style={{ marginLeft: "15px", color: "gray", fontSize: "15px" }}
            >
              {lastName}
            </span>
          </span>
        </TopRightLeftBox>
        <TopRightRightRtBox>
          {/* <LocalPhoneTwoToneIcon sx={{ m: 0.6 }} />
          <VideocamTwoToneIcon sx={{ m: 0.6 }} />
          <SearchTwoToneIcon sx={{ m: 0.6 }} />
          <MoreVertTwoToneIcon sx={{ m: 0.6 }} /> */}
        </TopRightRightRtBox>
      </>
    );
  };
  return (
    <TopBoxes>
      <TopLeftBox>
        {/* <Avatar
          alt="Remy Sharp"
          src="https://demos.themeselection.com/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
        /> */}
        <FormControl>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search for Contact"
            className="inputRounded"
            // onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "gray" }} />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </TopLeftBox>
      <TopRightTBox>{topRightTBox()} </TopRightTBox>
    </TopBoxes>
  );
};
export default ApplicationTop;
