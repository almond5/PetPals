import React, { useState } from 'react';
import styles from '/styles/dashboard.module.css';
import { FcDislike, FcLike } from 'react-icons/fc';
import { PetProfile } from '@prisma/client';
import ItsAMatchView from './ItsAMatchView';

const CardsView = (props: {
  petProfiles: any;
  petProfile: any;
  setProfiles: any;
  toggleMatchesView: any;
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

  const handleLike = async (
    e: { preventDefault: () => void },
    petProfile: any
  ) => {
    e.preventDefault();
    const like = {
      currProfileId: props.petProfile.id,
      currInterestedProfileId: petProfile.id,
    };

    await interestApiCall(like, '/api/petProfileLike');
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
    <div className="py-10 flex justify-center">
      <div className={styles.cardContainer}>
        <div className={`${itsAMatchView ? '' : 'hidden'}`}>
          <ItsAMatchView
            currProfile={props.petProfile}
            currInterestedProfile={currInterestedProfile}
            setItsAMatchView={setItsAMatchView}
            toggleMatchesView={props.toggleMatchesView}
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
                              className="flex px-2 flex-wrap text-left word-left 
                        break-all font-bold"
                            >
                              {petProfile.name}
                            </div>
                            <div
                              className="flex px-2 flex-wrap text-left word-left 
                        break-all"
                            >
                              {petProfile.location.cityName},{' '}
                              {petProfile.location.stateName}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`${backView ? '' : 'hidden'}`}>
                        <div className="flex px-2 flex-wrap text-left word-left break-all">
                          <div className="font-bold mr-2">Name: </div>{' '}
                          {petProfile.name}
                        </div>
                        <div className="flex px-2 flex-wrap text-left word-left break-all">
                          <div className="font-bold mr-2">Location: </div>{' '}
                          {petProfile.location.cityName},{' '}
                          {petProfile.location.stateName}
                        </div>
                        <div className="flex px-2 flex-wrap text-left word-left break-all">
                          <div className="font-bold mr-2">Species: </div>{' '}
                          {petProfile.species}
                        </div>
                        <div className="flex px-2 flex-wrap text-left word-left break-all">
                          <div className="font-bold mr-2">Description: </div>
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
            ))
          ) : (
            <div className="flex flex-col font-bold">
              <div className="mx-auto">No More Profiles To View!</div>
              <div className="flex justify-around py-4"></div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <div>Reset Preferences?</div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardsView;
