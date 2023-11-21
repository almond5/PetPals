import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      let userEmail: any;

      if (typeof req.body === 'object') {
        userEmail = req.body.userEmail;
      } else {
        const body = JSON.parse(req.body);
        userEmail = body.userEmail;
      }

      const user = await prisma.user.findFirst({
        where: { email: userEmail }
      });

        // Delete the pet profile
        const petProfile = await prisma.petProfile.delete({
            where: { userId: user!.id },
        });

        // Delete the profile
        const User = await prisma.user.delete({
            where: { email: userEmail },
        });

      res.status(200).json('Success');
    } catch (error) {
      res.status(500).json('Unknown Error Occurred');
    }
  } else {
    res.status(405).json(null);
  }
}
