import { getSession, signOut, useSession } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
import EditPetProfile from '@/components/EditPetProfile';
import ReadPetProfile from '@/components/ReadPetProflie';
import CreatePetProfile from '@/components/CreatePetProfile';
import AccountView from '../components/AccountView';
import prisma from '@/lib/prismadb';
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
  const [readView, setReadView] = useState(true);
  const [editView, setEditView] = useState(false);
  const [accountView, setAccountView] = useState(false);

  const { status: sesh, data: data } = useSession();

  function displayReadView() {
    setReadView(true);
    setEditView(false);
    setAccountView(false);
  }

  function displayEditView() {
    setReadView(false);
    setEditView(true);
    setAccountView(false);
  }

  function displayAccountView() {
    setReadView(false);
    setEditView(false);
    setAccountView(true);
  }

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

          <div className={`${readView ? '' : 'hidden'} ${styles.container4}`}>
            <div className={styles.navHeader}>
             <span className={styles.navHead} style={{paddingLeft: '0%'}}>My Profile</span>
            </div>
            <ReadPetProfile
              petProfile={petProfile}
              userProfile={userProfile}
              setEditView={displayEditView}
              setAccountView={displayAccountView}
            ></ReadPetProfile>
          </div>

          <div className={`${editView ? '' : 'hidden'} ${styles.container4}`}>
            <div className={styles.navHeader}>
              <span className={styles.navHead}>Edit Profile</span>
              <span className={styles.menu}>
                <img 
                  src = "/img/crossD.svg" 
                  style={{width: 20, height: 22.39}}
                  onClick={displayReadView}
                />
              </span>
              {/* TODO - hide view and make read only */}
            </div>
            <EditPetProfile
              petProfile={petProfile}
              userProfile={userProfile}
              setReadView={displayReadView}
            ></EditPetProfile>
          </div>

          <div className={`${accountView ? '' : 'hidden'} ${styles.container4}`}>
            <div className={styles.navHeader}>
              <span className={styles.navHead}>Account Settings</span>
              <span className={styles.menu}>
              <img 
                src = "/img/crossD.svg" 
                style={{width: 20, height: 22.39}}
                onClick={displayReadView}
              />
              </span>
              {/* TODO - hide view and make read only */}
            </div>
            <AccountView
              userProfile={userProfile}
              setReadView={displayReadView}
            ></AccountView>
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
