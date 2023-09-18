import Alert from '@mui/material/Alert';
import { IAlertApp } from '../interfaces/IAlertApp';

export function AlertApp(props: IAlertApp) {
    const { message, severity } = props
    return <Alert severity={severity}>{message}</Alert>
}

