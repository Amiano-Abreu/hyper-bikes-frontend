import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import NewsCard from './NewsCard';

import { useEffect } from 'react';

const News = () => {

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    return (
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
                {[1,2,3,4,5,6].map((item, i) => {
                    return (
                        <Grid
                            key={item** i}
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
                            <NewsCard />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default News;