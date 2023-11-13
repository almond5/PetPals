import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';
import styles from '/styles/Index.module.css';

const Register = () => {
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { status: sesh, data: data } = useSession();

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const submitUser = async (newUser: {
    userEmail: string | undefined | null;
    password: string | undefined | null;
    phoneNumber: string | undefined | null;
  }) => {
    const response = await fetch('/api/userCreate', {
      method: 'POST',
      body: JSON.stringify(newUser),
    });

    const data = await response.json();
    if (data !== null) {
      alert(data);
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
    };

    await submitUser(newUser);
    
    if (sesh === 'authenticated')
    {
      signOut({callbackUrl: '/'});
    }
    else {
      router.push('/')
    }

    setPhoneNumber('');
    setPassword('');
    setUserEmail('');
  };

  return (
    <div className={styles.container}>
      <img
        src="/img/FormContainer.png"
        alt="Pet and Mouse"
        className={styles.petImage3}
      />
      <form className="rounded px-8 text-center" onSubmit={handleSubmit}>
        <div className="mt-28 flex flex-auto">
          <img
            src="/img/username.png"
            alt="Pet and Mouse"
            className={styles.username}
          />
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="border-none outline-none absolute mt-16 ml-6 w-[350px]"
          />
        </div>

        <div className="mt-4 mb-6 flex flex-auto">
          <img
            src="/img/password.png"
            alt="Pet and Mouse"
            className={styles.username}
          />
          <input
            onChange={(e) => handlePassword(e)}
            type="password"
            id="password"
            required
            placeholder="Enter your password"
            className="border-none outline-none absolute mt-16 ml-6 w-[350px]"
          />
        </div>

        <div className="mt-4 mb-6 flex flex-auto">
          <img
            src="/img/phone.png"
            alt="Pet and Mouse"
            className={styles.username}
          />
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            id="phone_number"
            placeholder="888-888-8888"
            className="border-none outline-none absolute mt-16 ml-6 w-[350px]"
          />
        </div>

        <div className="flex items-center justify-center mt-4">
          <button type="submit">
            <img
              src="/img/registerSignUp.png"
              alt="Sign Up"
              className={styles.signUpButton}
            />
          </button>
        </div>

        <Link
          href=''
          onClick={(e) => {
            e.preventDefault();
            router.push('/')
          }}
          style={{ textDecoration: 'underline' }}
        >
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default Register;
