import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import noProfilePicture from '../assets/no-profile-picture.png';
import { ProfileInterface } from '../types';
import { fetchProfile } from '../tests/database-mock';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';

const Profile = (): React.ReactNode => {

  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  const [image, setImage] = useState<string>('');
  // Enable save/cancel of uploaded image
  const [enableImage, setEnableImage] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>('');
  const [enableFirstName, setEnableFirstName] = useState<boolean>(false);

  const [lastName, setLastName] = useState<string>('');
  const [enableLastName, setEnableLastName] = useState<boolean>(false);

  const [userName, setUserName] = useState<string>('');
  const [enableUserName, setEnableUserName] = useState<boolean>(false);

  const [nickName, setNickName] = useState<string>('');
  const [enableNickName, setEnableNickName] = useState<boolean>(false);

  const [socialMedia, setSocialMedia] = useState<string>('');
  const [enableSocialMedia, setEnableSocialMedia] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [enableEmail, setEnableEmail] = useState<boolean>(false);

  const [phone, setPhone] = useState<string>('');
  const [enablePhone, setEnablePhone] = useState<boolean>(false);

  const [address, setAddress] = useState<string>('');
  const [enableAddress, setEnableAddress] = useState<boolean>(false);

  const [biographicalInfo, setBiographicalInfo] = useState<string>('');
  const [enableBiographicalInfo, setEnableBiographicalInfo] = useState<boolean>(false);

  const [oldPassword, setOldPassword] = useState<string>('');
  const [enableOldPassword, setEnableOldPassword] = useState<boolean>(false);

  const [newPassword, setNewPassword] = useState<string>('');
  const [enableNewPassword, setEnableNewPassword] = useState<boolean>(false);

  // Context for AuthContex
  const auth = useContext(AuthContext);

  const {user} = auth;

  if (!user) return;

  const navigate = useNavigate();


  const getUserProfile = async(): Promise<void> => {
    try {
      const profile: ProfileInterface = await fetchProfile(user.id);

      const { firstName, lastName, userName, nickName, socialMedia, email, phone, address, biographicalInfo} = profile;

      setFirstName(() => firstName);
      setLastName(() => lastName);
      setUserName(() => userName);
      setNickName(() => nickName);
      setSocialMedia(() => socialMedia);
      setEmail(() => email);
      setPhone(() => phone);
      setAddress(() => address);
      setBiographicalInfo(() => biographicalInfo);

      setOldPassword(() => user.password);
      setNewPassword(() => '');

      setLoadingProfile(() => false);

    } catch (error) {
      console.log('Error fetchin user profile');
    }
  }


  const notEmpty = (item: string): boolean => {
    return item.length > 0;
  }

  interface ProfileFieldsEnablementInterface {
    firstName: React.Dispatch<React.SetStateAction<boolean>>;
    lastName: React.Dispatch<React.SetStateAction<boolean>>;
    userName: React.Dispatch<React.SetStateAction<boolean>>;
    nickName: React.Dispatch<React.SetStateAction<boolean>>;
    socialMedia: React.Dispatch<React.SetStateAction<boolean>>;
    email: React.Dispatch<React.SetStateAction<boolean>>;
    phone: React.Dispatch<React.SetStateAction<boolean>>;
    address: React.Dispatch<React.SetStateAction<boolean>>;
    biographicalInfo: React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface ProfileFieldsSetInterface {
    firstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: React.Dispatch<React.SetStateAction<string>>;
    userName: React.Dispatch<React.SetStateAction<string>>;
    nickName: React.Dispatch<React.SetStateAction<string>>;
    socialMedia: React.Dispatch<React.SetStateAction<string>>;
    email: React.Dispatch<React.SetStateAction<string>>;
    phone: React.Dispatch<React.SetStateAction<string>>;
    address: React.Dispatch<React.SetStateAction<string>>;
    biographicalInfo: React.Dispatch<React.SetStateAction<string>>;
  }

  const profileFieldsEnablementStates: ProfileFieldsEnablementInterface = {
    firstName: setEnableFirstName,
    lastName: setEnableLastName,
    userName: setEnableUserName,
    nickName: setEnableNickName,
    socialMedia: setEnableSocialMedia,
    email: setEnableEmail,
    phone: setEnablePhone,
    address: setEnableAddress,
    biographicalInfo: setEnableBiographicalInfo,
  };

  const profileFieldsSetStates: ProfileFieldsSetInterface = {
    firstName: setFirstName,
    lastName: setLastName,
    userName: setUserName,
    nickName: setNickName,
    socialMedia: setSocialMedia,
    email: setEmail,
    phone: setPhone,
    address: setAddress,
    biographicalInfo: setBiographicalInfo,
  };


  const handleInputEnabled = (desiredInput: keyof ProfileFieldsEnablementInterface) => {
    Object.entries(profileFieldsEnablementStates).forEach(([key, setState]) => {
      setState(() => key === desiredInput);
    });
  }

  const handleInputValue = (value: string, desiredInput: keyof ProfileFieldsSetInterface):void => {
    const setState = profileFieldsSetStates[desiredInput];
    setState(() => value);
  }


  const uploadUserImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
        setEnableImage(() => true);
      };
      reader.readAsDataURL(file);
    }
  }


  const abortUploadUserImage = (): void => {
    setEnableImage(() => false)
    setImage(() => '');
  }

  const saveUploadedUserImage = (): void => {
    setEnableImage(() => false)
  }


  useEffect(() => {
    getUserProfile();
  }, []);


  return (
    <div className='profile-page'>
      <div className='container'>

        { loadingProfile ?
        <Loading text='Loading profile'/>
        :
        <>
        <div className='header'>
          <button className='default-button' onClick={() => navigate('/')}> <i className='bi bi-arrow-left'></i></button>
        </div>

        <div className='left'>
          <div className='image-section'>
            <div className='image-wrapper'>
              <img src={image ? image : noProfilePicture} alt='Profile picture' />
              {
                enableImage &&
                <>
                  <div className='save-image-btn' onClick={saveUploadedUserImage}><i className='bi bi-check2'/></div>
                  <div className='abort-image-btn' onClick={abortUploadUserImage}><i className='bi bi-x'/></div>
                </>
              }
            </div>
            <label style={{ textAlign: 'center' }} className='default-button' htmlFor='upload-image-input'>Upload Photo</label>
            <input style={{ display: 'none' }} id='upload-image-input' type='file' accept='image' onChange={uploadUserImage} />
          </div>

          <div className='password-section'>
            <label className='default-label' htmlFor="old_password">Old Pasword</label>
            <input 
              className={`default-input ${notEmpty(firstName) && !enableFirstName ? 'temp_disabled' : 'temp_enabled'}`}
              id='old_password'
              type="password"
              value={oldPassword}
            />

            <label className='default-label' htmlFor="new_password">New Pasword</label>
            <input className='default-input' id='new_password' type="password" />

            <button className='default-button'>Change Password</button>
          </div>
        </div>

        <div className='right'>
          <div className='sub-section'>
            <h3 className='title'>Profile Information</h3>
            <div className='sub-content'>
              <div className='input-wrapper'>
                <label htmlFor='first_name'>First Name</label>
                <input
                  className={`${notEmpty(firstName) && !enableFirstName ? 'temp_disabled' : 'temp_enabled'}`}
                  id='first_name'
                  type='text'
                  placeholder='First Name'
                  value={firstName}
                  onDoubleClick={() => handleInputEnabled('firstName')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputValue(e.target.value, 'firstName')}
                />
              </div>

              <div className='input-wrapper'>
                <label htmlFor='last_name'>Last Name</label>
                <input
                  className={`${notEmpty(lastName) && !enableLastName ? 'temp_disabled' : 'temp_enabled'}`} 
                  id='last_name'
                  type='text'
                  placeholder='Last Name'
                  value={lastName}
                  onDoubleClick={() => handleInputEnabled('lastName')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputValue(e.target.value, 'lastName')}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                  className={`${notEmpty(userName) && !enableUserName ? 'temp_disabled' : 'temp_enabled'}`} 
                  id='username'
                  type='text'
                  placeholder='Username'
                  value={userName}
                  onDoubleClick={() => handleInputEnabled('userName')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputValue(e.target.value, 'userName')}
                />
              </div>

              <div className='input-wrapper'>
                <label htmlFor='nickname'>Nickname</label>
                <input
                  className={`${notEmpty(nickName) && !enableNickName ? 'temp_disabled' : 'temp_enabled'}`} 
                  id='nickname'
                  type='text'
                  placeholder='Nickname'
                  value={nickName}
                  onDoubleClick={() => handleInputEnabled('nickName')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputValue(e.target.value, 'nickName')}
                />
              </div>
            </div>
          </div>

          <div className='sub-section'>
            <h3 className='title'>Contact Info</h3>
            <div className='sub-content'>
              <div className='input-wrapper'>
                <label htmlFor='social_media'>Social media</label>
                <input
                  className={`${notEmpty(socialMedia) && !enableSocialMedia ? 'temp_disabled' : 'temp_enabled'}`} 
                  id='social_media'
                  type='text'
                  placeholder='Instagram, linkedIn....'
                  value={socialMedia}
                  onDoubleClick={() => handleInputEnabled('socialMedia')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputValue(e.target.value, 'socialMedia')}
                />
              </div>

              <div className='input-wrapper'>
                <label htmlFor='email'>Email</label>
                <input
                  className={`${notEmpty(email) && !enableEmail ? 'temp_disabled' : 'temp_enabled'}`} 
                  id='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onDoubleClick={() => handleInputEnabled('email')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputValue(e.target.value, 'email')}
                />
              </div>

              <div className='input-wrapper'>
                <label htmlFor='phone'>Phone</label>
                <input
                  className={`${!enablePhone ? 'temp_disabled' : 'temp_enabled'}`} 
                  id='phone' 
                  type='text' 
                  placeholder='Phone'
                  value={phone}
                  onDoubleClick={() => handleInputEnabled('phone')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputValue(e.target.value, 'phone')}
                />
              </div>

              <div className='input-wrapper'>
                <label htmlFor='address'>Address</label>
                <input
                  className={`${notEmpty(address) && !enableAddress ? 'temp_disabled' : 'temp_enabled'}`}
                  id='address'
                  type='text'
                  placeholder='Address'
                  value={address}
                  onDoubleClick={() => handleInputEnabled('address')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputValue(e.target.value, 'address')}
                />
              </div>
            </div>
          </div>

          <div className='sub-section'>
            <h3 className='title'>About User</h3>
            <div className='sub-content'>
              <div className='input-wrapper'>
                <label htmlFor='bio'>Biographical Info</label>
                <textarea
                  className={`${notEmpty(biographicalInfo) && !enableBiographicalInfo ? 'temp_disabled' : 'temp_enabled'}`}
                  id='bio'
                  value={biographicalInfo}
                  onDoubleClick={() => handleInputEnabled('biographicalInfo')}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputValue(e.target.value, 'biographicalInfo')}
                />
              </div>
            </div>
          </div>

        </div>
        </>
      }
      </div>
    </div>
  )
}

export default Profile;