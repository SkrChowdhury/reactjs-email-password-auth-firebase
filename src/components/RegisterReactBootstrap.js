import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const RegisterReactBootstrap = () => {
  const [oasswordError, setPasswordError] = useState('');
  const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error('error:', error);
      });
    console.log(email, password);

    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setPasswordError('Please Provide at least two upper case');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters');
      return;
    }
    if (!/(?=.*[!@#$&*])  /) {
      setPasswordError('Please add at least one special character');
      return;
    }
    setPasswordError('');
  };
  return (
    <div className="w-50 mx-auto">
      <h3 className="text-primary">Please Register</h3>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <p className="text-danger"> {oasswordError}</p>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegisterReactBootstrap;
