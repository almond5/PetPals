import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      let userEmail, phoneNumber, ownerName: any;

      if (typeof req.body === 'object') {
        userEmail = req.body.userEmail;
        ownerName = req.body.ownerName;
        phoneNumber = req.body.phoneNumber;
      } else {
        const body = JSON.parse(req.body);
        userEmail = body.userEmail;
        phoneNumber = body.phoneNumber;
        ownerName = body.ownerName;
      }

      const findIfExist = await prisma.user.update({
        where: { email: userEmail },
        data: {
          phoneNumber: phoneNumber,
          name: ownerName,
        },
      });

      res.status(200).json('Success');
    } catch (error) {
      res.status(500).json('Unknown Error Occurred');
    }
  } else {
    res.status(405).json(null);
  }
}
