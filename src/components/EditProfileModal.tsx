import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser } = useContext(AuthContext)!;
  const [username, setUsername] = useState(user?.username || '');

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user?.username]);

  const updateProfileMutation = useMutation({
    mutationFn: (newUsername: string) => {
      if (!user?._id) {
        return Promise.reject(new Error("User ID not found. Cannot update profile."));
      }
      return updateUser(user._id, { username: newUsername });
    },
    onSuccess: () => {
      toast.success('Username updated successfully!');
      onClose();
    },
    onError: (error: any) => {
      console.error('Error updating username:', error);
      toast.error(error.response?.data?.error || 'Failed to update username.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === '') {
      toast.error('Username cannot be empty.');
      return;
    }
    if (username === user?.username) {
      toast.info('No changes detected.');
      onClose();
      return;
    }
    updateProfileMutation.mutate(username);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content card">
        <div className="card-header">
          <h5>Edit Profile</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
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
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={updateProfileMutation.isPending}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
