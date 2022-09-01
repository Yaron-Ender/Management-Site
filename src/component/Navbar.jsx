import home from '../assets/home.svg';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { user } = useAuthContext()
    const { logout,isPending } =useLogout()
    return (
        <div className='navbar'>
         <ul>
        <li className='logo'>
       <img src={home} alt="logo" />
       <span>welcome</span>
        </li>
        <li>
       {!user&&( <NavLink to='/login'>Login</NavLink>)}
        </li>
        <li>
        {!user&&(<NavLink to='/signup'>Signup</NavLink>)}
        </li>
        {user&&(
        <li>
        {!isPending &&<button className='btn' onClick={logout} >signout</button>}
        {isPending &&<button className='btn' disabled >Logging out...</button>}
        </li>
        )}
        </ul>   
        </div>
    );
};

export default Navbar;