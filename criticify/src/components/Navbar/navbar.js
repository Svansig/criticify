import React, { useState } from "react";
import { Collapse, NavbarBrand, Navbar, Nav, NavItem } from "reactstrap";
import Player from "../Player/player";

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="blue" blue expand="md">
      <NavbarBrand href="/">Criticify</NavbarBrand>
      <Nav onClick={toggle}>
        <NavItem>ENVOXE</NavItem>
        <Collapse isOpen={isOpen}>
          <NavItem>
            <Player />
          </NavItem>
        </Collapse>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
