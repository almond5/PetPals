import React from 'react';

const Gear = (props: { setAccountView: any; setProfileView: any }) => {
  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOption = event.target.value;
    if (selectedOption === 'editProfile') {
      props.setAccountView(false);
      props.setProfileView(true);
    } else if (selectedOption === 'accountSettings') {
      props.setProfileView(false);
      props.setAccountView(true);
    }
  };

  return (
    <div style={{ position: 'absolute', top: '0px', right: '0px' }}>
      <select onChange={handleSelectionChange}>
        <option value="editProfile">Profile</option>
        <option value="accountSettings">Account</option>
      </select>
    </div>
  );
};

export default Gear;
