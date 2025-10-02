import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

export default function ForgotPassword() {
  const [stage, setStage] = useState('email'); // email -> otp -> reset
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  // ✅ Send OTP
  const handleSendOtp = () => {
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    fetch(`http://localhost:5000/api/auth/check-user?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (!data.exists) {
          toast.error("User not found!");
          return;
        }

        const storedUser = data.user;
        const randomOtp = generateOTP();
        setGeneratedOtp(randomOtp);

        const templateParams = {
          email: email,
          username: storedUser.name || 'User',
          passcode: randomOtp,
          time: new Date(Date.now() + 10 * 60000).toLocaleTimeString(),
        };

        emailjs.send(
          'service_nr9o1ie', // your EmailJS service ID
          'template_mo8hm48', // your EmailJS template ID
          templateParams,
          '2d0Zv_70_tqtn1c_I' // your EmailJS public key
        ).then(() => {
          toast.success(`OTP sent to ${email}`);
          setStage('otp');
        }).catch(() => {
          toast.error("❌ Failed to send OTP via Email!");
        });
      })
      .catch(() => toast.error("Server error! Please try again."));
  };

  // ✅ Verify OTP
  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      toast.success("✅ OTP Verified!");
      setStage('reset');
    } else {
      toast.error("Invalid OTP!");
    }
  };

  // ✅ Reset Password
  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("❌ Passwords do not match.");
      return;
    }

    fetch('http://localhost:5000/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        newPassword: newPassword
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Password reset successful") {
          toast.success("✅ Password reset successfully!");
          navigate('/login');
        } else {
          toast.error("❌ " + (data.error || "Reset failed"));
        }
      })
      .catch(err => {
        console.error("Reset error:", err);
        toast.error("❌ Something went wrong!");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-lg" style={{ backgroundImage: "url('/resetpass.jpg')" }}>
      <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>

      {stage === 'email' && (
        <>
          <label className="block text-sm mb-2">Enter your registered email:</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSendOtp}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-400"
          >
            Send OTP
          </button>
        </>
      )}

      {stage === 'otp' && (
        <>
          <label className="block text-sm mb-2">Enter the OTP sent to your email:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={handleVerifyOtp}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Verify OTP
          </button>
        </>
      )}

      {stage === 'reset' && (
        <>
          <label className="block text-sm mb-2">New Password:</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label className="block text-sm mt-3 mb-2">Confirm Password:</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            onClick={handleResetPassword}
            className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  );
}
