// *TODO: Test and Fix keep swiping button
// *TODO: Test and Fix continue to matches button
// *TODO: Acquire Photos for Current pet and Matched pet

import React, { useState } from 'react';
import { PetProfile } from '@prisma/client';
import styles from '/styles/dashboard.module.css';
import petProfileLike from '@/pages/api/petProfileLike';
import { useRouter } from 'next/router';
import HomeView from '@/components/HomeView';

const MatchHandlingView = (props: { petProfiles: any; petProfile: any }) => {
    const [profile] = useState<PetProfile>(props.petProfile);
    const [profiles] = useState<PetProfile[]>(props.petProfiles);
    const [currentIndex, setCurrentIndex] = useState(0); // Step 1: Add state variable for current index

    const [profileView, setProfileView] = useState(false);
    const [matchesView, setMatchesView] = useState(false);
    const [homeView, setHomeView] = useState(true);
  
    const toggleProfileView = () => {
      profileView ? setProfileView(false) : setProfileView(true);
    };
  
    const toggleMatchesView = () => {
      matchesView ? setMatchesView(false) : setMatchesView(true);
    };
  
    const toggleHomeView = () => {
      homeView ? setHomeView(false) : setHomeView(true);
    };

    // Acquire the pet ID of the current pet profile and the pet ID of the pet profile that the current pet profile has matched with
    const petId = profile.id;
    const petIdMatch = profiles[0].id;

    // Acquire the image of the current pet profile
    const image = props.petProfile.image;

    // Acquire the image of the pet profile that the current pet profile has matched with
    const imageMatch = props.petProfiles[0].image;

    console.log(petId);
    console.log(petIdMatch);
    
    // Continue swiping
    const handleKeepSwiping = () => {
        // Remove the current pet profile from the array of pet profiles
        props.petProfiles.shift();
        setCurrentIndex(currentIndex + 1);
        console.log(currentIndex);
        console.log(props.petProfiles);
    }

    // Open up the profile page for testing purposes
    const handleContinueToMatches = () => {
        // pull up the profile page
        toggleProfileView();
        setMatchesView(false);
        setHomeView(false);
    }

    return (
        <div className="bg-white flex flex-row justify-center w-full">
            <div className="bg-white w-[430px] h-[932px] relative">
                <div className="left-[226px] absolute w-[128px] h-[128px] top-[253px] bg-[100%_100%]">
                    <img className="h-[128px] rounded-[64px] border border-solid border-black" src={image} alt="Pet1 Profile" />
                </div>
                <div className="left-[76px] absolute w-[128px] h-[128px] top-[253px] bg-[100%_100%]">
                    <img className="h-[128px] rounded-[64px] border border-solid border-black" src={imageMatch} alt="Pet2 Profile" />
                </div>
                <div className="left-[226px] absolute w-[128px] h-[128px] top-[253px] bg-[100%_100%]">
                    <div className="h-[128px] rounded-[64px] border border-solid border-black" />
                </div>
                <div className="left-[76px] absolute w-[128px] h-[128px] top-[253px] bg-[100%_100%]">
                    <div className="h-[128px] rounded-[64px] border border-solid border-black" />
                </div>
                <div className="absolute top-[439px] left-[89px] [font-family:'Mali-Medium',Helvetica] font-medium text-black text-[32px] tracking-[3.20px] leading-[normal]">
                    ITS A MATCH!
                </div>
            </div>
            <button className="absolute top-[600px] left-[129px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleKeepSwiping}>
                Keep Swiping
            </button>
            <button className="absolute top-[800px] left-[129px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleContinueToMatches}>
                Continue to Matches
            </button>
        </div>
    );
};

export default MatchHandlingView;