import { signOut } from 'next-auth/react';
import { useState } from 'react';

const AccountView = (props: { userProfile: any }) => {
  const [newEmail, setNewEmail] = useState(props.userProfile.email);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const submitUserEdit = async (userProfile: {
    userEmail: string | undefined | null;
    newEmail: string | undefined | null;
    newPassword: string | undefined | null;
    oldPassword: string | undefined | null;
  }) => {
    try {
      const response = await fetch('/api/userEdit', {
        method: 'POST',
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data);
        return null;
      }

      return true;
    } catch (error) {
      alert('Invalid Credentials!');
      return null;
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const userEmail = props.userProfile.email;

    const userProfile = {
      userEmail,
      newEmail,
      newPassword,
      oldPassword,
    };

    const success = await submitUserEdit(userProfile);

    if (success) {
      await signOut({ callbackUrl: '/' });
    }

    setNewEmail(props.userProfile.email);
    setNewPassword('');
    setOldPassword('');
  };

  const handlePassword = async (e: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    setNewPassword(e.target.value);
  };

  const handleOldPassword = async (e: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    setOldPassword(e.target.value);
  };

  return (
    <div className="py-10">
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="font-bold">Email</div>{' '}
            <input
              id="newEmail"
              type="text"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="w-full outline outline-2 rounded py-2 px-3"
              maxLength={200}
            />
          </div>
          <div className="mb-6">
            <div className="font-bold">New Password</div>{' '}
            <input
              onChange={(e) => handlePassword(e)}
              value={newPassword}
              type="password"
              id="newPassword"
              required
              placeholder="Enter your password"
              className="w-full outline outline-2 rounded py-2 px-3"
            />
          </div>
          <div className="mb-6">
            <div className="font-bold">Old Password</div>{' '}
            <input
              onChange={(e) => handleOldPassword(e)}
              value={oldPassword}
              type="password"
              id="oldPassword"
              required
              placeholder="Enter your password"
              className="w-full outline outline-2 rounded py-2 px-3"
            />
          </div>

          <div className="mb-6"></div>
          <div className="flex flex-col justify-center mb-10">
            <button type="submit" className="font-bold">
              Save
            </button>
            <div className="flex flex-col px-10">(Will log you out)</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountView;
