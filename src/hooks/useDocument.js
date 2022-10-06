import { useEffect,useState } from "react"
import { db } from '../firebase/config';
import { doc,collection,onSnapshot,getDoc } from "firebase/firestore";
export const useDocument =(_collection,id)=>{
 const [document, setDocument] = useState(null);
 const [error, setError] = useState(null);
 //listen to real-time data
 useEffect(()=>{
  const colRef=collection(db,_collection)
  const docRef=doc(colRef,id)
const unsub = onSnapshot(docRef,(snapshot)=>{
  if(snapshot.data()){
  setDocument({ ...snapshot.data(),id:snapshot.id});
  setError(null)
  }else{
    setError('no such documrnt exsist')
  }
},(err)=>{
    console.log(err.message)
setError('failed to get document')
})
return ()=>unsub()
 },[_collection,id])
 return{document,error}
}