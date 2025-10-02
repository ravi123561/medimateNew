import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: identifier, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Login successful") {
          toast.success("✅ Login successful!");

          // ✅ Save user data
          localStorage.setItem("userId", data.user.id);     // _id ke jagah id bhej rahe hain backend se
          localStorage.setItem("userName", data.user.name); // 👈 naam save karo
          localStorage.setItem("userEmail", data.user.email);
          if (data.token) {
            localStorage.setItem("authToken", data.token);
          }

          setTimeout(() => navigate("/dashboard"), 1500);
        } else {
          toast.error("❌ " + (data.error || "Invalid credentials"));
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        toast.error("❌ Something went wrong");
      });
  };

  return (
    <div
      className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow"
      style={{ backgroundImage: "url('/login.jpg')" }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">🔐 Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="text"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign in
        </button>

        <p className="text-sm text-center mt-3">
          <span className="text-gray-600 dark:text-gray-300">Forgot </span>
          <Link to="/forgot-password" className="text-red-500 hover:underline">
            email or password?
          </Link>
        </p>
      </form>
    </div>
  );
}
