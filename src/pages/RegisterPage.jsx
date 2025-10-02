import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    mobile: '',
    email: '',
    aadhar: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, age, mobile, email, password, confirmPassword, aadhar } = formData;

    if (!name || !age || !mobile || !email || !password || !confirmPassword) {
      toast.error("❌ Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        age: parseInt(age),
        mobile,
        email,
        password,
        aadhaar: aadhar
      });

      toast.success("✅ Registered Successfully!");
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      toast.error(`❌ ${err.response?.data?.error || "Registration failed"}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow"
      style={{ backgroundImage: "url('/registration.jpg')" }}
    >
      <h2 className="text-2xl font-serif mb-4 text-center">📝 Sign Up</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium">Name<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Age<span className="text-red-500">*</span></label>
          <input
            type="number"
            name="age"
            required
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Mobile No.<span className="text-red-500">*</span></label>
          <input
            type="tel"
            name="mobile"
            required
            pattern="[0-9]{10}"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email<span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password<span className="text-red-500">*</span></label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm Password<span className="text-red-500">*</span></label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Aadhaar Card No. (Optional)</label>
          <input
            type="text"
            name="aadhar"
            maxLength="12"
            value={formData.aadhar}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="w-1/2 bg-red-600 text-white py-2 rounded hover:bg-green-700"
          >
            Sign up
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-1/2 bg-orange-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign in
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-red-500 hover:underline">
            Sign in
          </Link>
        </p>

      </form>
    </div>
  );
}
