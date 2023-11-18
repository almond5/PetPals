import React, { useState } from 'react';
import { PetProfile } from '@prisma/client';
import styles from '/styles/dashboard.module.css';

const MatchesView = (props: { petProfiles: any; petProfile: any }) => {
  const [profile] = useState<PetProfile>(props.petProfile);
  const [profiles] = useState<PetProfile[]>(props.petProfiles);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="py-20 flex justify-center">
      Matches
    </div>
  );
};

export default MatchesView;