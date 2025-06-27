import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Signin() {

    const [data, setData] = useState({ email: '', pass: ''})
const navigate = useNavigate()

    const DataHandler =(e)=>{
    setData({...data, [e.target.name] : e.target.value})

  }

  const saveForm = async(e)=>{
     e.preventDefault();
        try {
          const result =   await axios.post('http://localhost:3000/api/login', data);
           
            navigate("/");  
            console.log(result)
           if (result.status === 200) {
             const userName = result.data.user;
               alert("Welcome " + userName);
               setData({
               email : '', 
               pass : ''
            });
           navigate("/");
      }
       
        } catch (error) {
            console.error('Error adding property:', error);
            alert('Login Faild');
        }


   }

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Login</h2>
        <form action="" method="POST" style={{ maxWidth: '400px' }} className="mx-auto" onSubmit={(e)=>{saveForm(e)}}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={data.email} onChange={(e)=>{DataHandler(e)}}required />
          </div>
          <div className="mb-3">
            <label htmlFor="pass" className="form-label">Password</label>
            <input type="password" className="form-control" id="pass" name="pass" value={data.pass} onChange={(e)=>{DataHandler(e)}}required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
           <p className="my-3 text-center">don't Have an account? <a href="/login">register</a></p>
        </form>
      </div>
    </>
  );
}

export default Signin;
