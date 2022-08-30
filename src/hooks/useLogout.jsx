import { useEffect, useState } from "react" ;
import { auth,db } from '../firebase/config';
import { useAuthContext } from "./useAuthContext";
import { doc,updateDoc } from "firebase/firestore";

export const useLogout =()=>{
const [isCancelled,setIsCancelled]=useState(false)
const [error, setError] = useState(null);
const [isPending, setIsPending] = useState(false);
const { dispatch,user } = useAuthContext()

const logout = async()=>{
        setError(null)
        setIsPending(true)
    try{
    //update the the online property in user collection
     const docReff=doc(db,'users',user.uid);
     await updateDoc(docReff,{online:false})
      await auth.signOut();
      //dispatch logout
      dispatch({ type: "LOGOUT" });

      //update state
       setIsPending(false);
       setError(null)
      // if(!isCancelled){
      //  setIsPending(false);
      //  setError(null)
      // }
    }catch(err){
      console.log(err.message);
     setError(err.message)
     setIsPending(false)
      //       if(!isCancelled){
      //    setError(err.message)
      //    setIsPending(false)
      //      }
    }
}
useEffect(()=>{
    return ()=>{setIsCancelled(true)}
},[])
return { error, isPending, logout };

}