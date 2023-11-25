import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import { CitySelect, StateSelect } from 'react-country-state-city';
import styles from '../styles/readPetProflie.module.css';


const ReadPetProfile = (props: {
  petImage:any;
  petName: any;
  petDescription: any;
  petSpecies: any;
  ownerName: any;
  ownerPhoneNumber: any;
  cityName: any;
  stateName: any;
  setEditView: any;
}) => {
  const petImage = process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL + '/' + props.petImage;
  const petName = props.petName;
  const petDescription = props.petDescription;
  const petSpecies = props.petSpecies;

  const ownerName = props.ownerName;
  const ownerPhoneNumber = props.ownerPhoneNumber;
  
  // const stateId = props.petProfile.location.stateId;
  // const cityId = props.petProfile.location.cityId;
  const stateName = props.stateName;
  const cityName = props.cityName;

  function showEditView () {
    props.setEditView();
  }

  return (
    
  // <div>
  //   <div className="flex items-center justify-center">
  //     <form>
  //       <div
  //         className="mt-8 mb-8"
  //         style={{
  //           position: 'relative',
  //           width: '250px',
  //           height: '250px',
  //           marginLeft: '50px',
  //           marginRight: '50px',
  //         }}
  //       >
  //         {/* <label htmlFor="fileInput">
  //           <Image
  //             src={imageToDisplay}
  //             alt=""
  //             sizes="500px"
  //             fill
  //             style={{
  //               objectFit: 'cover',
  //               border: '3px solid #000000',
  //             }}
  //           />
  //         </label>
          
  //         <input
  //           name="imageInput"
  //           id="fileInput"
  //           onChange={handleChange}
  //           accept=".jpg, .png, .gif, .jpeg"
  //           type="file"
  //           className='display-none'
  //         /> */}
  //       </div>
  //       <div className="mb-6">
  //         <div className="font-bold">Pet&apos;s Name</div>{' '}
  //         <input
  //           id="name"
  //           type="text"
  //           value={name}
  //           onChange={(e) => setName(e.target.value)}
  //           required
  //           className="w-full outline outline-2 rounded py-2 px-3"
  //           maxLength={200}
  //         />
  //       </div>
  //       <div className="mb-4">
  //         <div className="font-bold">Pet&apos;s Description</div>
  //         <textarea
  //           id="description"
  //           value={description}
  //           onChange={(e) => setDescription(e.target.value)}
  //           required
  //           rows={7}
  //           className="w-full outline outline-2 rounded py-2 px-3 "
  //           maxLength={322}
  //         ></textarea>
  //       </div>
  //       <div className="mb-6">
  //         <div className="font-bold">Pet&apos;s Species</div>
  //         <input
  //           id="species"
  //           type="text"
  //           value={species}
  //           onChange={(e) => setSpecies(e.target.value)}
  //           required
  //           className="w-full outline outline-2 rounded py-2 px-3"
  //           maxLength={200}
  //         />
  //       </div>
  //       <div className="font-bold">Location</div>{' '}
  //       <div className="mb-6">
  //         {' '}
  //         <div className="py-2"></div>
  //         <StateSelect
  //           containerClassName="w-full outline outline-2 rounded py-2 px-3"
  //           countryid={countryId}
  //           defaultValue={defaultState}
  //           onChange={(e: any) => {
  //             setStateId(e.id);
  //             setStateName(e.name);
  //           }}
  //           placeHolder={stateName}
  //         />
  //         <div className="py-2"></div>
  //         <CitySelect
  //           containerClassName="w-full outline outline-2 rounded py-2 px-3"
  //           countryid={countryId}
  //           stateid={stateId}
  //           cityid={cityId}
  //           defaultValue={defaultCity}
  //           onChange={(e: any) => {
  //             setCityId(e.id);
  //             setCityName(e.name);
  //           }}
  //           placeHolder={cityName}
  //         />
  //       </div>
  //       <div className="flex mx-auto justify-center font-bold mb-6">
  //         Owner Stuff
  //       </div>
  //       <div className="mb-6">
  //         <div className="font-bold">Owner&apos;s Name</div>
  //         <input
  //           onChange={(e) => setOwnerName(e.target.value)}
  //           type="text"
  //           value={ownerName}
  //           id="ownerName"
  //           className="w-full outline outline-2 rounded py-2 px-3"
  //         />
  //       </div>
  //       <div className="mb-6">
  //         <div className="font-bold">Phone Number</div>
  //         <input
  //           onChange={(e) => setPhoneNumber(e.target.value)}
  //           type="text"
  //           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
  //           value={phoneNumber}
  //           id="phone_number"
  //           placeholder="888-888-8888"
  //           className="w-full outline outline-2 rounded py-2 px-3"
  //         />
  //       </div>
  //       <div className="mb-6"></div>
  //       <div className="flex mx-auto justify-center mb-10">
  //         <button type="submit" className="font-bold">
  //           Save
  //         </button>
  //       </div>
  //     </form>
  // </div>
  // </div>


    // <div>
    //   <div className="flex items-center justify-center">

    //     <div
    //       className="mt-8 mb-8"
    //       style={{
    //       position: 'relative',
    //       width: '250px',
    //       height: '250px',
    //       marginLeft: '50px',
    //       marginRight: '50px',
    //       }}
    //     >
    //       <Image
    //         src={petImage}
    //         alt=""
    //         sizes="500px"
    //         fill
    //         style={{
    //           objectFit: 'cover',
    //           border: '1px solid gray',
    //           borderRadius: '200px',
    //         }}
    //       />

    //     </div>

    //     <div className="mb-6">

    //       <div>{petName}</div>
    //     </div>

    //     <div>{petDescription}</div>
    //     <div>{petSpecies}</div>
    //   </div>
    // </div>


    // <div style={{maxWidth: '500px'}}>
    <div>

      <div>
        <div className="flex items-center justify-center"> 
          <div
            className="mt-8 mb-8"
            style={{
            position: 'relative',
            width: '250px',
            height: '250px',
            marginLeft: '50px',
            marginRight: '50px',
            }}
          >
            <Image
              src={petImage}
              alt=""
              sizes="500px"
              fill
              style={{
                objectFit: 'cover',
                border: '1px solid gray',
                borderRadius: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />

          </div>
          


            {/* <div style={{width: 171, height: 40, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 32, fontFamily: 'Mali', fontWeight: '400', wordWrap: 'break-word'}}>{petName}</div> */}
              

        </div>

        <div className={styles.displayFont}>
          <div className={styles.displayPetName}>{petName}</div>
          {/* <div>{petName}</div> */}
          <div
            className={styles.displayEdit}
            onClick={showEditView}
          >
            edit
          </div>
          {/* <button onClick={setEditView}>edit</button> */}
        </div>
        
        <div className="flex items-center justify-center">
          <div className={styles.displayDescriptionBox}>
            <div className="flex items-center justify-center w-100">
              <div className={styles.displayDescriptionBoxText}>
                
                <p className={styles.displayInfo}>Description: {petDescription}</p>
                <p className={styles.displayInfo}>Species: {petSpecies}</p>
                <p className={styles.displayInfo}>Location: {cityName}, {stateName}</p>
              
              </div>
            </div>
          </div>
        </div>

        {/* <div className={styles.displayFont}>
        </div> */}

        {/* <div style={{width: 171, height: 40, left: 727, top: 275, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 32, fontFamily: 'Mali', fontWeight: '400', wordWrap: 'break-word'}}>NAME</div>
        <div style={{left: 793, top: 314, position: 'absolute', textAlign: 'center', color: '#8E8E8E', fontSize: 20, fontFamily: 'Mali', fontWeight: '400', wordWrap: 'break-word'}}>edit</div>
        <div style={{width: 348, height: 363, left: 644, top: 382, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 30, fontFamily: 'Mali', fontWeight: '400', wordWrap: 'break-word'}}>Description</div> */}
      </div>

      <div className="flex items-center justify-center">
        {/* <div style={{maxWidth: '100px'}}> */}
        {/* </div> */}
          <div className={styles.displayDivider}>
            <span>
              Owner
            </span>
          </div>
      </div>

      <div className="flex items-center justify-center">
        <div className={styles.displayDescriptionBox}>
          <div className="flex items-center justify-center">
            <div className={styles.displayDescriptionBoxText}>
                    
              <p className={styles.displayInfo}>Name: {ownerName}</p>
              <p className={styles.displayInfo}>Phone Number: {ownerPhoneNumber}</p>
            
            </div>
          </div>
        </div>
      </div>

    </div>
    // </div>

    
  );
};

export default ReadPetProfile;
