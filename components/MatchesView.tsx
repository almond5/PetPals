import React, { useState } from 'react';
import { PetProfile } from '@prisma/client';
import { FcLike } from 'react-icons/fc';

const MatchesView = (props: { matches: any; petProfile: any; likedMeCount: any }) => {
  const [profile] = useState<PetProfile>(props.petProfile);
  const [matches] = useState<PetProfile[]>(props.matches);

  return (
    <div className="py-10">
      <div
        className="flex justify-center font-normal text-black text-[24px] 
      text-center rounded-xl"
      >
        Matches <FcLike style={{ fontSize: '40px' }} />
      </div>
      <div className="py-4" style={{ maxHeight: '400px' }}>
        {matches.map((petProfile: any) => (
          <div key={petProfile.id} className="my-3 overflow-auto">
            <div className="flex justify-center items-center">
              <div
                className="w-[340px] h-[90px] border-2 border-solid border-black 
              relative rounded-xl"
              >
                <img
                  className="left-[18px] absolute w-[50px] h-[50px] top-[19px]
                   bg-[#d9d9d9] rounded-[25px]"
                  src={
                    process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL +
                    '/' +
                    petProfile.image.publicId
                  }
                />
                <div
                  className="left-[88px] absolute top-[24px] font-normal text-black 
                text-[24px] flex px-2 flex-wrap text-left word-left break-all"
                >
                  {petProfile.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesView;
