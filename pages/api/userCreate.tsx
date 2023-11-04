import { NextApiRequest, NextApiResponse } from 'next';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  updatePhoneNumber,
} from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {

      let { userEmail, password, phoneNumber } = req.body;

      if (typeof req.body !== 'object')
      {
        userEmail = JSON.parse(userEmail);
        phoneNumber = JSON.parse(phoneNumber);
        password = JSON.parse(password);
      }

      let user = null;
      createUserWithEmailAndPassword(FIREBASE_AUTH, userEmail, password)
        .then((userCredential) => {
          user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);

          // handle email use by sending message
        });

      if (user != null) {
        updatePhoneNumber(user, phoneNumber)
          .catch((error) => {
            console.log("Error Has Occured In Phone Number");
          });

        updateProfile(user!, {
          displayName: 'Who Knows',
        })
          .catch((error) => {
            console.log("Error Has Occured In Update");
          });
      }
    } catch (error) {
      console.log(error);
      console.log("Error Has Occured Overall");
    }

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}
