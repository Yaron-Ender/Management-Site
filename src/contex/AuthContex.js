
import { onAuthStateChanged } from "firebase/auth";
import { createContext,useEffect,useReducer} from "react";
import { auth } from "../firebase/config";
export const AuthContex =createContext();

export const authReducer = (state,action)=>{
     switch(action.type){
    case 'LOGIN':
        return {...state,user:action.payload}
    case 'LOGOUT':
        return {...state,user:null }
    case 'AUTH_IS_READY':
    return {...state,AuthIsReady:true,user:action.payload}
        default:
            return state
     }
    }
    
    export const AuthContexProvider =({children})=>{
const [state,dispatch] = useReducer(authReducer,{
    user:null,
    AuthIsReady:false
})
 useEffect(()=>{
const unsub= onAuthStateChanged(auth,(user)=>{
 dispatch({type:'AUTH_IS_READY',payload:user})
 //cleanup function
unsub()
})
},[])
console.log('Authentication state:', state)
return(
    <AuthContex.Provider value={{...state,dispatch}}>
     {children}
     </AuthContex.Provider>
    )
    
}