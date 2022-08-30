import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseSetup";
import { useAuthContext } from "./useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email,passord) => {
    setError(null);
    setIsPending(true);
    
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, passord);
      if (user) {
        //dispatch login
        dispatch({ type: "LOGIN", payload: user });
      }

      //update state
   setIsPending(false);
   setError(null);

      // if (!isCancelled) {
      //  setIsPending(false);
      // setError(null);
      // }
    } catch (err) {
      console.log(err.message);
       setError(err.message);
       setIsPending(false);
      // if (!isCancelled) {
      //   setError(err.message);
      //   setIsPending(false);
      // }
    }
  };
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  return { error, isPending, login };
};
