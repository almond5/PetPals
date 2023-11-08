import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getCsrfToken, signIn } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

    await signIn(
      'credentials',
      {
        username: username,
        password: password,
        callbackUrl: '/Dashboard'
      }
    );

    router.push('../Dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your Email"
              className="input-field w-full"
            />
          </div>
          <div className="mb-4">
            <input
              onChange={(e) => handlePassword(e)}
              type="password"
              id="password"
              placeholder="Enter your Password"
              required
              className="input-field w-full"
            />
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
