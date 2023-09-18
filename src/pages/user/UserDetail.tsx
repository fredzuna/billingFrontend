import { Box, Divider, ListItemText, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ApiService from '../../apis/ApiService';
import { useParams } from 'react-router-dom';
import { IConsumptionUser, IPayBilling, IUser } from '../../interfaces';
import UserConsumptionList from './UserConsumptionList';
import { getPeriodDate } from '../../utils/common';

type IConsumption = Omit<IConsumptionUser, 'client'>

interface  IUserConsumption extends IUser {
    consumptions: IConsumption[]
}

function UserDetail() {
    const [user, setUser] = useState<IUserConsumption>();
    let { id } = useParams();

    const fetchUser = async () => {
        try {
            const data = await ApiService.httpGet(`/Users/${id}`);
            setUser(data)
          } catch (err) {
            console.error((err as Error).message);
          }
    }

    const handlePayConsumption = async(row: IConsumption) =>{ 
        const { service } = row;   
        const message = `Are sure to pay "${service.name}" service, period "${getPeriodDate(row.period)}"`
        const res = window.confirm(message);

        try {
            if(res) {
                const request: IPayBilling = {
                    ConsumptionId: row.id
                }
                await ApiService.httpPost(`/Consumptions/PayBilling`, request);
                fetchUser()
            }
            
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchUser();
    }, []);      

  return (
    <Box width={500}>
        <Typography variant="h6" sx={{ my: 2 }}>Client details</Typography>
        {user && 
            <div>
                <Box mb={8}>
                    <ListItemText primary="First Name" secondary={user.firstName} />
                    <Divider />
                    <ListItemText primary="Last Name" secondary={user.lastName} />
                    <Divider />                    
                </Box>
                <UserConsumptionList consumptions={user.consumptions} handlePaying={handlePayConsumption} />
            </div>
        }
    </Box>
  );
}

export default UserDetail;
