import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const isMobile = useMediaQuery('(max-width:1023px)')
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography
                variant='h4'
                component='h2'
                sx={{
                    textAlign: 'center',
                    fontWeight: '600',
                    pt: 5,
                    textTransform: 'uppercase',
                    fontSize: isMobile ? '1.5rem' : '2.125rem',
                    '& span': {
                        borderBottom: '3px solid #bc1024'
                    }
                }}
            >
                Invalid <span>url</span>
            </Typography>
            <Button 
                variant='contained'
                color='customRed'
                size={ isMobile ? 'small' : 'medium'}
                endIcon={<ArrowRightAltRoundedIcon />}
                sx={{
                    color: 'customWhite.main',
                    width: {
                        laptop: '500px',
                        tablet: '300px',
                        mobile: '250px'
                    },
                    px: 4,
                    py: 1,
                    mt: 5,
                    mx: 'auto',
                    textTransform: 'uppercase',
                    ...(isMobile && {
                        fontSize: '0.75rem'
                    })
                }}
                onClick={() => {
                    navigate('/')
                }}
            >
                back to home
            </Button>
        </Box>
    )
}

export default NotFound;