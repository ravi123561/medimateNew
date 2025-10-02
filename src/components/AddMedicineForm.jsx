import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function AddMedicineForm() {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User not logged in!");
      return;
    }

    const payload = {
      userId: userId,
      medicine: formData
    };

    try {
      // ✅ Updated backend URL
      const res = await fetch("http://localhost:5000/api/medicines/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('✅ Medicine added successfully!');
        setFormData({
          name: '',
          dosage: '',
          frequency: '',
          startDate: '',
          endDate: ''
        });
      } else {
        toast.error(data.error || "❌ Something went wrong!");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("❌ Failed to add medicine");
    }
  };

  return (
    <div className='max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md' style={{ backgroundImage: "url('/add.jpg')" }}>
      <h2 className="text-xl font-semibold text-center mb-4">Add New Medicine</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type='text'
          placeholder='Medicine name...'
          className='w-full px-3 py-3 border rounded'
          required
        />

        <input
          name="dosage"
          value={formData.dosage}
          onChange={handleChange}
          type='text'
          placeholder='Dosage (e.g. 500mg)'
          className='w-full px-3 py-3 border rounded'
          required
        />

        <select
          name='frequency'
          value={formData.frequency}
          onChange={handleChange}
          className='w-full px-3 py-3 border rounded'
          required
        >
          <option value="">Select Frequency</option>
          <option value="Morning">Morning</option>
          <option value="Night">Night</option>
          <option value="Morning & Night">Morning & Night</option>
          <option value="Morning, Afternoon & Night">Morning, Afternoon & Night</option>
          <option value="Morning & Afternoon ">Morning & Afternoon</option>
          <option value="Afternoon & Night">Afternoon & Night</option>
        </select>

        <div className='flex gap-2'>
          <div className='flex-1'>
            <label className='block text-sm mb-1'>Start Date</label>
            <input
              name='startDate'
              value={formData.startDate}
              onChange={handleChange}
              type='date'
              className='w-full px-3 py-3 border rounded'
              required
            />
          </div>
          <div className='flex-1'>
            <label className='block text-sm mb-1'>End Date</label>
            <input
              name='endDate'
              value={formData.endDate}
              onChange={handleChange}
              type='date'
              className='w-full px-3 py-3 border rounded'
              required
            />
          </div>
        </div>

        <button
          type='submit'
          className='w-full bg-orange-600 text-white py-2 rounded hover:bg-red-500'
        >
          Add Medicine
        </button>
      </form>
    </div>
  );
}
