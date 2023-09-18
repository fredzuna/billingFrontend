
import './App.css';
import DrawerAppBar from './components/DrawerAppBar';
import { Route, Routes } from 'react-router-dom';
import Consumption from './pages/consumption/Consumption';
import { MenuPatchEnum } from './enums/MenuPatchEnum';
import ConsumptionDetail from './pages/consumption/ConsumptionDetail';
import User from './pages/user/User';
import UserDetail from './pages/user/UserDetail';
import ConsumptionForm from './pages/consumption/ConsumptionForm';

function App() {
  return (
      <div className="App">
        <DrawerAppBar>
          <Routes>
            <Route path="/" element={<Consumption />} />
            <Route path={MenuPatchEnum.Consumption} element={<Consumption />} />
            <Route path={`${MenuPatchEnum.ConsumptionDetail}/:id`} element={<ConsumptionDetail />} />
            <Route path={MenuPatchEnum.User} element={<User />} />
            <Route path={`${MenuPatchEnum.UserDetail}/:id`} element={<UserDetail />} />
            <Route path={MenuPatchEnum.CreateBilling} element={<ConsumptionForm />} />
          </Routes>
        </DrawerAppBar>
      </div>
    
  );
}

export default App;
