import home from '../assets/home.svg';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const { logout,isPending } =useLogout()
    return (
        <div className='navbar'>
         <ul>
        <li className='logo'>
       <img src={home} alt="logo" />
       <span>welcome</span>
        </li>
        <li>
        <NavLink to='/login'>Login</NavLink>
        </li>
        <li>
        <NavLink to='/signup'>Signup</NavLink>
        </li>
        <li>
        {!isPending &&<button className='btn' onClick={logout} >signout</button>}
        {isPending &&<button className='btn' disabled >Logging out...</button>}
            </li>
        </ul>   
        </div>
    );
};

export default Navbar;