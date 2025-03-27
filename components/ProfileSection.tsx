import React, { useEffect, useState } from 'react';
import { User, Loader2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { apiClient } from '../lib/axios';

interface ProfileSectionProps {
  onBack: () => void;
}

interface ProfileData {
  image?: string;
}

export default function ProfileSection({ onBack }: ProfileSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleDownload = () => {
    if (profileData?.image) {
      try {
        const link = document.createElement('a');
        link.href = `data:image/png;base64,${profileData.image}`;
        link.download = 'profile-photo.png';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
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

      if (!accessToken || !X_Token) {
        throw new Error('Authentication tokens not found');
      }

      const { data } = await apiClient.post('/api/profile', {
        accessToken,
        X_Token
      });
      
      if (data.image) {
        setProfileImage(`data:image/png;base64,${data.image}`);
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
          <p className="text-white/80 text-lg">Loading image...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative group"
      >
        {profileImage ? (
          <>
            <div className="rounded-3xl overflow-hidden shadow-xl transform transition-transform group-hover:scale-105">
              <img 
                src={profileImage} 
                alt="Profile"
                className="max-w-full h-auto"
              />
            </div>
            <button
              onClick={handleDownload}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg p-3 rounded-full hover:bg-white/20 transition-colors duration-200 group-hover:opacity-100 opacity-0 shadow-lg"
              title="Download photo"
            >
              <Download className="w-5 h-5 text-black" />
            </button>
          </>
        ) : (
          <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 w-32 h-32 rounded-3xl flex items-center justify-center transform transition-transform hover:scale-105">
            <User className="text-white w-16 h-16" />
          </div>
        )}
      </motion.div>
    </div>
  );
}