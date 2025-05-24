import React from "react";
import { auth, provider, signInWithPopup } from "./firebase";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={signIn}>Sign In with Google</button>
    </div>
  );
};

export default Login;
