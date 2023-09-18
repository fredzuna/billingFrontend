import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { MenuPatchEnum } from '../enums/MenuPatchEnum';

interface NavItem {
  name: string,
  path: MenuPatchEnum,
}

interface Props {
  children: React.ReactNode
}

const navItems: NavItem[] = [
  {
    name: "Users",
    path: MenuPatchEnum.User,
  },
  {
    name: "Consumption history",
    path: MenuPatchEnum.Consumption,
  }
];

export default function DrawerAppBar(props: Props) {
  let navigate = useNavigate(); 

  const routeChange = (item: NavItem) =>{ 
    navigate(item.path);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button 
                key={item.name} 
                sx={{ color: '#fff' }} 
                onClick={() => {
                  routeChange(item)
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }} margin={"0 auto"}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}