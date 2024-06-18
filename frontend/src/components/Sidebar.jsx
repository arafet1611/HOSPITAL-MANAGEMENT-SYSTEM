import { useEffect, useState } from 'react';
import { FaUser, FaRegCopyright } from "react-icons/fa";
import { FaListUl, FaTableList } from "react-icons/fa6";
import { MdOutlineSchema, MdOutlineDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import { FaListCheck } from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { RiMailSendFill } from "react-icons/ri";
import { FaRegCalendarCheck } from "react-icons/fa";

import '../Styles/Navbar.css';

const Sidebar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const [role, setRole] = useState(""); 
  const location = useLocation();
  useEffect(() =>  {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setRole(parsedUserInfo.job);

    }
  },[]) 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let links = [];
  if(role === 'secretary') {
    links = [
     { title: 'Statistiques table de garde', icon: <MdOutlineDashboard style={{ width: '24px', height: '24px' }} />, to: '/secretary/dashboard' },
     { title: 'Vue table de garde', icon: <FaTableList style={{ width: '24px', height: '24px' }} />, to: '/secretary/table-view' },
     { title: 'Création de modèle de table de garde', icon: <MdOutlineSchema style={{ width: '24px', height: '24px' }} />, to: '/secretary/model-creation/' },
     { title: 'Liste des modèles de table de garde', icon: <FaListUl style={{ width: '24px', height: '24px' }} />, to: '/secretary/table-model-list' },
     { title: 'Mon profil', icon: <FaUser style={{ width: '24px', height: '24px' }} />, to: '/my-profile' },
   ];
 }else if(role === 'admin'){
    links = [
     { title: 'Statistiques table de garde', icon: <MdOutlineDashboard style={{ width: '24px', height: '24px' }} />, to: '/admin/dashboard' },
     { title: 'Liste des services', icon: <MdFormatListBulletedAdd style={{ width: '24px', height: '24px' }} />, to: '/admin/service-management' },
     { title: 'Liste des jours fériés', icon: <FaCalendarAlt style={{ width: '24px', height: '24px' }} />, to: '/admin/vacation-management' },
     { title: 'Mon profil', icon: <FaUser style={{ width: '24px', height: '24px' }} />, to: '/my-profile' },
   ];
 } else if(role === 'hr') {
   links = [
     { title: 'Statistiques des employés', icon: <MdOutlineDashboard style={{ width: '24px', height: '24px' }} />, to: '/hr/dashboard' },
     { title: 'Liste des employés', icon: <FaHospitalUser style={{ width: '24px', height: '24px' }} />, to: '/hr/employees-management' },
     { title: 'Historique des modifications des employés', icon: <FaUserClock style={{ width: '24px', height: '24px' }} />, to: '/hr/employees-management-history' },
     { title: 'Tableaux de loi', icon: <FaClipboardUser style={{ width: '24px', height: '24px' }} />, to: '/hr/service-rosters' },
     { title: 'Liste des demandes', icon: <FaListCheck style={{ width: '24px', height: '24px' }} />, to: '/hr/employees-request-management' },
     { title: 'Liste des valeurs unitaires des primes', icon: <FaMoneyBills style={{ width: '24px', height: '24px' }} />, to: '/hr/prime-management' },
     { title: 'Liste des primes', icon: <FaMoneyCheckDollar style={{ width: '24px', height: '24px' }} />, to: '/hr/prime-management/prime-list' },
     { title: 'Mon profil', icon: <FaUser style={{ width: '24px', height: '24px' }} />, to: '/my-profile' },
   ];
 } else if(role === 'doctor') {
   links = [
     { title: 'Mes statistiques', icon: <MdOutlineDashboard style={{ width: '24px', height: '24px' }} />, to: '/employee/dashboard' },
     { title: 'Ma présence dans le tableau de garde', icon: <FaRegCalendarCheck style={{ width: '24px', height: '24px' }} />, to: '/employee/table-view' },
     { title: 'Ma liste de demandes envoyées', icon: <RiMailSendFill style={{ width: '24px', height: '24px' }} />, to: '/employee/demande-list' },
     { title: 'Mon profil', icon: <FaUser style={{ width: '24px', height: '24px' }} />, to: '/my-profile' },
   ];
 }

  return (
    <div className="sidebar d-flex flex-column flex-shrink-0 bg-light" style={{ width: '4.5rem', height: '100%' }}>
      <div 
        className={`d-block p-3 link-dark text-decoration-none ${isScrolled ? 'scrolled' : ''}`} 
        title="Icon-only" 
        data-bs-toggle="tooltip" 
        data-bs-placement="right" 
        style={{ width: '40px', height: isScrolled ? '0px' : '62px', transition: 'height 0.3s ease' }}
      >
        <span className="visually-hidden">Icon-only</span>
      </div>
      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        {links.map((link, index) => (
          <li className="nav-item" key={index}>
            <Link 
              to={link.to} 
              className={`nav-link py-3 border-bottom ${location.pathname === link.to ? 'active' : ''}`} 
              title={link.title} 
              data-bs-toggle="tooltip" 
              data-bs-placement="right"
            >
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <div className="copyright text-center" style={{ position: 'absolute', bottom: '40px', width: '100%', padding: '10px 0', fontSize: '12px' }}>
        <FaRegCopyright className="text-dark" style={{ width: '16px', height: '16px' }} />
        <br />
        <small className='text-dark'> 2024</small>
      </div>
    </div>
  );
}

export default Sidebar;
