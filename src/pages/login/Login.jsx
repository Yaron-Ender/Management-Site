import { useState } from "react";
import { useLogin } from '../../hooks/useLogin'
const Login = () => {
const { login,isPending,error }=useLogin()
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const handleSubmit=async (e)=>{
 e.preventDefault();
 await login(email,password)
 if(!error){
    setEmail('');
    setPassword('');
 }
 }
 return (
   <form onSubmit={handleSubmit} className="auth-form">
     <h2>Lgoin</h2>
     <label>
       <span>email:</span>
       <input
         required
         type="email"
         onChange={(e) => setEmail(e.target.value)}
         value={email}
       />
     </label>
     <label>
       <span>password:</span>
       <input
         required
         type="password"
         onChange={(e) => setPassword(e.target.value)}
         value={password}
       />
     </label>
     {!isPending && <button className="btn">Login</button>}
     {isPending && (
       <button className="btn" disabled>
         Loading...
       </button>
     )}
     {error && <div className="error">{error}</div>}
   </form>
 );
};

export default Login;