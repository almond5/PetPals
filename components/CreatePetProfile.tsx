import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import 'react-country-state-city/dist/react-country-state-city.css';
import { CitySelect, StateSelect } from 'react-country-state-city';
import { VscSignOut } from 'react-icons/vsc';
import router from 'next/router';

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
    const public_id = imageData.public_id;
    const format = imageData.format;
    const version = imageData.version.toString();

    const petProfile = {
      userEmail,
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
      version,
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
    stateId: number | undefined | null;
    countryId: number | undefined | null;
    cityId: number | undefined | null;
    stateName: string | undefined | null;
    cityName: string | undefined | null;
    public_id: string | undefined | null;
    format: string | undefined | null;
    version: string | undefined | null;
  }) => {
    try {
      const response = await fetch('/api/petProfileCreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petProfile),
      });

      if (response.ok) {
        // Handle successful petProfile creation
        router.push('/Cards');
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
      <div className="header">
        PetPals
        <button
          className="absolute right-10 top-8"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <VscSignOut style={{ fontSize: '40px' }} />
        </button>
      </div>
      <div className="py-5 min-h-screen flex items-center justify-center">
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
            <div className="font-bold">Pet&apos;s Name</div>{' '}
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full outline outline-2 rounded py-2 px-3"
              maxLength={200}
            />
          </div>
          <div className="mb-4">
            <div className="font-bold">Pet&apos;s Description</div>{' '}
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={7}
              className="w-full outline outline-2 rounded py-2 px-3"
              maxLength={322}
            ></textarea>
          </div>
          <div className="mb-6">
            <div className="font-bold">Pet&apos;s Species</div>{' '}
            <input
              id="species"
              type="text"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              required
              className="w-full outline outline-2 rounded py-2 px-3"
              maxLength={200}
            />
          </div>
          <div className="font-bold">Location</div>{' '}
          <div className="mb-6">
            {' '}
            <div className="py-2"></div>
            <StateSelect
              containerClassName="w-full outline outline-2 rounded py-2 px-3"
              countryid={countryId}
              onChange={(e: any) => {
                setStateId(e.id);
                setStateName(e.name);
              }}
              placeHolder="Select State"
            />
            <div className="py-2"></div>
            <CitySelect
              containerClassName="w-full outline outline-2 rounded py-2 px-3"
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
