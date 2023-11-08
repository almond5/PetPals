import { signIn } from 'next-auth/react';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';

const Register = () => {
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
    await timeout(1000);
    router.push('/');
    setPhoneNumber('');
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
              onChange={(e) => setUserEmail(e.target.value)}
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
          <div className="mb-4">
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              id="phone_number"
              placeholder="Phone# Ex: (888-888-8888)"
              className="input-field w-full"
            />
          </div>
          <button type="submit">Submit</button>
          <div className="text-center mt-6">
          <Link
            href={'/api/auth/signin'}
            onClick={(e) => {
              e.preventDefault();
              signIn('Credentials', { callbackUrl: '/' });
            }}
          >Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
