import { signOut, useSession } from 'next-auth/react';
import router from 'next/router';
import { SetStateAction, useState } from 'react';
import styles from '/styles/petProfile.module.css';
import Image from 'next/image';
import 'react-country-state-city/dist/react-country-state-city.css';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from 'react-country-state-city';

const PetProfileCreation = () => {
  const [imageToDisplay, setImageToDisplay] = useState('/img/petpicture.png');
  const [imageUploaded, setImageUploaded] = useState();
  const [description, setDescription] = useState('');
  const [species, setSpecies] = useState('');
  const [name, setName] = useState('');

  const [countryId, setCountryid] = useState(233);
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

    const imageData = await submitImage(image);
    const userEmail = data?.user?.email;

    const petProfile = {
      userEmail,
      description,
      species,
      name,
      imageData,
      stateId,
      countryId,
    };

    await submitProfile(petProfile);

    setDescription('');
    setSpecies('');
    setName('');
    setImageToDisplay('/img/petpicture.png');
    setCountryid(0);
    setStateId(0);
  };

  const submitProfile = async (petProfile: {
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
      const response = await fetch('/api/petProfileCreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petProfile),
      });

      if (response.ok) {
        // Handle successful petProfile creation
        alert('PetProfile created successfully!');
        window.location.reload();
      } else {
        // Handle HTTP errors if any
        alert('Error creating petProfile');
      }
    } catch (error) {
      // Handle other potential errors
      console.error('Error creating petProfile', error);
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
    <div>
      {' '}
      <button onClick={() => signOut({ callbackUrl: '/' })}>Sign-Out</button>
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
            <img src="/img/name.png" className={styles.nameImage} alt="Name" />
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
            <img
              src="/img/description.png"
              className={styles.descriptionImage}
              alt="Description"
            />
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
            <img
              src="/img/species.png"
              className={styles.speciesImage}
              alt="species"
            />
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
            <img
              src="/img/location.png"
              className={styles.locationImage}
              alt="Location"
            />

            <h6>State</h6>
            <StateSelect
              countryid={countryId}
              onChange={(e: { id: any }) => {
                setStateId(e.id);
              }}
              placeHolder="Select State"
            />
            <h6>City</h6>
            <CitySelect
              countryid={countryId}
              stateid={stateId}
              onChange={(e: any) => {
                console.log(e);
              }}
              placeHolder="Select City"
            />
          </div>

          <div className="mb-6"></div>

          <div className="flex mx-auto justify-center mb-10">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetProfileCreation;
