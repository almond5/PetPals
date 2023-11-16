import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import router from 'next/router';
import prisma from '@/lib/prismadb';
import { PetProfile } from '@prisma/client';
import TinderCard from 'react-tinder-card';
import styles from '/styles/dashboard.module.css';

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession(context);
    const currUser = session?.user;

    const user = await prisma.user.findFirst({
      where: { email: currUser?.email! },
    });

    const petProfile = await prisma.petProfile.findFirst({
      where: { userId: user?.id! },
    });

    const petProfiles = await prisma.petProfile.findMany({
      where: {
        NOT: { id: petProfile?.id },
      },
    });

    console.log(petProfiles);

    return {
      props: {
        petProfile: petProfile,
        petProfiles: petProfiles,
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

const Dashboard = ({ petProfile, petProfiles }: { petProfile: any; petProfiles: any }) => {
  const { status: sesh, data: data } = useSession();
  const [profile] = useState<PetProfile>(petProfile);
  const [profiles] = useState<PetProfile[]>(petProfiles);
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  if (sesh === 'loading') {
    return <div>Loading...</div>;
  } else if (sesh === 'unauthenticated') {
    router.push('/');
  } else if (profile === null || profile === undefined) {
    router.push('/PetProfile');
  } else if (sesh === 'authenticated' && profile !== null) {
    return (
      <div>
        <div>
          Hi {profile.name}
          {data.user?.email}
        </div>
        <button onClick={() => signOut({ callbackUrl: '/' })}>Sign-Out</button>
        <div className="py-20 flex justify-center">
          <div className={styles.cardContainer}>
            {profiles.map((petProfile: any) => (
              <div className={styles.swipe}>
                <div
                  style={{
                    backgroundImage:
                      'url(' + 'https://i.imgur.com/f1qmUE8.gif' + ')',
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
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
