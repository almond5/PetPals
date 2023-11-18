import React, { useState } from 'react';
import styles from '/styles/dashboard.module.css';
import { FcDislike, FcLike } from 'react-icons/fc';
import { PetProfile } from '@prisma/client';
import ItsAMatchView from './ItsAMatchView';

const HomeView = (props: {
  petProfiles: any;
  petProfile: any;
  setProfiles: any;
}) => {
  const [backView, setBackView] = useState(false);
  const [itsAMatchView, setItsAMatchView] = useState(false);
  const [currInterestedProfile, setCurrInterestedProfile] = useState<PetProfile>();

  const handleDislike = async (
    e: { preventDefault: () => void },
    petProfile: any
  ) => {
    e.preventDefault();

    const dislike = {
      currProfileId: props.petProfile.id,
      currInterestedProfileId: petProfile.id,
    };
    await intrestApiCall(dislike, '/api/petProfileDislike');
    setCurrInterestedProfile(petProfile);

    setBackView(false);
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
    await intrestApiCall(like, '/api/petProfileLike');
    setCurrInterestedProfile(petProfile);
    
    if (false){
      setItsAMatchView(true);
    }
    // console.log('You' + props.petProfile.id + 'liked ' + petProfile.id + '!');
    setBackView(false);
  };

  const intrestApiCall = async (info: {
    currProfileId: string | undefined | null;
    currInterestedProfileId: string | undefined | null;
  }, url: any) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
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
      <div className={`${itsAMatchView ? '' : 'hidden'}`}>
        <ItsAMatchView
          currProfile={props.petProfile}
          currInterestedProfile={currInterestedProfile}
          setItsAMatchView={setItsAMatchView}
        />
      </div>
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
                    handleDislike(e, petProfile);
                    removeItem(petProfile.id);
                  }}
                >
                  {' '}
                  <FcDislike style={{ fontSize: '40px' }} />
                </button>
                <button
                  onClick={(e) => {
                    handleLike(e, petProfile);
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
