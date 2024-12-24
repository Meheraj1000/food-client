import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { authContext } from './AutProvider';

const NavBar = () => {
  const{user,handeLogout}=useContext(authContext)
   const link=<>
    <li>
                <NavLink to="/" activeClassName="active">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/available-foods" activeClassName="active">
                    Available Foods
                </NavLink>
            </li>
            <li>
                <NavLink to="/add-food" activeClassName="active">
                    Add Food
                </NavLink>
            </li>
            <li>
                <NavLink to="/manage-foods" activeClassName="active">
                    Manage My Foods
                </NavLink>
            </li>
            <li>
                <NavLink to="/my-requests" activeClassName="active">
                    My Food Requests
                </NavLink>
            </li>
    </>
    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {link}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Food Sharing</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {link}
    </ul>
  </div>
  <div className="navbar-end">
  {user?.email ? (
                    <div className="flex justify-center items-center gap-3">
                        <div><img className="w-7 h-7 rounded-full" src={user.photoURL} alt="" /></div>
                        <button onClick={handeLogout} className="btn">LogOut</button>
                    </div>) :
                    (<NavLink to='/login'><button className="btn btn-sm">Login Now</button></NavLink>)}
  </div>
</div>
    );
};

export default NavBar;