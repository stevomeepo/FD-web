import React from 'react';
import * as actions from '@/actions';

export default function SignIn() {
  const handleSignIn = async () => {
    try {
      await actions.signIn();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleSignIn}>
      Sign In
    </button>
  );
}