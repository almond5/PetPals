import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import { CitySelect, StateSelect } from 'react-country-state-city';
import styles from '../styles/matches.module.css';

const EditPetProfile = (props: { 
  petProfile: any; 
  userProfile: any; 
  setReadView: any; 
}) => {
  const [imageToDisplay, setImageToDisplay] = useState(
    process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL +
      '/' +
      props.petProfile.image.publicId
  );

  const [ownerName, setOwnerName] = useState(props.userProfile.name);
  const [phoneNumber, setPhoneNumber] = useState(props.userProfile.phoneNumber);

  const [description, setDescription] = useState(props.petProfile.description);
  const [species, setSpecies] = useState(props.petProfile.species);
  const [name, setName] = useState(props.petProfile.name);
  const [imageUploaded, setImageUploaded] = useState(undefined);

  const [countryId] = useState(233);
  const [stateId, setStateId] = useState(props.petProfile.location.stateId);
  const [cityId, setCityId] = useState(props.petProfile.location.cityId);
  const [stateName, setStateName] = useState(
    props.petProfile.location.stateName
  );
  const [cityName, setCityName] = useState(props.petProfile.location.cityName);
  const defaultState = { id: stateId, name: stateName };
  const defaultCity = { id: cityId, name: cityName };

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
    let public_id = props.petProfile.image.publicId;
    let version = props.petProfile.image.version.toString();
    let format = props.petProfile.image.format;

    let imageData = { public_id, version, format };

    if (imageUploaded !== undefined) {
      imageData = await submitImage(image);
      public_id = imageData.public_id;
      version = imageData.version.toString();
      format = imageData.format;
    }

    const userEmail = data?.user?.email;

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

    const ownerProfile = {
      ownerName,
      phoneNumber,
      userEmail,
    };

    await submitProfileEdit(petProfile);
    await submitOwnerEdit(ownerProfile);
    window.location.reload();
  };

  const submitOwnerEdit = async (ownerProfile: {
    userEmail: string | undefined | null;
    phoneNumber: string | undefined | null;
    ownerName: string | undefined | null;
  }) => {
    try {
      const response = await fetch('/api/ownerEdit', {
        method: 'POST',
        body: JSON.stringify(ownerProfile),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data);
        return null;
      }

      return true;
    } catch (error) {
      alert('Invalid Credentials!');
      return null;
    }
  };

  const submitProfileEdit = async (petProfile: {
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
      const response = await fetch('/api/petProfileEdit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petProfile),
      });

      if (response.ok) {
        // alert('Successfully Edited!');
        console.log('Successfully Edited!');
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
    <div>
      <div className="flex items-center justify-center min-w-0">
        <form onSubmit={handleSubmit}  className={styles.form}>
          <div className='flex items-center justify-center'>
            <div
              className="mt-8 mb-4"
              style={{
                position: 'relative',
                width: '210px',
                height: '210px',
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
                    border: '1px solid gray',
                    borderRadius: '7px',
                  }}
                />
              </label>
              
              <input
                name="imageInput"
                id="fileInput"
                onChange={handleChange}
                accept=".jpg, .png, .gif, .jpeg"
                type="file"
                className='display-none'
              />
            </div>
          </div>
          <div className="mb-4">
            <div className={styles.inputHeader}>Pet&apos;s Name</div>{' '}
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
              maxLength={200}
            />
          </div>
          <div className="mb-4">
            <div className={styles.inputHeader}>Pet&apos;s Description</div>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={7}
              className={styles.input}
              maxLength={322}
            ></textarea>
          </div>
          <div className="mb-4">
            <div className={styles.inputHeader}>Pet&apos;s Species</div>
            <input
              id="species"
              type="text"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              required
              className={styles.input}
              maxLength={200}
            />
          </div>
          <div className={styles.inputHeader}>Location</div>{' '}
          <div className="mb-6">
            {' '}
            <StateSelect
              containerClassName={`${styles.input} ${styles.dropdown}`}
              countryid={countryId}
              defaultValue={defaultState}
              onChange={(e: any) => {
                setStateId(e.id);
                setStateName(e.name);
              }}
              placeHolder={stateName}
            />
            <div className="py-2"></div>
            <CitySelect
              containerClassName={`${styles.input} ${styles.dropdown}`}
              countryid={countryId}
              stateid={stateId}
              cityid={cityId}
              defaultValue={defaultCity}
              onChange={(e: any) => {
                setCityId(e.id);
                setCityName(e.name);
              }}
              placeHolder={cityName}
            />
          </div>
          {/* <div className={"flex mx-auto justify-center font-bold mb-6"}> */}
          <div className={styles.ownerTitle}>
            <span>Owner</span>
          </div>
          <div className="mb-4">
            <div className={styles.inputHeader}>Owner&apos;s Name</div>
            <input
              onChange={(e) => setOwnerName(e.target.value)}
              type="text"
              value={ownerName}
              id="ownerName"
              className={styles.input}
            />
          </div>
          <div className="mb-4">
            <div className={styles.inputHeader}>Phone Number</div>
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={phoneNumber}
              id="phone_number"
              placeholder="888-888-8888"
              className={styles.input}
            />
          </div>
          <div className="mb-6"></div>
          <div className="flex mx-auto justify-center">
            <button type="submit" className={styles.saveBtn}>
              <div className={styles.btnText}>Save</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPetProfile;
