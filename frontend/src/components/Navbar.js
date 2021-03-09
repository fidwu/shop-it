import '../App.css';
import React from 'react';
import { withRouter } from "react-router-dom";

// Icons

import { Navbar } from 'react-bootstrap';


const Header = (props) => {

  return (
    <Navbar>
      <Navbar.Brand>Shop it!</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        {props.authenticate}
      </Navbar.Collapse>
    </Navbar>
  )

}



export default withRouter(Header);
