import React, { useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {logoutUser} from '../actionCreators/profile';
import {useHistory} from 'react-router-dom';
import { Navbar, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { BsPeopleCircle } from "react-icons/bs";

const NavBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { user, isLoggedIn } = useSelector(store => store);
    const handleLogout = evt => {
        evt.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        dispatch(logoutUser());
        history.push("/");
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
  

    return (
        
        <Navbar className="NavBar">
            { isLoggedIn ? 
            <div>
            <div>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret outline color="primary"><BsPeopleCircle size={20} /> Menu</DropdownToggle>
                    <DropdownMenu>
                    <Link to={`/new`}><DropdownItem> New Recipe </DropdownItem></Link>
                        <Link to={`/${user.username}/recipes`}><DropdownItem>Your Recipes</DropdownItem></Link> 
                        <Link to={`/${user.username}/cookbook`}><DropdownItem>Your Cookbook</DropdownItem></Link>
                        <Link to={`/${user.username}/profile`}><DropdownItem>Your Profile</DropdownItem></Link> 
                        { user.is_admin 
                        ?
                        <Link to={"/tags/new"}><DropdownItem> Add Category</DropdownItem></Link>
                        :
                        <> </> }
                        <DropdownItem onClick={handleLogout}>Logout </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            </div>
            :      
            <>
            <div> 
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret outline color="primary"><BsPeopleCircle size={20} /> Menu</DropdownToggle>
                    <DropdownMenu>
                    <Link to="/login"><DropdownItem> Login</DropdownItem></Link>
                    <Link to="/register"><DropdownItem>Register</DropdownItem></Link>
                    </DropdownMenu>
            </Dropdown>
            </div>
            </>
                    }
                                <span className="Logo"><Link to="/">Recipe Club</Link></span>
        </Navbar>
        
    )


}

export default NavBar;