import Image from 'next/image';
import styles from '../styles/readPetProflie.module.css';
// import style from '/styles/Index.module.css';


const ReadPetProfile = (props: {
  petProfile: any;
  userProfile: any;
  setEditView: any;
  setAccountView: any;
}) => {
  return (
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
                  <div className={styles.bigTxt}>{props.petProfile.species}</div>
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
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button className={styles.accountSettingButton} onClick={(e) => {
            e.preventDefault();
            props.setAccountView();
          }}>
          <div className={`${styles.accountSettingText} ${styles.displayFont}`}>ACCOUNT SETTINGS</div>
        </button>
      </div>

    </div>
    // </div>
  );
};

export default ReadPetProfile;
