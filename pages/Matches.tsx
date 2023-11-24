import React, { useState } from 'react';
import { FcFullTrash, FcLike } from 'react-icons/fc';
import { getSession, signOut, useSession } from 'next-auth/react';
import prisma from '@/lib/prismadb';
import Settings from '@/pages/Settings';
import router from 'next/router';
import { VscSignOut } from 'react-icons/vsc';
import styles from '../styles/matches.module.css';

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
              className={styles.item}
              onClick={() => {
                router.push('/Cards');
              }}
            >
              <span>
                <img src="/img/homeL.svg" style={{ width: 40, height: 44 }} />
              </span>
              <span className={styles.barTxt}>Home</span>
            </div>

            <div
              className={`${styles.item} ${styles.active}`}
              onClick={() => {
                router.push('/Matches');
              }}
            >
              <span>
                <img
                  src="/img/heartD.svg"
                  style={{ width: 40, height: 40.8 }}
                />
              </span>
              <span className={`${styles.barTxt} ${styles.barTxtActive}`}>
                Matches
              </span>
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
            <div className="flex justify-center">Matches</div>
          </div>
          <div className={styles.matchesContainer}>
            {matches.map((petProfile: any) => (
              <div key={petProfile.id} className="my-3">
                <div className={styles.matches}>
                  <div className={styles.match}>
                    <span>
                      <img
                        className={styles.profileImg}
                        src={
                          process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL +
                          '/' +
                          petProfile.image.publicId
                        }
                      />
                    </span>
                    <span className={styles.profileName}>
                      {petProfile.name}
                    </span>
                    <span className={styles.delete}>
                      <button
                        onClick={(e) => {
                          handleRemove(e, petProfile.id);
                          removeItem(petProfile.id);
                        }}
                      >
                        <div>
                          <img
                            src="/img/delete.svg"
                            style={{ width: 20, height: 23.7 }}
                          />
                        </div>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className={styles.like}>Like Count: {likedMeCount}</div>
          </div>
          <div className={styles.container3}>
            <span className={styles.icons}>
              <span
                className={styles.icon}
                onClick={() => {
                  router.push('/Cards');
                }}
              >
                <img
                  src="/img/homeD.svg"
                  style={{ maxWidth: 40, maxHeight: 44 }}
                />
              </span>
              <span
                className={styles.icon}
                onClick={() => {
                  router.push('/Matches');
                }}
              >
                <img
                  src="/img/heartD.svg"
                  style={{ maxWidth: 40, maxHeight: 40.8 }}
                />
              </span>

              <span
                className={styles.icon}
                onClick={() => {
                  router.push('/Settings');
                }}
              >
                <img
                  src="/img/userD.svg"
                  alt="U"
                  style={{ maxWidth: 40, maxHeight: 40.8 }}
                />
              </span>
            </span>
          </div>
          {/* <div style={{width: 546, height: 91, left: 542, top: 87, position: 'absolute', border: '1px black solid'}} />
          <div style={{width: 546, height: 91, left: 542, top: 197, position: 'absolute', border: '1px black solid'}} />
          <div style={{width: 50, height: 50, left: 564, top: 107, position: 'absolute', background: '#D9D9D9', borderRadius: 9999}} />
          <div style={{width: 50, height: 50, left: 561, top: 217, position: 'absolute', background: '#D9D9D9', borderRadius: 9999}} />
          <div style={{left: 631, top: 117, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Mali', fontWeight: '400', wordWrap: 'break-word'}}>Pet 1</div>
          <div style={{left: 631, top: 227, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Mali', fontWeight: '400', wordWrap: 'break-word'}}>Pet 2</div>
          <div style={{width: 50, height: 50, left: 561, top: 328, position: 'absolute', background: '#D9D9D9', borderRadius: 9999}} />
          <div style={{left: 631, top: 338, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Mali', fontWeight: '400', wordWrap: 'break-word'}}>Pet 2</div>
          <div style={{width: 546, height: 91, left: 542, top: 307, position: 'absolute', border: '1px black solid'}} />
          <div style={{width: 546, height: 91, left: 542, top: 418, position: 'absolute', border: '1px black solid'}} />
          <div style={{width: 195, height: 25, left: 717, top: 529, position: 'absolute', textAlign: 'center', color: '#8A8A8A', fontSize: 24, fontFamily: 'Mali', fontWeight: '400', wordWrap: 'break-word'}}>32 people like u</div>
          <div style={{width: 50, height: 50, left: 561, top: 439, position: 'absolute', background: '#D9D9D9', borderRadius: 9999}} />
          <div style={{left: 631, top: 449, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Mali', fontWeight: '400', wordWrap: 'break-word'}}>Pet 2</div>
          <div style={{width: 20, height: 23.70, left: 1043, top: 121, position: 'absolute'}}>
            <div style={{width: 19.95, height: 23.59, left: 0.03, top: 0.06, position: 'absolute', background: 'black'}}></div>
            <div style={{width: 1.67, height: 12.09, left: 12.03, top: 7.42, position: 'absolute', background: 'black'}}></div>
            <div style={{width: 1.62, height: 11.93, left: 6.83, top: 7.50, position: 'absolute', background: 'black'}}></div>
          </div>
          <div style={{width: 20, height: 23.70, left: 1043, top: 229, position: 'absolute'}}>
            <div style={{width: 19.95, height: 23.59, left: 0.03, top: 0.06, position: 'absolute', background: 'black'}}></div>
            <div style={{width: 1.67, height: 12.09, left: 12.03, top: 7.42, position: 'absolute', background: 'black'}}></div>
            <div style={{width: 1.62, height: 11.93, left: 6.83, top: 7.50, position: 'absolute', background: 'black'}}></div>
          </div>
          <div style={{width: 20, height: 23.70, left: 1043, top: 341, position: 'absolute'}}>
            <div style={{width: 19.95, height: 23.59, left: 0.03, top: 0.06, position: 'absolute', background: 'black'}}></div>
            <div style={{width: 1.67, height: 12.09, left: 12.03, top: 7.42, position: 'absolute', background: 'black'}}></div>
            <div style={{width: 1.62, height: 11.93, left: 6.83, top: 7.50, position: 'absolute', background: 'black'}}></div>
          </div>
          <div style={{width: 20, height: 23.70, left: 1043, top: 452, position: 'absolute'}}>
            <div style={{width: 19.95, height: 23.59, left: 0.03, top: 0.06, position: 'absolute', background: 'black'}}></div>
            <div style={{width: 1.67, height: 12.09, left: 12.03, top: 7.42, position: 'absolute', background: 'black'}}></div>
            <div style={{width: 1.62, height: 11.93, left: 6.83, top: 7.50, position: 'absolute', background: 'black'}}></div>
          </div> */}
        </div>
      </div>
    );
  }
};

export default Matches;
