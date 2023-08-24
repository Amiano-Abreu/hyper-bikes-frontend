import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import { useMediaQuery } from '@mui/material';

import classes from '../Home/NewsCard.module.css';

export default function NewsCard() {
  const isLaptop = useMediaQuery('(min-width:1024px)');

  return (
    <Card 
        sx={{ 
            ...(isLaptop && {
              maxWidth: 670
            }),
            width: '100%',
            height: 500,
            position: 'relative'
        }}
    >
      <CardActionArea
        sx={{
          height: '100%'
        }}
      >
        <CardMedia
          component="img"
          height='100%'
          width='100%'
          image="https://img.etimg.com/thumb/msid-77761097,width-650,imgsize-355003,,resizemode-4,quality-100/the-front-headlight-assembly-is-extremely-compact-on-the-ducati-panigale-v2-.jpg"
          alt="green iguana"
        />
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    backgroundImage: 'linear-gradient(#2a272700,#2a2727)',
                    position: 'absolute',
                    top: '0',
                    left: '0'
                }}
            >
                <CardContent
                    sx={{
                        position: 'absolute',
                        top: '65%',
                        left: '0',
                        right: '0',
                        p: 5
                    }}
                >
                  <Typography 
                    gutterBottom
                    color='customWhite.main'
                    variant="h5" 
                    component="div"
                    sx={{
                      fontSize: { mobile: '1rem' , laptop: '1.5rem' },
                      fontWeight: {mobile: 700 , laptop: 500}
                    }}
                  >
                    Lizard
                  </Typography>
                  <Typography 
                    sx={{
                      mb: 5,
                      fontSize: { mobile: '.65rem' , laptop: '0.75rem'}
                    }}
                    variant="body2" 
                    color="#c9c2c2"
                  >
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                  <div className={`${classes.content} ${classes.contentSpace}`}>
                    <div className={classes.content}>
                      <AccountCircleRoundedIcon sx={{
                        color: '#fbfbf2',
                        mr: 1
                      }} />
                      <Typography 
                        variant="body2" 
                        sx={{
                            fontSize: { mobile: '.65rem' , laptop: '0.75rem'}
                          }}
                        color="#c9c2c2"
                      >
                        Name
                      </Typography>
                    </div>
                    <div>
                      <Typography 
                        variant="body2" 
                        sx={{
                          fontSize: { mobile: '.65rem' , laptop: '0.75rem'}
                        }}
                        color="#c9c2c2"
                      >
                        4 hours ago
                      </Typography>
                    </div>
                  </div>
                  
                </CardContent>
            </Box>
        
      </CardActionArea>
    </Card>
  );
}