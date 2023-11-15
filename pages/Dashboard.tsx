import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import router from 'next/router';
import prisma from '@/lib/prismadb';
import { Profile } from '@prisma/client';
import TinderCard from 'react-tinder-card';
import styles from '/styles/dashboard.module.css';

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession(context);
    const currUser = session?.user;

    const user = await prisma.user.findFirst({
      where: { email: currUser?.email! },
    });

    const profile = await prisma.profile.findFirst({
      where: { userId: user?.id! },
    });

    const profiles = await prisma.profile.findMany({
      where: {
        NOT: { id: profile?.id },
      },
    });

    console.log(profiles);

    return {
      props: {
        profile: profile,
        profiles: profiles,
      },
    };
  } catch (error) {
    const profile = null;
    const profiles = null;
    return {
      props: {
        profile: profile,
        profiles: profiles,
      },
    };
  }
}

const Dashboard = ({ profile, profiles }: { profile: any; profiles: any }) => {
  const { status: sesh, data: data } = useSession();
  const [userProfile] = useState<Profile>(profile);
  const [userProfiles] = useState<Profile[]>(profiles);
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  if (sesh === 'loading') {
    return <div>Loading...</div>;
  } else if (sesh === 'unauthenticated') {
    router.push('/');
  } else if (userProfile === null || userProfile === undefined) {
    router.push('/Profile');
  } else if (sesh === 'authenticated' && userProfile !== null) {
    return (
      <div>
        <div>
          Hi {userProfile.name}
          {data.user?.email}
        </div>
        <button onClick={() => signOut({ callbackUrl: '/' })}>Sign-Out</button>
        <div className="py-20 flex justify-center">
          <div className={styles.cardContainer}>
            {userProfiles.map((profile: any) => (
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
                    {profile.name}
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
                    src="/img/profile-icon.png"
                    alt="Profile icon"
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
