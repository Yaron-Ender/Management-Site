import { useEffect,useState,useReducer } from "react";
import { db,Timestamp} from "../firebase/firebaseSetup";
import {doc,collection,addDoc,deleteDoc } from "firebase/firestore";


let initialState={
   document:null,
   isPending:false,
   error:null,
   success:null
}
const firestoreReducer=(state,action)=>{
switch(action.type){
 case 'IS_PENDING':
return { isPending: true, document: null, success: false,error:null};
case 'ADDED_DOCUMENT':
return {isPending:false,document:action.payload,success:true,error:null}
case 'DELETE_DOCUMENT':
return {isPending:false, document:null,success: true, error: null };
case 'ERROR':
return{...state,error:action.payload,document:null,success:false}
default:
   return state
}
}
export const useFirestore =(_collection)=>{
const [isCanceled,setIscanceled]=useState(false)
 const [response,dispatch]=useReducer(firestoreReducer,initialState)
 //collection reference
const refCol = collection(db,_collection)
// only dispatch is not cancelled **isCancelled(false)**
const dispatchisNotCalciied =(action)=>{
if(!isCanceled){
    dispatch(action)
}
}
//add document
const addDocument =async(doc)=>{
setIscanceled(false)
dispatch({type:'IS_PENDING'})
try{
   const createAt = Timestamp.fromDate(new Date())
const addDocument = await addDoc(refCol,{...doc,createAt})
 dispatchisNotCalciied({type:'ADDED_DOCUMENT',payload:addDocument})
}catch(err){
   dispatchisNotCalciied({type:'ERROR',payload:err.message})
}
}
//delete document
const deleteDocument=async(id)=>{
   dispatch({type:'IS_PENDING'})
   try{
   await deleteDoc(doc(refCol,id))
    dispatchisNotCalciied({ type: "DELETE_DOCUMENT"});

}catch(err){
 dispatchisNotCalciied({type:'ERROR',payload:err.message})
}
}
useEffect(()=>{
// return ()=>setIscanceled(true)
},[])
return{ addDocument,deleteDocument,response }
}