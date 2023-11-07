import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { CardActionArea } from '@mui/material';
import { useMediaQuery } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom'

import Honda from '../../assets/Home-Page/hero/Honda-Cbr-Fireblade-1000rr.png';

export default function BikeCard({ path, bike }) {
    // const [bikePath, setBikePath] = useState(path);

    const isMobile = useMediaQuery('(max-width:1023px)')
    const isLaptop = useMediaQuery('(min-width:1024px)')
    const is640 = useMediaQuery('(max-width:640px)')

    const navigate = useNavigate();

    console.log('Path ',path)
    console.log('bikecard Location ', window.location, 'origin ',window.location.origin)

    // useEffect(() => {
    //   if(window.location.pathname === '/bikes') {
    //     setBikePath(window.location.origin + '/' + path);
    //   }
    // }, [path])
  return (
    <Card 
      sx={{ 
          ...(isLaptop && {maxWidth: 325}),
          ...(isMobile && {
            width: '100%'
          }),
          bgcolor: 'customWhite.main',
          '&.MuiPaper-root': {
              height: 'auto',
              ...(isLaptop && {
                pb: 5
              })
          },
          textDecoration: 'none',
          display: 'inline-block'
      }}
      elevation={6}
      // to={ window.location.pathname === '/bikes' ? window.location.origin + '/' + path : path }
      {
        ...(
              window.location.pathname === '/bikes' ?
              {
                onClick: (e) => {
                  console.log("event ", window.location, "eventtt ", e)
                  navigate({pathname: `/${path}`})
                }
              }

              :
              
              {
                component: Link,
                to: path
              }
            )
      }
    >
      <Typography
        variant='h6'
        component='p'
        sx={{
            mt: 1,
            textAlign: 'center',
            fontWeight: '900',
            fontSize: '.75rem',
            textTransform: 'uppercase',
            ...(isMobile && {
              py: 1,
              fontSize: '.7rem'
            })
        }}
      >
        { bike?.brand ? bike?.brand : 'Honda' }
      </Typography>
      <CardActionArea
        disableRipple
        sx={{
          height: 'calc(100% - 32.922px)',
          ...(isMobile && {
            width: '100%'
          }),
          '&:hover': {
            '& span.MuiCardActionArea-focusHighlight': {
              opacity: '0'
            }
          }
        }}
      >
        <CardMedia
          component="img"
          height="230"
          image={ bike?.images[0].src ? bike?.images[0].src : Honda }
          alt={bike?.images[0].alt ? bike?.images[0].alt : "Honda CBR 1000"}
          sx={{
              objectFit: 'scale-down',
              ...(is640 && {
                height: 'auto',
                botton: '6.2%'
              })
          }}
        />
        <CardContent
            sx={{
                mx: 'auto',
                ...(is640 && {
                  px: 3.2,
                  pt: 4,
                  mx: 0
                }),
                position: 'relative'
            }}
        >
          <Typography
            variant='h6'
            component='p'
            gutterBottom
            sx={{
                fontSize: isMobile ? '0.85rem' : '1rem',
                textAlign: 'center',
                fontWeight: '600'
            }}
          >
            { bike?.brand && bike?.model ? `${bike?.brand} ${bike?.model}` : "Honda Cbr Fireblade 1000rr"}
          </Typography>
          <Stack
            direction='row'
            spacing={1}
            sx={{
                ...(!isMobile && {
                  position: 'absolute',
                  left: '30%'
                }),
                ...(isMobile && {
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%'
                })
            }}
          >
            {[`${bike?.displacement}cc`, bike?.power, bike?.kerbWeight].map((spec, i) => {
                return (
                <Typography
                    key={spec + i}
                    variant='body1'
                    component='p'
                    sx={{
                        fontSize: isMobile ? '.55rem' : '.75rem'
                    }}
                >
                    {spec}
                </Typography>
                )
            })}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}