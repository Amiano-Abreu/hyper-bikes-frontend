import { useState } from 'react';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';

import Loader from '../Utility/Loader';
import Toaster from '../Utility/Toaster';
import { cancelOrder } from '../../services/orders';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  color: theme.palette.customBlack.main,
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const cancelOrderHandler = (orderID) => {
      setLoading(true);

      cancelOrder(orderID)
          .then(data => setData(data))
          .finally(() => {
            order.deliveryStatus = "cancelled"
            setLoading(false)
          })
  }

  return (
    <>
        {
            loading ? 
            <Loader loading={loading} />
            :
            <></>
        }
        {
            !loading && data?.status === "ERROR" ?

            <Toaster timer={1500} type='error' message={data?.message} />
            :
            <></>
        }
        {
            !loading && data?.status === "SUCCESS" ?

            <Toaster timer={1500} message={data?.message} />
            :
            <></>
        }
        <Card 
            sx={{ 
                width: "100%",
                backgroundColor: "customWhite.main"
            }}
        >
        <CardHeader
            title={`ORDER ID : ${order?.orderID}`}
            subheader={`ORDER DATE : ${order?.orderDate}`}
            sx={{
                "& div span.MuiTypography-h5": {
                    fontSize: { mobile: "1rem", tablet: "1.5rem"}
                },
                "& div span.MuiTypography-body1": {
                    fontSize: { mobile: ".8rem", tablet: "1rem"}
                }
            }}
        />
        <CardContent
            sx={{
                ...(order?.deliveryStatus.toLowerCase() !== "ordered" && {
                    pb: 0
                }),
                "& p.MuiTypography-body2": {
                    fontSize: {mobile: ".8rem", tablet: "0.875rem"}
                }
            }}
        >
            <Typography variant="body2" color="text.secondary">
            DELIVERY BY : {order?.deliveryDate}
            </Typography>
            <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                    "& span":{
                        fontWeight: "600",
                        ...(order?.deliveryStatus.toLowerCase() === "ordered" && {
                            color: "green"
                        }),
                        ...(order?.deliveryStatus.toLowerCase() === "delivered" && {
                            color: "blue"
                        }),
                        ...(order?.deliveryStatus.toLowerCase() === "cancelled" && {
                            color: "red"
                        }),
                    }
                }}    
            >
            ORDER STATUS : <span>{order?.deliveryStatus.toUpperCase()}</span>
            </Typography>
            <Typography variant="body2" color="text.secondary">
            TOTAL : ₹{order?.total}
            </Typography>
        </CardContent>
        <CardActions 
            disableSpacing
            sx={{
                padding: "16px",
                ...(order?.deliveryStatus.toLowerCase() !== "ordered" && {
                    pt: 0
                })
            }}  
        >
            {
                order?.deliveryStatus.toLowerCase() === "ordered" ?
                <Button
                    aria-label="cancel order"
                    size="small"
                    color='customRed'
                    variant='contained'
                    endIcon={<DisabledByDefaultRoundedIcon />}
                    sx={{
                        fontWeight: 'bold',
                        color: 'customWhite.main'
                    }}
                    onClick={() => {
                        // console.log("cancell before if ", !data, data?.status)
                        // if(!data || data?.status === "ERROR") {
                        //     console.log("cancell", !data, data?.status)
                        //     cancelOrderHandler()
                        // }
                        cancelOrderHandler(order.orderID)
                    }}
                >
                    cancel order
                </Button>

                :
                <></>
            }
            
            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography 
                variant="subtitle1"
                sx={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    letterSpacing: "0.00938em",
                    textTransform: "uppercase",
                    pl: "16px",
                    fontWeight: "600"
                }}
            >
            Products
            </Typography>
            {order?.products.map(product => {
                return (
                    <Box
                        key={product.bikeID}
                        sx={{
                            display: 'flex',
                            flexDirection: { mobile: "column", tablet: "row" },
                            alignItems: { mobile: "center", tablet: "flex-start"}
                        }}
                    >
                        <Box
                            sx={{
                                p: "16px",
                                height: { mobile: "150px", tablet: "150px", laptop:"200px"},
                                width: { mobile: "250px", tablet: "250px", laptop: "400px"}
                            }}
                        >

                            <CardMedia 
                                component="img"
                                image={product.src}
                                alt={product.alt}
                                sx={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        </Box>
                        <CardContent
                            sx={{
                                height: { mobile: "150px", tablet:"150px", laptop:"200px"},
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-evenly",
                                "& p": {
                                    fontSize: {mobile: "12px", laptop: "1rem"}
                                }
                            }}
                        >
                            <Typography 
                                paragraph
                                sx={{
                                    mb: 0
                                }}
                            >BIKE: {product.brand} {product.model}</Typography>
                            <Typography 
                                paragraph 
                                sx={{
                                    mb: 0
                                }}
                            >
                            PRICE: ₹{product.price}
                            </Typography>
                            <Typography    
                                paragraph 
                                sx={{
                                    mb: 0
                                }}
                            >
                                QUANTITY: {product.quantity}
                            </Typography>
                        </CardContent>
                    </Box>
                )
            })}
        </Collapse>
        </Card>
    </>
  );
}
