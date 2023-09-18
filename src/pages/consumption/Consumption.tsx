import { Box, Button, Divider, Typography } from '@mui/material';
import ConsumptionList from './ConsumptionList';
import { MenuPatchEnum } from '../../enums/MenuPatchEnum';
import { useNavigate } from 'react-router-dom';

function Consumption() {
    let navigate = useNavigate();
    
    return (
        <Box>
            <Box display={"flex"}>
                <Box flexGrow={1}>
                    <Typography variant="h6" sx={{ my: 2 }}>Consumption history</Typography>
                </Box>
                <Box>
                    <Button 
                        variant="contained"
                        color="success"
                        onClick={() => {
                            navigate(`${MenuPatchEnum.CreateBilling}`,);
                        }}
                    >Create billing</Button>
                </Box>
            </Box>
            <Divider />
            <ConsumptionList />        
        </Box>
    );
}

export default Consumption;
