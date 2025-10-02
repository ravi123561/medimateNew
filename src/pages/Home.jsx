import React from 'react';
import { useMedicineReminders } from '../hooks/useMedicineReminders';
import AddMedicineForm from '../components/AddMedicineForm';

export default function Home({ medicines }) {
  useMedicineReminders(medicines);

  return (
      <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/7283494.jpg')" }}
    >
    <div >
      <h1 className='text-2xl font-bold text-yellow-600'>Welcome to MediMate!</h1>
      <p className='mt-2 text-gray-700'>Track your medicines, stats, and appointments here.</p>
      <AddMedicineForm />
    </div>
    </div>
  );
}
