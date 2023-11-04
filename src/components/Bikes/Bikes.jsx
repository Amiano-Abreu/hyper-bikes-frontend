import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';

import ducatiLogo from '../../assets/Bikes/logo/ducati-logo.png'

import SelectCategory from "./SelectCategory"
import Preview from './Preview'
import BikeCard from '../Home/BikeCard'

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { useMediaQuery } from '@mui/material';

const grid = [
    {
        title: 'brand',
        gridArr: [
            {
                name: 'Ducati',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                name: 'BMW',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                name: 'Kawasaki',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                name: 'Ktm',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                name: 'Honda',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                name: 'Harley Davidson',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            }
        ]
    },
    {
        title: 'cubic capacity (cc)',
        gridArr: [
            {
                property: '100cc - 150cc',
                filter: 'cc100-150'
            },
            {
                property: '150cc - 300cc',
                filter: 'cc150-300'
            },
            {
                property: '300cc - 500cc',
                filter: 'cc300-500'
            },
            {
                property: '500cc - 650cc',
                filter: 'cc500-650'
            },
            {
                property: '650cc - 1000cc',
                filter: 'cc650-1000'
            },
            {
                property: '1000cc+',
                filter: 'cc1000'
            }
        ]
    },
    {
        title: 'category',
        gridArr: [
            {
                name: 'dirt',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                name: 'bobber',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                name: 'naked',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                name: 'superbike',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                name: 'adventure',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                name: 'cafe racer',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
        ]
    },
    {
        title: 'price',
        gridArr: [
            {
                property: 'Under ₹3lakh',
                filter: 'priceB3'
            },
            {
                property: 'Under ₹4lakh',
                filter: 'priceB4'
            },
            {
                property: 'Under ₹7lakh',
                filter: 'priceB7'
            },
            {
                property: 'Under ₹15lakh',
                filter: 'priceB15'
            },
            {
                property: 'Under ₹20lakh',
                filter: 'priceB20'
            },
            {
                property: 'Above ₹20lakh',
                filter: 'priceA20'
            }
        ]
    }
]

const filterDialogOptions = grid.flatMap(
    gridItem => {
            return gridItem.gridArr;
    }
)

console.log('filterOptions ', filterDialogOptions)


const Bikes = () => {
    const isMobile = useMediaQuery('(max-width:1024px)')

    const [searchParams, setSearchParams] = useSearchParams();
    const filterValue = searchParams.get('filter');
    const sortValue = searchParams.get('sort');
    console.log('filter ', filterValue)

    const [filterDialog, setFilterDialog] = useState(false);
    const [filterDialogValue, setFilterDialogValue] = useState(filterValue);
    const [sortDialogValue, setSortDialogValue] = useState(sortValue);


    const handleFilterChange = ({filterParam = null, sortParam = null}) => {

        if (filterParam !== null && sortParam !== null) {
            setSearchParams({ filter: filterParam, sort: sortParam });
        }
        else if (filterParam !== null && sortParam  === null) {
            setSearchParams({ filter: filterParam });
        }
        else if (filterParam === null && sortParam !== null) {
            setSearchParams({ sort: sortParam });
        }

    };

    const openFilterDialog = () => {
        setFilterDialog(true);
    }

    const closeFilterDialog = () => {
        setFilterDialog(false);
    }

    const handleSortDialog = (e) => {
        setSortDialogValue(e.target.value)
    }
    
    const handleFilterDialog = (e) => {
        setFilterDialogValue(e.target.value)
    }

    useEffect(() => {
        window.scrollTo(0,0)
        // console.log('searchParams ', searchParams)
        // console.log('sijze ', searchParams.size)
    }, [])

    // useEffect(() => {
    //     console.log('filter ', filterValue)
    //     console.log('sortValue ', sortValue)
    // }, [filterValue, sortValue])

    return (
        <Box
            sx={{
                height: 'auto',
                pt: 10,
                bgcolor: 'customWhite.main'
            }}
        >
            {
                (filterValue || sortValue) ?
                <>
                    <Grid
                        container
                        justifyContent='center'
                        alignItems='center'
                        sx={{
                            maxWidth: '974px',
                            width: '80vw',
                            mx: 'auto'
                        }}
                    >
                        <Button 
                            variant='contained'
                            color='customRed'
                            size={ isMobile ? 'small' : 'medium'}
                            endIcon={<FilterAltRoundedIcon />}
                            sx={{
                                color: 'customWhite.main',
                                width: '70%',
                                px: 4,
                                fontWeight: '600',
                                py: 1,
                                mx: 'auto',
                                textTransform: 'uppercase',
                                mb: 10,
                                ...(isMobile && {
                                    fontSize: '0.75rem'
                                })
                            }}
                            onClick={
                                () => {
                                    openFilterDialog()
                                }
                            }
                        >
                           filter
                        </Button>
                        {[1,2,3].map((item, i) => {
                            return (
                                <Grid
                                    key={item**i}
                                    item
                                    laptop={4}
                                    mobile={12}
                                    sx={{
                                        pr: 5,
                                        ...(i===2 && {
                                            pr: 0
                                        }),
                                        ...(isMobile && {
                                            display: 'flex',
                                            justifyContent: 'center',
                                            pb: 5,
                                            pr: 0
                                        })
                                    }}
                                >
                                    <BikeCard path={'bike/123'} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </>

                :

                <>
                    <Preview onFilterChange={handleFilterChange} />
                    {grid.map((item,i) => {
                        return (
                            <SelectCategory 
                                key={item.title + i} 
                                grid={item} 
                                onFilterChange={handleFilterChange} 
                            />
                        )
                    })}
                </>
            }
            <Dialog
                fullScreen
                open={filterDialog}
                onClose={closeFilterDialog}
            >
                <AppBar 
                    sx={{ 
                        position: 'relative', 
                        bgcolor: 'customBlack.main' 
                    }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={closeFilterDialog}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Filter
                        </Typography>
                        <Typography 
                            variant="h6" 
                            component={Button} 
                            autoFocus 
                            color="inherit" 
                            onClick={
                                () => {
                                    handleFilterChange({
                                        filterParam: filterDialogValue,
                                        sortParam: sortDialogValue
                                    });
                                    closeFilterDialog();
                                }
                            }
                        >
                        save
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem
                        sx={{
                            px: 10,
                            py: 5
                        }}
                    >
                        <FormControl>
                            <FormLabel 
                                id="sort-radio-buttons-group"
                                sx={{
                                    fontWeight: '700',
                                    color: 'customBlack.main'
                                }}
                            >
                                Sort
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="sort-radio-buttons-group"
                                name="sort-radio-buttons-group"
                                value={sortDialogValue}
                                onChange={handleSortDialog}
                            >
                                <FormControlLabel value="desc" control={<Radio />} label="Cubic Capacity (high to low)" />
                                <FormControlLabel value="asc" control={<Radio />} label="Cubic Capacity (low to high)" />
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <Divider />
                    <ListItem
                        sx={{
                            px: 10,
                            py: 5
                        }}
                    >
                        <FormControl>
                            <FormLabel 
                                id="filter-radio-buttons-group"
                                sx={{
                                    fontWeight: '700',
                                    color: 'customBlack.main'
                                }}
                            >
                                filter
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="filter-radio-buttons-group"
                                name="filter-radio-buttons-group"
                                value={filterDialogValue}
                                onChange={handleFilterDialog}
                            >
                                {
                                    filterDialogOptions.map(
                                        filterOption => {
                                            return (
                                                <FormControlLabel 
                                                control={<Radio />} 
                                                {
                                                    ...(
                                                        filterOption.name ?
                                                            {
                                                                key: filterOption.name + filterOption.imgAlt,
                                                                value: filterOption.name,
                                                                label: filterOption.name,
                                                                sx: {
                                                                    textTransform: 'capitalize'
                                                                }
                                                            }
                                                                :

                                                            {
                                                                key: filterOption.filter + filterOption.property,
                                                                value: filterOption.filter,
                                                                label: filterOption.property
                                                            }
                                                        )
                                                    }
                                                />
                                            )
                                        }
                                    )
                                }
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                </List>
            </Dialog>
        </Box>
    )
}

export default Bikes;