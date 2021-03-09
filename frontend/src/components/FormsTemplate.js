import '../App.css';
import '../forms.css';
import React from 'react';

import { IoCloseSharp } from "react-icons/io5";
import { Form, Button } from "react-bootstrap";


const Forms = (props) => {

  return (
    <div className="popup_bg">
      <div className="popup_info">

        <i><IoCloseSharp size={30} onClick={props.closeForm} className="closeIcon" /></i>

        <h2 style={{ textAlign: 'center' }}>Add An Item</h2>

        <form onSubmit={props.submit} className="itemForm">

          <div className="formGrid">

            <Form.Label>
              Product:<span aria-hidden="true" className="required" style={{ color: 'red' }}> *</span>
            </Form.Label>
            <Form.Control name="product" className="form_input" value={props.product} onChange={props.onChange} />

            <Form.Label>
              Category: <span aria-hidden="true" className="required" style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control as="select" name="category" className="form_input" value={props.category} onChange={props.onChange}>
              <option value="Fridge">Fridge</option>
              <option value="Freezer">Freezer</option>
              <option value="Pantry">Pantry</option>
            </Form.Control>

            <Form.Label>
              Quantity:<span aria-hidden="true" className="required" style={{ color: 'red' }}> *</span>
            </Form.Label>
            <Form.Control type="number" name="quantity" className="form_input" value={props.quantity} onChange={props.onChange} />

            {props.formInput}

          </div>

          <div className="errorMsg">
            {props.errorMsg}
          </div>

          <Button type="submit" variant="default" className="submitBtn">
            Submit
          </Button>


        </form>

      </div>
    </div>

  );

}

export default Forms;
