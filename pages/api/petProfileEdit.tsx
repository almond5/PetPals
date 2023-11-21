import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      let userEmail,
        description,
        species,
        name,
        stateId,
        countryId,
        cityId,
        stateName,
        cityName,
        public_id,
        format,
        version: any;

      if (typeof req.body === 'object') {
        userEmail = req.body.userEmail;
        description = req.body.description;
        species = req.body.species;
        name = req.body.name;
        stateId = req.body.stateId;
        countryId = req.body.countryId;
        cityId = req.body.cityId;
        stateName = req.body.stateName;
        cityName = req.body.cityName;
        public_id = req.body.public_id;
        format = req.body.format;
        version = req.body.version;
      } else {
        const body = JSON.parse(req.body);
        name = body.name;
        userEmail = body.userEmail;
        description = body.description;
        species = body.species;
        stateId = body.stateId;
        countryId = body.countryId;
        cityId = body.cityId;
        stateName = body.stateName;
        cityName = body.cityName;
        public_id = body.public_id;
        format = body.format;
        version = body.version;
      }

      const user = await prisma.user.findFirst({
        where: { email: userEmail },
      });

      const petProfile = await prisma.petProfile.update({
        where: { userId: user!.id },
        data: {
          species: species,
          description: description,
          name: name,
          image: {
            update: {
              publicId: public_id,
              format: format,
              version: version,
            },
          },
          location: {
            update: {
              stateId: stateId,
              countryId: countryId,
              cityId: cityId,
              stateName: stateName,
              cityName: cityName,
            },
          },
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
