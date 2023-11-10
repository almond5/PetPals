import prisma from '@/lib/prismadb';
import { uploadImage } from '@/utils/cloudinary';
import { getImage } from '@/utils/formidable';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const imageUploaded = await getImage(req);
      const imageData = await uploadImage(imageUploaded.path);

      console.log(imageUploaded)
      console.log(imageData)
      console.log("HERE")
    
      const result = await prisma.image.create({
        data: {
          publicId: imageData.public_id,
          format: imageData.format,
          version: imageData.version.toString(),
          profile: {}
        },
      });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json('Unknown Error Occurred');
    }
  } else {
    res.status(405).json(null);
  }
}
