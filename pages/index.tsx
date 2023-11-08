// import { signIn } from 'next-auth/react';
// import Link from 'next/link';

// const Index = () => {
//   return (
//     <div>
//       <div>
//         <button>
//           {' '}
//           <Link
//             href={'/api/auth/signin'}
//             onClick={(e) => {
//               e.preventDefault();
//               signIn('Credentials', { callbackUrl: '/Dashboard' });
//             }}
//           >
//             Click me to Sign In
//           </Link>
//         </button>
//       </div>
//       <div>
//         <button>
//           {' '}
//           <Link href="/Register">Click Me to Register </Link>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Index;

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import styles from '../styles/Index.module.css'; // Make sure to create this CSS module

const Index = () => {
  return (
    <div className={styles.container}>
      <img
        src="/img/index.png"
        alt="Pet and Mouse"
        className={styles.petImage}
      />
      <div className="mt-48">
        <button className={`${styles.button} ${styles.signInButton}`}>
          <Link
            href={'/api/auth/signin'}
            onClick={(e) => {
              e.preventDefault();
              signIn('Credentials', { callbackUrl: '/Dashboard' });
            }}
          >
            <img className="mt-2" src="/img/login.png" alt="Pet and Mouse" />
          </Link>
        </button>
        <button className={`${styles.button} ${styles.registerButton}`}>
          <Link href="/Register">
            <img className="mt-2" src="/img/signup.png" alt="Pet and Mouse" />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Index;
