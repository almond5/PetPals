import { FcCheckmark } from 'react-icons/fc';
import { FcCancel } from 'react-icons/fc';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import styles from '../styles/matches.module.css';

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
        className={`${"outline bg-stone-50  w-[24rem] rounded-md flex flex-col"} ${styles.mobileOnlyDelete}`}
        style={{ wordWrap: 'break-word' }}
      >
        <form
          onSubmit={(e) => {
            handleDelete(e);
          }}
        >
          <div style={{backgroundColor: 'black', width: '100%', height: '60px'}}>
            <div style={{color: 'white', padding: '20px', fontFamily: 'Montserrat'}}>Delete User?</div>
          </div>
          <div className="flex flex-col pt-6 px-7">
            <div className="text-center text-xl" style={{fontFamily: 'Mali', fontWeight: '600px'}}>
                Please verify your identity
            </div>
          </div>
          <div className="mb-2 mt-3 px-7">
            <div style={{fontSize: '15px', fontFamily: 'Mali'}}>Enter Password:</div>
            <input
              onChange={(e) => handlePassword(e)}
              value={password}
              type="password"
              id="password"
              required
              placeholder="Enter your password"
              className="w-full outline outline-1 rounded py-2 px-3"
              style={{fontFamily: 'Mali'}}
            />
          </div>
          <div className="flex justify-evenly pt-3 px-9 pb-4">
            <div>
            <button
                type="submit"
                className={styles.saveBtn}
                style={{marginBottom: 0}}
              >
                <div className={styles.btnText} style={{textTransform: 'capitalize', letterSpacing: '2px'}}>Delete</div>
              </button>
            </div>
            <div>
              <button
                onClick={() => handleClose()}
                className="flex flex-col p-2 mb-4 px-4 justify-center font-bold"
                style={{fontFamily: 'Mali', border: '1px solid black', borderRadius: '5px', letterSpacing: '2px'}}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteModalView;