import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser, updatePassword } = useContext(AuthContext)!;
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setUsername(user?.username || '');
    setEmail(user?.email || '');
  }, [user?.username, user?.email]);

  const updateProfileMutation = useMutation({
    mutationFn: (profileData: { username: string; email: string }) => {
      if (!user?._id) {
        return Promise.reject(new Error('User ID not found. Cannot update profile.'));
      }
      return updateUser(user._id, profileData);
    },
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      onClose();
    },
    onError: (error: any) => {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.error || 'Failed to update profile.');
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (passwordData: { currentPassword: string; newPassword: string }) => {
      if (!user?._id) {
        return Promise.reject(new Error('User ID not found. Cannot update password.'));
      }
      return updatePassword(user._id, passwordData);
    },
    onSuccess: () => {
      toast.success('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onClose();
    },
    onError: (error: any) => {
      console.error('Error updating password:', error);
      toast.error(error.response?.data?.error || 'Failed to update password.');
    },
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === '') {
      toast.error('Username cannot be empty.');
      return;
    }
    if (email.trim() === '') {
      toast.error('Email cannot be empty.');
      return;
    }
    if (username === user?.username && email === user?.email) {
      toast.info('No changes detected.');
      onClose();
      return;
    }
    updateProfileMutation.mutate({ username: username.trim(), email: email.trim() });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password must match.');
      return;
    }

    if (currentPassword === newPassword) {
      toast.error('New password must be different from current password.');
      return;
    }

    updatePasswordMutation.mutate({ currentPassword, newPassword });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content card">
        <div className="card-header">
          <h5>Edit Profile</h5>
          <button
            type="button"
            className="profile-modal-close"
            onClick={onClose}
            disabled={updateProfileMutation.isPending || updatePasswordMutation.isPending}
            aria-label="Close edit profile modal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-body profile-modal-body">
          <form onSubmit={handleProfileSubmit} className="profile-modal-form">
            <div className="form-group profile-modal-field">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={updateProfileMutation.isPending}
                required
              />
            </div>
            <div className="form-group profile-modal-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={updateProfileMutation.isPending}
                required
              />
            </div>
            <div className="profile-modal-actions">
              <button
                type="button"
                className="btn btn-secondary profile-modal-button"
                onClick={onClose}
                disabled={updateProfileMutation.isPending || updatePasswordMutation.isPending}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary profile-modal-button"
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
          <div className="profile-modal-divider" />
          <form onSubmit={handlePasswordSubmit} className="profile-modal-form">
            <h6 className="profile-modal-section-title">Change Password</h6>
            <p className="profile-modal-section-copy">
              Use your current password to set a new one for this account.
            </p>
            <div className="form-group profile-modal-field">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                className="form-control"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={updatePasswordMutation.isPending}
                required
              />
            </div>
            <div className="form-group profile-modal-field">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={updatePasswordMutation.isPending}
                required
              />
            </div>
            <div className="form-group profile-modal-field">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={updatePasswordMutation.isPending}
                required
              />
            </div>
            <div className="profile-modal-actions profile-modal-actions-single">
              <button
                type="submit"
                className="btn btn-primary profile-modal-button"
                disabled={updatePasswordMutation.isPending}
              >
                {updatePasswordMutation.isPending ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
