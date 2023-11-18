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
  const [cityId, setCityId] = useState(0);
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');

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
      cityId,
      stateName,
      cityName,
    };

    await submitProfile(petProfile);

    setDescription('');
    setSpecies('');
    setName('');
    setImageToDisplay('/img/petpicture.png');
    setCountryid(233);
    setStateId(0);
    setCityId(0);
    setCityName('');
    setStateName('');
  };

  const submitProfile = async (petProfile: {
    userEmail: string | undefined | null;
    description: string | undefined | null;
    species: string | undefined | null;
    name: string | undefined | null;
    imageData: any;
    stateId: number | undefined | null;
    countryId: number | undefined | null;
    cityId: number | undefined | null;
    stateName: string | undefined | null;
    cityName: string | undefined | null;
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
              marginRight: '50px', // Adjust the value as needed
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
            <div className="font-bold">Pet's Name</div>{' '}
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
            <div className="font-bold">Pet's Description</div>{' '}
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
            <div className="font-bold">Pet's Species</div>{' '}
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
          <div className="font-bold">Location</div>{' '}
          <div className="mb-6">
            {' '}
            <div className="py-2"></div>
            <StateSelect
              countryid={countryId}
              onChange={(e: any) => {
                console.log(e.name);
                setStateId(e.id);
                setStateName(e.name);
              }}
              placeHolder="Select State"
            />
            <div className="py-2"></div>
            <CitySelect
              inputClassName=""
              countryid={countryId}
              stateid={stateId}
              onChange={(e: any) => {
                setCityId(e.id);
                setCityName(e.name);
              }}
              placeHolder="Select City"
            />
          </div>
          <div className="mb-6"></div>
          <div className="flex mx-auto justify-center mb-10">
            <button type="submit" className="font-bold">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetProfileCreation;
