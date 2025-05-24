// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import useFetch from '../hooks/useFetch';
// import validateManyFields from '../validations';
// import Input from './utils/Input';
// import Loader from './utils/Loader';

// const SignupForm = () => {

//   const [formErrors, setFormErrors] = useState({});
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });
//   const [fetchData, { loading }] = useFetch();
//   const navigate = useNavigate();

//   const handleChange = e => {
//     setFormData({
//       ...formData, [e.target.name]: e.target.value
//     });
//   }

//   const handleSubmit = e => {
//     e.preventDefault();
//     const errors = validateManyFields("signup", formData);
//     setFormErrors({});
//     if (errors.length > 0) {
//       setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
//       return;
//     }

//     const config = { url: "/auth/signup", method: "post", data: formData };
//     fetchData(config).then(() => {
//       navigate("/login");
//     });

//   }

//   const fieldError = (field) => (
//     <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
//       <i className='mr-2 fa-solid fa-circle-exclamation'></i>
//       {formErrors[field]}
//     </p>
//   )

//   return (
//     <>
//       <form className='m-auto my-16 max-w-[500px] p-8 bg-white border-2 shadow-md rounded-md'>
//         {loading ? (
//           <Loader />
//         ) : (
//           <>
//             <h2 className='text-center mb-4'>Welcome user, please signup here</h2>
//             <div className="mb-4">
//               <label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500">Name</label>
//               <Input type="text" name="name" id="name" value={formData.name} placeholder="Your name" onChange={handleChange} />
//               {fieldError("name")}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>
//               <Input type="text" name="email" id="email" value={formData.email} placeholder="youremail@domain.com" onChange={handleChange} />
//               {fieldError("email")}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="password" className="after:content-['*'] after:ml-0.5 after:text-red-500">Password</label>
//               <Input type="password" name="password" id="password" value={formData.password} placeholder="Your password.." onChange={handleChange} />
//               {fieldError("password")}
//             </div>

//             <button className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark' onClick={handleSubmit}>Submit</button>

//             <div className='pt-4'>
//               <Link to="/login" className='text-blue-400'>Already have an account? Login here</Link>
//             </div>

//           </>
//         )}

//       </form>
//     </>
//   )
// }

// export default SignupForm
// -----------------------------------

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import useFetch from "../hooks/useFetch";
import validateManyFields from "../validations";
import Input from "./utils/Input";
import Loader from "./utils/Loader";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1UJtmLMqdhhtQUp2Gce56HTLvYRM9ig0",
  authDomain: "login-d6b74.firebaseapp.com",
  projectId: "login-d6b74",
  storageBucket: "login-d6b74.firebasestorage.app",
  messagingSenderId: "80687399894",
  appId: "1:80687399894:web:1f3ef646f2f43908545a77",
  measurementId: "G-1VQJRYD1KM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const SignupForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [fetchData, { loading }] = useFetch();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => console.error("Logout Error:", error));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("signup", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }

    const config = { url: "/auth/signup", method: "post", data: formData };
    fetchData(config).then(() => {
      navigate("/login");
    });
  };

  const fieldError = (field) => (
    <p
      className={`mt-1 text-pink-600 text-sm ${
        formErrors[field] ? "block" : "hidden"
      }`}
    >
      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
      {formErrors[field]}
    </p>
  );

  return (
    <>
      <form className="m-auto my-16 max-w-[500px] p-8 bg-white border-2 shadow-md rounded-md">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-center mb-4">
              Welcome user, please signup here
            </h2>

            {user ? (
              <div>
                <h3>Logged in as {user.displayName}</h3>
                <img src={user.photoURL} alt="Profile" />
                <h3>Email: {user.email}</h3>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 mt-4"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
              

                <div className="mb-4">
                  <label htmlFor="name">Name</label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    placeholder="Your name"
                    onChange={handleChange}
                  />
                  {fieldError("name")}
                </div>

                <div className="mb-4">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    placeholder="youremail@domain.com"
                    onChange={handleChange}
                  />
                  {fieldError("email")}
                </div>

                <div className="mb-4">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    placeholder="Your password.."
                    onChange={handleChange}
                  />
                  {fieldError("password")}
                </div>

                <button
                  className="bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark"
                  onClick={handleSubmit}
                >
                  Submit
                </button>

                <div className="pt-4">
                  <Link to="/login" className="text-blue-400">
                    Already have an account? Login here
                  </Link>
                </div>

                 <button
                  onClick={handleGoogleLogin}
                  className="bg-blue-500 text-white px-4 py-2 mt-4"
                >
                  Login with Google
                </button>
              </>
            )}
          </>
        )}
      </form>
    </>
  );
};

export default SignupForm;
