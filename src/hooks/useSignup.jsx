
import { db,auth,storage } from '../firebase/config'
import { useState,useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
 updateProfile
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc,setDoc,getDoc } from 'firebase/firestore';
import { useAuthContext } from './useAuthContext';


export const useSignup = () => {
const [isCancelled, setIsCancelled] = useState(false);
const [error,setError] = useState(null);
const [isPending,setIsPending] = useState(false);
const { dispatch } = useAuthContext()
const signup =async (email,password,displayName,thumbnail)=>{
  setError(null)
  setIsPending(true)
  try{
   const { user } = await createUserWithEmailAndPassword(auth, email, password);
   if (!user) {
     throw new Error("could not complete sinup");
    }
  // uplaod user thumbnail to storage
  const uploadPath =`thumbnail/${user.uid}/${thumbnail.name}`
  const path = ref(storage,uploadPath);
  const img =await uploadBytes(path,thumbnail)
   const photoURL = await getDownloadURL(path);
  await updateProfile(user, { displayName, photoURL });
  //create a user document in firestore
  const docReff = doc(db,'users',user.uid);
  const userDoc =await getDoc(docReff);
  if(!userDoc.exists()){
    setDoc(docReff,{online:true,photoURL,displayName,id:user.uid})
  }

  //dispatch login action
    dispatch({ type: "LOGIN", payload: user });
    
    //update state
      setIsPending(false);
      setError(null);

  //   if (!isCancelled) {
  //     setIsPending(false);
  //     setError(null);
  //  }
 }catch(err){
   //update state
   console.log(err.message,);
    setIsPending(false);
    setError(err.message);
//    if (!isCancelled) {
//      console.log(err.message);
//      setIsPending(false);
//      setError(null);
//    }
 }
}
//cleaup function
useEffect(() => {
  return () =>setIsCancelled(true)
}, []);
return { error,isPending,signup }
};

