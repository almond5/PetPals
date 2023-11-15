import { User } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
// import styles from '/styles/petUser.module.css';

const EditUser = (props: { user: any }) => {
  const [userEmail, setUserEmail] = useState(props.user.userEmail);
  const [password, setPassword] = useState(props.user.password);
  const [description, setDescription] = useState(props.user.description);
  const [phoneNumber, setPhoneNumber] = useState(props.user.phoneNumber);
  const [imageUploaded, setImageUploaded] = useState();
  const [imageToDisplay, setImageToDisplay] = useState('/img/petpicture.png');
  const [userAccount] = useState<User>(props.user);
  const { status: sesh, data: data } = useSession();

  const handleChange = (e: any) => {
    if (e.target.files === null || e.target.files === undefined) {
      return;
    }

    setImageUploaded(e.target.files[0]);
    setImageToDisplay(URL.createObjectURL(e.target.files[0]));
  };

  const submitUser = async (User: {
    userEmail: string | undefined | null;
    password: string | undefined | null;
    // Description: string | undefined | null;
    phoneNumber: string | undefined | null;
    // imageData: any;
  }) => {
    try {
      console.log(User);
      const response = await fetch('/api/userEdit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(User),
      });

      if (response.ok) {
        // Handle successful User creation
        alert('User edited successfully!');
        router.push('/Dashboard');
      } else {
        // Handle HTTP errors if any
        alert('Error editing User');
      }
    } catch (error) {
      // Handle other potential errors
      console.error('Error editing User', error);
    }
  };

  const deleteUser = async (User: {
    userEmail: string | undefined | null;
    password: string | undefined | null;
    // Description: string | undefined | null;
    phoneNumber: string | undefined | null;
    // imageData: any;
  }) => {
    try {
      console.log(User);
      const response = await fetch('/api/userDelete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(User),
      });

      if (response.ok) {
        // Handle successful User creation
        alert('User deleted successfully!');
        router.push('/Dashboard');
      } else {
        // Handle HTTP errors if any
        alert('Error deleting User');
      }
    } catch (error) {
      // Handle other potential errors
      console.error('Error deleting User', error);
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

    const User = {
      userEmail : userEmail,
      password : password,
      phoneNumber : phoneNumber,
    //   imageData,
    };

    await submitUser(User);

    window.location.reload();
  };

  const handleDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const image = {
      imageUploaded,
    };

    // const imageData = await submitImage(image);
    const userEmail = data?.user?.email;

    const User = {
      userEmail : userEmail,
      password : password,
      phoneNumber : phoneNumber,
    //   imageData,
    };

    await deleteUser(User);

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
          {/* <img src="/img/name.png" className={styles.nameImage} alt="Name" /> */}
          <input
            id="Email"
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            className="block appearance-none w-full 
          border rounded py-2 px-3 text-gray-700 
          leading-tight focus:outline-none 
          focus:shadow-outline"
            maxLength={200}
          />
        </div>

        <div className="mb-4">
          {/* <img
            src="/img/description.png"
            className={styles.descriptionImage}
            alt="Description"
          /> */}
          <textarea
            id="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {/* <img
            src="/img/species.png"
            className={styles.speciesImage}
            alt="species"
          /> */}
          <input
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="block appearance-none w-full 
          border rounded py-2 px-3 text-gray-700 
          leading-tight focus:outline-none 
          focus:shadow-outline"
            maxLength={200}
          />
        </div>

        {/* <div className="mb-6">
          <img
            src="/img/location.png"
            className={styles.locationImage}
            alt="Location"
          />
        </div> */}

        <div className="mb-6"></div>
        <div className="flex items-center justify-between">
          <button type="submit">Submit</button>
        </div>
      </form>
      <form onSubmit={handleDelete}>
        <div className ="mb-6"></div>
        <div className ="flex items-center justify-between">
          <button type ="submit">Delete</button>
        </div>
      </form>
      <button onClick={() => signOut({ callbackUrl: '/' })}>Sign-Out</button>
    </div>
  );
};

export default EditUser;
