import React, { useState } from 'react';
import styles from '/styles/dashboard.module.css';
import style from '/styles/Index.module.css';

import { FcDislike, FcLike } from 'react-icons/fc';
import { PetProfile } from '@prisma/client';
import ItsAMatchView from './ItsAMatchView';

const CardsView = (props: {
  petProfiles: any;
  petProfile: any;
  setProfiles: any;
}) => {
  const [backView, setBackView] = useState(false);
  const [itsAMatchView, setItsAMatchView] = useState(false);
  const [currInterestedProfile, setCurrInterestedProfile] =
    useState<PetProfile>(props.petProfile);

  const handleDislike = async (
    e: { preventDefault: () => void },
    petProfile: any
  ) => {
    e.preventDefault();

    const dislike = {
      currProfileId: props.petProfile.id,
      currInterestedProfileId: petProfile.id,
    };
    await interestApiCall(dislike, '/api/petProfileDislike');
    setCurrInterestedProfile(petProfile);

    setBackView(false);
  };

  const resetPreferences = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const resetPreferences = {
      currProfileId: props.petProfile.id,
    };

    await submitReset(resetPreferences);
    window.location.reload();
  };

  const submitReset = async (resetPreferences: {
    currProfileId: string | undefined | null;
  }) => {
    try {
      const response = await fetch('/api/resetPreferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetPreferences),
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

  const handleLike = async (
    e: { preventDefault: () => void },
    petProfile: any
  ) => {
    e.preventDefault();

    const like = {
      currProfileId: props.petProfile.id,
      currInterestedProfileId: petProfile.id,
    };

    setCurrInterestedProfile(petProfile);

    if (petProfile.myInterests.length > 0) {
      if (
        petProfile.myInterests.some(
          (interest: any) =>
            interest.interestedProfileId === props.petProfile.id &&
            interest.isMatch === 'Pending'
        )
      ) {
        setItsAMatchView(true);
      }
    }

    const response = await interestApiCall(like, '/api/petProfileLike');
    setBackView(false);
  };

  const interestApiCall = async (
    info: {
      currProfileId: string | undefined | null;
      currInterestedProfileId: string | undefined | null;
    },
    url: any
  ) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });

      if (response.ok) {
        return true;
      } else {
        alert('Error!');
      }
    } catch (error) {
      return null;
    }
  };

  const removeItem = (index: any) => {
    props.setProfiles(props.petProfiles.filter((i: any) => index !== i.id));
  };

  const toggleBack = () => {
    backView ? setBackView(false) : setBackView(true);
  };

  return (
    <div className="py-10 flex justify-center">
      <div className={styles.cardContainer}>
        <div className={`${itsAMatchView ? '' : 'hidden'}`}>
          <ItsAMatchView
            currProfile={props.petProfile}
            currInterestedProfile={currInterestedProfile}
            setItsAMatchView={setItsAMatchView}
          />
        </div>
        <div className={`${itsAMatchView ? 'hidden' : ''}`}>
          {props.petProfiles.length > 0 ? (
            props.petProfiles.map((petProfile: any) => (
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
                            position: 'absolute',
                            backgroundSize: 'cover',
                          }}
                          className={styles.card}
                        >
                          <div className={styles.cardBottomContainer}>
                            <div
                              className={style.maliTxtCentered}
                            >
                              {petProfile.name}
                            </div>
                            <div
                              className={style.maliTxt}
                            >
                              {petProfile.location.cityName},{' '}
                              {petProfile.location.stateName}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`${backView ? '' : 'hidden'}`}>
                        <div className={style.maliTxt}>
                          <div className={style.normalTxt}>Name: </div>{' '}
                          {petProfile.name}
                        </div>
                        <div className={style.maliTxt}>
                          <div className={style.normalTxt}>Location: </div>{' '}
                          {petProfile.location.cityName},{' '}
                          {petProfile.location.stateName}
                        </div>
                        <div className={style.maliTxt}>
                          <div className={style.normalTxt}>Species: </div>{' '}
                          {petProfile.species}
                        </div>
                        <div className={style.maliTxt}>
                          <div className={style.normalTxt}>Description: </div>
                          {petProfile.description}
                        </div>
                      </div>
                    </div>
                  </button>
                  <div className="flex justify-evenly py-10">
                    <button
                      onClick={(e) => {
                        handleDislike(e, petProfile);
                        removeItem(petProfile.id);
                      }}
                    >
                      {' '}
                      <img src='/img/cross.png'></img>
                    </button>
                    <button
                      onClick={(e) => {
                        handleLike(e, petProfile);
                        removeItem(petProfile.id);
                      }}
                    >
                      {' '}
                      <img src='/img/heart.png'></img>
                    </button>{' '}
                    <button
                      className="font-bold"
                      onClick={(e) => {
                        setBackView(false);
                        removeItem(petProfile.id);
                      }}
                    >
                      <img src='/img/vector.png'></img>
                    </button>{' '}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col font-bold pr-8">
              <div className="mx-auto">No More Profiles To View!</div>
              <div className="flex justify-around py-4"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardsView;
