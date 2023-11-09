import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import { Link } from 'react-router-dom'

import classes from './NewsCard.module.css';

export default function NewsCard({ news, small , mobile }) {
  return (
    <Card 
        sx={{ 
            maxWidth: 670,
            height: small ? 235 : 500,
            position: 'relative',
            display: 'inline-block',
            width: '100%'
        }}
        component={Link}
        to={`news/${news?.newsID}`}
        state={news}
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
          // image="https://img.etimg.com/thumb/msid-77761097,width-650,imgsize-355003,,resizemode-4,quality-100/the-front-headlight-assembly-is-extremely-compact-on-the-ducati-panigale-v2-.jpg"
          // alt="green iguana"
          image={news?.src}
          alt={news?.alt}
        />
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    backgroundImage: small ? 'linear-gradient(#2a272700,30%,#2a2727)' : 'linear-gradient(#2a272700,#2a2727)',
                    position: 'absolute',
                    top: '0',
                    left: '0'
                }}
            >
                <CardContent
                    sx={{
                        position: 'absolute',
                        top: small ? '35%' : '69%',
                        left: '0'
                    }}
                >
                  <Typography 
                    gutterBottom
                    color='customWhite.main'
                    variant="h5" 
                    component="div"
                    sx={{
                      fontSize: mobile ? '1rem' : '1.5rem',
                      fontWeight: mobile ? 600 : 500
                    }}
                  >
                    {news?.title}
                  </Typography>
                  <Typography 
                    sx={{
                      mb: 5,
                      fontSize: mobile ? '0.6rem' : '0.75rem'
                    }}
                    variant="body2" 
                    fontSize='0.75rem' 
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
                            fontSize: mobile ? '0.6rem' : '0.75rem'
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
                          fontSize: mobile ? '0.6rem' : '0.75rem'
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