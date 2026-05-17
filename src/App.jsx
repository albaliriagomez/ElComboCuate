import React, { useState } from 'react';
import LoginScreen        from './screens/LoginScreen';
import Sidebar            from './components/Sidebar';
import DashboardScreen    from './screens/DashboardScreen';
import MisionesScreen     from './screens/MisionesScreen';
import EspacioIAscreen    from './screens/EspacioIAscreen';
import PerfilScreen       from './screens/PerfilScreen';
import MapaEnergiaScreen  from './screens/MapaEnergiaScreen';
import CulturaScreen      from './screens/CulturaScreen';
import ContratoScreen     from './screens/ContratoScreen';
import AdminFounderScreen from './screens/AdminFounderScreen';
import AdminGateScreen    from './screens/AdminGateScreen';

const SCREENS = {
  dashboard: DashboardScreen,
  misiones:  MisionesScreen,
  ia:        EspacioIAscreen,
  perfil:    PerfilScreen,
  energia:   MapaEnergiaScreen,
  cultura:   CulturaScreen,
  contrato:  ContratoScreen,
  admin:     AdminFounderScreen,
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setScreen]  = useState('dashboard');
  const [isAdmin,      setIsAdmin]  = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  // Admin gate: si navega a admin sin haber desbloqueado, mostrar pantalla de autenticación
  if (currentScreen === 'admin' && !isAdmin) {
    return (
      <div className="bg-[#F2F7F6] min-h-screen">
        <Sidebar currentScreen={currentScreen} setScreen={setScreen} />
        <AdminGateScreen onUnlock={() => setIsAdmin(true)} />
      </div>
    );
  }

  const Screen = SCREENS[currentScreen] ?? DashboardScreen;

  return (
    <div className="bg-[#F2F7F6] min-h-screen">
      <Sidebar currentScreen={currentScreen} setScreen={setScreen} />
      <Screen />
    </div>
  );
}
