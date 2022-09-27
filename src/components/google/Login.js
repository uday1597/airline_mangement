import { Facebook, Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { GoogleLogin } from "react-google-login";
// refresh token
import { refreshTokenSetup } from "./utils/refreshToken";
import ToastServive from "react-material-toast";
import FacebookLogin from "react-facebook-login";

const clientId =
  "954386533802-s3eo21kbiqmb9ktoe6snsv66nv6cdedj.apps.googleusercontent.com";

function Login() {
  const toast = ToastServive.new({
    place: "topRight",
    duration: 5,
    maxCount: 8,
  });
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    toast.info(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    toast.info(`Failed to login. 😢`);
  };
  const customStyle = {
    width: 275,
    height: 50,
    backGroundColor: "white",
    fontSize: 16,
    fontWeight: 700,
    paddingBlock: "35px",
  };
  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        render={(renderProps) => (
          <Button
            variant="contained"
            color="secondary"
            onClick={renderProps.onClick}
            style={customStyle}
          >
            <Google />
            &nbsp; Login with google
          </Button>
        )}
      />
      <br />
      <br />
      <FacebookLogin
        appId="1088597931155576"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        icon={<Facebook />}
        buttonStyle={{
          width: 275,
          height: 50,
          borderRadius: "5px",
          paddingBottom: "50px",
        }}
      />
    </div>
  );
}

export default Login;
