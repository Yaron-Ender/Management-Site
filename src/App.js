
import './App.scss';
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './pages/dashbord/Dashboard';
import Create from './pages/create/Create'
import Project from './pages/project/Project'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import Onlineuser from './component/Onlineuser';
import { useAuthContext } from './hooks/useAuthContext';
function App() {

const { user,AuthIsReady } =useAuthContext();
  return (
    
    <div className="App">
    { AuthIsReady && 
    <>  
     {user && <Sidebar />} 
      <div className='container'>
      <Navbar />
<Routes>
  {!user&&(<Route path='/' element={<Login />} />)}
 {user&&(<Route path='/' element={<Dashboard />} />)}
    {user&&(<Route path='create' element={<Create />} />)}
    {!user&&(<Route path='create' element={<Login />} />)}
    {user&&(<Route path='projects/:id' element={<Project />} />)}
    {!user&&(<Route path='projects/:id' element={<Login />} />)}
    {!user&&(<Route path='/login' element={<Login />} />)}
    {user&&(<Route path='/login' element={<Navigate to='/' />} />)}
    {!user&&(<Route path='/signup' element={<Signup />} />)}
    {user&&(<Route path='/signup' element={<Navigate to='/' />} />)}
</Routes>
      </div>
      {user&& <Onlineuser user={user}/>}
    </>
}
    </div>
  );
}

export default App;