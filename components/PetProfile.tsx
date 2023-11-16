import { useSession } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
import { PetProfile } from '@prisma/client';
import EditProfile from '@/components/EditProfile';
import CreateProfile from '@/components/CreateProfile';

const PetProfile = (props: { petProfile: any }) => {
  const [petProfile] = useState<PetProfile>(props.petProfile);
  const { status: sesh, data: data } = useSession();

  // check user has a petProfile and make it so it uses editProfile API
  if (sesh === 'loading') {
    return <div>Loading...</div>;
  } else if (
    sesh === 'authenticated' &&
    (petProfile === null || petProfile === undefined)
  ) {
    return <CreateProfile></CreateProfile>
  } else if (
    sesh === 'authenticated' &&
    petProfile !== null &&
    petProfile !== undefined // start of edit problem
  ) {
    return <EditProfile petProfile={petProfile}></EditProfile>;
  }
  else {
    return <div>Error...</div>
  }
};

export default PetProfile;
