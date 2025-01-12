import React from "react";
import AuthForm from "../components/AuthForm";

function Register() {
  return (
    <div>
      <AuthForm route="user/create/" method="register" />
    </div>
  );
}

export default Register;
