import React, { useState } from 'react';
import { PetProfile } from '@prisma/client';

const MatchesView = (props: { matches: any; petProfile: any }) => {
  const [profile] = useState<PetProfile>(props.petProfile);
  const [matches] = useState<PetProfile[]>(props.matches);

  return (
    <div className='py-10'>
      <div className="flex justify-center mb-10">Matches</div>
      {matches.map((petProfile: any) => (
        <div key={petProfile.id}>
          <div className="flex justify-center">{petProfile.id}</div>
        </div>
      ))}
    </div>
  );
};

export default MatchesView;
