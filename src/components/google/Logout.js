import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
'954386533802-s3eo21kbiqmb9ktoe6snsv66nv6cdedj.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
