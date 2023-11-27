import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';

import HeroDesktop from './HeroDesktop';
import HeroMobile from './HeroMobile';
import NewsSection from './NewsSection';
import FeaturedBikesSection from './FeaturedBikesSection';

import { useEffect } from 'react';
import Loader from '../Utility/Loader';
import useGetRequest from '../../services/useGetRequest';

const url = `${process.env.REACT_APP_API_URL}/bikes?limit=true`;
const Home = () => {
    const is1130 = useMediaQuery('(max-width:1130px)');
    // console.log(is1130)

    const { isLoading, apiData, serverError } = useGetRequest(url);

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return (
        <>
            { is1130 ? <HeroMobile bikes={apiData} /> : <HeroDesktop bikes={apiData} /> }
            <Box
                sx={{
                    height: '90px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}
            >
                <IconButton
                    size='small'
                    color='customBlack'
                    sx={{
                        '& svg': {
                            fontSize: is1130 ? '2rem' : '2.75rem'
                        },
                        '& svg path:first-of-type': {
                            color: 'customRed.main'
                        },
                        pointerEvents: 'none'
                    }}
                >
                    <KeyboardDoubleArrowDownRoundedIcon />
                </IconButton>
            </Box>
            <NewsSection />
            <FeaturedBikesSection isLoading={isLoading} apiData={apiData} serverError={serverError} />
            { !isLoading ? <></> : <Loader loading={isLoading} />}
        </>
    )
}

export default Home;
