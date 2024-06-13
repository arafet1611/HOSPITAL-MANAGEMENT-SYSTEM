import DashboardUnderConstruction from '../assets/img/dashboard-under-contruction.png';

const Dashboard = () => {
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
      <img className='bg-light' src={DashboardUnderConstruction} alt="Dashboard Under Construction"  />
    </div>
  );
}

export default Dashboard;