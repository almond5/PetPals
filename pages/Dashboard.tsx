import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import router from 'next/router';
import prisma from '@/lib/prismadb';
import HomeView from '@/components/HomeView';
import PetProfile from '@/components/PetProfile';
import MatchesView from '@/components/MatchesView';
import { User } from '@prisma/client';

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

    const filteredProfiles = petProfiles.filter(
      (profile) => profile.id !== 'clp4fcb42000tw85wwg6pf9p9'
    );

    const matches = petProfile?.myInterests.filter((interest) =>
      interest.isMatch === 'True'
    );

    console.log(
      '\n\nI am', user?.email,
      petProfile?.id,
      '\nMy interests are:',
      petProfile?.myInterests[0]
    );
    console.log('These people like me', petProfile?.interestedInMe[0]);
    console.log(
      '\nProfiles:',
      filteredProfiles[0].id,
      '\nMy interests are:',
      filteredProfiles[0].myInterests[0]
    );
    console.log('These people like me', filteredProfiles[0].interestedInMe[0]);
    console.log('\n')


    console.log(matches)

    return {
      props: {
        userProfile: user,
        petProfile: petProfile,
        petProfiles: filteredProfiles,
        matches: matches
      },
    };
  } catch (error) {
    const userProfile = null;
    const petProfile = null;
    const petProfiles = null;
    const matches = null;
    return {
      props: {
        userProfile: userProfile,
        petProfile: petProfile,
        petProfiles: petProfiles,
        matches: matches
      },
    };
  }
}

const Dashboard = ({
  petProfile,
  petProfiles,
  userProfile,
  matches,
}: {
  petProfile: any;
  petProfiles: any;
  userProfile: any;
  matches: any;
}) => {
  const { status: sesh, data: data } = useSession();
  const [profile] = useState<PetProfile>(petProfile);
  const [profiles, setProfiles] = useState<PetProfile>(petProfiles);
  const [user] = useState<User>(userProfile);

  const [profileView, setProfileView] = useState(false);
  const [matchesView, setMatchesView] = useState(false);
  const [homeView, setHomeView] = useState(true);

  const toggleProfileView = () => {
    profileView ? setProfileView(false) : setProfileView(true);
  };

  const toggleMatchesView = () => {
    matchesView ? setMatchesView(false) : setMatchesView(true);
  };

  const toggleHomeView = () => {
    homeView ? setHomeView(false) : setHomeView(true);
  };

  if (sesh === 'loading') {
    return <div>Loading...</div>;
  } else if (sesh === 'unauthenticated') {
    router.push('/');
  } else if (
    sesh === 'authenticated' &&
    (profile === null || profile === undefined)
  ) {
    return <PetProfile petProfile={undefined} userProfile={user}></PetProfile>;
  } else if (sesh === 'authenticated' && profile !== null) {
    return (
      <div>
        <div>
          Hi {profile.name}
          {data.user?.email}
        </div>
        <div className="absolute flex flex-col">
          <div className="py-5">
            <button
              onClick={() => {
                toggleProfileView();
                setMatchesView(false);
                setHomeView(false);
              }}
            >
              Profile
            </button>{' '}
          </div>
          <div className="py-5">
            <button
              onClick={() => {
                toggleMatchesView();
                setProfileView(false);
                setHomeView(false);
              }}
            >
              Matches
            </button>{' '}
          </div>
          <div className="py-5">
            <button
              onClick={() => {
                toggleHomeView();
                setProfileView(false);
                setMatchesView(false);
              }}
            >
              Home
            </button>{' '}
          </div>

          <div className="py-5">
            <button onClick={() => signOut({ callbackUrl: '/' })}>
              Sign-Out
            </button>
          </div>
        </div>
        <div className={`${homeView ? '' : 'hidden'}`}>
          <HomeView
            petProfile={petProfile}
            petProfiles={profiles}
            setProfiles={setProfiles}
          />
        </div>
        <div className={`${matchesView ? '' : 'hidden'}`}>
          <MatchesView matches={matches} petProfile={petProfile} />
        </div>

        <div className={`${profileView ? '' : 'hidden'}`}>
          <PetProfile petProfile={petProfile} userProfile={userProfile} />
        </div>
      </div>
    );
  }
};

export default Dashboard;
