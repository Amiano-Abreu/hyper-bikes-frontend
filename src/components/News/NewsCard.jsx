import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import { useMediaQuery } from '@mui/material';

import classes from '../Home/NewsCard.module.css';
import { Link } from 'react-router-dom';

export default function NewsCard({ news, path }) {
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
        component={Link}
        to={news?.newsID}
        state={news}
        sx={{
          height: '100%'
        }}
      >
        <CardMedia
          component="img"
          height='100%'
          width='100%'
          image={news?.src}
          alt={news?.alt}
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
                        top: { mobile: '300px', tablet: '325px', laptop: "225px" },
                        height: { mobile: '200px', tablet: "170px", laptop: '275px' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        left: '0',
                        right: '0',
                        p: 5
                    }}
                >
                  <Typography
                    color='customWhite.main'
                    variant="h5" 
                    component="div"
                    sx={{
                      fontSize: { mobile: '1rem' , laptop: '1.5rem' },
                      fontWeight: {mobile: 700 , laptop: 500}
                    }}
                  >
                    {news?.title}
                  </Typography>
                  <Typography 
                    sx={{
                      fontSize: { mobile: '.65rem' , laptop: '0.75rem'}
                    }}
                    variant="body2" 
                    color="#c9c2c2"
                  >
                    {news?.body}
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
                        Admin
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
                        {news?.createdAt}
                      </Typography>
                    </div>
                  </div>
                  
                </CardContent>
            </Box>
        
      </CardActionArea>
    </Card>
  );
}