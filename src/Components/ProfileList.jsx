import React, { useState } from "react";
import Navbar from "./Navbar";
import MapModal from "./MapModal";
import {
  MapPinned,
  User,
  UserRoundPen,
  Trash,
  UserSearch,
  X,
} from "lucide-react";

function ProfileList({ users, deleteUser, editUser }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const viewUser = (index) => {
    setSelectedUser(users[index]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const viewMap = (index) => {
    setSelectedUser(users[index]);
    setIsMapOpen(true);
  };

  const closeMap = () => {
    setIsMapOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.city.toLowerCase().includes(query) ||
      user.state.toLowerCase().includes(query) ||
      user.country.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>

        <div className="p-4">
          <div className="flex float-end items-center gap-5 mb-3">
            <input
              type="text"
              placeholder="Search by name, email, city, state, or country"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" md:w-100 p-2 border border-gray-300 rounded-lg shadow-sm"
            />
            <UserSearch />
          </div>
        </div>

        <div className="mt-5 p-5 justify-center  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15 w-full">
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              className="bg-white w-80 h-100 shadow-md rounded-lg overflow-hidden flex flex-col items-center text-center relative"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => viewUser(index)}
                  className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 hover:opacity-90 transition duration-300  p-2 rounded text-sm flex items-center gap-2"
                >
                  <User size={16} />
                </button>
                <button
                  onClick={() => editUser(index)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded text-sm flex items-center gap-2"
                >
                  <UserRoundPen size={16} />
                </button>
                <button
                  onClick={() => deleteUser(index)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded text-sm flex items-center gap-2"
                >
                  <Trash size={16} />
                </button>
                <button
                  onClick={() => viewMap(index)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded text-sm flex items-center gap-2"
                >
                  <MapPinned size={16} />
                </button>
              </div>
              <div className="w-full h-64 bg-gray-100">
                {user.file ? (
                  <img
                    src={URL.createObjectURL(user.file)}
                    alt="Profile"
                    className="object-fill"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4 w-full absolute bottom-0 backdrop-blur-sm">
                <h2 className="text-lg font-semibold font-serif capitalize">
                  {user.name}
                </h2>
                <p className="text-sm font-mono text-gray-800 mt-1">
                  {user.email}
                </p>
                {/* <div className="flex justify-center">
                  <button
                    onClick={() => viewUser(index)}
                    className="mt-4 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 hover:opacity-90 transition duration-300  px-4 py-2 rounded text-sm flex items-center justify-center gap-2 w-40"
                  >
                    View Profile <User size={16} />
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && selectedUser && (
          <div className="inset-0 backdrop-blur-xl flex items-center justify-center z-50 absolute">
            <div className="bg-white rounded-lg shadow-lg p-6 w-200">
              <div className="mb-4">
                <h1 className="capitalize text-lg font-mono font-bold">
                  {selectedUser.name}
                </h1>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="mb-4">
                  <label htmlFor="" className="font-serif font-bold">
                    Email
                  </label>
                  <br />
                  <input
                    type="text"
                    readOnly
                    className="text-shadow-gray-950 focus:outline-none focus:ring-0 focus:border-gray-300"
                    value={selectedUser.email}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="" className="font-serif font-bold">
                    Intrest:
                  </label>
                  <br />
                  <input
                    type="text"
                    readOnly
                    className="text-shadow-gray-950 focus:outline-none focus:ring-0 focus:border-gray-300"
                    value={selectedUser.interest}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="" className="font-serif font-bold">
                  Description:
                </label>
                <br />
                <textarea
                  type="text"
                  className="text-shadow-gray-950 w-full focus:outline-none focus:ring-0 focus:border-gray-300"
                  rows={3}
                  value={selectedUser.description}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label htmlFor="" className="font-serif font-bold">
                  Address
                </label>
                <br />
                <textarea
                  type="text"
                  rows={3}
                  readOnly
                  className="text-shadow-gray-950 w-full focus:outline-none focus:ring-0 focus:border-gray-300"
                  value={selectedUser.address}
                />
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                <div className="mb-4">
                  <label htmlFor="" className="font-serif font-bold">
                    City
                  </label>
                  <br />
                  <input
                    type="text"
                    className="text-shadow-gray-950 focus:outline-none focus:ring-0 focus:border-gray-300"
                    value={selectedUser.city}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="" className="font-serif font-bold">
                    State
                  </label>
                  <br />
                  <input
                    type="text"
                    className="text-shadow-gray-950 focus:outline-none focus:ring-0 focus:border-gray-300"
                    value={selectedUser.state}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="" className="font-serif font-bold">
                    Country
                  </label>
                  <br />
                  <input
                    type="text"
                    className="text-shadow-gray-950 focus:outline-none focus:ring-0 focus:border-gray-300"
                    value={selectedUser.country}
                    readOnly
                  />
                </div>
              </div>
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded relative -top-105 left-175"
              >
                <X />
              </button>
            </div>
          </div>
        )}
        {isMapOpen && selectedUser && (
          <MapModal
            address={selectedUser.address}
            city={selectedUser.city}
            state={selectedUser.state}
            country={selectedUser.country}
            onClose={closeMap}
          />
        )}
      </div>
    </>
  );
}

export default ProfileList;
