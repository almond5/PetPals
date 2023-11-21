import React, { useState } from 'react';
import { FcFullTrash, FcLike } from 'react-icons/fc';
import { getSession, signOut, useSession } from 'next-auth/react';
import prisma from '@/lib/prismadb';
import Settings from '@/pages/Settings';
import router from 'next/router';
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

    let likedMeCount: any;

    if (petProfile?.interestedInMe !== undefined) {
      likedMeCount = petProfile?.interestedInMe.filter(
        (interest) => interest.isMatch === 'Pending'
      ).length;
    }

    return {
      props: {
        userProfile: user,
        petProfile: petProfile,
        petProfiles: filteredProfiles,
        petMatches: matches,
        likedMeCount: likedMeCount,
      },
    };
  } catch (error) {
    const userProfile = null;
    const petProfile = null;
    const matches = null;
    const likedMeCount = null;
    return {
      props: {
        userProfile: userProfile,
        petProfile: petProfile,
        petMatches: matches,
        likedMeCount: likedMeCount,
      },
    };
  }
}

const Matches = ({
  userProfile,
  petProfile,
  petMatches,
  likedMeCount,
}: {
  userProfile: any;
  petProfile: any;
  petMatches: any;
  likedMeCount: any;
}) => {
  const { status: sesh, data: data } = useSession();
  const [matches, setMatches] = useState<any>(petMatches);

  const handleRemove = async (e: { preventDefault: () => void }, id: any) => {
    e.preventDefault();
    const remove = {
      currProfileId: petProfile.id,
      removeProfileId: id,
    };

    await removeMatch(remove);
  };

  const removeMatch = async (remove: {
    currProfileId: string | undefined | null;
    removeProfileId: string | undefined | null;
  }) => {
    try {
      const response = await fetch('/api/removeMatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(remove),
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
    setMatches(matches.filter((i: any) => index !== i.id));
  };

  if (sesh === 'loading') {
    return <div>Loading...</div>;
  } else if (sesh === 'unauthenticated') {
    router.push('/');
  } else if (
    sesh === 'authenticated' &&
    (petProfile === null || petProfile === undefined)
  ) {
    return (
      <Settings petProfile={undefined} userProfile={userProfile}></Settings>
    );
  } else if (sesh === 'authenticated' && petProfile !== null) {
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
        <div className="py-10">
          <div
            className="flex justify-center font-normal text-black text-[24px] 
      text-center rounded-xl"
          >
            Matches <FcLike style={{ fontSize: '40px' }} />
          </div>
          <div
            className="flex justify-center font-normal text-black text-[24px] 
      text-center rounded-xl"
          >
            Like Count: {likedMeCount}
          </div>
          <div className="py-4" style={{ maxHeight: '400px' }}>
            {matches.map((petProfile: any) => (
              <div key={petProfile.id} className="my-3">
                <div className="flex justify-center items-center">
                  <div
                    className="w-[340px] h-[90px] border-2 border-solid border-black 
              relative rounded-xl overflow-auto"
                  >
                    <img
                      className="left-[18px] absolute w-[50px] h-[50px] top-[19px]
                   bg-[#d9d9d9] rounded-[25px]"
                      src={
                        process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL +
                        '/' +
                        petProfile.image.publicId
                      }
                    />
                    <div
                      className="left-[88px] absolute top-[24px] font-normal text-black 
                text-[24px] flex px-2 pr-20 flex-wrap text-left word-left break-all"
                    >
                      {petProfile.name}
                    </div>
                    <button
                      onClick={(e) => {
                        handleRemove(e, petProfile.id);
                        removeItem(petProfile.id);
                      }}
                    >
                      <div className="absolute align-right right-[18px] top-[24px]">
                        <FcFullTrash style={{ fontSize: '40px' }} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Matches;
