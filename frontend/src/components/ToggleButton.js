import '../App.css';
import React from 'react';

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const ToggleDisplay = (props) => {

  return (
    <ToggleButtonGroup type="radio" name="toggleDisplay" defaultValue={1}>
      <ToggleButton variant="custom" value={1} onClick={props.inventory}>Inventory</ToggleButton>
      <ToggleButton variant="custom" value={2} onClick={props.shoppinglist}>Shopping List</ToggleButton>
    </ToggleButtonGroup>

  );

}

export default ToggleDisplay;
