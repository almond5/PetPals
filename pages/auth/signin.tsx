import { signIn, signOut } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
import styles from '/styles/Index.module.css'; // Make sure to create this CSS module

export default function SignIn() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handlePassword = async (e: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      username: username,
      password: password,
      redirect: false,
    });

    if (res?.status === 200) {
      router.push('/Dashboard');
    } else if (res?.status === 401) {
      alert('Invalid Credentials');
    } else {
      alert('Error');
    }

    setPassword('');
    setUsername('');
  };

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
            onChange={(e) => setUsername(e.target.value)}
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
      </form>
    </div>
  );
}
