import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import Loader from '../components/Loader';

export default function Login() {
  const {login} = useContext(AppContext);
  
  const [submitting , setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(formData);
    } catch (error) {
      // nothing AuthContext will handle
    } finally {
      setSubmitting(false);
      setFormData({
        email: '',
        password: ''
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">

      <div className="bg-white shadow-md rounded-lg p-8 w-[90%] max-w-sm">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <small className='text-stone-500 mb-3'>Login with Admin Credentitals</small>

        <form className='mt-6' autoComplete='off' onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm">Email</label>
            <input type="email" id="email" name="email" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} value={formData.email} />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm">Password</label>
            <input type="password" id="password" name="password" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} value={formData.password} />
          </div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"disabled={submitting} > 
            {submitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader/>
                <p>Logging...</p>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>

    </div>
  )
}
