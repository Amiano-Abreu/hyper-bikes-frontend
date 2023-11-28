import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import NewsListDesktop from './NewsListDesktop';
import NewsListMobile from './NewsListMobile';

import newsBackgroundImage from '../../assets/Home-Page/news/home-news-backgroundOriginal.webp';

import useGetRequest from '../../services/useGetRequest';

const BASEURL = `${process.env.REACT_APP_API_URL}/news?limit=true`;

const NewsSection = () => {
    const isTablet = useMediaQuery('(max-width:1024px)');

    const {
        isLoading,
        apiData,
        serverError
    } = useGetRequest(BASEURL);

    return (
        <Box
            sx={{
                marginTop: 6,
                height: { mobile: '891px' , tablet: '575px' , laptop: '650px'},
                pb: 5,
                backgroundImage: `url(${newsBackgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundColor: 'black'
            }}
        >
            <Box
                sx={{
                    height: 'calc(100% + 25px)',
                    width: '100%',
                    backgroundImage: 'linear-gradient(#fbfbfb,#fbfbf2d4)',
                    px: 5
                }}
            >
                <Typography
                    variant='h4'
                    component='h2'
                    sx={{
                        textAlign: 'center',
                        fontSize: isTablet ? '1.5rem' : '2.125rem',
                        fontWeight: 600,
                        mb: 5,
                        '& span': {
                            color: 'customRed.main'
                        }
                    }}
                >Check Out The Latest <span>News</span></Typography>
                { isTablet ? <NewsListMobile 
                                isLoading={isLoading} 
                                apiData={apiData} 
                                serverError={serverError} 
                            /> : 
                            <NewsListDesktop 
                                isLoading={isLoading} 
                                apiData={apiData} 
                                serverError={serverError} 
                            /> }
            </Box>
        </Box>
    )
}

export default NewsSection;