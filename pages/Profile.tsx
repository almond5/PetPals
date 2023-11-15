import { getSession, useSession } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
import prisma from '@/lib/prismadb';
import { Profile } from '@prisma/client';
import EditProfile from '@/components/EditProfile';
import CreateProfile from '@/components/CreateProfile';

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

const ProfileCreation = ({ profile }: { profile: any }) => {
  const [userProfile] = useState<Profile>(profile);
  const { status: sesh, data: data } = useSession();

  // check user has a profile and make it so it uses editProfile API
  if (sesh === 'loading') {
    return <div>Loading...</div>;
  } else if (sesh === 'unauthenticated') {
    router.push('/');
  } else if (
    sesh === 'authenticated' &&
    (userProfile === null || userProfile === undefined)
  ) {
    return (
      <>
        <CreateProfile></CreateProfile>
      </>
    );
  } else if (
    sesh === 'authenticated' &&
    userProfile !== null &&
    userProfile !== undefined // start of edit problem
  ) {
    return (
      <>
        <EditProfile profile={profile}></EditProfile>
      </>
    );
  }
};

export default ProfileCreation;
