import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import NewsCard from './NewsCard';

import { useEffect } from 'react';
import useGetRequest from '../../services/useGetRequest';
import Loader from '../Utility/Loader';

const BASEURL = `api/news`

const News = () => {

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    const apiUrl = new URL(BASEURL, process.env.REACT_APP_API_URL)
    const {
        isLoading,
        apiData,
        serverError
    } = useGetRequest(apiUrl.toString());
    return (
        <>
             {
                isLoading ?
                isLoading && <Loader />
                :
                <></>
            }

            {serverError ?

            <p
                style={{
                    textTransform: 'uppercase',
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: '700',
                    paddingTop: '5rem'
                }}
            >
                {serverError?.message  || "Error Occurred !"}
            </p>

            :

            (
                apiData &&
                <>
            <Typography
                sx={{
                    textTransform: 'uppercase',
                    color: 'customBlack.light',
                    pt: 5,
                    textAlign: 'center',
                    my: 5,
                    fontWeight: '600',
                    fontSize: { mobile: '1.25rem', laptop: '1.75rem' },
                    '& span': {
                        pb: 2.5,
                        color: 'customRed.main'
                    }
                }}
            >
                Check out the latest <span>news</span>
            </Typography>
            {
                apiData?.data.length > 0 ?
                    <Grid
                        container
                        justifyContent='flex-start'
                        alignItems='center'
                        sx={{
                            maxWidth: '974px',
                            width: '80vw',
                            mx: 'auto'
                        }}
                    >
                        {apiData?.data.map((item, i) => {
                            return (
                                <Grid
                                    key={item?.newsID + i}
                                    item
                                    laptop={6}
                                    mobile={12}
                                    sx={{
                                        pr: { mobile: 0, laptop: 5},
                                        pb: 5,
                                        ...(i%2 !==0 && {
                                            pr: 0
                                        })
                                    }}
                                >
                                    <NewsCard news={item}/>
                                </Grid>
                            )
                        })}
                    </Grid>

                :
                <p
                    style={{
                        textTransform: 'uppercase',
                        width: '100%',
                        textAlign: 'center',
                        fontWeight: '700'
                    }}
                >
                    No news available or your network may be slow.
                </p>
            }
            </>
            )
            }
        </>
    )
}

export default News;