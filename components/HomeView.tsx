import React, { useState } from 'react';
import { PetProfile } from '@prisma/client';
import styles from '/styles/dashboard.module.css';

const HomeView = (props: { petProfiles: any; petProfile: any }) => {
  const [profile] = useState<PetProfile>(props.petProfile);
  const [profiles] = useState<PetProfile[]>(props.petProfiles);
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

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
                <h1
                  style={{
                    position: 'absolute',
                    bottom: '30%',
                    left: '10%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    fontFamily: 'Papyrus, Fantasy',
                    fontSize: '24px',
                  }}
                >
                  {petProfile.name}
                </h1>

                <div>{petProfile.location.address}</div>

                <button
                  onClick={toggleDescription}
                  style={{
                    color: 'white',
                    bottom: '25%',
                    left: '10%',
                    position: 'absolute',
                  }}
                >
                  {showDescription ? 'Hide Description' : 'View Description'}
                </button>
                {showDescription && (
                  <p
                    style={{
                      color: 'white',
                      bottom: '20%',
                      position: 'absolute',
                    }}
                  >
                    Here is to describe...
                  </p>
                )}
              </div>
              <button
                onClick={() => {}}
                style={{
                  position: 'absolute',
                  bottom: '50%',
                  left: '80%',
                }}
              >
                <img
                  src="/img/red-heard.png"
                  alt="Red heard"
                  style={{ width: '40px', height: '40px' }}
                />
              </button>

              <button
                onClick={() => {}}
                style={{
                  position: 'absolute',
                  bottom: '35%',
                  left: '80%',
                }}
              >
                <img
                  src="/img/dislike.png"
                  alt="grey dislike"
                  style={{ width: '40px', height: '40px' }}
                />
              </button>

              <button
                onClick={() => {}}
                style={{
                  position: 'absolute',
                  bottom: '20%',
                  left: '80%',
                }}
              >
                <img
                  src="/img/green-next.png"
                  alt="green next"
                  style={{ width: '40px', height: '40px' }}
                />
              </button>

              <button
                onClick={() => {}}
                style={{
                  position: 'relative',
                  bottom: '35%',
                  // left: '10%',
                }}
              >
                <img
                  src="/img/blue-house.png"
                  alt="blue house"
                  style={{ width: '50px', height: '50px' }}
                />
              </button>

              <button
                onClick={() => {}}
                style={{
                  position: 'relative',
                  bottom: '35%',
                  left: '25%',
                }}
              >
                <img
                  src="/img/yellow-star.png"
                  alt="Yellow Star"
                  style={{ width: '50px', height: '50px' }}
                />
              </button>

              <button
                onClick={() => {}}
                style={{
                  position: 'relative',
                  bottom: '35%',
                  left: '50%',
                }}
              >
                <img
                  src="/img/petProfile-icon.png"
                  alt="PetProfile icon"
                  style={{ width: '50px', height: '50px' }}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
