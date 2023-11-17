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
        currProfileId = req.body.profileId;
        currInterestedProfileId = req.body.interestedProfileId;
      } else {
        const body = JSON.parse(req.body);
        currProfileId = body.profileId;
        currInterestedProfileId = body.interestedProfileId;
      }

      const infoExist = await prisma.interest.findFirst({
        where: {
          myProfileId: currProfileId,
          interestedProfileId: currInterestedProfileId,
        },
      });

      console.log(infoExist);

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

        console.log(addInfo);
        res.status(200).json('Created Successfully');
      } else {
        const updateInfo = await prisma.interest.updateMany({
          where: {
            myProfileId: currProfileId,
            interestedProfileId: currInterestedProfileId,
          },
          data: {
            isMatch: 'True',
          },
        });
        console.log(updateInfo);
        res.status(200).json('Updated Successfully');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json('Unknown Error Occurred');
    }
  } else {
    res.status(405).json(null);
  }
}
