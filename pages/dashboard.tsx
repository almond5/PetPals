import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import router from 'next/router';

const Dashboard = () => {
  const { status: sesh, data: data } = useSession();

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    router.push('/');
  }

  if (sesh === 'authenticated') {
    return (
      <div className="py-10">
        <div>Hi {data.user?.email}</div>
        <button
          onClick={() =>
            signOut({ callbackUrl: '/' })
          }
        >
          Sign-Out
        </button>
      </div>
    );
  }
};

export default Dashboard;
