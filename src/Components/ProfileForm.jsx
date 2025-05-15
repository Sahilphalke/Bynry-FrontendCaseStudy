import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function ProfileForm({ addUser, editingUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    file: null,
    description: "",
    interest: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
    console.log("Form Data Submitted:", formData);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      file: null,
      description: "",
      interest: "",
      address: "",
      city: "",
      state: "",
      country: "",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>

        <div className="p-4 md:h-158 sm:h-260 w-full flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-6xl">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-1 font-serif">
                    Name
                  </label>
                  <input
                    className="border p-2 rounded-sm w-full"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-1 font-serif">
                    Email
                  </label>
                  <input
                    className="border p-2 rounded-sm w-full"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="mobile" className="mb-1 font-serif">
                    Mobile No
                  </label>
                  <input
                    className="border p-2 rounded-sm w-full"
                    type="tel"
                    name="mobile"
                    id="mobile"
                    placeholder="Enter Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:col-span-3">
                  <div className="flex flex-col w-full md:w-1/3">
                    <label htmlFor="file" className="mb-1 font-serif">
                      Profile Photo
                    </label>
                    <input
                      className="border p-2 rounded-sm w-full"
                      type="file"
                      name="file"
                      id="file"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col w-full md:w-2/3">
                    <label htmlFor="description" className="mb-1 font-serif">
                      Brief Description
                    </label>
                    <textarea
                      className="border p-2 rounded-sm w-full"
                      name="description"
                      id="description"
                      rows={1}
                      placeholder="Describe Yourself"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:col-span-3">
                  <div className="flex flex-col w-full md:w-1/3">
                    <label htmlFor="interest" className="mb-1 font-serif">
                      Interest
                    </label>
                    <input
                      className="border p-2 rounded-sm w-full"
                      type="text"
                      name="interest"
                      id="interest"
                      placeholder="Your Interests"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col w-full md:w-2/3">
                    <label htmlFor="address" className="mb-1 font-serif">
                      Address
                    </label>
                    <textarea
                      className="border p-2 rounded-sm w-full"
                      type="text"
                      name="address"
                      id="address"
                      rows={1}
                      placeholder="Enter Address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="city" className="mb-1 font-serif">
                    City
                  </label>
                  <input
                    className="border p-2 rounded-sm w-full"
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="state" className="mb-1 font-serif">
                    State
                  </label>
                  <input
                    className="border p-2 rounded-sm w-full"
                    type="text"
                    name="state"
                    id="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="country" className="mb-1 font-serif">
                    Country
                  </label>
                  <input
                    className="border p-2 rounded-sm w-full"
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:col-span-2 md:col-span-3 mt-5">
                <button
                  type="submit"
                  className="p-2 rounded-sm w-full shadow-2xl font-semibold uppercase bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 hover:opacity-90 transition duration-300"
                >
                  {editingUser ? "Update User" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileForm;
