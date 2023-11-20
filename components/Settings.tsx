import { useSession } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
import { PetProfile, User } from '@prisma/client';
import EditPetProfile from '@/components/EditPetProfile';
import CreatePetProfile from '@/components/CreatePetProfile';
import AccountView from './AccountView';

const Settings = (props: { petProfile: any; userProfile: any }) => {
  const [petProfile] = useState<PetProfile>(props.petProfile);
  const [userProfile] = useState<User>(props.userProfile);
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
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={() => {
            setAccountView(false);
            setProfileView(true);
          }}
        >
          <div>Profile Settings</div>
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
          <AccountView
            userProfile={userProfile}
          ></AccountView>
        </div>
      </div>
    );
  } else {
    return <div>Error...</div>;
  }
};

export default Settings;
