import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "./AutProvider";

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Dropzone for avatar upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setFormData({ ...formData, avatar: Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0]) }) });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep = () => {
    let tempErrors = {};
    if (step === 1) {
      if (!formData.displayName) tempErrors.displayName = "Name is required";
      if (!formData.email) tempErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid email";
    } else if (step === 2) {
      if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      const updatedData = {
        displayName: formData.displayName,
        email: formData.email,
        ...(formData.password && { password: formData.password }),
        ...(formData.avatar && { avatar: formData.avatar }),
      };
      // Example: call your API to update user info
      await updateUser(updatedData); 
      setSuccessMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Failed to update profile." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Profile Settings</h2>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.displayName && <p className="text-red-500 text-sm">{errors.displayName}</p>}
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Password Update */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Avatar Upload */}
        {step === 3 && (
          <div className="space-y-4">
            <label className="block font-medium mb-1">Profile Picture</label>
            <div
              {...getRootProps()}
              className={`border-dashed border-2 p-6 rounded-md text-center cursor-pointer transition ${
                isDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              {formData.avatar ? (
                <img
                  src={formData.avatar.preview}
                  alt="avatar preview"
                  className="w-32 h-32 mx-auto rounded-full object-cover"
                />
              ) : (
                <p>Drag & Drop or click to upload avatar</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="ml-auto px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="ml-auto px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
            >
              Save Changes
            </button>
          )}
        </div>

        {errors.submit && <p className="text-red-500 mt-4 text-center">{errors.submit}</p>}
        {successMessage && <p className="text-green-500 mt-4 text-center">{successMessage}</p>}
      </motion.div>
    </div>
  );
};

export default Settings;
