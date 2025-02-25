import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

type ErrorMessageProps = {
    message: string,
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
    return (
        <Container sx={{display: 'flex', justifyContent: 'center'}}>
            <Typography color="red"> {message} </Typography>
        </Container>
    )
}

export default ErrorMessage;