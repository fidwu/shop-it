import '../App.css';
import React from 'react';

// Icons
import { BsPlusCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FiPrinter } from "react-icons/fi";

const ActionBtn = (props) => {

  return (
    <div>
      <button onClick={props.addClicked}>
        <BsPlusCircle size={30} />
      </button>
      <button onClick={props.deleteClicked}>
        <MdDelete size={30} />
      </button>
      <button onClick={() => window.print()}>
        <FiPrinter size={30} />
      </button>
    </div>
  )

}



export default ActionBtn;
