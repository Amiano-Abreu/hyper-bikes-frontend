import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};
  
const Toaster = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);

        navigate('/')
    }

    return (
        <Snackbar
            sx={{
                mx: "auto",
                width: "300px"
            }}
            open={open}
            onClose={handleClose}
            autoHideDuration={3000} // Adjust as needed
            anchorOrigin={{ 
                vertical: "bottom", 
                horizontal: "center" 
            }}
            TransitionComponent={SlideTransition}
        >
            <Alert 
                onClose={handleClose} 
                variant="filled" 
                severity="success" 
                sx={{ width: '100%' }}
            >
                This is a success message!
            </Alert>
        </Snackbar>
        
    )
}

export default Toaster;