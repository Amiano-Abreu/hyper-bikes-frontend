import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

import NewsCard from './NewsCard';

import { useNavigate } from 'react-router-dom'

const NewsListDesktop = () => {
    const navigate = useNavigate()
   
    return (
        <>
            <Grid 
                justifyContent='center'
                alignItems='center' 
                container
                spacing={5}
                sx={{
                    height: 'auto'
                }}
            >
                <Grid 
                    item
                    laptop={6}
                    sx={{
                        '& button': {
                            height: '100%'
                        }
                    }}  
                >
                    <NewsCard />
                </Grid>
                <Grid
                    container
                    item
                    laptop={6}
                    spacing={5}
                >
                    <Grid 
                        item
                        laptop={12}   
                    >
                        <NewsCard small={true} />
                    </Grid>
                    <Grid 
                        item
                        laptop={12} 
                    >
                        <NewsCard small={true}/>
                    </Grid>
                </Grid>
                <Grid 
                    item
                    laptop={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '& path': {
                            fontSize: '1.75rem'
                        }
                    }} 
                >
                    <Button 
                        variant='contained'
                        color='customRed'
                        endIcon={<ArrowRightAltRoundedIcon />}
                        sx={{
                            color: 'customWhite.main',
                            width: '50%',
                            px: 4,
                            py: 1
                        }}
                        onClick={() => {
                            navigate('/news')
                        }}
                    >
                        Read More
                    </Button>
                </Grid>
            </Grid>
           
        </>
        
    )
}

export default NewsListDesktop;