"use client"
import { useContext } from "react"
import { X, User, Mail, MapPin, Calendar, Settings, LogOut } from "lucide-react"
import { AuthContext } from "../context/AuthProvider"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const ProfileModal = ({ isOpen, onClose }) => {
  const {authUser, setAuthUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/logout", {
        method: "POST",
        credentials: "include",
      })
      const data = await response.json()
      if (response.ok) {
        setAuthUser(null)
        localStorage.removeItem("Users")
        localStorage.removeItem("User")
        localStorage.removeItem("Admin")
        toast.success(data.message || "Logout successful")
        onClose()
        navigate("/")
      } else {
        toast.error(data.message || "Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Error: " + error.message)
    }
  }

  if (!isOpen || !authUser) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Profile Picture and Basic Info */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
              {authUser.profilePic ? (
                <img
                  src={authUser.profilePic || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{authUser.fullname || "No Name"}</h3>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {authUser.role || "User"}
            </span>
          </div>

          {/* User Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{authUser.email}</p>
              </div>
            </div>

            {authUser.location && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{authUser.location}</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium text-gray-900">
                  {authUser.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : "Recently joined"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
              <Settings className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal;
