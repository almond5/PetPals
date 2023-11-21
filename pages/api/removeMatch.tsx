import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      let currProfileId, removeProfileId: any;

      if (typeof req.body === 'object') {
        currProfileId = req.body.currProfileId;
        removeProfileId = req.body.removeProfileId;
      } else {
        const body = JSON.parse(req.body);
        currProfileId = body.currProfileId;
        removeProfileId = body.removeProfileId;
      }

      const removeMatch = await prisma.interest.deleteMany({
        where: {
          AND: [
            {
              myProfileId: currProfileId,
              interestedProfileId: removeProfileId,
              isMatch: 'True',
            },
          ],
        },
      });

      const removeOtherMatch = await prisma.interest.deleteMany({
        where: {
          AND: [
            {
              myProfileId: removeProfileId,
              interestedProfileId: currProfileId,
              isMatch: 'True',
            },
          ],
        },
      });

      res.status(200).json('Deleted Successfully');
    } catch (error) {
      res.status(500).json('Unknown Error Occurred');
    }
  } else {
    res.status(405).json(null);
  }
}
