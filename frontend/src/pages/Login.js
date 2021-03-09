import '../App.css';
import '../forms.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { Form, Col, Button } from "react-bootstrap";
import Navbar from '../components/Navbar';
import { MdLocalGroceryStore } from 'react-icons/md';

const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    let userToken = localStorage.getItem('token');
    if (userToken && userToken !== 'undefined') {
      props.history.push('/');
    }
  }, [props.history])

  const handleSubmit = (event) => {
    event.preventDefault();

    const credentials = {
      username: username,
      password: password
    }

    if (!username || !password) {
      setMsg("Missing username or password");
    }
    else {
      axios.post('/user/login', credentials, {
        headers: {
          "content-type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      })
        .then((response) => {
          if (response.status === 200) {
            setMsg('Login successful.');
            localStorage.setItem("token", response.data.token);
            resetInput();
            redirect();
          }
          else {
            setMsg("Invalid Login");
          }
        });
    }
  }

  const resetInput = () => {
    setUsername('');
    setPassword('');
    setMsg('');
  };

  const redirect = () => {
    props.history.push('/');
  }

  return (

    <>

      <Navbar />

      <div className="loginsignup_container">

      <h1 style={{ textAlign: 'center' }}><MdLocalGroceryStore /> Shop it <MdLocalGroceryStore /></h1>

      <h2 style={{ textAlign: 'center' }}>Log In</h2>

        <Form onSubmit={handleSubmit} className="loginsignup">
          <Form.Label column>
            Username:
              </Form.Label>
          <Col>
            <Form.Control
              name="username"
              onChange={(e) => setUsername(e.target.value)} />
          </Col>
          <Form.Label column>
            Password:
              </Form.Label>
          <Col>
            <Form.Control
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)} />
          </Col>
          <br></br>
          <p>Don't have an account? <Link to="/signup">Register Here</Link></p>

          <Form.Label column className="errorMsg">
            {msg}
          </Form.Label>

          <Button type="submit" >
            Submit
          </Button>

          <br />

        </Form>

      </div>

{/*       <div style={{textAlign: 'center'}}>
        <MdLocalGroceryStore size={100}/>
      </div> */}

    </>
  );

}

export default Login;
