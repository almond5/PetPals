import router from 'next/router';
import { useEffect } from 'react';
import styles from '/styles/dashboard.module.css';

const ItsAMatchView = (props: {
  currProfile: any;
  currInterestedProfile: any;
  setItsAMatchView: any;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {}, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={'mx-auto'} style={{ paddingTop: '50%' }}>
      <div className="flex justify-center items-center py-4 gap-5">
        <img
          className="w-[150px] h-[150px] rounded-[100px] 
          outline outline-1 outline-black"
          src={
            process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL +
            '/' +
            props.currProfile.image.publicId
          }
          style={{ width: '20vh', height: '20vh' }}
        />
        <img
          className="w-[150px] h-[150px] rounded-[100px] outline outline-1 outline-black"
          src={
            process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL +
            '/' +
            props.currInterestedProfile.image.publicId
          }
          style={{ width: '20vh', height: '20vh' }}
        />
      </div>
      <div
        className="mx-auto text-center font-bold pb-4"
        style={{ fontFamily: 'Mali', fontSize: '30px' }}
      >
        Its a Match!
      </div>
      <div
        className="mx-auto text-center pb-4"
        style={{ fontFamily: 'Mali', fontSize: '24px' }}
      >
        <div className="flex mx-auto justify-center text-center pb-4">
          <button
            className={styles.btn}
            onClick={(e) => {
              e.preventDefault();
              router.push('/Matches');
            }}
            style={{ fontFamily: 'Mali' }}
          >
            <div className={`${styles.btnTxt}`}>Continue</div>
          </button>
        </div>
        <button
          style={{ fontFamily: 'Mali' }}
          onClick={(e) => {
            e.preventDefault();
            props.setItsAMatchView(false);
          }}
        >
          <div>Keep Swiping</div>
        </button>
      </div>
    </div>
  );
};

export default ItsAMatchView;
