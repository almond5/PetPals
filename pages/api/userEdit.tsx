import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      let userEmail, newEmail, newPassword, oldPassword: any;

      if (typeof req.body === 'object') {
        userEmail = req.body.userEmail;
        newEmail = req.body.newEmail;
        newPassword = req.body.newPassword;
        oldPassword = req.body.oldPassword;
      } else {
        const body = JSON.parse(req.body);
        userEmail = body.userEmail;
        newPassword = body.newPassword;
        newEmail = body.newEmail;
        oldPassword = body.oldPassword;
      }

      // Update email and password
      const findIfExist = await prisma.user.findFirst({
        where: { email: userEmail },
      });

      if (newPassword === '' && oldPassword === '') {
        await prisma.user.update({
          where: { email: userEmail },
          data: {
            email: newEmail,
          },
        });
      } else if (findIfExist?.password === oldPassword) {
        await prisma.user.update({
          where: { email: userEmail },
          data: {
            email: newEmail,
            password: newPassword,
          },
        });
      }
      else {
        res.status(400).json('Invalid Password(s)');
        return;
      }

      res.status(200).json('Success');
    } catch (error) {
      res.status(500).json('Unknown Error Occurred');
    }
  } else {
    res.status(405).json(null);
  }
}
