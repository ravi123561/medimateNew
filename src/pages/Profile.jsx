import React, { useEffect, useState } from "react";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("userId"); // login ke time save hua tha

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/user/${userId}`);
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    };

    fetchUser();
  }, [userId]);

  if (!userData) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p><b>Name:</b> {userData.name}</p>
      <p><b>Email:</b> {userData.email}</p>
      <p><b>Age:</b> {userData.age}</p>
      <p><b>Mobile:</b> {userData.mobile}</p>
      <p><b>Aadhaar:</b> {userData.aadhaar}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Medicines</h2>
      {userData.medicines && userData.medicines.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {userData.medicines.map((med, index) => (
            <li key={index}>
              <b>{med.name}</b> - {med.dosage} ({med.frequency})  
              {med.date && (
                <span className="ml-2 text-gray-600 text-sm">
                  📅 {new Date(med.date).toLocaleDateString()}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No medicines added yet.</p>
      )}
    </div>
  );
}
