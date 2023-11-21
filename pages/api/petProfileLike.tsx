import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      let currProfileId, currInterestedProfileId: any;

      if (typeof req.body === 'object') {
        currProfileId = req.body.currProfileId;
        currInterestedProfileId = req.body.currInterestedProfileId;
      } else {
        const body = JSON.parse(req.body);
        currProfileId = body.currProfileId;
        currInterestedProfileId = body.currInterestedProfileId;
      }

      const infoExist = await prisma.interest.findFirst({
        where: {
          OR: [
            {
              myProfileId: currProfileId,
              interestedProfileId: currInterestedProfileId,
            },
            {
              myProfileId: currInterestedProfileId,
              interestedProfileId: currProfileId,
            }
          ],
        },
      });


      // if the interest between the two profile is not in the db
      // store it with the match status being pending; otherwise
      // update 'isMatch' to 'True'
      if (infoExist === null || infoExist === undefined) {
        const addInfo = await prisma.interest.create({
          data: {
            isMatch: 'Pending',
            myProfile: { connect: { id: currProfileId } },
            interestedProfile: { connect: { id: currInterestedProfileId } },
          },
        });

        res.status(200).json('Created Successfully');
      } else {
        const updateInfo = await prisma.interest.updateMany({
          where: {
            myProfileId: currInterestedProfileId,
            interestedProfileId: currProfileId,
          },
          data: {
            isMatch: 'True',
          },
        });
        res.status(200).json('Updated Successfully');
      }
    } catch (error) {
      res.status(500).json('Unknown Error Occurred');
    }
  } else {
    res.status(405).json(null);
  }
}
