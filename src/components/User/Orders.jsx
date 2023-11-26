import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Loader from "../Utility/Loader";
import Toaster from "../Utility/Toaster";

import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

import { getAllOrders } from "../../services/orders";

import OrderCard from "./OrderCard"
import OrderRows from "./OrderRows";

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
                    <Loader loading={loading} />
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

                    // <Box
                    //     sx={{
                    //         display: 'table',
                    //         tableLayout: 'fixed',
                    //         width: '100%'
                    //     }}
                    // >
                    //     <Table>
                    //         <TableHead>
                    //             {/* <TableRow
                    //                 sx={{
                    //                     '& th': {
                    //                         color: 'customWhite.main',
                    //                         textTransform: 'uppercase',
                    //                         px: '8px',
                    //                         fontWeight: '600'
                    //                     }
                    //                 }}
                    //             >
                    //                 <TableCell>Order ID</TableCell>
                    //                 <TableCell align="left">Order Date</TableCell>
                    //                 <TableCell align="left">Product Details</TableCell>
                    //                 <TableCell align="left">Total</TableCell>
                    //                 <TableCell align="left">Delivery By</TableCell>
                    //                 <TableCell align="left">Status</TableCell>
                    //             </TableRow> */}
                    //             <TableRow
                    //                 sx={{
                    //                     '& th': {
                    //                         color: 'customWhite.main',
                    //                         textTransform: 'uppercase',
                    //                         px: '8px',
                    //                         fontWeight: '600',
                    //                         fontSize: { mobile: '8px', tablet: '10px', laptop: '11px'}
                    //                     }
                    //                 }}
                    //             >
                    //                 <TableCell />
                    //                 <TableCell>Order ID</TableCell>
                    //                 <TableCell align="left">Order Date</TableCell>
                    //                 <TableCell align="left">Total</TableCell>
                    //                 <TableCell align="left">Delivery By</TableCell>
                    //                 <TableCell align="left">Status</TableCell>
                    //                 <TableCell align="center">Cancel</TableCell>
                    //             </TableRow>
                    //         </TableHead>
                    //         <TableBody>
                    //         {/* {data?.data?.map((order) => (
                    //             <TableRow 
                    //                 key={order.orderID}
                    //                 sx={{
                    //                     '& td': {
                    //                         color: 'customWhite.main',
                    //                         px: '8px',
                    //                     }
                    //                 }}
                    //             >
                    //                 <TableCell>{order.orderID}</TableCell>
                    //                 <TableCell>{order.orderDate.split(" ")}</TableCell>
                    //                 <TableCell align="left">
                    //                     <ul>
                    //                     {order.products.map((product, index) => (
                    //                         <li key={index}>
                    //                         {`${product.brand} ${product.model} - Quantity: ${product.quantity}`}
                    //                         </li>
                    //                     ))}
                    //                     </ul>
                    //                 </TableCell>
                    //                 <TableCell align="left">₹{order.total}</TableCell>
                    //                 <TableCell align="left">{order.deliveryDate}</TableCell>
                    //                 <TableCell align="left">{order.deliveryStatus}</TableCell>
                    //             </TableRow>
                    //         ))} */}
                    //         {   
                    //             data?.data?.map(
                    //                 order => {
                    //                     return (
                    //                         <OrderRows
                    //                             key={order.OrderID}
                    //                             row={order}
                    //                         />
                    //                     )
                                        
                    //                 }
                    //             ) 
                                
                    //         }
                    //         </TableBody>
                    //     </Table>
                    // </Box>
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