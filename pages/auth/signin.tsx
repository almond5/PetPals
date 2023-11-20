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
    router.push('/Cards');
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
        callbackUrl: '/Cards',
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
        <img
          src="/img/FormContainer.png"
          alt="Pet and Mouse"
          className={styles.petImage2}
        />
        <form className="rounded px-8 text-center" onSubmit={handleSubmit}>
          <div className="mt-24 flex flex-auto">
            <img
              src="/img/username.png"
              alt="Pet and Mouse"
              className={styles.username}
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
              placeholder="Meow Meow Meow Meow Meow Meow Meow"
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
              placeholder="Woof Woof Woof Woof Woof Woof Woof Woof"
              className="border-none outline-none absolute mt-16 ml-6 w-[350px]"
            />
          </div>

          <button className={`${styles.signInButton2}`}>
            <img src="/img/buttonLogin2.png" alt="Pet and Mouse" />
          </button>

          <div className="login-page-container">
            <Link href="/Register">
              <button style={{ textDecoration: 'underline' }}>
                New here? sign up
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
