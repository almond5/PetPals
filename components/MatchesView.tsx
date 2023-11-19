// import React, { useState } from 'react';
// import { PetProfile } from '@prisma/client';

// const MatchesView = (props: { matches: any; petProfile: any }) => {
//   const [profile] = useState<PetProfile>(props.petProfile);
//   const [matches] = useState<PetProfile[]>(props.matches);

//   return (
//     <div className='py-10'>
//       <div className="flex justify-center [font-family:'Mali-Regular',Helvetica] font-normal text-black text-[24px] text-center tracking-[0] leading-[normal]">Matches</div>
//       {matches.map((petProfile: any) => (
//         <div key={petProfile.id}>
//           {/* <div className="flex justify-center">{petProfile.name}</div> */}

//           <div className = "flex justify-center items-center">
//           <div className="absolute w-[300px] h-[90px] top-[100px] justify-center border border-solid border-black">
//             <div className="left-[18px] absolute w-[50px] h-[50px] top-[19px] bg-[#d9d9d9] rounded-[25px]" />
//             <div className="left-[88px] absolute top-[28px] [font-family:'Mali-Regular',Helvetica] font-normal text-black text-[24px] text-center tracking-[0] leading-[normal]">
//                 {petProfile.name}
//             </div>
//           </div>
//         </div>
//         </div>
//       ))}
//     </div>
//   );
  
// };

// export default MatchesView;

import React, { useState } from 'react';
import { PetProfile } from '@prisma/client';

const MatchesView = (props: { matches: any; petProfile: any }) => {
  const [profile] = useState<PetProfile>(props.petProfile);
  const [matches] = useState<PetProfile[]>(props.matches);

  return (
    <div className='py-10'>
      <div className="flex justify-center [font-family:'Mali-Regular',Helvetica] font-normal text-black text-[24px] text-center tracking-[0] leading-[normal]">Matches</div>
      {matches.map((petProfile: any) => (
        <div key={petProfile.id} className="my-2">
          <div className = "flex justify-center items-center">
            <div className="w-[300px] h-[90px] border border-solid border-black relative">
              <div className="left-[18px] absolute w-[50px] h-[50px] top-[19px] bg-[#d9d9d9] rounded-[25px]" />
              <div className="left-[88px] absolute top-[28px] [font-family:'Mali-Regular',Helvetica] font-normal text-black text-[24px] text-center tracking-[0] leading-[normal]">
                {petProfile.name}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchesView;