import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      let userEmail, description, species: any;

      if (typeof req.body === 'object') {
        userEmail = req.body.userEmail;
        description = req.body.description;
        species = req.body.species;
      } else {
        const body = JSON.parse(req.body);
        description = body.description;
        species = body.species;
      }

      const user = await prisma.user.findFirst({
        where: { email: userEmail }
      });
      
      const profile = await prisma.profile.create({
        data: {
          species: species,
          description: description,
          user: { connect: { id: user!.id } },
        }
      })

      res.status(200).json('Success');
    } catch (error) {
      console.log(error);
      res.status(500).json('Unknown Error Occurred');
    }
  } else {
    res.status(405).json(null);
  }
}
