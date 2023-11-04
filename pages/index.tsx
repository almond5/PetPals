import Link from 'next/link';

const Index = () => {
  return (
    <div>
      <div>
      <button> <Link href="/Login">Click Me to Login </Link></button>
      </div>
      <div>
        <button> <Link href="/Register">Click Me to Register </Link></button>
      </div>
    </div>
  );
};

export default Index;
