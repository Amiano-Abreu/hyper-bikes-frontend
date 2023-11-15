import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';

import { useState } from "react";

import Loader from '../Utility/Loader';
import Toaster from '../Utility/Toaster';
import { cancelOrder } from '../../services/orders';

const OrderRows = ({ row }) => {
    const [open, setOpen] = useState(false);
    
    const { orderID } = row;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const cancelOrderHandler = () => {
        setLoading(true);

        cancelOrder(orderID)
            .then(data => setData(data))
            .finally(() => setLoading(false))
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

                <Toaster type='error' message={data?.message} />
                :
                <></>
            }
            {
                !loading && data?.status === "SUCCESS" ?

                <Toaster message={data?.message} />
                :
                <></>
            }
            <TableRow 
                sx={{ 
                    '& > *': { 
                        borderBottom: 'unset',
                        px: '8px !important',
                        fontSize: { mobile: '5.96px', tablet: '7px', laptop: '12px'},
                    },
                    '& td': {
                        color: 'customWhite.main'
                    }
                }}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        color='customWhite'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {row.orderID}
                </TableCell>
                <TableCell >{row.orderDate}</TableCell>
                <TableCell >₹ {row.total}</TableCell>
                <TableCell >{row.deliveryDate}</TableCell>
                <TableCell >
                { 
                    !loading && data?.status === "SUCCESS" && row.deliveryStatus !== "cancelled" ? 
                    
                    "CANCELLED" : row.deliveryStatus.toUpperCase()
                
                }
                </TableCell>
                <TableCell
                    sx={{
                        textAlign: 'center'
                    }}
                >
                    {
                        row.deliveryStatus === "ordered" && (data === null || data?.status === "ERROR")?
                        
                        <IconButton
                            aria-label="cancel order"
                            size="small"
                            color='customRed'
                            onClick={() => {
                                console.log("cancell before if ", !data, data?.status)
                                if(!data || data?.status === "ERROR") {
                                    console.log("cancell", !data, data?.status)
                                    cancelOrderHandler()
                                }
                            }}
                        >
                            <DisabledByDefaultRoundedIcon />
                        </IconButton>

                        :

                        <></>
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box 
                        sx={{ 
                            margin: 1,
                            mb: 5
                        }}
                    >
                        <Typography 
                            variant="h6" 
                            gutterBottom 
                            component="div"
                            sx={{
                                color: 'customWhite.main',
                                textTransform: 'uppercase',
                                fontSize: { mobile: '8px', tablet: '10px', laptop: '16px'},
                                fontWeight: '600'
                            }}
                        >
                            Products
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow
                                    sx={{
                                        '& > *': {
                                            px: '8px !important',
                                            textTransform: 'uppercase',
                                            fontSize: { mobile: '8px', tablet: '10px', laptop: '16px'}
                                        },
                                        '& th': {
                                            color: 'customWhite.main'
                                        }
                                    }}
                                >
                                    <TableCell />
                                    {/* <TableCell>Brand</TableCell> */}
                                    <TableCell>Model</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {row.products.map((product) => (
                                <TableRow 
                                    key={product.bikeID}
                                    sx={{
                                        '& td': {
                                            color: 'customWhite.main',
                                            px: '8px !important',
                                            fontSize: { mobile: '7px', tablet: '8.25px', laptop: '12px'}
                                        }
                                    }}
                                >
                                    <TableCell>
                                        <Box
                                            sx={{
                                                height: '100px',
                                                width: '150px',
                                                '& img': {
                                                    objectFit: 'cover',
                                                    overflow: 'hidden',
                                                    height: '100%',
                                                    width: '100%'
                                                }
                                            }}
                                        >
                                            <img src={product.src} alt={product.alt} />
                                        </Box>
                                        {/* {product.brand} */}
                                    </TableCell>
                                    {/* <TableCell>
                                        {product.brand}
                                    </TableCell> */}
                                    <TableCell>{product.model}</TableCell>
                                    <TableCell>₹ {product.price}</TableCell>
                                    <TableCell>
                                        {product.quantity}
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

export default OrderRows;