
import './App.scss';
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashbord/Dashboard';
import Create from './pages/create/Create'
import Project from './pages/project/Project'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
function App() {


  return (
    <div className="App">
      <Sidebar />
      <div className='container'>
      <Navbar />
<Routes>
  <Route path='/' element={<Dashboard />} />
    <Route path='create' element={<Create />} />
    <Route path='projects/:id' element={<Project />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
 
</Routes>
      </div>

    </div>
  );
}

export default App;