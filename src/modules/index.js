import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/upload" activeStyle>
            Upload
          </NavLink>
          <NavLink to="/csv" activeStyle>
            CSV
          </NavLink>
          <NavLink to="/dashboars" activeStyle>
            Dashboards
          </NavLink>
          
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;