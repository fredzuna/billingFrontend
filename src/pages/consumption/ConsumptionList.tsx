import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { IPayBilling } from "../../interfaces";
import { StatusEnum } from "../../enums/StatusEnum";
import { useNavigate } from "react-router-dom";
import { MenuPatchEnum } from "../../enums/MenuPatchEnum";
import { getFullName, getPeriodDate } from "../../utils/common";
import ApiService from "../../apis/ApiService";
import { useEffect, useState } from "react";
import { IUserConsumption } from "../../interfaces/IConsumptionUser";
import { AlertApp } from "../../components/AlertApp";
import { IAlertApp } from "../../interfaces/IAlertApp";

interface IConsumptionList {
}

export default function ConsumptionList(props: IConsumptionList) {
  const [alert, setAlert] = useState<IAlertApp>();
    const [consumptions, setConsumptions] = useState<IUserConsumption[]>([]);
    let navigate = useNavigate();

    const handlePayConsumption = async(row: IUserConsumption) =>{ 
        const { service } = row;   
        const fullName = getFullName(row.client);     
        const message = `Are sure to pay "${service.name}" service, period "${getPeriodDate(row.period)}" for the "${fullName}" client`
        const res = window.confirm(message);

        try {
            if(res) {
                const request: IPayBilling = {
                    ConsumptionId: row.id
                }
                await ApiService.httpPost(`/Consumptions/PayBilling`, request);
                setAlert({
                  severity: 'success',
                  message: 'The consumption has been paid successfuly!'
                })
                fetchConsumptions()

            }
            
        } catch (error) {
            console.log(error)
        }

    }    

    const fetchConsumptions = async () => {
        try {
            const data = await ApiService.httpGet('/Consumptions');
            setConsumptions(data)
          } catch (err) {
            console.error((err as Error).message);
          }
    }

    useEffect(() => {
        fetchConsumptions();
    }, []);      

    return (
      <>
        {alert &&
          <AlertApp severity={alert.severity} message={alert.message} />
        }
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell align="right">Service</TableCell>
                <TableCell align="right">Period</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consumptions.map((row) => (
                <TableRow
                key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {getFullName(row.client)}
                  </TableCell>
                  <TableCell align="right">{row.service.name}</TableCell>
                  <TableCell align="right">{getPeriodDate(row.period)}</TableCell>
                  <TableCell align="right">{StatusEnum[row.status]}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">
                      {row.status === StatusEnum.Pending &&
                          <Button 
                          variant="contained" 
                              color="success"
                              onClick={() => {
                                  handlePayConsumption(row)
                                }}
                                >
                                  Pay
                          </Button>
                      }
                      <Button 
                          variant="contained"
                          onClick={() => {
                            navigate(`${MenuPatchEnum.ConsumptionDetail}/${row.id}`,);
                          }}
                          >View</Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
  