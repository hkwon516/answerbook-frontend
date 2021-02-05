import { Avatar, colors, Box } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import getTheme from "../../utils/theme";
const ProfilePicture = (props) => {
  const cameraRef = useRef();
  const [profilePicture, setProfilePicture] = useState(undefined);
  useEffect(() => {
    if (props.value) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };

      reader.readAsDataURL(props.value);
    }
  }, [props.value]);
  
  return (
    <Box style={{ position: "relative" }}>
      <input
        style={{ display: "none" }}
        type="file"
        accept="image/*;capture=camera"
        capture="camera"
        ref={cameraRef}
        multiple={false}
        onChange={(e) => {
          if (e.target && e.target.files && e.target.files[0]) {
            props.setValue(e.target.files[0]);
          }
        }}
        name="profilePicture"
      />
      <Avatar
        src={ profilePicture || props.src}
        onClick={() => {
          if (cameraRef && props.setValue) {
            cameraRef.current.click();
          }
        }}
        style={{
          background: props.setValue ? getTheme().palette.secondary.main : getTheme().palette.secondary.dark,
          cursor: "pointer",
          width: 120,
          height: 120,
          margin: "0 auto",
        }}
      >
        {!profilePicture && <AccountCircleIcon style={{ fontSize: 120 }} />}
      </Avatar>
      {props.setValue && <AddCircleIcon color="primary" style={{ position: "absolute", bottom: 8, right: 8 }} />}
    </Box>
  );
};

export default ProfilePicture;
