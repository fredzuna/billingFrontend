import { Box, Divider, Typography } from '@mui/material';
import UserList from './UserList';

function User() {
  return (
    <Box>
        <Typography variant="h6" sx={{ my: 2 }}>Clients</Typography>
        <Divider />
        <UserList />        
    </Box>
  );
}

export default User;
