import Image from 'next/image';
import styles from '../styles/readPetProflie.module.css';
// import style from '/styles/Index.module.css';


const ReadPetProfile = (props: {
  petProfile: any;
  userProfile: any;
  setEditView: any;
}) => {
  return (
    <div style={{marginBottom: '100px'}}>
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
              src={
                process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL +
                '/' +
                props.petProfile.image.publicId
              }
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
          <div className={styles.displayPetName}>{props.petProfile.name}</div>
          <button
            className={styles.displayEdit}
            onClick={(e) => {
              e.preventDefault();
              props.setEditView();
            }}
          >
            edit
          </button>
          {/* <button onClick={setEditView}>edit</button> */}
        </div>

        <div className="flex items-center justify-center">
          <div className={styles.displayDescriptionBox}>
            <div className="flex items-center justify-center w-100">
              <div className={styles.displayDescriptionBoxText}>
            
                
                
                <div className={styles.maliTxt}>
                  <div className={styles.normalTxt}>Description: </div>
                  <div className={styles.bigTxt}>{props.petProfile.description}</div>
                </div>
                <div className={styles.maliTxt}>
                  <div className={styles.normalTxt}>Species: </div>{' '}
                  <div className={styles.bigTxt}>{props.petProfile.petSpecies}</div>
                </div>
                <div className={styles.maliTxt}>
                  <div className={styles.normalTxt}>Location: </div>{' '}
                  <div className={styles.bigTxt}>{props.petProfile.location.cityName},{' '}
                  {props.petProfile.location.stateName}</div>

                </div>

                {/* <p className={styles.displayInfo}>
                  Description: {props.petProfile.description}
                </p>
                <p className={styles.displayInfo}>
                  Species: {props.petProfile.petSpecies}
                </p>
                <p className={styles.displayInfo}>
                  Location: {props.petProfile.location.cityName},{' '}
                  {props.petProfile.location.stateName}
                </p> */}
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

      {/* <div className='flex items-center justify-center'> */}
        <div className="flex items-center justify-center">
          {/* <div style={{maxWidth: '100px'}}> */}
          {/* </div> */}
          <div className={styles.displayDivider}>
            <span className='px-4'>Owner</span>
          </div>
        </div>
      {/* </div> */}

      <div className="flex items-center justify-center">
        <div className={styles.displayDescriptionBox}>
          <div className="flex items-center justify-center">
            <div className={styles.displayDescriptionBoxText}>

              <div className={styles.maliTxt}>
                <div className={styles.normalTxt}>Name: </div>
                <div className={styles.bigTxt}>{props.userProfile.name}</div>
              </div>
              <div className={styles.maliTxt}>
                <div className={styles.normalTxt}>Phone Number: </div>{' '}
                <div className={styles.bigTxt}>{props.userProfile.phoneNumber}</div>
              </div>
              {/* <div className={styles.maliTxt}>
                <div className={styles.normalTxt}>Location: </div>{' '}
                <div className={styles.bigTxt}>{props.petProfile.location.cityName},{' '}
                {props.petProfile.location.stateName}</div>
              </div> */}
              
{/*               
              <p className={styles.displayInfo}>
                Name: {props.userProfile.name}
              </p>
              <p className={styles.displayInfo}>
                Phone Number: {props.userProfile.phoneNumber}
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default ReadPetProfile;
