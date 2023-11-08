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
      <img src="/img/index.png" alt="Pet and Mouse" className={styles.petImage} />
      <div>
        <button className={`${styles.button} ${styles.signInButton}`}>
          <Link
            href={'/api/auth/signin'}
            onClick={(e) => {
              e.preventDefault();
              signIn('Credentials', { callbackUrl: '/Dashboard' });
            }}
          >
            login
          </Link>
        </button>
        <button className={`${styles.button} ${styles.registerButton}`}>
          <Link href="/Register">SIGN UP</Link>
        </button>
      </div>
    </div>
  );
};

export default Index;
