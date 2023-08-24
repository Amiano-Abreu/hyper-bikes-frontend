import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom'

import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

import NewsCard from './NewsCard';
import { useMediaQuery } from '@mui/material';

const NewsListMobile = () => {
   const is715 = useMediaQuery('(max-width: 715px)')
   const isMobile = useMediaQuery('(max-width: 640px)')

   const navigate = useNavigate()

    return (
        <Grid  
            container
            mx='auto'
            spacing={5}
            justifyContent='center'
            alignItems='stretch'
            sx={{
                width: '100%',
                height: 'calc(100% - 54.625px)',
                pr: 5
            }}
        >
            <Grid 
                item
                tablet={6}
                mobile={12}
            >
                <NewsCard small={true} mobile={true}/>
            </Grid>
            <Grid 
                item
                tablet={6}
                mobile={12}  
            >
                <NewsCard small={true} mobile={true}/>
            </Grid>

            {
                isMobile ?
                <>
                    <Grid 
                        item
                        tablet={6}
                        mobile={12}
                    >
                        <NewsCard small={true} mobile={true}/>
                    </Grid>
                    <Grid 
                        item
                        tablet={6}
                        mobile={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '& path': {
                                fontSize: '1.5625'
                            },
                            pb: 5
                        }}
                    >
                        <Button 
                            variant='contained'
                            color='customRed'
                            size='small'
                            endIcon={<ArrowRightAltRoundedIcon />}
                            sx={{
                                color: 'customWhite.main',
                                fontSize: '.75rem',
                                width: is715 ? '70%' : '60%',
                                px: 4,
                                py: 1
                            }}
                        >
                            View More
                        </Button>
                    </Grid>
                </>

                :

                <>
                    <Grid 
                        item
                        tablet={6}
                        mobile={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '& path': {
                                fontSize: '1.5625'
                            }
                        }}
                    >
                        <Button 
                            variant='contained'
                            color='customRed'
                            size='small'
                            endIcon={<ArrowRightAltRoundedIcon />}
                            sx={{
                                color: 'customWhite.main',
                                fontSize: '.75rem',
                                width: is715 ? '70%' : '60%',
                                px: 4,
                                py: 1
                            }}
                            onClick={() => { navigate('/news') }}
                        >
                            Read More
                        </Button>
                    </Grid>
                    <Grid 
                        item
                        tablet={6}
                        mobile={12}
                    >
                        <NewsCard small={true} mobile={true}/>
                    </Grid>
                </> 
            }
           
        </Grid>
    )
}

export default NewsListMobile;