import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig';
import { useState } from 'react';

export async function getServerSideProps() {
  try {
    const foodCollection = collection(FIRESTORE_DB, 'Users');
    const querySnapshot = await getDocs(foodCollection);
    console.log("here")
    // Loop through the documents in the collection
    querySnapshot.forEach((doc) => {
      console.log('Document ID: ', doc.id, ' => Document Data: ', doc.data());
      // Here you can use doc.id and doc.data() as needed
    });

    return {
      props: {
        propsFromServer: querySnapshot.docs[0].data(),
      },
    };
  } catch (error) {
    return {
      props: {
        propsFromServer: null,
      },
    };
  }
}

const Dashboard = ({ propsFromServer }: { propsFromServer: any }) => {
  const [stuff] = useState<any>(propsFromServer);

  console.log(stuff)

  return (
    <div className="py-10">
      <div className="absolute top-0 right-10 py-10"></div>
      <div className="py-16">
        <div
          className="mx-auto rounded-[0.5rem] w-max border-[0.175rem]
         border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-50"
        >
          Welcome! 
          
        </div>
        Your email is {stuff['email']} and Your password is {stuff['password']}
      </div>
    </div>
  );
};

export default Dashboard;
