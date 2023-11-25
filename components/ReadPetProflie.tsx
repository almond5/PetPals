import Image from 'next/image';
import styles from '../styles/readPetProflie.module.css';

const ReadPetProfile = (props: {
  petProfile: any;
  userProfile: any;
  setEditView: any;
}) => {
  return (
    <div className={styles.flag}>
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
              </div>
            </div>
          </div>
        </div>        
      </div>

        <div className="flex items-center justify-center">
          <div className={styles.displayDivider}>
            <span className='px-4'>Owner</span>
          </div>
        </div>
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
              <div className='flex jusify-center py-6'>
                <button className={styles.registerButton}>
                  <div className={styles.btnText}>Account Settings</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadPetProfile;
