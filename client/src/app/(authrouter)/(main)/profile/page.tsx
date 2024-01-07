/* Dashboard.jsx */
import React from "react";

function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white rounded p-6 shadow-md">
        <h2 className="text-3xl font-bold mb-6">User Profile</h2>
        <div className="flex items-center space-x-4 mb-8">
          <img
            src="https://placekitten.com/100/100"
            alt="User Avatar"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <p className="text-2xl font-semibold">Hung Lai</p>
            <p className="text-gray-500">chuquanpho@gmail.com</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <p>
              <span className="font-semibold">Username:</span> Hung lai
            </p>
            <p>
              <span className="font-semibold">Date of Birth:</span> January 1, 2002
            </p>
            <p>
              <span className="font-semibold">Gender:</span> Male
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p>
              <span className="font-semibold">Email:</span> chuquanpho@gmail.com
            </p>
            <p>
              <span className="font-semibold">Phone:</span> 7777777777
            </p>
            <p>
              <span className="font-semibold">Address:</span> Thai Binh
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Bio</h3>
          <p>
            Ronaldo is goat
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


