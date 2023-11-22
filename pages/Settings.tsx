import { getSession, signOut, useSession } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
import EditPetProfile from '@/components/EditPetProfile';
import CreatePetProfile from '@/components/CreatePetProfile';
import AccountView from '../components/AccountView';
import prisma from '@/lib/prismadb';
import { VscSignOut } from 'react-icons/vsc';

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession(context);
    const currUser = session?.user;

    const user = await prisma.user.findFirst({
      where: { email: currUser?.email! },
    });

    const petProfile = await prisma.petProfile.findFirst({
      where: { userId: user?.id! },
      include: { image: {}, location: {}, myInterests: {}, interestedInMe: {} },
    });

    return {
      props: {
        userProfile: user,
        petProfile: petProfile,
      },
    };
  } catch (error) {
    const userProfile = null;
    const petProfile = null;
    return {
      props: {
        userProfile: userProfile,
        petProfile: petProfile,
      },
    };
  }
}

const Settings = ({
  petProfile,
  userProfile,
}: {
  petProfile: any;
  userProfile: any;
}) => {
  const [profileView, setProfileView] = useState(false);
  const [accountView, setAccountView] = useState(false);

  const { status: sesh, data: data } = useSession();

  // check user has a petProfile and make it so it uses editProfile API
  if (sesh === 'loading') {
    return <div>Loading...</div>;
  } else if (
    sesh === 'authenticated' &&
    (petProfile === null || petProfile === undefined)
  ) {
    return <CreatePetProfile></CreatePetProfile>;
  } else if (
    sesh === 'authenticated' &&
    petProfile !== null &&
    petProfile !== undefined // start of edit problem
  ) {
    return (
      <div>
        <div className="header">
          PetPals
          <button
            className="absolute right-10 top-8"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <VscSignOut style={{ fontSize: '40px' }} />
          </button>
        </div>
        <div className="absolute flex flex-col">
          <div className="py-5">
            <button
              onClick={() => {
                router.push('/Settings');
              }}
            >
              Settings
            </button>{' '}
          </div>
          <div className="py-5">
            <button
              onClick={() => {
                router.push('/Matches');
              }}
            >
              Matches
            </button>{' '}
          </div>
          <div className="py-5">
            <button
              onClick={() => {
                router.push('/Cards');
              }}
            >
              Cards
            </button>{' '}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-10">
          <button
            onClick={() => {
              setAccountView(false);
              setProfileView(true);
            }}
          >
            <div>Edit Profile</div>
          </button>
          <button
            onClick={() => {
              setProfileView(false);
              setAccountView(true);
            }}
          >
            <div>Account Settings</div>
          </button>
          <div className={`${profileView ? '' : 'hidden'}`}>
            <EditPetProfile
              petProfile={petProfile}
              userProfile={userProfile}
            ></EditPetProfile>
          </div>
          <div className={`${accountView ? '' : 'hidden'}`}>
            <AccountView userProfile={userProfile}></AccountView>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Error...</div>;
  }
};

export default Settings;
