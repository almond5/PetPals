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
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction: any, nameToDelete: string) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name: any) => {
    console.log(name + ' left the screen!');
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
              <TinderCard
                className={styles.swipe}
                key={profile.name}
                preventSwipe={["up", "down"]}
                onSwipe={(dir) => swiped(dir, profile.name)}
                onCardLeftScreen={() => outOfFrame(profile.name)}
              >
                <div
                  style={{
                    backgroundImage:
                      'url(' + 'https://i.imgur.com/f1qmUE8.gif' + ')',
                  }}
                  className={styles.card}
                >
                  <h3>{profile.name}</h3>
                </div>
              </TinderCard>
            ))}
            <div>
              {lastDirection ? <p>You Swiped {lastDirection}</p> : <p></p>}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
