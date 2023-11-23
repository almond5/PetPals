import { FcCheckmark } from 'react-icons/fc';
import { FcCancel } from 'react-icons/fc';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';

const DeleteModalView = (props: {
  setDeleteModalView: any;
  userProfile: any;
}) => {
  const [password, setPassword] = useState('');

  const handleClose = () => {
    props.setDeleteModalView(false);
  };

  const submitDelete = async (deleteUser: {
    userEmail: string | undefined | null;
  }) => {
    try {
      const response = await fetch('/api/userDelete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteUser),
      });

      if (response.ok) {
        alert('Successfully deleted! Signing you out now.');
        return true;
      } else {
        // Handle HTTP errors if any
        if (response.status === 500) {
          alert('Incorrect Password!');
        } else if (response.status === 501) {
          alert('User not found!');
        } else if (response.status === 405) {
          alert('Unknown Error Occurred!');
        }
        return null;
      }
    } catch (error) {
      // Handle other potential errors
      return null;
    }
  };

  const handlePassword = async (e: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const deleteUser = {
      userEmail: props.userProfile.email,
      password: password,
    };

    const res = await submitDelete(deleteUser);

    if (res !== null) {
      await signOut({ callbackUrl: '/' });
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-center bg-gray-600 
  bg-opacity-50 z-50"
    >
      <div
        className="w-[16rem] outline bg-stone-50 h-[12rem]
    p-4 rounded-lg flex flex-col"
        style={{ wordWrap: 'break-word' }}
      >
        <form
          onSubmit={(e) => {
            handleDelete(e);
          }}
        >
          <div className="flex flex-col">
            <div className="text-center text-xl font-semibold">
              Enter your password to delete your account:
            </div>
          </div>
          <div className="mb-2 mt-3">
            <input
              onChange={(e) => handlePassword(e)}
              value={password}
              type="password"
              id="newPassword"
              required
              placeholder="Enter your password"
              className="w-full outline outline-2 rounded py-2 px-3"
            />
          </div>
          <div className="flex justify-center">
            <div className="pr-5">
              <button
                onClick={() => handleClose()}
                className="rounded-full py-0.5 font-bold transition hover:bg-gray-300 
        hover:text-gray-800 text-Lg "
              >
                <FcCancel style={{ fontSize: '40px' }} />
              </button>
            </div>
            <div className="pl-5">
              <button
                type="submit"
                className="rounded-full py-0.5 font-bold transition hover:bg-gray-300 
          hover:text-gray-800 text-Lg"
              >
                <FcCheckmark style={{ fontSize: '40px' }} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteModalView;
