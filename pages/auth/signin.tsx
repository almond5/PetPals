import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import styles from '/styles/Index.module.css'; // Make sure to create this CSS module
import Link from 'next/link';
import router from 'next/router';

export default function SignIn() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const { status } = useSession();

  if (status === 'loading') {
    return null;
  }

  if (status === 'authenticated') {
    router.push('/Dashboard');
  }

  const handlePassword = async (e: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await signIn('credentials', {
        email: email,
        password: password,
        callbackUrl: '/Dashboard',
        redirect: false,
      });

      if (!response?.ok) {
        alert('Invalid Credentials!');
      }
    } catch (error) {
      alert('Invalid Credentials!');
    }

    window.location.reload();
    setPassword('');
    setEmail('');
  };

  if (status === 'unauthenticated') {
    return (
      <div className={styles.container}>
        <form className="rounded px-8 text-center" onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <div className={styles.inputHeader}>Email</div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              className={styles.inputBox}
            />
            <div className={styles.inputHeader}>Password</div>
            <input
              onChange={(e) => handlePassword(e)}
              type="password"
              id="password"
              required
              placeholder="Enter your password"
              className={`${styles.inputBox} ${styles.lastInput}`}
            />
          </div>
          <button type='submit' className={`${styles.button} ${styles.signUpButton2}`}>
            <div className={styles.signUpTxt}>Login</div>
          </button>
          <Link href="/Register">
            <div className={styles.loginTxt}>New here? Sign Up</div>
          </Link>
        </form>
      </div>
    );
  };
}
