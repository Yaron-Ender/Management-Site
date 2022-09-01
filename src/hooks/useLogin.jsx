import { useEffect, useState } from "react";
import { auth,db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc,updateDoc } from "firebase/firestore";
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
        //update the online property in the users document
       const docReff = doc(db,'users',user.uid)
       await updateDoc(docReff,{online:true})
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
