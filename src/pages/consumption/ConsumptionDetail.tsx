import { Box, Divider, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IUserConsumption } from '../../interfaces/IConsumptionUser';
import ApiService from '../../apis/ApiService';
import { StatusEnum } from '../../enums/StatusEnum';
import { getPeriodDate } from '../../utils/common';
import { useParams } from 'react-router-dom';

function ConsumptionDetail() {
    const [consumption, setConsumption] = useState<IUserConsumption>();
    let { id } = useParams();

    const fetchConsumption = async () => {
        try {
            const data = await ApiService.httpGet(`/Consumptions/${id}`);
            setConsumption(data)
          } catch (err) {
            console.error((err as Error).message);
          }
    }

    const getFullName = (consumption?: IUserConsumption) => {
        if(consumption){
            return consumption?.client.firstName + " " + consumption?.client.lastName
        }

        return ""
    }

    useEffect(() => {
        fetchConsumption();
    }, []);      

  return (
    <Box width={350}>
        <Typography variant="h6" sx={{ my: 2 }}>Consumption details</Typography>
        {consumption && 
            <div>
                <ListItemText primary="Client" secondary={getFullName(consumption)} />
                <Divider />
                <ListItemText primary="Service" secondary={consumption.service.name} />
                <Divider />
                <ListItemText primary="Period" secondary={getPeriodDate(consumption.period)} />
                <Divider />
                <ListItemText primary="Status" secondary={StatusEnum[consumption.status]} />
                <Divider />
                <ListItemText primary="Amount" secondary={consumption.amount} />
            </div>
        }
    </Box>
  );
}

export default ConsumptionDetail;
