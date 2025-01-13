import React from 'react'
import AuthForm from '../components/AuthForm'

function Login() {
  return (
    <div>
      <AuthForm route="user/login/" method="login" />
      
    </div>
  )
}

export default Login