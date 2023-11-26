import router from 'next/router';
import { useEffect } from 'react';
import styles from '/styles/dashboard.module.css';


const ItsAMatchView = (props: {
  currProfile: any;
  currInterestedProfile: any;
  setItsAMatchView: any;
}) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`$"flex flex-col font-bold" ${styles.container4Cards}`} style={{paddingTop: '50%'}}>
      <div className="flex justify-center items-center py-4" style={{width: '55vh', marginLeft: '2rem'}}>
        <img
          className="w-[150px] h-[150px] rounded-[100px] 
          outline outline-1 outline-black"
          src={
            process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL +
            '/' +
            props.currProfile.image.publicId
          }
          style={{width: '20vh', height: '20vh', marginRight: '2vh'}}
        />
        <img
          className="w-[150px] h-[150px] rounded-[100px] outline outline-1 outline-black"
          src={
            process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL +
            '/' +
            props.currInterestedProfile.image.publicId
          }
          style={{width: '20vh', height: '20vh', marginLeft: '2vh'}}
        />
      </div>
      <div className="mx-auto text-center font-bold pb-4" style={{fontFamily: 'Mali', fontSize: '24px'}}>Its a Match!</div>

      <button
        className={styles.btn}
        onClick={(e) => {
          e.preventDefault();
          router.push('/Matches');
        }}
        style={{fontFamily: 'Mali', marginLeft: '2rem'}}
      >
        <div className={`${styles.btnTxt}`}>Continue</div>
      </button>
      <button
        className="flex flex-col p-2 mb-4 px-4 justify-center font-bold"
        style={{fontFamily: 'Mali'}}

        onClick={(e) => {
          e.preventDefault();
          props.setItsAMatchView(false);
        }}
      >
        <div className={styles.btnNoBack}>Keep Swiping</div>
      </button>
    </div>
  );
};

export default ItsAMatchView;
