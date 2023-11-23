import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      let userEmail, password: any;

      if (typeof req.body === 'object') {
        userEmail = req.body.userEmail;
        password = req.body.password;
      } else {
        const body = JSON.parse(req.body);
        userEmail = body.userEmail;
        password = body.password;
      }

      const user = await prisma.user.findFirst({
        where: { email: userEmail },
      });

      if (user === null || user === undefined) {
        res.status(501).json('User not found');
      } else if (
        user !== null &&
        user !== undefined &&
        user!.password !== password
      ) {
        res.status(500).json('Incorrect Password');
      } else {
        // Delete the profile
        const delUser = await prisma.user.delete({
          where: { email: userEmail },
        });

        res.status(200).json('Success');
      }
    } catch (error) {
      res.status(500).json('Unknown Error Occurred');
    }
  } else {
    res.status(405).json(null);
  }
}
