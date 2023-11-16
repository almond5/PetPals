import { getSession, useSession } from 'next-auth/react';
import router from 'next/router';
import { useMemo, useState } from 'react';
import prisma from '@/lib/prismadb';
import { PetProfile } from '@prisma/client';
import EditProfile from '@/components/EditProfile';
import CreateProfile from '@/components/CreateProfile';
import { useJsApiLoader, useLoadScript } from '@react-google-maps/api';

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession(context);
    const currUser = session?.user;

    const user = await prisma.user.findFirst({
      where: { email: currUser?.email! },
    });

    const petProfile = await prisma.petProfile.findFirst({
      where: { userId: user?.id! },
    });

    return {
      props: {
        petProfile: petProfile,
      },
    };
  } catch (error) {
    const petProfile = null;
    return {
      props: {
        petProfile: petProfile,
      },
    };
  }
}

const Profile = ({ petProfile }: { petProfile: any }) => {
  const [userProfile] = useState<PetProfile>(petProfile);
  const { status: sesh, data: data } = useSession();

  // check user has a petProfile and make it so it uses editProfile API
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
        <EditProfile petProfile={petProfile}></EditProfile>
      </>
    );
  }
};

export default Profile;
