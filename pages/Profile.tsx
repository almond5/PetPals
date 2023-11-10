import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';

const ProfileCreation = () => {
  const [description, setDescription] = useState('');
  const [species, setSpecies] = useState('');
  const [imageUploaded, setImageUploaded] = useState();
  const [userEmail, setUserEmail] = useState('');
  const { status: sesh, data: data } = useSession();

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    router.push('/');
  }

  const handleChange = (e: any) => {
    setImageUploaded(e.target.files[0]);
  };

  const submitProfile = async (profile: {
    description: string | undefined | null;
    species: string | undefined | null;
    imageUploaded: any;
    userEmail: string | undefined | null;
  }) => {
    try {
      const response = await fetch('/api/profileCreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          // Handle successful profile creation
          alert('Profile created successfully!');
          router.push('/Dashboard'); // Redirect to home page or wherever appropriate
        } else {
          // Handle response when data is null
          alert('Profile creation failed');
        }
      } else {
        // Handle HTTP errors if any
        alert('Error creating profile');
      }
    } catch (error) {
      // Handle other potential errors
      console.error('Error creating profile', error);
    }
  };

  const submitImage = async (image: {
    imageUploaded: any;
  }) => {
    try {
      const formData = new FormData();
      formData.append('file', imageUploaded!);
      formData.append('upload_preset', 'ifs1rfae');

      const data = await fetch(
        'https://api.cloudinary.com/v1_1/dknxcrch0/image/upload',
        {
          method: 'POST',
          body: formData
        }
      ).then((r) => r.json());

      console.log(data)

      // const response = await fetch("/api/createImage", {
      //   method: 'POST',
      //   body: formData
      // });

      // console.log(response)
      // console.log("HERE")
    } catch (error) {
      // Handle other potential errors
      console.error('Error creating profile', error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setUserEmail(data?.user?.email!)

    const image = {
      imageUploaded,
    };

    const profile = {
      userEmail,
      description,
      species,
      imageUploaded,
    };

    await submitImage(image)
    // await submitProfile(profile);
    setDescription('');
    setSpecies('');
    setUserEmail('')
    window.location.reload()
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            Description
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={7}
              className="block appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              maxLength={322}
            ></textarea>
          </div>

          <div className="mb-6">
            Species
            <input
              id="species"
              type="text"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              required
              className="block appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              maxLength={200}
            />
          </div>

          <input
            onChange={handleChange}
            accept=".jpg, .png, .gif, .jpeg"
            type="file"
          ></input>

          <input type="submit" value="Upload" />

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className=" text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <Link
              href={'/api/auth/signin'}
              onClick={(e) => {
                e.preventDefault();
                signIn('Credentials', { callbackUrl: '/' });
              }}
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreation;
