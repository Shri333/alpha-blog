import React from "react";
import Head from "next/head";
import Link from "next/link";
import firebase from "firebase/app";
import "firebase/auth";
import "../styles/global.css";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  });
}

function MyApp({ Component, pageProps }) {
  const [user, setUser] = React.useState(undefined);
  const [loading, setLoading] = React.useState(true);
  let element;

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUser(user) : setUser(null);
    setLoading(false);
  })

  if (user) {
    element = (
      <div>
        <Link href="/newpost">
          <button className="btn btn-primary btn-lg">New Post</button>
        </Link>
        <Link href="/">
          <button className="btn btn-primary btn-lg" onClick={logout}>
            Logout
          </button>
        </Link>
      </div>
    );
  } else {
    element = (
      <div>
        <Link href="/login">
          <button className="btn btn-primary btn-lg">Login</button>
        </Link>
        <Link href="/register">
          <button className="btn btn-primary btn-lg">Register</button>
        </Link>
      </div>
    );
  }

  async function logout() {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>Alpha Blog</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous"
          ></link>
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <div className="vh-100 container">
          <div className="position-absolute top-50 start-50 translate-middle">
            <div
              className="spinner-border text-primary"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Alpha Blog</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous"
          ></link>
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <nav className="navbar sticky-top navbar-dark bg-primary py-3">
          <div className="container">
            <Link href="/">
              <a id="brand" className="navbar-brand">
                <strong>Alpha Blog</strong>
              </a>
            </Link>
            {element}
          </div>
        </nav>
        <Component user={user} {...pageProps} />
      </>
    );
  }
}

export default MyApp;
