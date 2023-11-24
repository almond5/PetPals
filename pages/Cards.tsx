import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import router from 'next/router';
import prisma from '@/lib/prismadb';
import CardsView from '@/components/CardsView';
import styles from '../styles/matches.module.css';
import { PetProfile } from '@prisma/client';

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession(context);
    const currUser = session?.user;

    const user = await prisma.user.findFirst({
      where: { email: currUser?.email! },
    });

    const petProfile = await prisma.petProfile.findFirst({
      where: { userId: user?.id! },
      include: { image: {}, location: {}, myInterests: {}, interestedInMe: {} },
    });

    const petProfiles = await prisma.petProfile.findMany({
      where: {
        NOT: {
          id: petProfile?.id,
        },
      },
      include: {
        image: {},
        location: {},
        myInterests: {},
        interestedInMe: {},
      },
    });

    let filteredProfiles = petProfiles;

    const matches = petProfiles?.filter(
      (profile) =>
        profile.interestedInMe.some(
          (interest) =>
            interest.isMatch === 'True' &&
            interest.myProfileId === petProfile?.id
        ) ||
        profile.myInterests.some(
          (interest) =>
            interest.isMatch === 'True' &&
            interest.interestedProfileId === petProfile?.id
        )
    );

    let filteredMyPreviousChoicesMap: any;
    let filteredDislikedProfiles: any;
    // Filter out the id's in this map
    if (petProfile?.myInterests !== undefined) {
      filteredMyPreviousChoicesMap = petProfile?.myInterests.map((interest) => {
        if (interest) return interest.interestedProfileId;
      });
    }

    if (petProfile?.interestedInMe !== undefined) {
      filteredDislikedProfiles = petProfile?.interestedInMe.map((interest) => {
        if (interest.isMatch === 'False' || interest.isMatch === 'True')
          return interest.myProfileId;
      });
    }

    filteredProfiles = filteredProfiles.filter((profile) => {
      return !filteredMyPreviousChoicesMap.includes(profile.id);
    });

    filteredProfiles = filteredProfiles.filter((profile) => {
      return !filteredDislikedProfiles.includes(profile.id);
    });

    return {
      props: {
        petProfile: petProfile,
        petProfiles: filteredProfiles,
      },
    };
  } catch (error) {
    const petProfile = null;
    const petProfiles = null;
    return {
      props: {
        petProfile: petProfile,
        petProfiles: petProfiles,
      },
    };
  }
}

const Dashboard = ({
  petProfile,
  petProfiles,
}: {
  petProfile: any;
  petProfiles: any;
}) => {
  const { status: sesh, data: data } = useSession();
  const [profile] = useState<PetProfile>(petProfile);
  const [profiles, setProfiles] = useState<PetProfile>(petProfiles);

  if (sesh === 'loading') {
    return <div>Loading...</div>;
  } else if (sesh === 'unauthenticated') {
    router.push('/');
  } else if (
    sesh === 'authenticated' &&
    (profile === null || profile === undefined)
  ) {
    router.push('/Settings');
  } else if (sesh === 'authenticated' && profile !== null) {
    return (
      <div className={styles.container}>
        <div className={styles.leftBar}>
          <div className={styles.barLogo}>PETPALS</div>
          <div
            style={{
              width: 294.03,
              height: 0,
              position: 'absolute',
              border: '1px white solid',
              left: '8%',
            }}
          ></div>

          <div className={styles.items}>
            <div
              className={`${styles.item} ${styles.active}`}
              onClick={() => {
                router.push('/Cards');
              }}
            >
              <span>
                <img src="/img/homeD.svg" style={{ width: 40, height: 44 }} />
              </span>
              <span className={`${styles.barTxt} ${styles.barTxtActive}`}>
                Home
              </span>
            </div>

            <div
              className={styles.item}
              onClick={() => {
                router.push('/Matches');
              }}
            >
              <span>
                <img src="/img/heartL.svg" style={{ width: 40, height: 44 }} />
              </span>
              <span className={styles.barTxt}>Matches</span>
            </div>

            <div
              className={styles.item}
              onClick={() => {
                router.push('/Settings');
              }}
            >
              <span>
                <img
                  src="/img/userL.svg"
                  alt="U"
                  style={{ width: 40, height: 40.8 }}
                />
              </span>
              <span className={styles.barTxt}>Profile</span>
            </div>
          </div>
          <button
            className={styles.logoutBtn}
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <div className={styles.btnText3}>LOGOUT</div>
          </button>
        </div>
        <div className={styles.rightBar}>
          <div className={styles.head}>
            <div className="flex justify-center">Home</div>
          </div>
          <div className="flex justify-center">
            <CardsView
              petProfile={petProfile}
              petProfiles={profiles}
              setProfiles={setProfiles}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
