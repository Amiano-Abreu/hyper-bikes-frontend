import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

import BikeCard from './BikeCard';
import { useMediaQuery } from '@mui/material';

import { useNavigate } from 'react-router-dom'
import Toaster from '../Utility/Toaster';

const FeaturedBikesSection = ({ isLoading, apiData, serverError }) => {
    const isMobile = useMediaQuery('(max-width:1023px)')
    const isLaptop = useMediaQuery('(min-width:1024px)')
    const is640 = useMediaQuery('(max-width:640px)')

    const navigate = useNavigate()

    return (
        <>
            <Box
                sx={{
                    height: isMobile ? '1400px' : '650px',
                    ...(is640 && {
                        height: '1130px'
                    }),
                    bgcolor: 'customWhite.main',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
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
                    Featured <span>Bikes</span>
                </Typography>
                <Grid
                    container
                    justifyContent='center'
                    spacing={isMobile ? 0 : 5}
                    alignItems='center'
                    sx={{
                        height: 'auto',
                        width: { mobile: '320px' , tablet: '500px' , laptop: '900px' },
                        mx: 'auto'
                    }}
                >
                    {
                        !isLoading && !serverError ?

                        (
                            apiData?.data.length > 0 ?
                            apiData?.data.map((item, i) => {
                                return (
                                    <Grid
                                        key={item.bikeID}
                                        item
                                        laptop={4}
                                        mobile={12}
                                        sx={{
                                            ...(isMobile && {
                                                pl: 0,
                                                pt: 5
                                            }),
                                            ...(isMobile && i === 0 && {
                                                pl: 0,
                                                pt: 0
                                            }),
                                            ...(isLaptop && i===2 && {
                                                pr: 0
                                            })
                                        }}
                                    >
                                        <BikeCard path={`bike/${item.bikeID}`} bike={item} />
                                    </Grid>
                                )})
                            :
                            <p
                                style={{
                                    textTransform: 'uppercase',
                                    width: '100%',
                                    textAlign: 'center',
                                    fontWeight: '700'
                                }}
                            >
                                No bikes available or your network may be slow.
                            </p>
                        )
                        

                            :

                            serverError ?
                            (
                                serverError.hasOwnProperty("data") ?
                                    (
                                        <>
                                            <p
                                                style={{
                                                    textTransform: 'uppercase',
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    fontWeight: '700'
                                                }}
                                            >Error retrieving bikes !</p>

                                            {    
                                                serverError.data.map(
                                                    obj => {
                                                        const key = Object.keys(obj)[0];
                                                        const message = obj[key]
                                                        return (
                                                            <Toaster 
                                                                type='error'
                                                                message={message}
                                                            />
                                                            // <p>{message}</p>
                                                        )
                                                    }
                                                )
                                            }
                                        </>
                                    )

                                    :

                                    (
                                        <>
                                            <p
                                                style={{
                                                    textTransform: 'uppercase',
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    fontWeight: '700'
                                                }}
                                            >Error retrieving bikes !</p>

                                            <Toaster
                                                type='error'
                                                message={serverError.message}
                                            />
                                        </>
                                    )
                                    
                            )

                            :

                            <></>
                            
                    }
                </Grid>
                <Button 
                        variant='contained'
                        color='customRed'
                        size={ isMobile ? 'small' : 'medium'}
                        endIcon={<ArrowRightAltRoundedIcon />}
                        sx={{
                            color: 'customWhite.main',
                            width: '50%',
                            px: 4,
                            py: 1,
                            mx: 'auto',
                            textTransform: 'uppercase',
                            ...(isMobile && {
                                fontSize: '0.75rem'
                            })
                        }}
                        onClick={() => {
                            navigate('/bikes')
                        }}
                    >
                        view all
                </Button>
            </Box>
        </>
    )
}

export default FeaturedBikesSection;