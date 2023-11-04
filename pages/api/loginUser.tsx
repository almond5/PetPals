import { NextApiRequest, NextApiResponse } from 'next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      let { userEmail, password } = req.body;

      if (typeof req.body !== 'object')
      {
        userEmail = JSON.parse(userEmail);
        password = JSON.parse(password);
      }

      signInWithEmailAndPassword(FIREBASE_AUTH, userEmail, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}
