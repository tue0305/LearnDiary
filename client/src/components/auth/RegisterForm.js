import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  return (
    <>
      <Form className="my-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="ConfirmPassword"
            required
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Login
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
