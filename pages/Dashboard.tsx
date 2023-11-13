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
      where: { email: currUser?.email! },
    });

    const profile = await prisma.profile.findFirst({
      where: { userId: user?.id! },
    });

    const profiles = await prisma.profile.findMany({
      where: {
        NOT: { id: profile?.id },
      },
    });

    console.log(profiles);

    return {
      props: {
        profile: profile,
        profiles: profiles,
      },
    };
  } catch (error) {
    const profile = null;
    const profiles = null;
    return {
      props: {
        profile: profile,
        profiles: profiles,
      },
    };
  }
}

const Dashboard = ({ profile, profiles }: { profile: any; profiles: any }) => {
  const { status: sesh, data: data } = useSession();
  const [userProfile] = useState<Profile>(profile);
  const [userProfiles] = useState<Profile[]>(profiles);

  if (sesh === 'loading') {
    return <div>Loading...</div>;
  } else if (sesh === 'unauthenticated') {
    router.push('/');
  } else if (userProfile === null || userProfile === undefined) {
    router.push('/Profile');
  } else if (sesh === 'authenticated' && userProfile !== null) {
    return (
      <div>
        <div>
          Hi {userProfile.name}
          {data.user?.email}
        </div>
        <button onClick={() => signOut({ callbackUrl: '/' })}>Sign-Out</button>
      
        <div className="py-20 flex justify-center">
        Signed in user: {userProfile.id}
          <div className="container h-[580px] w-[400px] border-gray-900 border-2">
            {/* <img src="/img/card.png" /> */}
            {userProfiles.map((profile: any) => (
              <div key={profile.id}>{profile.id}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
