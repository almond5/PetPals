import React, { useState } from 'react';
import styles from '/styles/dashboard.module.css';
import { FcDislike, FcLike } from 'react-icons/fc';

const HomeView = (props: {
  petProfiles: any;
  petProfile: any;
  setProfiles: any;
}) => {
  const [backView, setBackView] = useState(false);

  const handleDislike = async (e: { preventDefault: () => void }, id: any) => {
    e.preventDefault();
    setBackView(false);
  };

  const handleLike = async (e: { preventDefault: () => void; }, id: any) => {
    e.preventDefault();
    const like = {
      currProfileId: props.petProfile.id,
      currInterestedProfileId: id,
    };

    console.log(like);

    await submitLike(like);
    setBackView(false);
  };

  const submitLike = async (like: {
    currProfileId: string | undefined | null;
    currInterestedProfileId: string | undefined | null;
  }) => {
    try {
      const response = await fetch('/api/petProfileLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(like),
      });

      if (response.ok) {
        return;
      } else {
        alert('Error!');
      }
    } catch (error) {
      console.error('Error!', error);
    }
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
                    handleLike(e, petProfile.id);
                    removeItem(petProfile.id);
                  }}
                >
                  {' '}
                  <FcDislike style={{ fontSize: '40px' }} />
                </button>
                <button
                  onClick={(e) => {
                    handleLike(e, petProfile.id);
                    removeItem(petProfile.id);
                  }}
                >
                  {' '}
                  <FcLike style={{ fontSize: '40px' }} />
                </button>{' '}
                <button
                  className="font-bold"
                  onClick={(e) => {
                    setBackView(false);
                    removeItem(petProfile.id);
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
