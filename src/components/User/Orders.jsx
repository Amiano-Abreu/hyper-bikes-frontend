import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Loader from "../Utility/Loader";
import Toaster from "../Utility/Toaster";

import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

import { getAllOrders } from "../../services/orders";

import OrderCard from "./OrderCard"

const Orders = () => {
    const isMedium = useMediaQuery('(max-width:990px)');

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)

        getAllOrders()
            .then(data => {
                setData(data);
            })
            .finally(() => {
                setLoading(false)
            })
        
    }, [])

    return (
        <>
            <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: { mobile: '95%', tablet: '550px' , laptop: '1000px'},
                    mx: 'auto',
                    alignItems: 'center',
                    p: 5,
                    mt: 30,
                    ...(isMedium && {
                        mt: 25
                    }),
                    mb: 10,
                    bgcolor: 'customWhite.main',
                    flexDirection: 'column',
                    backgroundColor: 'customBlack.light',
                    overflow: 'auto'
                }}
            >
                {
                    loading ? 
                    <Loader />
                    :
                    <></>
                }
                <Typography
                    variant='h6'
                    sx={{
                        textAlign: 'center',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        color: 'customWhite.main',
                        mb: 5,
                        fontSize: { mobile: '1rem' , tablet: '1.5rem' , laptop: '2.125rem' }
                    }}
                >
                    orders
                </Typography>

                {
                    !loading && data?.status === "SUCCESS" ?
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="stretch"
                            sx={{
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            {data?.data?.map((order, i) => {
                                return (
                                    <Grid 
                                        key={order.orderID} 
                                        sx={{
                                            ...((i !== data.data.length - 1) && {
                                                mb: 5
                                            })
                                        }}
                                    >
                                        <OrderCard order={order} />
                                    </Grid>
                                )
                            })}
                        </Grid>

                    </Box>
                    :

                    <></>
                }
                {
                    data?.status === "ERROR" ? 

                    (
                            data.hasOwnProperty("data") ?
                                (
                                    <>
                                        <p
                                            style={{
                                                textTransform: 'uppercase',
                                                width: '100%',
                                                textAlign: 'center',
                                                fontWeight: '700'
                                            }}
                                        >Error On Selected Filter. Please select another filter !</p>

                                        {    
                                            data.data.map(
                                                obj => {
                                                    const key = Object.keys(obj)[0];
                                                    const message = obj[key]
                                                    return (
                                                        <Toaster 
                                                            type='error'
                                                            message={message}
                                                        />
                                                        // <p>{message}</p>
                                                    )
                                                }
                                            )
                                        }
                                    </>
                                )

                                :

                                (
                                    <>
                                        <p
                                            style={{
                                                textTransform: 'uppercase',
                                                width: '100%',
                                                textAlign: 'center',
                                                fontWeight: '700'
                                            }}
                                        >ERROR {data.message}</p>

                                        <Toaster
                                            type='error'
                                            message={data.message}
                                        />
                                    </>
                                )
                                
                    )

                    :

                    <></>
                }
            </Paper>
        </>
    )
}

export default Orders;