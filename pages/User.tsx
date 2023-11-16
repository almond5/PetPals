import { getSession, useSession } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
import prisma from '@/lib/prismadb';
import { User } from '@prisma/client';
import EditUser from '@/components/EditUser';
import Register from '@/pages/Register';

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession(context);
    const currUser = session?.user;

    const user = await prisma.user.findFirst({
      where: { email: currUser?.email! },
    });

    return {
      props: {
        user: {
          id: user?.id,
          phoneNumber: user?.phoneNumber,
          email: user?.email,
        },
      },
    };
  } catch (error) {
    const user = null;
    return {
      props: {
        user: user,
      },
    };
  }
}

const userCreation = ({ user }: { user: any }) => {
  const [userAccount] = useState<User>(user);
  const { status: sesh, data: data } = useSession();

  // check user has an account and make it so it uses EditUser API
  if (sesh === 'loading') {
    return <div>Loading...</div>;
  } else if (sesh === 'unauthenticated') {
    router.push('/');
  } else if (
    sesh === 'authenticated' &&
    (userAccount === null || userAccount === undefined)
  ) {
    return (
      <>
        <Register></Register>
      </>
    );
  } else if (
    sesh === 'authenticated' &&
    userAccount !== null &&
    userAccount !== undefined // start of edit problem
  ) {
    return (
      <>
        <EditUser user={userAccount}></EditUser>
      </>
    );
  }
};

export default userCreation;
