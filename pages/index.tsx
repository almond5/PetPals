import { signIn } from 'next-auth/react';
import Link from 'next/link';
import styles from '../styles/Index.module.css'; // Make sure to create this CSS module

const Index = () => {
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
            <img className="mt-2" src="/img/buttonLogin1.png" alt="Pet and Mouse" />
            </Link>
        </button>
        <button className={`${styles.button} ${styles.registerButton}`}>
          <Link href="/Register">
            <img className="mt-2" src="/img/buttonSignup.png" alt="Pet and Mouse" />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Index;
