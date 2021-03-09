import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

// Import Pages/components and Styling
import '../App.css';
import ToggleDisplay from '../components/ToggleButton';
import CategoryDropdown from '../components/Dropdown';
import ActionBtn from '../components/ActionBtn';
import Display from '../components/Display';
import Forms from '../components/FormsTemplate';
import Item from '../components/Item';
import Header from '../components/Navbar';


var dayjs = require('dayjs');


const Main = (props) => {

  const [showPopup, setShowPopup] = useState(false);
  const [isInventory, setToInventory] = useState(true);
  const [shoppinglist, setShoppinglist] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [dropdown, setDropdown] = useState('All Categories');
  const [checkedID, setCheckedID] = useState([]);
  const [editID, setEditID] = useState('');
  const [loading, setLoading] = useState(null);
  const initialValues = {
    product: "",
    category: "Fridge",
    quantity: "",
    location: "",
    expDate: "",
  };
  const [values, setFormValues] = useState(initialValues);
  const [errorMsg, setErrorMsg] = useState('');

  const closePopup = () => {
    setShowPopup(false);
    setEditID('');
    resetInput();
    setErrorMsg("");
  };

  const fetchData = useCallback(() => {
    let apiUrl = isInventory ? "inventory" : "shoplistitems";

    axios.get(`/api/${apiUrl}`)
      .then((response) => {
        setLoading(true);
        const data = response.data;
        isInventory ? setInventory([]) : setShoppinglist([]);
        const filteredData = data.filter(data => data.user === getUserId().user);
        isInventory ? setInventory(filteredData) : setShoppinglist(filteredData);
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
      });

  }, [isInventory]);

  useEffect(() => {

    fetchData();

  }, [fetchData]);


  const handleInputChange = (event) => {
    setFormValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (event) => {
    if (dayjs(event).isValid() && !isNaN(dayjs(event))) {
      setFormValues({
        ...values,
        expDate: event
      })
    }
    else {
      setFormValues({
        ...values,
        expDate: null
      })
    }
  }

  const handleInventorySubmit = (event) => {
    event.preventDefault();

    const inventory = {
      product: values.product,
      category: values.category,
      quantity: values.quantity,
      expDate: dayjs(values.expDate).isValid() ? dayjs(values.expDate).format("MM/DD/YY") : "",
      user: getUserId().user
    };

    if (!values.product || !values.quantity) {
      setErrorMsg("Missing inputs");
      return;
    }

    if (editID) {
      let id = editID;

      axios.put(`/api/inventory/edit/${id}`, inventory)
        .then(() => {
          resetInput();
          closePopup();
          fetchData();
          setEditID('');
        })
        .catch(() => {
          console.log('Error');
        })
    }

    else {
      if (!values.product || !values.quantity) {
        setErrorMsg("Missing inputs");
      }
      else {
        axios.post('/api/inventory', inventory)
          .then(() => {
            resetInput();
            closePopup();
            fetchData();
          })
          .catch(() => {
            console.log('Data could not be added');
          })
      }
    }
  };

  const handleShoppingSubmit = (event) => {
    event.preventDefault();

    const inventory = {
      product: values.product,
      category: values.category,
      quantity: values.quantity,
      location: values.location,
      user: getUserId().user
    };

    if (!values.product || !values.quantity) {
      setErrorMsg("Missing inputs");
      return;
    }

    if (editID) {

      let id = editID;

      axios.put(`/api/shoplistitems/edit/${id}`, inventory)
        .then(() => {
          resetInput();
          closePopup();
          fetchData();
          setEditID('');
        })
        .catch(() => {
          console.log('Error');
        })
    }

    else {
      axios.post('/api/shoplistitems', inventory)
        .then(() => {
          resetInput();
          closePopup();
          fetchData();
        })
        .catch(() => {
          console.log('Data could not be added');
        })
    }

  };

  const handleEdit = (itemID, data, event) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i]._id === itemID) {

        const date = data[i].expDate ? dayjs(data[i].expDate).toDate() : null

        setFormValues({
          product: data[i].product,
          category: data[i].category,
          quantity: data[i].quantity,
          location: data[i].location,
          expDate: date
        })

        // setting editID state to edit it
        setEditID(itemID);
        setShowPopup(true);
      }
    }
  }

  const resetInput = () => {
    setFormValues(initialValues);
  };

  // Function for handling checkmark - prepare to delete data
  const handleCheckMark = (e, itemID) => {
    var is_checked = e.target.checked;
    // if it's checked, add the item's id into the list
    if (is_checked) {
      setCheckedID([...checkedID, itemID])
    }
    else {
      // filter the checkedID list to remove the last item's id
      setCheckedID(checkedID.filter(IDList => IDList !== itemID))
    }
  }

  const handleDelete = () => {
    let ID_list = checkedID;

    if (ID_list.length === 0) {
      return null;
    }
    // have user confirm the deletion
    if (window.confirm(`Delete ${ID_list.length} ${ID_list.length > 1 ? "items" : "item"}?`)) {
      // delete each id and it's data in the list
      for (var i = 0; i < ID_list.length; i++) {
        let id = ID_list[i];
        if (isInventory) {
          axios.delete(`/api/inventory/delete/${id}`)
            .then((data) => {
              fetchData();
            })
            .catch(() => {
              console.log('Data could not be deleted');
            });
        }
        else {
          axios.delete(`/api/shoplistitems/delete/${id}`)
            .then((data) => {
              fetchData();
            })
            .catch(() => {
              console.log('Data could not be deleted');
            });
        }
        // reset 
        setCheckedID([]);
      }
    }
    else {
      console.log('delete request cancelled');
    }
  }


  // Display Data Functions
  const filterData = ({ category }) => {
    if (dropdown === "All Categories") {
      return shoppinglist;
    }
    return category.toLowerCase().indexOf(dropdown.toLowerCase()) !== -1;
  };

  const groupBy = (array, key) => {
    return array.reduce((result, val) => {
      // create an array if the property isn't in the array yet, and add the value in
      if (!result[val[key]]) {
        result[val[key]] = [];
      }
      result[val[key]].push(val);
      return result;
    }, []);
  }

  const display = (data) => {

    let groupedItems;

    if (isInventory && Array.isArray(data)) {
      groupedItems = groupBy(data, "category");
    }
    else {
      groupedItems = groupBy(data, "location");
    }

    let propertyValues = Object.keys(groupedItems);
    let itemValues = Object.values(groupedItems);

    let style = propertyValues.length === 1 ? "item_display_center" : "";

    return itemValues.length === 0 ? <h4>No data to display</h4> :
      propertyValues.map((property, id) =>
        <div className={`shopping_list ${style}`} key={property}>
          <h6>{property || "N/A"}</h6>
          {itemValues[id].filter(filterData).map(item =>
            <Item key={item._id}
              itemID={item._id}
              handleCheckMark={(e) => { handleCheckMark(e, item._id) }}
              col2={isInventory ? `Exp. Date: ${item.expDate || 'N/A'}` : item.category}
              product={item.product}
              quantity={item.quantity}
              handleEdit={(e) => { handleEdit(item._id, isInventory ? inventory : shoppinglist, e) }}
            />
          )}
        </div>
      )
  }

  const logout = () => {
    localStorage.removeItem("token");
    props.history.push('/login');
  }

  const locationInput = (
    <>
      <Form.Label>
        Store:
      </Form.Label>
      <Form.Control name="location" className="form_input" value={values.location} onChange={handleInputChange} />
    </>
  )

  const expDateInput = (

    <>
      <Form.Label>
        Exp. Date:
      </Form.Label>
      <DatePicker selected={values.expDate} className="form_input" onChange={
        handleDateChange} name="expDate" minDate={new Date()} />
    </>
  )

  const getUserId = () => {
    let token = localStorage.getItem("token");
    let user = token.split(".")[1]
    var decodedUser = JSON.parse(window.atob(user));
    return decodedUser;
  }

  return (
    <>

      <Header authenticate={
        <>
          <h6 className="mr-3 my-auto">{getUserId().username}</h6>
          <Button onClick={logout}>Logout</Button>
        </>
      } />

      <ToggleDisplay
        inventory={() => setToInventory(true)}
        shoppinglist={() => setToInventory(false)}
      />

      <br />

      <div className="dropdownAdd">
        <CategoryDropdown
          dropdownTitle={dropdown}
          handleSelect={(e) => setDropdown(e.target.innerHTML)}
        />
        <ActionBtn
          addClicked={(e) => setShowPopup(true)}
          deleteClicked={handleDelete}
        />
      </div>

      <br />

      {loading ?
        <h4 className="heading">Loading...</h4>
        : <Display items={display(isInventory ? inventory : shoppinglist)} />
      }

      {showPopup ?
        <Forms
          closeForm={closePopup}
          product={values.product}
          category={values.category}
          quantity={values.quantity}
          expDate={values.expDate}
          formInput={isInventory ? expDateInput : locationInput}
          onChange={handleInputChange}
          submit={isInventory ? handleInventorySubmit : handleShoppingSubmit}
          errorMsg={errorMsg}
        />
        : null
      }

    </>
  )
}

export default withRouter(Main);
