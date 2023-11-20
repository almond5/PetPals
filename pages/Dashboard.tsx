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

    let filteredProfiles = petProfiles;

    const matches = petProfiles?.filter(
      (profile) =>
        profile.interestedInMe.some(
          (interest) => interest.isMatch === 'True'
        ) || profile.myInterests.some((interest) => interest.isMatch === 'True')
    );

    let filteredMyPreviousChoicesMap: any;
    let filteredDislikedProfiles: any;
    let likedMeCount: any;

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

      likedMeCount = petProfile?.interestedInMe.filter(
        (interest) => interest.isMatch === 'Pending'
      ).length;
    }

    filteredProfiles = filteredProfiles.filter((profile) => {
      return !filteredMyPreviousChoicesMap.includes(profile.id);
    });

    filteredProfiles = filteredProfiles.filter((profile) => {
      return !filteredDislikedProfiles.includes(profile.id);
    });

    return {
      props: {
        userProfile: user,
        petProfile: petProfile,
        petProfiles: filteredProfiles,
        matches: matches,
        likedMeCount: likedMeCount,
      },
    };
  } catch (error) {
    const userProfile = null;
    const petProfile = null;
    const petProfiles = null;
    const matches = null;
    const likedMeCount = null;
    return {
      props: {
        userProfile: userProfile,
        petProfile: petProfile,
        petProfiles: petProfiles,
        matches: matches,
        likedMeCount: likedMeCount,
      },
    };
  }
}

const Dashboard = ({
  petProfile,
  petProfiles,
  userProfile,
  matches,
  likedMeCount,
}: {
  petProfile: any;
  petProfiles: any;
  userProfile: any;
  matches: any;
  likedMeCount: any;
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
    setMatchesView(false);
    setHomeView(false);
  };

  const toggleMatchesView = () => {
    matchesView ? setMatchesView(false) : setMatchesView(true);
    setProfileView(false);
    setHomeView(false);
  };

  const toggleHomeView = () => {
    homeView ? setHomeView(false) : setHomeView(true);
    setProfileView(false);
    setMatchesView(false);
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
              }}
            >
              Profile
            </button>{' '}
          </div>
          <div className="py-5">
            <button
              onClick={() => {
                toggleMatchesView();
              }}
            >
              Matches
            </button>{' '}
          </div>
          <div className="py-5">
            <button
              onClick={() => {
                toggleHomeView();
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
            toggleMatchesView={toggleMatchesView}
          />
        </div>
        <div className={`${matchesView ? '' : 'hidden'}`}>
          <MatchesView matches={matches} petProfile={petProfile} likedMeCount={likedMeCount}/>
        </div>

        <div className={`${profileView ? '' : 'hidden'}`}>
          <PetProfile petProfile={petProfile} userProfile={userProfile} />
        </div>
      </div>
    );
  }
};

export default Dashboard;
