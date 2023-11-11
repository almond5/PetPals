import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      let userEmail, description, species, name, imageData: any;

      if (typeof req.body === 'object') {
        userEmail = req.body.userEmail;
        description = req.body.description;
        species = req.body.species;
        name = req.body.name;
        imageData = req.body.imageData;
      } else {
        const body = JSON.parse(req.body);
        name = body.name;
        userEmail = body.userEmail;
        description = body.description;
        species = body.species;
        imageData = body.imageData;
      }

      console.log(name)
      console.log(description)
      console.log(userEmail)
      console.log(species)
      console.log(imageData)

      const user = await prisma.user.findFirst({
        where: { email: userEmail }
      });

      const profile = await prisma.profile.create({
        data: {
          species: species,
          description: description,
          user: { connect: { id: user!.id } },
          images: {
            create: {
              publicId: imageData.public_id,
              format: imageData.format,
              version: imageData.version.toString(),
            },
          },
        },
      });

      res.status(200).json('Success');
    } catch (error) {
      console.log(error);
      res.status(500).json('Unknown Error Occurred');
    }
  } else {
    res.status(405).json(null);
  }
}
