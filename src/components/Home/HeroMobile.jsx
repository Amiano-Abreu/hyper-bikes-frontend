import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import DucatiBike from '../../assets/Home-Page/hero/Ducati-test.png';

import { useMediaQuery } from '@mui/material';


const HeroMobile = () => {

    const isMedium = useMediaQuery('(max-width:990px)');
    
    const is700 = useMediaQuery('(max-width:700px)');

    const is400 = useMediaQuery('(max-width:400px)');

    return (
        <>
            <Box
                sx={{
                    bgcolor: 'customBlack.main',
                    height: isMedium ? 'calc(100vh - 160px)' : 'calc(100vh - 170px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant={is700 ? 'h5' : 'h4'}
                    component='h2'
                    sx={{
                        color: 'customWhite.main',
                        fontWeight: is700 ? '700' : '700',
                        mx: 4,
                        textAlign: 'center',
                        marginTop: is700 ? 8 : 4,
                        marginBottom: is700 ? 4 : 2
                    }}
                >
                    Ducati-Bayliss: the legend continues
                </Typography>
                <Typography
                    variant='body2'
                    sx={{
                        color: '#c9c2c2',
                        width: is400 ? '250px' : '350px',
                        marginBottom: is700 ? 10 : 4,
                        fontSize: is700 ? '.75rem' : '.875rem'
                    }}
                >
                    Troy Bayliss, Claudio Domenicali and Davide Tardozzi present a new chapter in a highly successful story.
                </Typography>
                <Button
                    component={Link}
                    to='/bike/abc'
                    variant='contained'
                    color='customRed'
                    size={is700 ? 'small' : 'medium'}
                    sx={{
                        color: 'customWhite.main'
                    }}
                >
                    Explore Now
                </Button>
                <Box
                    sx={{
                        height: 'auto',
                        width: is700 ? '350px' : '580px',
                        position: 'absolute',
                        bottom: is700 ? '66px' : '52px',
                        '& img': {
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                        }
                    }}
                >  
                    <img src={DucatiBike} alt={'Ducati-Panigale-V2-Bliss.png'}/>
                </Box>
            </Box>
        </>
    )
}

export default HeroMobile;

