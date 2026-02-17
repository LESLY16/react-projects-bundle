import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaSave, FaTimes, FaPlus, FaTrash, FaLock } from 'react-icons/fa';
import { selectCurrentUser, updateProfile, addAddress, updateAddress, deleteAddress } from '../store/slices/userSlice';
import { generateId } from '../utils/helpers';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || ''
  });

  const [addressData, setAddressData] = useState({
    id: '',
    label: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    dispatch(updateProfile(profileData));
    setIsEditingProfile(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setProfileData({
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || ''
    });
    setIsEditingProfile(false);
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddAddress = () => {
    const newAddress = {
      ...addressData,
      id: generateId()
    };
    dispatch(addAddress(newAddress));
    setIsAddingAddress(false);
    setAddressData({
      id: '',
      label: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false
    });
    toast.success('Address added successfully!');
  };

  const handleUpdateAddress = () => {
    dispatch(updateAddress(addressData));
    setIsEditingAddress(null);
    setAddressData({
      id: '',
      label: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false
    });
    toast.success('Address updated successfully!');
  };

  const handleDeleteAddress = (addressId) => {
    dispatch(deleteAddress(addressId));
    toast.success('Address deleted successfully!');
  };

  const startEditAddress = (address) => {
    setAddressData(address);
    setIsEditingAddress(address.id);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters!');
      return;
    }
    // In a real app, this would call an API
    toast.success('Password changed successfully!');
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>My Profile</h1>

        <div className="profile-grid">
          {/* User Info Card */}
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <img src={currentUser?.avatar || 'https://i.pravatar.cc/150'} alt={currentUser?.firstName} />
              </div>
              <div className="profile-info">
                <h2>{currentUser?.firstName} {currentUser?.lastName}</h2>
                <p className="profile-role">{currentUser?.role === 'admin' ? 'Administrator' : 'Customer'}</p>
                <p className="profile-joined">Member since {currentUser?.createdAt || '2024'}</p>
              </div>
            </div>

            <div className="profile-details">
              <h3>
                Personal Information
                {!isEditingProfile && (
                  <button className="icon-btn" onClick={() => setIsEditingProfile(true)}>
                    <FaEdit /> Edit
                  </button>
                )}
              </h3>

              {isEditingProfile ? (
                <div className="edit-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-actions">
                    <button className="btn-primary" onClick={handleSaveProfile}>
                      <FaSave /> Save Changes
                    </button>
                    <button className="btn-secondary" onClick={handleCancelEdit}>
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="info-list">
                  <div className="info-item">
                    <FaUser className="info-icon" />
                    <div>
                      <span className="info-label">Name</span>
                      <span className="info-value">{currentUser?.firstName} {currentUser?.lastName}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaEnvelope className="info-icon" />
                    <div>
                      <span className="info-label">Email</span>
                      <span className="info-value">{currentUser?.email}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaPhone className="info-icon" />
                    <div>
                      <span className="info-label">Phone</span>
                      <span className="info-value">{currentUser?.phone || 'Not provided'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Address Book */}
          <div className="profile-card">
            <h3>
              Address Book
              <button className="icon-btn" onClick={() => setIsAddingAddress(true)}>
                <FaPlus /> Add Address
              </button>
            </h3>

            {isAddingAddress && (
              <div className="address-form">
                <div className="form-group">
                  <label htmlFor="label">Label (e.g., Home, Office)</label>
                  <input
                    type="text"
                    id="label"
                    name="label"
                    value={addressData.label}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={addressData.address}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={addressData.city}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={addressData.state}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={addressData.zipCode}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={addressData.isDefault}
                      onChange={handleAddressChange}
                    />
                    Set as default address
                  </label>
                </div>
                <div className="form-actions">
                  <button className="btn-primary" onClick={handleAddAddress}>
                    <FaSave /> Save Address
                  </button>
                  <button className="btn-secondary" onClick={() => {
                    setIsAddingAddress(false);
                    setAddressData({
                      id: '',
                      label: '',
                      address: '',
                      city: '',
                      state: '',
                      zipCode: '',
                      isDefault: false
                    });
                  }}>
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="address-list">
              {currentUser?.addresses?.length > 0 ? (
                currentUser.addresses.map(address => (
                  <div key={address.id} className="address-card">
                    {isEditingAddress === address.id ? (
                      <div className="address-form">
                        <div className="form-group">
                          <label htmlFor="label">Label</label>
                          <input
                            type="text"
                            id="label"
                            name="label"
                            value={addressData.label}
                            onChange={handleAddressChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="address">Address</label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={addressData.address}
                            onChange={handleAddressChange}
                          />
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={addressData.city}
                              onChange={handleAddressChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="state">State</label>
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={addressData.state}
                              onChange={handleAddressChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="zipCode">ZIP</label>
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              value={addressData.zipCode}
                              onChange={handleAddressChange}
                            />
                          </div>
                        </div>
                        <div className="form-actions">
                          <button className="btn-primary" onClick={handleUpdateAddress}>
                            <FaSave /> Save
                          </button>
                          <button className="btn-secondary" onClick={() => setIsEditingAddress(null)}>
                            <FaTimes /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="address-header">
                          <span className="address-label">{address.label}</span>
                          {address.isDefault && <span className="default-badge">Default</span>}
                        </div>
                        <div className="address-details">
                          <p>{address.address}</p>
                          <p>{address.city}, {address.state} {address.zipCode}</p>
                        </div>
                        <div className="address-actions">
                          <button className="btn-icon" onClick={() => startEditAddress(address)}>
                            <FaEdit /> Edit
                          </button>
                          <button className="btn-icon danger" onClick={() => handleDeleteAddress(address.id)}>
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p className="empty-state">No addresses saved yet. Add your first address!</p>
              )}
            </div>
          </div>

          {/* Change Password */}
          <div className="profile-card">
            <h3>
              Security
              {!isChangingPassword && (
                <button className="icon-btn" onClick={() => setIsChangingPassword(true)}>
                  <FaLock /> Change Password
                </button>
              )}
            </h3>

            {isChangingPassword ? (
              <div className="password-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-actions">
                  <button className="btn-primary" onClick={handleChangePassword}>
                    <FaSave /> Update Password
                  </button>
                  <button className="btn-secondary" onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}>
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="security-info">
                <p>Keep your account secure by using a strong password</p>
                <ul>
                  <li>At least 8 characters long</li>
                  <li>Mix of uppercase and lowercase letters</li>
                  <li>Include numbers and special characters</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
