import React, { useState } from 'react';
import styles from '/styles/dashboard.module.css';
import { FcDislike, FcLike } from 'react-icons/fc';

const HomeView = (props: {
  petProfiles: any;
  petProfile: any;
  setProfiles: any;
}) => {
  const [backView, setBackView] = useState(false);

  const handleDislike = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setBackView(false);
  };

  const handleLike = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    





    setBackView(false);
  };

  const handleSkip = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setBackView(false);
  };

  const removeItem = (index: any) => {
    props.setProfiles(props.petProfiles.filter((i: any) => index !== i.id));
  };

  const toggleBack = () => {
    backView ? setBackView(false) : setBackView(true);
  };

  return (
    <div className="py-20 flex justify-center">
      <div className={styles.cardContainer}>
        {props.petProfiles.map((petProfile: any) => (
          <div key={petProfile.id}>
            <div className={styles.swipe}>
              <div className="py-1"></div>
              <button onClick={() => toggleBack()}>
                <div className={styles.card}>
                  <div className={`${backView ? 'hidden' : ''}`}>
                    <div
                      style={{
                        backgroundImage:
                          'url(' +
                          process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL +
                          '/' +
                          petProfile.image.publicId +
                          ')',
                        position: 'relative',
                        backgroundSize: 'cover',
                      }}
                      className={styles.card}
                    >
                      <div className={styles.cardBottomContainer}>
                        <div className="flex font-bold px-2">
                          {petProfile.name}
                        </div>
                        <div className="flex px-2">
                          {petProfile.location.cityName},{' '}
                          {petProfile.location.stateName}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${backView ? '' : 'hidden'}`}>
                    <div className="flex px-2">
                      <div className="font-bold mr-2">Name: </div>{' '}
                      {petProfile.name}
                    </div>
                    <div className="flex px-2">
                      <div className="font-bold mr-2">Location: </div>{' '}
                      {petProfile.location.cityName},{' '}
                      {petProfile.location.stateName}
                    </div>
                    <div className="flex px-2">
                      <div className="font-bold mr-2">Species: </div>{' '}
                      {petProfile.species}
                    </div>
                    <div className="flex px-2">
                      <div className="font-bold mr-2">Description: </div>{' '}
                      {petProfile.description}
                    </div>
                  </div>
                </div>
              </button>

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
                <button
                  onClick={(e) => {
                    removeItem(petProfile.id);
                    handleLike(e);
                  }}
                >
                  {' '}
                  <FcLike style={{ fontSize: '40px' }} />
                </button>{' '}
                <button
                  className="font-bold"
                  onClick={(e) => {
                    removeItem(petProfile.id);
                    handleSkip(e);
                  }}
                >
                  Skip
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
