import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const data = await fetch(
        'https://api.cloudinary.com/v1_1/dknxcrch0/image/upload',
        {
          method: 'POST',
          body: req.body,
        }
      ).then((r) => r.json());

      console.log(data)

      // const result = await prisma.image.create({
      //   data: {
      //     publicId: imageData.public_id,
      //     format: imageData.format,
      //     version: imageData.version.toString(),
      //     profile: {},
      //   },
      // });

      // res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json('Unknown Error Occurred');
    }
  } else {
    res.status(405).json(null);
  }
}
