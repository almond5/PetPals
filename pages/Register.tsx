import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import styles from '/styles/Index.module.css';

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { status: sesh, data: data } = useSession();

  const submitUser = async (newUser: {
    userEmail: string | undefined | null;
    password: string | undefined | null;
    phoneNumber: string | undefined | null;
    name: string | undefined | null;
  }) => {
    try {
      const response = await fetch('/api/userCreate', {
        method: 'POST',
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data);
        return null;
      }

      if (response.ok) {
        alert('Successfully created account!');
      }

      return true;
    } catch (error) {
      alert('Invalid Credentials!');
      return null;
    }
  };

  const handlePassword = async (e: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const newUser = {
      userEmail,
      password,
      phoneNumber,
      name,
    };

    const result = await submitUser(newUser);
    
    if (sesh === 'authenticated' && result === true) {
      await signOut({ callbackUrl: '/' });
    } else if (result === true) {
      await signIn();
    } else {
      window.location.reload();
    }

    setPhoneNumber('');
    setPassword('');
    setUserEmail('');
    setName('');
  };

  return (
    <div className={styles.container3}>
      <form className="rounded px-8 text-center" onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <div className={styles.inputHeader}>Name</div>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
            className={styles.inputBox}
            maxLength={200}
          />
          <div className={styles.inputHeader}>Email</div>
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            type="email"
            id="email"
            required
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
            className={styles.inputBox}
          />
          <div className={styles.inputHeader}>Phone</div>
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            id="phone_number"
            placeholder="888-888-8888"
            className={`${styles.inputBox} ${styles.lastInput}`}
          />
        </div>
        <button
          type="submit"
          className={`${styles.button} ${styles.signUpButton2}`}
        >
          <div className={styles.signUpTxt}>Sign up</div>
        </button>
        <Link href="auth/signin">
          <div className={styles.loginTxt}>Have an account? Login</div>
        </Link>
      </form>
    </div>
  );
};

export default Register;
