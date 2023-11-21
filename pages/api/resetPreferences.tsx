import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      let currProfileId: any;

      if (typeof req.body === 'object') {
        currProfileId = req.body.currProfileId;
      } else {
        const body = JSON.parse(req.body);
        currProfileId = body.currProfileId;
      }

      const updateInterests = await prisma.interest.deleteMany({
        where: {
          AND: [
            {
              myProfileId: currProfileId,
              isMatch: 'False',
            },
          ],
        },
      });

      res.status(200).json('Updated Successfully');
    } catch (error) {
      res.status(500).json('Unknown Error Occurred');
    }
  } else {
    res.status(405).json(null);
  }
}
