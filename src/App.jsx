import React, { useState } from 'react';
import LoginScreen        from './screens/LoginScreen';
import Sidebar            from './components/Sidebar';
import DashboardScreen    from './screens/DashboardScreen';
import MisionesScreen     from './screens/MisionesScreen';
import EspacioIAscreen    from './screens/EspacioIAscreen';
import PerfilScreen       from './screens/PerfilScreen';
import MapaEnergiaScreen  from './screens/MapaEnergiaScreen';
import CulturaScreen             from './screens/CulturaScreen';
import CulturaTrabajadorScreen   from './screens/CulturaTrabajadorScreen';
import ContratoScreen            from './screens/ContratoScreen';
import AdminFounderScreen        from './screens/AdminFounderScreen';
import CulturaAdminScreen        from './screens/CulturaAdminScreen';

const SCREENS = {
  dashboard:         DashboardScreen,
  misiones:          MisionesScreen,
  ia:                EspacioIAscreen,
  perfil:            PerfilScreen,
  energia:           MapaEnergiaScreen,
  cultura:           CulturaScreen,
  culturaWorker:     CulturaTrabajadorScreen,
  culturaAdmin:      CulturaAdminScreen,
  contrato:          ContratoScreen,
  admin:             AdminFounderScreen,
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setScreen]  = useState('dashboard');
  const [userRole,     setUserRole] = useState('trabajador'); // 'trabajador' | 'admin'

  const handleLogin = (role = 'trabajador') => {
    setIsLoggedIn(true);
    setUserRole(role);
    // Admin arranca en Mapa de Energía; trabajador en Dashboard
    setScreen(role === 'admin' ? 'energia' : 'dashboard');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const Screen = SCREENS[currentScreen] ?? DashboardScreen;

  return (
    <div className="bg-[#F2F7F6] min-h-screen">
      <Sidebar currentScreen={currentScreen} setScreen={setScreen} userRole={userRole} />
      <Screen />
    </div>
  );
}
