import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import router from 'next/router';
import prisma from '@/lib/prismadb';
import { Profile } from '@prisma/client';

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession(context);
    const currUser = session?.user;

    const user = await prisma.user.findFirst({
      where: { email: currUser?.email! }
    })

    const profile = await prisma.profile.findFirst({
      where: { userId: user?.id! },
    });

    if (profile === null || profile === undefined)
    {
      router.push('/Profile');
    }

    return {
      props: {
        profile: profile,
      },
    };
  } catch (error) {
    const profile = null;
    return {
      props: {
        profile: profile,
      },
    };
  }
}

const Dashboard = ({profile}: {profile: any}) => {
  const { status: sesh, data: data } = useSession();
  const [userProfile] = useState<Profile>(profile);

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    router.push('/');
  }

  if (userProfile === null) {
    router.push('/Profile');
  }

  if (sesh === 'authenticated') {
    return (
      <div className="py-10">
        <div>Hi {userProfile.id}</div>
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
