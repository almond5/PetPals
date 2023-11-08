import { signIn } from 'next-auth/react';
import Link from 'next/link';

const Index = () => {
  return (
    <div>
      <div>
        <button>
          {' '}
          <Link
            href={'/api/auth/signin'}
            onClick={(e) => {
              e.preventDefault();
              signIn('Credentials', { callbackUrl: '/Dashboard' });
            }}
          >
            Click me to Sign In
          </Link>
        </button>
      </div>
      <div>
        <button>
          {' '}
          <Link href="/Register">Click Me to Register </Link>
        </button>
      </div>
    </div>
  );
};

export default Index;
