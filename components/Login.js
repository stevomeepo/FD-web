import React from 'react';


export default function Login() {
  const handleSignIn = async () => {
    try {
      await actions.signIn();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleSignIn}>
      Login
    </button>
  );
}