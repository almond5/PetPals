import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from '../styles/Index.module.css'; 

const Index = () => {
  const { status } = useSession();

  if (status === 'authenticated') {
    return (
      <div className={styles.container}>
        <img
          src="/img/indexUpper.png"
          alt="Pet and Mouse"
          className={styles.petImage}
        />
        <div className="mt-48">
          <button className={`${styles.button} ${styles.signInButton}`}>
            <Link href={'/Cards'}>
              <img
                className="mt-2"
                src="/img/buttonLogin1.png"
                alt="Pet and Mouse"
              />
            </Link>
          </button>
          <button className={`${styles.button} ${styles.registerButton}`}>
            <Link href="/Register">
              <img
                className="mt-2"
                src="/img/buttonSignup.png"
                alt="Pet and Mouse"
              />
            </Link>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <img
          src="/img/indexUpper.png"
          alt="Pet and Mouse"
          className={styles.petImage}
        />
        <div className="mt-48">
          <button className={`${styles.button} ${styles.signInButton}`}>
            <Link
              href={'/auth/signin'}
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <img
                className="mt-2"
                src="/img/buttonLogin1.png"
                alt="Pet and Mouse"
              />
            </Link>
          </button>
          <button className={`${styles.button} ${styles.registerButton}`}>
            <Link href="/Register">
              <img
                className="mt-2"
                src="/img/buttonSignup.png"
                alt="Pet and Mouse"
              />
            </Link>
          </button>
        </div>
      </div>
    );
  }
};

export default Index;
