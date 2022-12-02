import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { auth } from "../firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function Nav() {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      console.log(user);
      if (user) {
        setUser(user);
        
      }
    });
  },[]);

  function register() {
    setLoading(false);
    console.log("register");
    createUserWithEmailAndPassword(auth, "tonystark@gmail.com", "ironman")
      .then((user) => {
        // user is now signed in
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  function login() {
    setLoading(true);
    setTimeout(() => {
      signInWithEmailAndPassword(auth, "tonystark@gmail.com", "ironman")
        .then(({ user }) => {
          // User is now signed in
          console.log(user);
          setUser(user);
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }, 2500);
  }

  function logout() {
    // setLoading(true)
    signOut(auth);
    setUser(undefined);
    console.log("sign out");
  }

  return (
    <>
      <nav className="nav__container">
        <div className="logo__nav">
          <div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className="logo">
            <span className="bold">Frontend </span>Simplified
          </div>
        </div>
        <div>
          {user !== undefined && !loading && (
            <button className="logout" onClick={logout}>
              {user.email[0].toUpperCase()}
            </button>
          )}
          {user === undefined && !loading && (
            <>
              <button className="btn btn__login" onClick={login}>
                login
              </button>
              <button className="btn" onClick={register}>
                register
              </button>
            </>
          )}
          {loading && (
            <>
              <div className="skeleton-wrapper">
                <div className="skeleton1"></div>
                <div className="skeleton2"></div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Nav;
