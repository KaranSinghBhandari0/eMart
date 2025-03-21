import { useContext, useState } from "react";
import { User, Mail, MapPin, Edit, Save } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {
    const { user, loading, updateProfile } = useContext(AuthContext);

    const [username, setUsername] = useState(user.username || "");
    const [address, setAddress] = useState(user.address || "");
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async () => {
        setIsEditing(false);
        await updateProfile(username, address);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md border">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Profile Settings</h2>

                <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Name</label>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                        <User className="text-gray-500" size={20} />
                        <input
                            type="text"
                            name="name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={!isEditing || loading}
                            className="w-full bg-transparent outline-none text-gray-700 disabled:text-gray-400"
                        />
                    </div>
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-200">
                        <Mail className="text-gray-500" size={20} />
                        <input
                            type="email"
                            name="email"
                            value={user?.email}
                            disabled
                            className="w-full bg-transparent outline-none text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Address Input */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Address</label>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                        <MapPin className="text-gray-500" size={20} />
                        <textarea
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={!isEditing || loading}
                            className="w-full bg-transparent outline-none text-gray-700 disabled:text-gray-400 resize-none"
                            rows={2}
                        />
                    </div>
                </div>

                <button
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-white font-medium rounded-lg transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-opacity-90 active:scale-95"} `}
                >
                    {isEditing ? <Save size={18} /> : <Edit size={18} />}
                    {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
            </div>
        </div>
    );
}
