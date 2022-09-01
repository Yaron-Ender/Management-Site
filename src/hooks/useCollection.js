
import { useState,useEffect,useRef } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot,orderBy,query,where } from "firebase/firestore"
export const useCollection=(_collection,_queryArr,_order)=>{
  const [documents,setDocument]=useState(null)
  const [error,setError] =useState(null)
  //if we don't use a useRef --> infinite loop in useEffect
  //_queryArr is an array and is "different on every function call"
 const _query=useRef(_queryArr).current
 const orderTrans = useRef(_order).current 
  useEffect(()=>{
   let refCol = collection(db,_collection)
   if(_query){
     if(_query[2]){
      refCol = query(collection(db, _collection), where(..._query),orderBy(...orderTrans)); 
     }
   }
   const unsub = onSnapshot(refCol,(snapshot)=>{
    let result=[];
    snapshot.docs.forEach((item)=>{
        result.push({...item.data(),id:item.id})
    })
// update the state
  setDocument(result)
  setError(null) 
},(err)=>{
    setError(err.message)
    console.log(err.message)
   })
//unsubscribe function will run on unmount
return ()=>unsub()
  },[_collection,query])

return { documents,error }
}