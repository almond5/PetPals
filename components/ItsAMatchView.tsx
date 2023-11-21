import router from "next/router";

const ItsAMatchView = (props: {
  currProfile: any;
  currInterestedProfile: any;
  setItsAMatchView: any;
}) => {
  return (
    <div className="flex flex-col font-bold">
      <div className="mx-auto">Its a Match!</div>
      <div className="flex justify-around py-4">
        <img
          className="left-[18px] w-[150px] h-[150px] top-[19px] rounded-[100px] 
          outline outline-3 outline-black"
          src={
            process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL +
            '/' +
            props.currProfile.image.publicId
          }
        />
        <img
          className="left-[18px] w-[150px] h-[150px] top-[19px] rounded-[100px] outline outline-3 outline-black"
          src={
            process.env.NEXT_PUBLIC_CLOUD_DOWNLOAD_URL +
            '/' +
            props.currInterestedProfile.image.publicId
          }
        />
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          router.push('/Matches');
        }}
      >
        <div>Continue</div>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          props.setItsAMatchView(false);
        }}
      >
        <div>Keep Swiping</div>
      </button>
    </div>
  );
};

export default ItsAMatchView;
