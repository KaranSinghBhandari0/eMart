import { useState } from "react";
import { User, Mail, MapPin, Save, Lock, Phone, Home, Navigation } from "lucide-react";
import { AuthStore } from "../store/AuthStore";

export default function ProfilePage() {
    const { user, updatingProfile, updateProfile } = AuthStore();

    const [formData, setFormData] = useState({
        username: user.username || "",
        phone: user.phone || "",
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zipCode: user.address?.zipCode || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        const updatedData = {
            username: formData.username,
            phone: formData.phone,
            address: {
                street: formData.street,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode
            },
        };

        await updateProfile(updatedData);
    };

    // Check if any field has been modified
    const isDirty = Object.keys(formData).some(key => 
        formData[key] !== (user[key] || user.address?.[key] || '')
    );

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                    <h2 className="text-2xl font-bold">Profile Settings</h2>
                    <p className="text-indigo-100">Manage your personal information</p>
                </div>

                <div className="p-6 sm:p-8">
                    {/* Personal Information Section */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <User className="text-indigo-500" size={20} />
                            Personal Information
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
                                    <User className="text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        disabled={updatingProfile}
                                        className="w-full bg-transparent outline-none text-gray-700 disabled:text-gray-500"
                                        placeholder="Your Name"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                                    <Mail className="text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        value={user?.email}
                                        disabled
                                        className="w-full bg-transparent outline-none text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                                    <Phone className="text-gray-400" size={18} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={updatingProfile}
                                        className="w-full bg-transparent outline-none text-gray-700 disabled:text-gray-500"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Home className="text-indigo-500" size={20} />
                            Address Information
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Street */}
                            <div className="space-y-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Street Address</label>
                                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
                                    <MapPin className="text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        disabled={updatingProfile}
                                        className="w-full bg-transparent outline-none text-gray-700 disabled:text-gray-500"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* City */}
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                                    <Navigation className="text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        disabled={updatingProfile}
                                        className="w-full bg-transparent outline-none text-gray-700 disabled:text-gray-500"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* State */}
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">State</label>
                                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        disabled={updatingProfile}
                                        className="w-full bg-transparent outline-none text-gray-700 disabled:text-gray-500"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Zip Code */}
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        disabled={updatingProfile}
                                        className="w-full bg-transparent outline-none text-gray-700 disabled:text-gray-500"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button
                            onClick={handleSave}
                            disabled={!isDirty || updatingProfile}
                            className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center gap-2 ${
                                isDirty && !updatingProfile 
                                    ? "bg-indigo-600 hover:bg-indigo-700" 
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            <Save size={16} />
                            {updatingProfile ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}