import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const submitUser = async (returningUser: {
    userEmail: string | undefined | null;
    password: string | undefined | null;
  }) => {
    const response = await fetch('/api/userCreate', {
      method: 'POST',
      body: JSON.stringify(returningUser),
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
    };

    await submitUser(newUser);
    await timeout(1000);
    router.push('/Dashboard');
    setPassword('');
    setUserEmail('');
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
              type="text"
              className="input-field w-full"
              id="user_name"
              placeholder="Enter your username"
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => handlePassword(e)}
              required
              className="input-field w-full"
            />
          </div>
          <button type="submit" className="btn-submit w-full">
            Submit
          </button>
          <div className="text-center mt-6">
            <p>
              Don't have an account? <Link href="/Register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
