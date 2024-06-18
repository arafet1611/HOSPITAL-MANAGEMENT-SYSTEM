import AccessDeniedImage from '../assets/img/access-denied.png';

const AccessDenied = () => {
  return (
    <div  style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      margin: '0',
      padding: '0',
      overflow: 'hidden',
      backgroundColor : '#f4f4f4',
    }}>
      <img className='bg-light' src={AccessDeniedImage} alt="Dashboard Under Construction"  />
    </div>
  );
}

export default AccessDenied;