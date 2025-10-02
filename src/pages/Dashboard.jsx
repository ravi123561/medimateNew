import React from 'react';

export default function Dashboard() {
  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded shadow text-center">
      <h1 className="text-3xl font-bold text-green-600">🎉 Welcome to your Dashboard!</h1>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
        You have successfully logged in.
      </p>
    </div>
  );
}
