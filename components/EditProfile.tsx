import { Profile } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
import styles from '/styles/petProfile.module.css';

const EditProfile = (props: { profile: any }) => {
  const [description, setDescription] = useState(props.profile.description);
  const [species, setSpecies] = useState(props.profile.species);
  const [imageUploaded, setImageUploaded] = useState();
  const [imageToDisplay, setImageToDisplay] = useState('/img/petpicture.png');
  const [name, setName] = useState(props.profile.name);
  const [userProfile] = useState<Profile>(props.profile);
  const { status: sesh, data: data } = useSession();

  const handleChange = (e: any) => {
    if (e.target.files === null || e.target.files === undefined) {
      return;
    }

    setImageUploaded(e.target.files[0]);
    setImageToDisplay(URL.createObjectURL(e.target.files[0]));
  };

  const submitProfile = async (profile: {
    userEmail: string | undefined | null;
    description: string | undefined | null;
    species: string | undefined | null;
    name: string | undefined | null;
    // imageData: any;
  }) => {
    try {
      console.log(profile);
      const response = await fetch('/api/profileEdit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        // Handle successful profile creation
        alert('Profile edited successfully!');
        router.push('/Dashboard');
      } else {
        // Handle HTTP errors if any
        alert('Error editing profile');
      }
    } catch (error) {
      // Handle other potential errors
      console.error('Error editing profile', error);
    }
  };

//   const submitImage = async (image: { imageUploaded: any }) => {
//     try {
//       const formData = new FormData();
//       formData.append('file', imageUploaded!);
//       formData.append('upload_preset', 'ifs1rfae');

//       const data = await fetch(process.env.NEXT_PUBLIC_CLOUD_URL!, {
//         method: 'POST',
//         body: formData,
//       }).then((r) => r.json());

//       return data;
//     } catch (error) {
//       console.error('Error Uploading Image', error);
//     }
//   };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const image = {
      imageUploaded,
    };

    // const imageData = await submitImage(image);
    const userEmail = data?.user?.email;

    const profile = {
      userEmail,
      description,
      species,
      name,
    //   imageData,
    };

    await submitProfile(profile);

    // // Set it to whatever API returns
    // setDescription('');
    // setSpecies('');
    // setName('');
    // setImageToDisplay('/img/petpicture.png');

    window.location.reload();
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        {/* <div
          className="mt-8 mb-8"
          style={{
            position: 'relative',
            width: '250px',
            height: '250px',
            marginLeft: '50px', // Adjust the value as needed
          }}
        >
          <label htmlFor="fileInput">
            <Image
              src={imageToDisplay}
              alt=""
              sizes="500px"
              fill
              style={{
                objectFit: 'contain',
                border: '3px solid #000000',
              }}
            />
          </label>

          <input
            id="fileInput"
            onChange={handleChange}
            accept=".jpg, .png, .gif, .jpeg"
            type="file"
            hidden
            required
          />
        </div> */}

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
        </div>

        <div className="mb-6"></div>

        <div className="flex items-center justify-between">
          <button type="submit">Submit</button>
        </div>
      </form>
      <button onClick={() => signOut({ callbackUrl: '/' })}>Sign-Out</button>
    </div>
  );
};

export default EditProfile;