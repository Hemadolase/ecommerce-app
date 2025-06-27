import React, { useState } from 'react';
import axios from "axios";
function Login() {
  const [data, setData]=useState({name : '', email : '', pass : ''})

  const DataHandler =(e)=>{
    setData({...data, [e.target.name] : e.target.value})
  }
   const saveForm = async(e)=>{
     e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/register', data);
            setData({
               name : '', 
               email : '', 
               pass : ''
            });
            alert('Save Successfully...');
           
        } catch (error) {
            console.error('Error adding property:', error);
            alert('An error occurred while adding the data.');
        }


   }
  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Register / Login</h2>
        <form action="" method="POST" className="mx-auto" style={{ maxWidth: '400px' }} onSubmit={(e)=>{saveForm(e)}}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={data.name} onChange={(e)=>{DataHandler(e)}}   required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={data.email} onChange={(e)=>{DataHandler(e)}} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="pass" value={data.pass} onChange={(e)=>{DataHandler(e)}} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
          <p className="my-3 text-center"> Have an account? <a href="/signin">Login</a></p>
        </form>
      </div>
    </>
  );
}

export default Login;
