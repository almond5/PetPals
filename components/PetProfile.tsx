import { useSession } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
import { PetProfile, User } from '@prisma/client';
import EditPetProfile from '@/components/EditPetProfile';
import CreatePetProfile from '@/components/CreatePetProfile';

const PetProfile = (props: { petProfile: any; userProfile: any }) => {
  const [petProfile] = useState<PetProfile>(props.petProfile);
  const [userProfile] = useState<User>(props.userProfile);

  const { status: sesh, data: data } = useSession();

  // check user has a petProfile and make it so it uses editProfile API
  if (sesh === 'loading') {
    return <div>Loading...</div>;
  } else if (
    sesh === 'authenticated' &&
    (petProfile === null || petProfile === undefined)
  ) {
    return <CreatePetProfile></CreatePetProfile>
  } else if (
    sesh === 'authenticated' &&
    petProfile !== null &&
    petProfile !== undefined // start of edit problem
  ) {
    return <EditPetProfile petProfile={petProfile} userProfile={userProfile}></EditPetProfile>;
  }
  else {
    return <div>Error...</div>
  }
};

export default PetProfile;
