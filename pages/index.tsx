import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from '../styles/Index.module.css';

const Index = () => {
  const { status } = useSession();

  if (status === 'authenticated') {
    return (
      <div className={styles.container}>
        <div className={styles.title}>PETPALS</div>
        <img
          src="/img/home_img.png"
          alt="Pet and Mouse"
          className={styles.petImage}
        />
        <div className={styles.subTitle}>FOR ALL YOUR PET&apos;S PAL NEEDS</div>
        <div className="mt-8">
          <table className={styles.tbl}>
            <tr>
              <button className={`${styles.button} ${styles.registerButton}`}>
                <Link href="/Register">
                  <div className={styles.btnText}>Sign Up</div>
                </Link>
              </button>
            </tr>
            <tr>
              <button className={`${styles.button} ${styles.signInButton}`}>
                <Link href="/Cards">
                  <div className={styles.btnText2}>Login</div>
                </Link>
              </button>
            </tr>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.title}>PETPALS</div>
        <img
          src="/img/home_img.png"
          alt="Pet and Mouse"
          className={styles.petImage}
        />
        <div className={styles.subTitle}>FOR ALL YOUR PET&apos;S PAL NEEDS</div>
        <div className="mt-8">
          <table className={styles.tbl}>
            <tr>
              <Link href="/Register">
                <button className={`${styles.button} ${styles.registerButton}`}>
                  <div className={styles.btnText}>Sign Up</div>
                </button>
              </Link>
            </tr>
            <tr>
              <Link
                href={'/auth/signin'}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                <button className={`${styles.button} ${styles.signInButton}`}>
                  <div className={styles.btnText2}>Login</div>
                </button>{' '}
              </Link>
            </tr>
          </table>
        </div>
      </div>
    );
  }
};

export default Index;
