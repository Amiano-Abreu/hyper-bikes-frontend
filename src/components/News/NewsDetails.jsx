import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useMediaQuery } from '@mui/material';

import PaperHeader from '../Bikes/PaperHeader';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useGetRequest from '../../services/useGetRequest';
import Loader from '../Utility/Loader';

const NewsDetails = () => {
    const isMedium = useMediaQuery('(max-width:990px)');
    const location = useLocation();

    const news = location.state;
    // console.log("new Deatils news ", news)

    let url;

    if (news?.newsID) {
        url = `${process.env.REACT_APP_API_URL}/news/${news?.newsID}`;
    }

    const {
        isLoading,
        apiData,
        serverError
    } = useGetRequest(url);

    // console.log(serverError)
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    return (
        <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: { mobile: '90%', tablet: '620px' , laptop: '1000px'},
                    mx: 'auto',
                    alignItems: 'center',
                    p: 5,
                    mt: 30,
                    ...(isMedium && {
                        mt: 25
                    }),
                    mb: 10,
                    bgcolor: 'customWhite.main',
                    flexDirection: 'column'
                }}
            >
                {
                    isLoading ?
                        isLoading && <Loader />
                        :
                        <></>
                }
                {
                    !serverError && !url ?

                    <p
                        style={{
                            textTransform: 'uppercase',
                            width: '100%',
                            textAlign: 'center',
                            fontWeight: '700'
                        }}
                    >
                        Error occurred    
                    </p>
                    :
                    <></>
                }
                {
                    serverError ?

                    <p
                        style={{
                            textTransform: 'uppercase',
                            width: '100%',
                            textAlign: 'center',
                            fontWeight: '700'
                        }}
                    >
                        {serverError?.message}
                    </p>
        
                    :
        
                    (
                        apiData &&
                        <>
                    <PaperHeader text={news?.title} />
                    <Typography
                    sx={{
                        textAlign: 'left',
                        color: 'customBlack.main',
                        fontWeight: 600,
                        mt: 2.5,
                        width: '90%',
                        fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '.8rem' }
                    }}
                >
                    Admin
                    </Typography>
                    <Typography
                    sx={{
                        textAlign: 'left',
                        color: 'customBlack.main',
                        width: '90%',
                        fontSize: { mobile: '0.6rem' , tablet: '.7rem' , laptop: '.7rem' }
                    }}
                >
                    {`${news?.createdAt}`}
                    </Typography>
                    <Box
                    sx={{
                        width: '90%',
                        height: { mobile: '' , tablet: '' , laptop: '550px'},
                        mt: 5,
                        '& img': {
                            width: '100%',
                            height: '100%'
                        }
                    }}
                >
                    <img src={news?.src} alt={news?.alt} />
                    </Box>
                    <Typography
                    sx={{
                        textAlign: 'left',
                        fontWeight: '600',
                        mt: 5,
                        color: 'customBlack.light',
                        width: '90%',
                        fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '.9rem' }
                    }}
                >
                    {news?.body}
                    </Typography>
                    {

                        apiData?.data?.body?.map((item , i) => {
                        return (
                            <div
                                key={item?.alt+i}
                            >
                                <Box
                                    sx={{
                                        width: '90%',
                                        height: { mobile: '' , tablet: '' , laptop: '550px' },
                                        mt: 5,
                                        mx: 'auto',
                                        '& img': {
                                            width: '100%',
                                            height: '100%'
                                        }
                                    }}
                                >
                                    <img src={item?.src} alt={item?.alt} />
                                </Box>
                                {
                                    item?.desc?.map((para , index) => {
                                        return (
                                            <Typography
                                                key={para.slice(0,20)+index}
                                                sx={{
                                                    textAlign: 'left',
                                                    fontWeight: '400',
                                                    mt: 2.5,
                                                    color: 'customBlack.main',
                                                    width: '90%',
                                                    mx: 'auto',
                                                    ...(index === 0 && {
                                                        mt: 5,
                                                    }),
                                                    fontSize: { mobile: '0.65rem' , tablet: '.75rem' , laptop: '.8rem' }
                                                }}
                                            >
                                                {para}
                                            </Typography>
                                        )
                                    })
                                }
                            </div>
                        )
                        })
                    }
                    </>
                    )
                }
        </Paper>
    )
}

export default NewsDetails;