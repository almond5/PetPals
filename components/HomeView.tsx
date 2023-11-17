import React, { useState } from 'react';
import { PetProfile } from '@prisma/client';
import styles from '/styles/dashboard.module.css';
import { FcDislike, FcLike } from 'react-icons/fc';

const HomeView = (props: { petProfiles: any; petProfile: any; setProfiles: any }) => {
  const handleDislike = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('here');

    // do api call [reference createProfile]
  };

  const removeItem = (index: any) => {
    props.setProfiles(props.petProfiles.filter((i: any) => index !== i.id));
  };

  return (
    <div className="py-20 flex justify-center">
      <div className={styles.cardContainer}>
        {props.petProfiles.map((petProfile: any) => (
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
                <button
                  onClick={(e) => {
                    removeItem(petProfile.id);
                    handleDislike(e);
                  }}
                >
                  {' '}
                  <FcDislike style={{ fontSize: '40px' }} />
                </button>
                <button onClick={() => {}}>
                  {' '}
                  <FcLike style={{ fontSize: '40px' }} />
                </button>{' '}
                <button onClick={() => {}}> Skip</button>{' '}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
