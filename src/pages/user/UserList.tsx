import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MenuPatchEnum } from "../../enums/MenuPatchEnum";
import ApiService from "../../apis/ApiService";
import { useEffect, useState } from "react";
import { IUser } from "../../interfaces";

interface IProps {
}

export default function UserList(props: IProps) {
    const [users, setUsers] = useState<IUser[]>([]);
    let navigate = useNavigate();

    const handleView = async(row: IUser) =>{ 
      navigate(`${MenuPatchEnum.UserDetail}/${row.id}`);
    }    

    const fetchUsers = async () => {
        try {
            const data = await ApiService.httpGet('/Users');
            setUsers(data)
          } catch (err) {
            console.error((err as Error).message);
          }
    }

    useEffect(() => {
        fetchUsers();
    }, []);      

    return (
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{row.firstName}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">
                  <Button 
                      variant="contained" 
                      color="success"
                      onClick={() => {
                          handleView(row)
                      }}
                  >
                          View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  