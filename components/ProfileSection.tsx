"use client";
import React from 'react';
import { User, LogOut, Download } from 'lucide-react';
import { logout, getProfile, getQrCode, getJustProfile } from '../lib/axios';
import { toast } from 'sonner';

interface ProfileData {
  ABHANumber: string;
  preferredAbhaAddress: string;
  mobile: string;
  name: string;
  gender: string;
  yearOfBirth: string;
  dayOfBirth: string;
  monthOfBirth: string;
  status: string;
  stateName: string;
  districtName: string;
  pincode: string;
  address: string;
  profilePhoto: string;
  kycPhoto: string;
  kycVerified: boolean;
  verificationStatus: string;
  verificationType: string;
  createdDate: string;
}

const ProfileSection: React.FC = () => {
  const [profileData, setProfileData] = React.useState<ProfileData | null>(null);
  const [qrCode, setQrCode] = React.useState<string | null>(null);
  const [abhaCard, setAbhaCard] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState('basic');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [profile, qrResponse, justProfile] = await Promise.all([
          getProfile(),
          getQrCode(),
          getJustProfile()
        ]);

        // Handle profile photos
        if (profile.profilePhoto && !profile.profilePhoto.startsWith('data:image')) {
          profile.profilePhoto = `data:image/jpeg;base64,${profile.profilePhoto}`;
        }
        if (profile.kycPhoto && !profile.kycPhoto.startsWith('data:image')) {
          profile.kycPhoto = `data:image/jpeg;base64,${profile.kycPhoto}`;
        }

        // Handle QR code - now expecting { qrCode: "base64url" } format
        if (qrResponse && qrResponse.qrCode) {
          const qrDataUrl = `data:image/png;base64,${qrResponse.qrCode}`;
          setQrCode(qrDataUrl);
        }

        // Handle ABHA Card
        if (justProfile.image) {
          setAbhaCard(`data:image/png;base64,${justProfile.image}`);
        }

        setProfileData(profile);
      } catch (error) {
        toast.error('Failed to load profile data');
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadAbhaCard = () => {
    if (abhaCard) {
      const link = document.createElement('a');
      link.href = abhaCard;
      link.download = 'ABHA-Card.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadQrCode = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = 'ABHA-QR.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your profile...</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Failed to load profile data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Header with Logout */}
          <div className="flex justify-end mb-6">
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-white/10">
              {profileData.profilePhoto ? (
                <img 
                  src={profileData.profilePhoto}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-full h-full p-4 text-white/60" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{profileData.name}</h1>
              <p className="text-white/80">ABHA Number: {profileData.ABHANumber}</p>
              <p className="text-white/60">{profileData.preferredAbhaAddress}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('basic')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'basic' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              Basic Info
            </button>
            <button
              onClick={() => setActiveTab('address')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'address' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              Address
            </button>
            <button
              onClick={() => setActiveTab('kyc')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'kyc' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              KYC Details
            </button>
            <button
              onClick={() => setActiveTab('abha')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'abha' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              ABHA Card
            </button>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeTab === 'basic' && (
              <>
                <div className="space-y-4">
                  <InfoItem label="Full Name" value={profileData.name} />
                  <InfoItem label="Gender" value={profileData.gender === 'F' ? 'Female' : profileData.gender === 'M' ? 'Male' : 'Other'} />
                  <InfoItem label="Date of Birth" 
                    value={`${profileData.dayOfBirth}/${profileData.monthOfBirth}/${profileData.yearOfBirth}`} 
                  />
                  <InfoItem label="Mobile" value={profileData.mobile} />
                </div>
                <div className="flex flex-col items-center justify-center bg-white/5 rounded-2xl p-6">
                  {qrCode ? (
                    <>
                      <img 
                        src={qrCode} 
                        alt="Profile QR Code" 
                        className="w-48 h-48 mb-4 bg-white p-2 rounded-lg"
                      />
                      <button
                        onClick={handleDownloadQrCode}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg text-white mt-4"
                      >
                        <Download className="w-5 h-5" />
                        Download QR Code
                      </button>
                    </>
                  ) : (
                    <div className="text-white/60">Loading QR code...</div>
                  )}
                  <p className="text-white/60 text-center mt-4">
                    Scan this QR code to view your health information
                  </p>
                </div>
              </>
            )}

            {activeTab === 'address' && (
              <div className="col-span-2 space-y-4">
                <InfoItem label="Address" value={profileData.address} />
                <InfoItem label="State" value={profileData.stateName} />
                <InfoItem label="District" value={profileData.districtName} />
                <InfoItem label="Pincode" value={profileData.pincode} />
              </div>
            )}

            {activeTab === 'kyc' && (
              <div className="col-span-2 space-y-4">
                <InfoItem 
                  label="KYC Status" 
                  value={profileData.kycVerified ? 'Verified' : 'Not Verified'} 
                  verified={profileData.kycVerified}
                />
                <InfoItem label="Verification Type" value={profileData.verificationType} />
                <InfoItem label="Verification Status" value={profileData.verificationStatus} />
                <InfoItem label="Created Date" value={profileData.createdDate} />
                {profileData.kycPhoto && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/60 text-sm mb-4">KYC Photo</p>
                    <img 
                      src={profileData.kycPhoto} 
                      alt="KYC Photo"
                      className="max-w-sm rounded-lg"
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'abha' && (
              <div className="col-span-2 space-y-6">
                <div className="flex justify-end">
                  <button
                    onClick={handleDownloadAbhaCard}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg text-white"
                  >
                    <Download className="w-5 h-5" />
                    Download ABHA Card
                  </button>
                </div>
                {abhaCard && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <img 
                      src={abhaCard} 
                      alt="ABHA Card"
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{
  label: string;
  value: string;
  verified?: boolean;
}> = ({ label, value, verified }) => (
  <div className="bg-white/5 rounded-xl p-4">
    <p className="text-white/60 text-sm mb-1">{label}</p>
    <div className="flex items-center">
      <p className="text-white text-lg">{value}</p>
      {verified !== undefined && (
        <span className={`ml-2 text-sm ${verified ? 'text-green-400' : 'text-red-400'}`}>
          {verified ? '✓ Verified' : '✗ Not Verified'}
        </span>
      )}
    </div>
  </div>
);

export default ProfileSection;