import { FcCheckmark } from 'react-icons/fc';
import { FcCancel } from 'react-icons/fc';
import React from 'react';
import { signOut } from 'next-auth/react';

const DeleteModalView = (props: {
  setDeleteModalView: any;
  userProfile: any;
}) => {
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
        // Handle successful petProfile creation
        // router.push('/Cards');
      } else {
        // Handle HTTP errors if any
        alert('Error');
      }
    } catch (error) {
      // Handle other potential errors
      console.error('Error', error);
    }
  };

  const handleDelete = async () => {
    const deleteUser = {
      userEmail: props.userProfile.email,
    };

    submitDelete(deleteUser);
    props.setDeleteModalView(false);
    await signOut({ callbackUrl: '/' });
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
        <div className="flex flex-col">
          <div className="text-center text-xl">
            Are you sure you want to delete your account?
          </div>
        </div>
        <div className="flex justify-center py-10">
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
              onClick={() => handleDelete()}
              className="rounded-full py-0.5 font-bold transition hover:bg-gray-300 
          hover:text-gray-800 text-Lg"
            >
              <FcCheckmark style={{ fontSize: '40px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalView;
