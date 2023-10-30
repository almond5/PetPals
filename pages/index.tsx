import Link from 'next/link';
import Dashboard from './dashboard';

const Index = () => {
  return (
    <div>
        <Link href={'/dashboard'}>
            Click me For SSR via Firebase
        </Link>
    </div>
  )
};

export default Index;