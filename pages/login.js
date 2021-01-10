import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [reset, setReset] = React.useState("");
  const [emailValid, setEmailValid] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState("");
  const [resetValid, setResetValid] = React.useState("");
  const router = useRouter();
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  async function submitLogin(event) {
    event.preventDefault();
    if (email && emailRegex.test(email) && password) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        router.push("/");
      } catch (error) {
        console.log(error.message);
        setPasswordValid("The user specified does not exist.");
      }
    } else {
      if (!email || !emailRegex.test(email)) {
        setEmailValid("Please enter a valid email.");
      }
      if (!password) {
        setPasswordValid("Please enter a valid password.");
      }
    }
  }

  async function resetPassword() {
    if (reset && emailRegex.test(reset)) {
      try {
        await firebase.auth().sendPasswordResetEmail(reset);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      setResetValid("Please enter a valid email.");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <form className="col-sm" onSubmit={submitLogin} noValidate>
          <h1 className="text-primary">Login</h1>
          <div>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <small className="text-danger">{emailValid}</small>
          </div>
          <div>
            <input
              type="password"
              className="form-control mt-2"
              placeholder="Password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <small className="text-danger">{passwordValid}</small>
          </div>
          <button className="btn btn-primary mt-3 mb-3" type="submit">
            Submit
          </button>
          <h6 className="card-subtitle text-muted">
            Forgot password? Click
            <button
              type="button"
              className="btn btn-outline-primary btn-sm ms-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              here
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Reset Password
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={reset}
                      onChange={(event) => setReset(event.target.value)}
                    />
                    <p className="mt-3">
                      A password reset email will be sent to {reset}.
                    </p>
                    <small className="text-danger">{resetValid}</small>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={resetPassword}
                    >
                      Send email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </h6>
        </form>
        <div className="col-sm mb-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">About Alpha Blog</h3>
              <p className="card-text">
                Alpha Blog is a place where people are free to share their
                thoughts and opinions on issues and matters in the world.
                Getting started is simple. Simply login and create a new post!
              </p>
              <h6 className="card-subtitle text-muted">
                Don't have an account?{" "}
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
