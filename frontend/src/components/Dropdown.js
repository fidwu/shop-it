import '../App.css';
import React from 'react';

// Bootstrap
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const CategoryDropdown = (props) => {

  return (
    <DropdownButton id="dropdown-item-button" title={props.dropdownTitle}>
      <Dropdown.Item onClick={props.handleSelect}>All Categories</Dropdown.Item>
      <Dropdown.Item onClick={props.handleSelect}>Fridge</Dropdown.Item>
      <Dropdown.Item onClick={props.handleSelect}>Freezer</Dropdown.Item>
      <Dropdown.Item onClick={props.handleSelect}>Pantry</Dropdown.Item>
    </DropdownButton>
  )

}



export default CategoryDropdown;
