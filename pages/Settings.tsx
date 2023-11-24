import { getSession, signOut, useSession } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
import EditPetProfile from '@/components/EditPetProfile';
import CreatePetProfile from '@/components/CreatePetProfile';
import AccountView from '../components/AccountView';
import prisma from '@/lib/prismadb';
import styles from '../styles/matches.module.css';
import Gear from '@/components/Gear';

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

    return {
      props: {
        userProfile: user,
        petProfile: petProfile,
      },
    };
  } catch (error) {
    const userProfile = null;
    const petProfile = null;
    return {
      props: {
        userProfile: userProfile,
        petProfile: petProfile,
      },
    };
  }
}

const Settings = ({
  petProfile,
  userProfile,
}: {
  petProfile: any;
  userProfile: any;
}) => {
  const [profileView, setProfileView] = useState(true);
  const [accountView, setAccountView] = useState(false);

  const { status: sesh, data: data } = useSession();
  const [gearView, setGearView] = useState(false);

  const toggleGearView = () => {
    setGearView(!gearView);
  };

  // check user has a petProfile and make it so it uses editProfile API
  if (sesh === 'loading') {
    return <div>Loading...</div>;
  } else if (
    sesh === 'authenticated' &&
    (petProfile === null || petProfile === undefined)
  ) {
    return <CreatePetProfile></CreatePetProfile>;
  } else if (
    sesh === 'authenticated' &&
    petProfile !== null &&
    petProfile !== undefined // start of edit problem
  ) {
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
              className={styles.item}
              onClick={() => {
                router.push('/Matches');
              }}
            >
              <span>
                <img
                  src="/img/heartL.svg"
                  style={{ width: 40, height: 40.8 }}
                />
              </span>
              <span className={styles.barTxt}>Matches</span>
            </div>
            <div
              className={`${styles.item} ${styles.active}`}
              onClick={() => {
                router.push('/Settings');
              }}
            >
              <span>
                <img
                  src="/img/userD.svg"
                  alt="U"
                  style={{ width: 40, height: 40.8 }}
                />
              </span>
              <span className={`${styles.barTxt} ${styles.barTxtActive}`}>
                Profile
              </span>
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
            <div className={`${profileView ? '' : 'hidden'}`}>
              <div className="flex justify-center pr-5">Profile Settings</div>
            </div>
            <div className={`${accountView ? '' : 'hidden'}`}>
              <div className="flex justify-center pr-5">Acount Settings</div>
            </div>
            <div className="absolute right-5 top-8">
              <Gear
                setAccountView={setAccountView}
                setProfileView={setProfileView}
              ></Gear>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center pr-5">
            <div className={`${accountView ? '' : 'hidden'}`}>
              <AccountView userProfile={userProfile}></AccountView>
            </div>
          </div>
          <div className={`${profileView ? styles.container4 : 'hidden'}`}>
            <EditPetProfile
              petProfile={petProfile}
              userProfile={userProfile}
            ></EditPetProfile>
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
        </div>
      </div>
    );
  } else {
    return <div>Error...</div>;
  }
};

export default Settings;
