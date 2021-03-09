import '../App.css';

import Form from "react-bootstrap/Form";
import { MdEdit } from "react-icons/md";

const Item = (props) => {

  return (

    <div className="item">
      <Form.Check
        type="checkbox"
        id="checkbox"
        aria-label="checkbox"
        onChange={props.handleCheckMark}
      />
      <div className="info" style={{ display: 'block' }}>
        <div className="itemInfo misc">{props.col2}</div>
        <div className="productQuantity">
          <div className="itemInfo product">{props.product}</div>
          <div className="itemInfo dashed"></div>
          <div className="itemInfo quantity">{props.quantity}</div>
        </div>
      </div>
      <div className="itemInfo edit">
        <MdEdit size={25} onClick={props.handleEdit} />
      </div>
    </div>
  )
}

// export default DisplayShopping;
export default Item;
