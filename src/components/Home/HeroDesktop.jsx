import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import DucatiBike from '../../assets/Home-Page/hero/Ducati-Bayliss.webp';

import { useMediaQuery } from '@mui/material';


const HeroDesktop = ({ bikes }) => {
    const isMedium = useMediaQuery('(max-width:990px)');

    const is1250 = useMediaQuery('(max-width:1250px)');

    // console.log(isMedium)
    const panigale = bikes?.data.find(bike => bike.model === "Panigale V2 Bayliss");

    // console.log("panigale ", panigale)
    
    return (
        <>
            <Box
                sx={{
                    bgcolor: 'customBlack.main',
                    height: isMedium ? 'calc(100vh - 160px)' : 'calc(100vh - 170px)'
                }}
            >
                <Box
                    sx={{
                        height: 'auto',
                        width: '677px',
                        position: 'absolute',
                        top: '35%',
                        left: '5%',
                        bottom: '8%',
                        '& img': {
                            height: '100%',
                            width: '100%',
                            objectFit: 'contain',
                        }
                    }}
                >  
                    <img src={DucatiBike} alt={'Ducati-Panigale-V2-Bliss.png'}/>
                </Box>
                <Typography
                    variant='h2'
                    sx={{
                        color: 'customWhite.main',
                        position: 'absolute',
                        right: '5%',
                        top: '120px',
                        fontWeight: '700'
                    }}
                >
                    Ducati-Bayliss: the legend continues
                </Typography>
                <Typography
                    variant='body2'
                    sx={{
                        color: '#c9c2c2',
                        position: 'absolute',
                        right: '5%',
                        top: '210px',
                        width: is1250 ? '350px' : '670px',
                        
                    }}
                >
                    Troy Bayliss, Claudio Domenicali and Davide Tardozzi present a new chapter in a highly successful story.
                </Typography>
                <Button
                    to={`/bike/${panigale?.bikeID}`}
                    state={{bike: panigale}}
                    component={Link}
                    variant='contained'
                    color='customRed'
                    size='large'
                    sx={{
                        color: 'customWhite.main',
                        position: 'absolute',
                        width: '350px',
                        top: '275px',
                        right: '5%'
                    }}
                >
                    Explore Now
                </Button>
            </Box>
        </>
    )
}

export default HeroDesktop;

