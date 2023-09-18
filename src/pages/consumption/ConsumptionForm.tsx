import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ApiService from '../../apis/ApiService';
import { IService, IUser } from '../../interfaces';
import { getDaysArray, getFullName } from '../../utils/common';
import { ICreateBilling } from '../../interfaces/ICreateBilling';
import { IAlertApp } from '../../interfaces/IAlertApp';
import { AlertApp } from '../../components/AlertApp';
import { useNavigate } from 'react-router-dom';
import { MenuPatchEnum } from '../../enums/MenuPatchEnum';

function ConsumptionForm() {
    let navigate = useNavigate();
    const [services, setServices] = useState<IService[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [alert, setAlert] = useState<IAlertApp>();

    const [service, setService] = useState<number>();
    const [client, setClient] = useState<number>();
    const [amount, setAmount] = useState<number>(150);
    const [period, setPeriod] = useState<string>('2023-10');

  

    const fetchServices = async () => {
        try {
            const data = await ApiService.httpGet('/Services');
            setServices(data)
          } catch (err) {
            console.error((err as Error).message);
          }
    }

    const fetchUsers = async () => {
        try {
            const data = await ApiService.httpGet('/Users');
            setUsers(data)
          } catch (err) {
            console.error((err as Error).message);
          }
    }

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if(service && client && amount && period) {
            console.log("we need to save")
            const request: ICreateBilling = {
                Amount: amount,
                ServiceId: service,
                ClientId: client,
                Period: period
            }
            await ApiService.httpPost(`/Consumptions/`, request);
            navigate(`${MenuPatchEnum.Consumption}`);
        }else {
            setAlert({
                severity: 'error',
                message: 'Client, serivce, amount and period are required!'
            })
        }

    }

    const getPeriodDates = () => {
        return getDaysArray(2022, 2023)
    };

    useEffect(() => {
        fetchServices();
        fetchUsers();
    }, []);        
    

    return (
        <Box width={500}>
            {alert &&
                <AlertApp severity={alert.severity} message={alert.message} />
            }
            <Typography variant="h6" sx={{ my: 2 }}>Create Billing</Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    id="service"
                    select
                    label="Service"
                    helperText="Please select the service"
                    required
                    fullWidth
                    margin="dense"
                    value={service}
                    onChange={(e) => {
                        setService(parseInt(e.target.value))
                    }}
                >
                    {services.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="client"
                    select
                    label="Client"
                    helperText="Please select the client"
                    required
                    fullWidth
                    margin="dense"
                    value={client}
                    onChange={(e) => {
                        setClient(parseInt(e.target.value))
                    }}
                >
                    {users.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {getFullName(option)}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    required
                    id="amount"
                    label="Amount"
                    fullWidth
                    helperText="Please enter the amount"
                    margin="dense"
                    type='number'
                    value={amount}
                    onChange={(e) => {
                        setAmount(parseInt(e.target.value))
                    }}
                />               
                <TextField
                    id="period"
                    select
                    label="Period"
                    helperText="Please select the period"
                    required
                    fullWidth
                    margin="dense"
                    value={period}
                    onChange={(e) => {
                        setPeriod(e.target.value)
                    }}
                >
                    {getPeriodDates().map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <Box display={"flex"} justifyContent={"right"}>
                    <Button type='button' onClick={() => {
                        navigate(`${MenuPatchEnum.Consumption}`);
                    }} >Cancel</Button>
                    <Button type='submit' variant="contained" >Save</Button>
                </Box>
            </form>
        </Box>
    );
}

export default ConsumptionForm;
