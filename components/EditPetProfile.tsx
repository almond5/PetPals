import { signOut, useSession } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
import styles from '/styles/petProfile.module.css';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { PetProfile } from '@prisma/client';
import Image from 'next/image';

const EditPetProfile = (props: { petProfile: any }) => {
  const [userProfile] = useState<PetProfile>(props.petProfile);
  const [imageToDisplay, setImageToDisplay] = useState(
    process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL +
      '/' +
      props.petProfile.image.publicId
  );
  const [description, setDescription] = useState(props.petProfile.description);
  const [species, setSpecies] = useState(props.petProfile.species);
  const [name, setName] = useState(props.petProfile.name);
  const [imageUploaded, setImageUploaded] = useState(undefined);

  const [countryId, setCountryid] = useState(0);
  const [stateId, setStateId] = useState(0);
  
  const { status: sesh, data: data } = useSession();

  const handleChange = (e: any) => {
    if (
      e.target.files === null ||
      e.target.files === undefined ||
      e.target.files[0] === undefined ||
      e.target.files[0] === null
    ) {
      return;
    }

    setImageUploaded(e.target.files[0]);
    setImageToDisplay(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const image = {
      imageUploaded,
    };
    const publicId = props.petProfile.image.publicId;
    const version = props.petProfile.image.version.toString();
    const format = props.petProfile.image.format;

    let imageData = { publicId, version, format };

    if (imageUploaded !== undefined) {
      imageData = await submitImage(image);
    }

    const userEmail = data?.user?.email;

    const petProfile = {
      userEmail,
      description,
      species,
      name,
      imageData,
      stateId,
      countryId
    };

    await submitProfileEdit(petProfile);

    window.location.reload();
  };

  const submitProfileEdit = async (petProfile: {
    userEmail: string | undefined | null;
    description: string | undefined | null;
    species: string | undefined | null;
    name: string | undefined | null;
    imageData: any;
    stateId: number | undefined | null;
    countryId: number | undefined | null;
  }) => {
    try {
      console.log(petProfile);
      const response = await fetch('/api/petProfileEdit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petProfile),
      });

      if (response.ok) {
        // Handle successful petProfile creation
        alert('Profile edited successfully!');
        router.push('/Dashboard');
      } else {
        // Handle HTTP errors if any
        alert('Error Editing Profile');
      }
    } catch (error) {
      // Handle other potential errors
      console.error('Error Editing Profile', error);
    }
  };

  const submitImage = async (image: { imageUploaded: any }) => {
    try {
      const formData = new FormData();
      formData.append('file', imageUploaded!);
      formData.append('upload_preset', 'ifs1rfae');

      const data = await fetch(process.env.NEXT_PUBLIC_CLOUD_URL!, {
        method: 'POST',
        body: formData,
      }).then((r) => r.json());

      return data;
    } catch (error) {
      console.error('Error Uploading Image', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div
          className="mt-8 mb-8"
          style={{
            position: 'relative',
            width: '250px',
            height: '250px',
            marginLeft: '50px', // Adjust the value as needed
            marginRight: '50px',
          }}
        >
          <label htmlFor="fileInput">
            <Image
              src={imageToDisplay}
              alt=""
              sizes="500px"
              fill
              style={{
                objectFit: 'cover',
                border: '3px solid #000000',
              }}
            />
          </label>

          <input
            id="fileInput"
            onChange={handleChange}
            accept=".jpg, .png, .gif, .jpeg"
            type="file"
          />
        </div>

        <div className="mb-6">
          <div className="font-bold">Name</div>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="block appearance-none w-full 
          border rounded py-2 px-3 text-gray-700 
          leading-tight focus:outline-none 
          focus:shadow-outline"
            maxLength={200}
          />
        </div>

        <div className="mb-4">
          <div className="font-bold">Description</div>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={7}
            className="block appearance-none w-full 
          border rounded py-2 px-3 text-gray-700 
          leading-tight focus:outline-none 
          focus:shadow-outline"
            maxLength={322}
          ></textarea>
        </div>

        <div className="mb-6">
          <div className="font-bold">Species</div>
          <input
            id="species"
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
            className="block appearance-none w-full 
          border rounded py-2 px-3 text-gray-700 
          leading-tight focus:outline-none 
          focus:shadow-outline"
            maxLength={200}
          />
        </div>

        <div className="mb-6">
          <div className="font-bold">Location</div>
          
        </div>
        <div className="mb-6">
          <div className="font-bold">Phone Number</div>
          <input
            id="phonenumber"
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
            className="block appearance-none w-full 
          border rounded py-2 px-3 text-gray-700 
          leading-tight focus:outline-none 
          focus:shadow-outline"
            maxLength={200}
          />
        </div>
        <div className="mb-6"></div>
        <div className="flex mx-auto justify-center">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EditPetProfile;
