import React, { useState } from 'react';
import { PetProfile } from '@prisma/client';
import styles from '/styles/dashboard.module.css';
import { FcDislike, FcLike } from 'react-icons/fc';

const HomeView = (props: { petProfiles: any; petProfile: any }) => {
  const [profile] = useState<PetProfile>(props.petProfile);
  const [profiles] = useState<PetProfile[]>(props.petProfiles);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="py-20 flex justify-center">
      <div className={styles.cardContainer}>
        {profiles.map((petProfile: any) => (
          <div key={petProfile.id}>
            <div className={styles.swipe}>
              <div
                style={{
                  backgroundImage:
                    'url(' +
                    process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL +
                    '/' +
                    petProfile.image.publicId +
                    ')',
                  position: 'relative',
                }}
                className={styles.card}
              >
                <div className={styles.cardBottomContainer}>
                  <div> {petProfile.name}</div>
                  <div>{petProfile.description}</div>
                  <div>{petProfile.location.address}</div>
                </div>
              </div>
              <div className="flex justify-evenly py-10">
                <button onClick={() => {}}>
                  {' '}
                  <FcDislike style={{ fontSize: '40px' }} />
                </button>
                <button onClick={() => {}}>
                  {' '}
                  <FcLike style={{ fontSize: '40px' }} />
                </button>{' '}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
