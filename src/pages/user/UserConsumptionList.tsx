import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { StatusEnum } from "../../enums/StatusEnum";
import { getPeriodDate } from "../../utils/common";
import { IConsumption } from "../../interfaces/IConsumptionUser";

interface IProps {
  consumptions: IConsumption[]
  handlePaying: (row: IConsumption) => void
}

export default function UserConsumptionList(props: IProps) {
    const { consumptions, handlePaying } = props;

    return (
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
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
                              handlePaying(row)
                            }}
                        >
                                Pay
                        </Button>
                    }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  