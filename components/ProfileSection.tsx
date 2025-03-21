import React, { useEffect, useState } from 'react';
import { User, Loader2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ProfileSectionProps {
  onBack: () => void;
}

interface ProfileData {
  name?: string;
  dob?: string;
  gender?: string;
  mobile?: string;
  email?: string;
  photo?: string;
  [key: string]: any;
}

export default function ProfileSection({ onBack }: ProfileSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Function to convert hex to binary array
  const hexToBinary = (hexString: string): Uint8Array => {
    // Remove any whitespace and line breaks
    const cleanHex = hexString.replace(/[\s\n]/g, '');
    const numbers = new Uint8Array(cleanHex.length / 2);
    
    for (let i = 0; i < cleanHex.length; i += 2) {
      numbers[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
    }
    
    return numbers;
  };

  // Function to handle image download
  const handleDownload = () => {
    if (profileData?.photo) {
      try {
        // Convert hex to binary
        const binaryData = hexToBinary(profileData.photo);
        
        // Create blob from binary data
        const blob = new Blob([binaryData], { type: 'image/png' });
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'profile-photo.png';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        window.URL.revokeObjectURL(url);
        
        toast.success('Photo downloaded successfully!', {
          duration: 3000,
          position: 'top-center'
        });
      } catch (error) {
        console.error('Error downloading image:', error);
        toast.error('Failed to download photo', {
          duration: 3000,
          position: 'top-center'
        });
      }
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const accessToken = sessionStorage.getItem('token');
      const X_Token = sessionStorage.getItem('X_Token');
      const url = process.env.NEXT_PUBLIC_API_URL;

      if (!accessToken || !X_Token) {
        throw new Error('Authentication tokens not found');
      }

      const response = await fetch(`${url}/api/profile`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accessToken,
          X_Token: X_Token
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      
      // If the response contains hex image data
      if (data.photo) {
        try {
          const binaryData = hexToBinary(data.photo);
          const blob = new Blob([binaryData], { type: 'image/png' });
          const imageUrl = URL.createObjectURL(blob);
          setProfileImage(imageUrl);
        } catch (error) {
          console.error('Error processing image data:', error);
          toast.error('Failed to load profile image', {
            duration: 3000,
            position: 'top-center'
          });
        }
      }
      
      setProfileData(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch profile';
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center'
      });
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-white/80 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="relative inline-block">
          {profileImage ? (
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl overflow-hidden mx-auto mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                <img 
                  src={profileImage} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={handleDownload}
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg p-2 rounded-full hover:bg-white/20 transition-colors duration-200 group-hover:opacity-100 opacity-0"
                title="Download photo"
              >
                <Download className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 transform transition-transform hover:scale-110 hover:rotate-3">
              <User className="text-white w-12 h-12" />
            </div>
          )}
        </div>

        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          {profileData?.name || 'Profile Information'}
        </h2>
      </motion.div>

      {profileData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-white/60 text-sm font-medium mb-1">Full Name</h3>
                <p className="text-white text-lg">{profileData.name || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="text-white/60 text-sm font-medium mb-1">Date of Birth</h3>
                <p className="text-white text-lg">
                  {profileData.dob ? new Date(profileData.dob).toLocaleDateString() : 'Not provided'}
                </p>
              </div>
              <div>
                <h3 className="text-white/60 text-sm font-medium mb-1">Gender</h3>
                <p className="text-white text-lg capitalize">{profileData.gender || 'Not provided'}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-white/60 text-sm font-medium mb-1">Mobile Number</h3>
                <p className="text-white text-lg">{profileData.mobile || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="text-white/60 text-sm font-medium mb-1">Email Address</h3>
                <p className="text-white text-lg">{profileData.email || 'Not provided'}</p>
              </div>
              {profileData.abhaNumber && (
                <div>
                  <h3 className="text-white/60 text-sm font-medium mb-1">ABHA Number</h3>
                  <p className="text-white text-lg">{profileData.abhaNumber}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white/60 text-sm font-medium mb-1">Profile Status</h3>
                <p className="text-white text-lg flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Active
                </p>
              </div>
              <div>
                <h3 className="text-white/60 text-sm font-medium mb-1">Last Updated</h3>
                <p className="text-white text-lg">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {!profileData && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white/80 p-8 bg-white/5 rounded-2xl"
        >
          <p>No profile data available</p>
        </motion.div>
      )}
    </div>
  );
}