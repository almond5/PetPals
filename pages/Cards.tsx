import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import router from 'next/router';
import prisma from '@/lib/prismadb';
import CardsView from '@/components/CardsView';
import { PetProfile, User } from '@prisma/client';
import { VscSignOut } from 'react-icons/vsc';

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
      <div>
        <div className="header">
          PetPals
          <button
            className="absolute right-10 top-8"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <VscSignOut style={{ fontSize: '40px' }} />
          </button>
        </div>
        <div>{data.user?.email}</div>
        <div className="absolute flex flex-col">
          <div className="py-5">
            <button
              onClick={() => {
                router.push('/Settings');
              }}
            >
              Settings
            </button>{' '}
          </div>
          <div className="py-5">
            <button
              onClick={() => {
                router.push('/Matches');
              }}
            >
              Matches
            </button>{' '}
          </div>
          <div className="py-5">
            <button
              onClick={() => {
                router.push('/Cards');
              }}
            >
              Cards
            </button>{' '}
          </div>
        </div>
        <CardsView
          petProfile={petProfile}
          petProfiles={profiles}
          setProfiles={setProfiles}
        />
      </div>
    );
  }
};

export default Dashboard;
