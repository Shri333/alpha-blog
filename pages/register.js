import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [usernameValid, setUsernameValid] = React.useState("");
  const [emailValid, setEmailValid] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState("");
  const [confirmValid, setConfirmValid] = React.useState("");
  const router = useRouter();

  async function submitRegister(event) {
    event.preventDefault();
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      username &&
      email &&
      emailRegex.test(email) &&
      password &&
      password == confirm
    ) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firebase.auth().currentUser.updateProfile({displayName: username});
        await firebase.auth().currentUser.sendEmailVerification();
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      if (!username) {
        setUsernameValid("Please enter a valid username.");
      }
      if (!email || !emailRegex.test(email)) {
        setEmailValid("Please enter a valid email.");
      }
      if (!password) {
        setPasswordValid("Please enter a valid password.");
      }
      if (!confirm) {
        setConfirmValid("Please confirm your password.");
      } else if (password != confirm) {
        setConfirmValid("Passwords do not match.");
      }
    }
  }

  return (
    <div className="container">
      <div className="row">
        <form className="col-sm mt-4" onSubmit={submitRegister} noValidate>
          <h1 className="text-primary">Register</h1>
          <div>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <small className="text-danger">{usernameValid}</small>
          </div>
          <div>
            <input
              type="email"
              className="form-control mt-2"
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
          <div>
            <input
              type="password"
              className="form-control mt-2"
              placeholder="Confirm Password"
              required
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
            />
            <small className="text-danger">{confirmValid}</small>
          </div>
          <button className="btn btn-primary mt-3 mb-3" type="submit">
            Submit
          </button>
        </form>
        <div className="col-sm mb-3 mt-5">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">About Alpha Blog</h3>
              <p className="card-text">
                Alpha Blog is a place where people are free to share their
                thoughts and opinions on issues and matters in the world.
                Getting started is simple. Simply sign up and create your first
                post!
              </p>
              <h6 className="card-subtitle text-muted">
                Have an account?{" "}
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
