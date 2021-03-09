import '../App.css';
import '../forms.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter, Link } from "react-router-dom";

import { Form, Col, Button } from "react-bootstrap";
import Navbar from '../components/Navbar';

const Signup = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_pw, setConfirm_pw] = useState('');
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
    else if (password !== confirm_pw) {
      setMsg("Passwords do not match.")
    }
    else {
      axios.post('/user/register', credentials, {
        headers: {
          "content-type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      })
        .then((response, user) => {
          if (response.status === 200) {
            setMsg('Registration successful.');
            localStorage.setItem("token", response.data.token);
            resetInput();
            redirect();
          }
          else {
            setMsg("Username is already taken.");
          }
        })
        .catch((error) => {
          console.log(error.response.status);
          if (error.response.status === 401) {
            setMsg("Username taken");
          }
        })
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

      <h3 style={{ textAlign: 'center' }}>Sign Up</h3>

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
        <Form.Label column>
          Confirm Password:
            </Form.Label>
        <Col>
          <Form.Control
            name="confirm_pw"
            type="password"
            onChange={(e) => setConfirm_pw(e.target.value)} />
        </Col>
        <br />
        <p>Already have an account? <Link to="/login">Login</Link></p>

        <Form.Label column className="errorMsg">
          {msg}
        </Form.Label>


        <Button type="submit">
          Submit
          </Button>

      </Form>

    </>
  );

}

export default withRouter(Signup);
