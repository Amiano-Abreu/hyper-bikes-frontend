import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Button from '@mui/material/Button';

import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

import { useMediaQuery } from '@mui/material';

import BikeCard from "../Home/BikeCard";

import useGetRequest from "../../services/useGetRequest";
import Loader from "../Utility/Loader";

const URL = "http://localhost:5000/api/bikes?limit=true";

const Preview = ({ onViewAll }) => {
    const isMobile = useMediaQuery('(max-width:1024px)');

    const {
        isLoading,
        apiData,
        serverError
    } = useGetRequest(URL);
    
    return (
        isLoading ?
        <Loader loading={isLoading} />

        :

        serverError ?

        <p
            style={{
                textTransform: 'uppercase',
                width: '100%',
                textAlign: 'center',
                fontWeight: '700',
                marginBottom: '5rem',
            }}
        >
            api Error 
            {
                serverError.hasOwnProperty("data") ?

                serverError.data.map(err => {
                    const key = Object.keys(err)[0];

                    return ` | ${err[key]}`
                })

                :
                
                serverError?.message}
        </p>

        :

        apiData &&
        <>
            <Typography
                variant='h2'
                sx={{
                    color: 'customBlack.light',
                    p: 2.5,
                    textAlign: 'center',
                    mb: 5,
                    fontSize: { mobile: '.75rem', laptop: '1.125rem' }
                }}
            >
                1 - 3 of over 15,000 results for bikes
            </Typography>
            <Grid
                container
                justifyContent='center'
                alignItems='center'
                sx={{
                    maxWidth: '974px',
                    width: '80vw',
                    mx: 'auto'
                }}
            >
                {apiData.data.map((item, i) => {
                    return (
                        <Grid
                            key={item.bikeID}
                            item
                            laptop={4}
                            mobile={12}
                            sx={{
                                pr: 5,
                                ...(i===2 && {
                                    pr: 0
                                }),
                                ...(isMobile && {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    pb: 5,
                                    pr: 0
                                })
                            }}
                        >
                            <BikeCard path={'bike/123'} bike={item} />
                        </Grid>
                    )
                })}
                <Button 
                    variant='contained'
                    color='customRed'
                    size={ isMobile ? 'small' : 'medium'}
                    endIcon={<ArrowRightAltRoundedIcon />}
                    sx={{
                        color: 'customWhite.main',
                        width: '70%',
                        px: 4,
                        fontWeight: '600',
                        py: 1,
                        mx: 'auto',
                        textTransform: 'uppercase',
                        my: 10,
                        ...(isMobile && {
                            fontSize: '0.75rem'
                        })
                    }}
                    // component={Link}
                    // to={'all'}
                    onClick={() => {
                        onViewAll();
                    }}
                >
                    view all
                </Button>
            </Grid>
        </>
    )
}

export default Preview;