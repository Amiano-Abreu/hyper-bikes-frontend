import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
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
import ktmLogo from '../../assets/Bikes/logo/Ktm.webp'
import bmwLogo from '../../assets/Bikes/logo/bmw.webp'
import harleyDavidsonLogo from '../../assets/Bikes/logo/harleyDavidson.webp'
import hondaLogo from '../../assets/Bikes/logo/honda.png'
import kawasakiLogo from '../../assets/Bikes/logo/kawasaki.webp'

import adventure from '../../assets/Bikes/category/adventure.webp'
import bobber from '../../assets/Bikes/category/bobber.webp'
import cafeRacer from '../../assets/Bikes/category/cafeRacer.webp'
import dirt from '../../assets/Bikes/category/dirt.webp'
import naked from '../../assets/Bikes/category/naked.webp'
import superbike from '../../assets/Bikes/category/superbike.webp'


import SelectCategory from "./SelectCategory"
import Preview from './Preview'
import BikeCard from '../Home/BikeCard'
import Loader from '../Utility/Loader'

import { useEffect, useMemo, useState } from "react"
import useGetRequest from "../../services/useGetRequest"

import { useMediaQuery } from '@mui/material';
import Toaster from "../Utility/Toaster";

const BASEURL = `${process.env.REACT_APP_API_URL}/bikes`;

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
                imgLogo: bmwLogo,
                imgAlt: 'bmw-logo'
            },
            {
                name: 'Kawasaki',
                imgLogo: kawasakiLogo,
                imgAlt: 'Kawasaki-logo'
            },
            {
                name: 'KTM',
                imgLogo: ktmLogo,
                imgAlt: 'KTM-logo'
            },
            {
                name: 'Honda',
                imgLogo: hondaLogo,
                imgAlt: 'Honda-logo'
            },
            {
                name: 'Harley Davidson',
                imgLogo: harleyDavidsonLogo,
                imgAlt: 'Harley-Davidson-logo'
            }
        ]
    },
    {
        title: 'displacement',
        gridArr: [
            {
                property: '100cc - 150cc',
                filter: '100-150'
            },
            {
                property: '150cc - 300cc',
                filter: '150-300'
            },
            {
                property: '300cc - 500cc',
                filter: '300-500'
            },
            {
                property: '500cc - 650cc',
                filter: '500-650'
            },
            {
                property: '650cc - 1000cc',
                filter: '650-1000'
            },
            {
                property: '1000cc+',
                filter: '1000'
            }
        ]
    },
    {
        title: 'category',
        gridArr: [
            {
                name: 'dirt',
                imgLogo: dirt,
                imgAlt: 'dirt-bike'
            },
            {
                name: 'bobber',
                imgLogo: bobber,
                imgAlt: 'bobber-bike'
            },
            {
                name: 'naked',
                imgLogo: naked,
                imgAlt: 'naked-bike'
            },
            {
                name: 'superbike',
                imgLogo: superbike,
                imgAlt: 'superbike-bike'
            },
            {
                name: 'adventure',
                imgLogo: adventure,
                imgAlt: 'adventure-bike'
            },
            {
                name: 'cafe racer',
                imgLogo: cafeRacer,
                imgAlt: 'cafe-racer-bike'
            },
        ]
    },
    {
        title: 'price',
        gridArr: [
            {
                property: 'Under ₹3lakh',
                filter: 'U300000'
            },
            {
                property: 'Under ₹4lakh',
                filter: 'U400000'
            },
            {
                property: 'Under ₹7lakh',
                filter: 'U700000'
            },
            {
                property: 'Under ₹15lakh',
                filter: 'U1500000'
            },
            {
                property: 'Under ₹20lakh',
                filter: 'U2000000'
            },
            {
                property: 'Above ₹20lakh',
                filter: 'A2000000'
            }
        ]
    }
]

let brandRadio;
let categoryRadio;
let priceRadio;
let displacementRadio;

const filterRadioSelect = grid.map(
    gridItem => {
            const { title, gridArr } = gridItem;

            if ( title === "brand" || title === "category" ) {
                const valueArray = gridArr.map(
                    item => item.name
                )

                if ( title === "brand" ) {
                    brandRadio = valueArray;
                }
                else {
                    categoryRadio = valueArray;
                }
            }
            else {
                const valueArray = gridArr.map(
                    item => item.filter
                )

                if ( title === "price" ) {
                    priceRadio = valueArray;
                }
                else {
                    displacementRadio = valueArray;
                }
            }

            if ( title === "cubic capacity (cc)" ) {
                return "Displacement";
            }
            return title.charAt(0).toUpperCase() + title.slice(1);
    }
)

// console.log('filterOptions ', filterRadioSelect)
// console.log('filterbrandRadio ', brandRadio)
// console.log('filtercategoryRadio ', categoryRadio)
// console.log('filterpriceRadio ', priceRadio)
// console.log('filterdisplacementRadio ', displacementRadio)

const filterNames = ["selectedFilter", "selectedBrand", "selectedPrice", "selectedDisplacement", "selectedCategory"]


const Bikes = () => {
    // console.log("start ")
    const isMobile = useMediaQuery('(max-width:1024px)')

    const [filterDialog, setFilterDialog] = useState(false);
    const [saved, setSaved] = useState(false);

    const [viewAll, setViewAll] = useState(false);

    const handleViewAll = () => {
        setSaved(false);
        setViewAll(true);
    }

    const openFilterDialog = () => {
        setFilterDialog(true);
    }

    const closeFilterDialog = () => {
        setFilterDialog(false);
    }

    const [filters, setFilters] = useState({
      selectedFilter: '',
      selectedBrand: '',
      selectedPrice: '',
      selectedDisplacement: '',
      selectedCategory: ''
    });
    const {
        selectedFilter,
        selectedBrand,
        selectedPrice,
        selectedDisplacement,
        selectedCategory
    } = filters;

    const handleFilterChange = (event) => {
        //   FOR HANDLING SINGLE FILTERS AT ONCE
        // console.log("filters event", event)
        const { name, value } = event.target;
        
        let  otherFilters;
        if ( name === "selectedFilter" ) {
            otherFilters = filterNames.filter( fName => fName !== name );
        }
        else {
            otherFilters = filterNames.filter( fName => fName !== name ).filter( i => i !== "selectedFilter" );
        }
        // console.log('otherFilters ', otherFilters)
        
        setFilters((filters) => {
            const updatedFilters = { ...filters, [name]: value };

            otherFilters.forEach(
                item => {
                    updatedFilters[item] = "";
                }
            )

            return {
                ...updatedFilters
            };
        });
        
        // console.log('updatedFilters ', filters)
    }
    
    // FOR FUTURE FEATURE OF SORTING BASED ON CC
    // const [sortDialogValue, setSortDialogValue] = useState(null);

    // const handleSortDialog = (e) => {
    //     setSortDialogValue(e.target.value)
    // }

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    const url = useMemo(
        () => {
            if( 
                saved && 
                (
                    selectedBrand ||
                    selectedPrice ||
                    selectedDisplacement ||
                    selectedCategory
                )
            ) {
                // console.log('filter async')
                if (selectedBrand) {
                    return `${BASEURL}/brand/${selectedBrand}`;
                }
                else if (selectedPrice) {
                    let query;
        
                    if( selectedPrice[0] === "U" ) {
                        query = `under=${selectedPrice.slice(1)}`
                    }
                    else {
                        query = `above=${selectedPrice.slice(1)}`
                    }
        
                    return `${BASEURL}/price?${query}`;
                }
                else if (selectedDisplacement) {
                    let start, end;
        
                    if( selectedDisplacement.includes("-") ) {
                        const dispArr = selectedDisplacement.split("-");
                        
                        start = dispArr[0];
                        end = dispArr[1];
                    }
                    else {
                        start = selectedDisplacement;
                    }
        
                    return `${BASEURL}/displacement?start=${start}${end ? `&end=${end}` : ''}`;
                }
                else if (selectedCategory) {
                    return `${BASEURL}/category/${selectedCategory}`;
                }
            }
            else if (
                !saved &&
                viewAll
            ) {
                // console.log('view all filter async')
                return `${BASEURL}`;
            }
        }, [saved, selectedBrand, selectedPrice, selectedDisplacement, selectedCategory, viewAll])

        // console.log("radio url ", url)
    const { isLoading, apiData, serverError } = useGetRequest(`${url}`)

    // useEffect(() => {
    //     console.log('filter ', saved, selectedFilter, selectedBrand, selectedPrice, selectedDisplacement, selectedCategory)
    // }, [selectedFilter, selectedBrand, selectedPrice, selectedDisplacement, selectedCategory, saved])

    return (
        <Box
            sx={{
                height: 'auto',
                pt: 10,
                bgcolor: 'customWhite.main'
            }}
        >
            {
                
                (
                    (
                        (
                            saved && 
                            (
                                selectedBrand ||
                                selectedCategory ||
                                selectedPrice ||
                                selectedDisplacement
                            )
                        )

                        ||

                        (
                            !saved && viewAll
                        )
                    )

                    &&

                    (
                        !isLoading 
                    )
                )
                ?
                <>
                    <Grid
                        container
                        justifyContent='flexStart'
                        alignItems='center'
                        sx={{
                            maxWidth: '974px',
                            width: '80vw',
                            mx: 'auto',
                            ...(
                                apiData?.data?.length === 0 && !serverError && {
                                    flexDirection: 'column'
                                }
                            )
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
                        {
                            apiData?.data?.length === 0 && !serverError && !isLoading ?

                            <p
                                style={{
                                    textTransform: 'uppercase',
                                    fontWeight: '700'
                                }}
                            >No Bikes Of Selected Filter Available Yet</p>

                            :

                            (
                                serverError ? 

                                (
                                        serverError.hasOwnProperty("data") ?
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
                                                        serverError.data.map(
                                                            obj => {
                                                                const key = Object.keys(obj)[0];
                                                                const message = obj[key]
                                                                return (
                                                                    <Toaster 
                                                                        type='error'
                                                                        message={message}
                                                                    />
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
                                                    >Error On Selected Filter. Please select another filter !</p>

                                                    <Toaster
                                                        type='error'
                                                        message={serverError.message}
                                                    />
                                                </>
                                            )
                                            
                                )

                                :

                                apiData?.data.map((item, i) => {
                                    return (
                                            <Grid
                                                key={item.bikeID}
                                                item
                                                laptop={4}
                                                mobile={12}
                                                sx={{
                                                    pr: 5,
                                                    mb: 5,
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
                                                <BikeCard 
                                                    path={`bike/${item.bikeID}`} 
                                                    bike={item}
                                                />
                                            </Grid>
                                    )
                                })
                            )
                        }
                    </Grid>
                </>

                :

                <>
                    <Preview onViewAll={handleViewAll} />
                    {grid.map((item,i) => {
                        return (
                            <SelectCategory 
                                key={item.title + i} 
                                grid={item} 
                                onFilterChange={handleFilterChange}
                                onSave={() => {setSaved(true)}}
                                onViewAll={handleViewAll}
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
                                    setViewAll(false);
                                    setSaved(true);
                                    closeFilterDialog();
                                }
                            }
                        >
                        save
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    {/* <ListItem
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
                                    color: 'customBlack.main',
                                    textTransform: 'uppercase'
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
                    <Divider /> */}
                    <ListItem
                        sx={{
                            px: 10,
                            py: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                        }}
                    >
                        <FormControl
                            sx={{
                                mb: 5
                            }}
                        >
                            <FormLabel 
                                id="filter-radio-buttons-group"
                                sx={{
                                    fontWeight: '700',
                                    color: 'customBlack.main',
                                    textTransform: 'uppercase'
                                }}
                            >
                                filter
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="filter-type"
                                name="selectedFilter"
                                value={filters.selectedFilter}
                                onChange={handleFilterChange}
                            >
                                {
                                    filterRadioSelect.map(
                                        radioItem => {
                                            return (
                                                <FormControlLabel 
                                                    value={radioItem.toLowerCase()} 
                                                    control={<Radio />} 
                                                    label={radioItem}
                                                />
                                            )
                                        }
                                    )
                                }
                                
                            </RadioGroup>
                        </FormControl>
                        {
                            selectedFilter === "brand" &&
                            (
                                <FormControl>
                                    <FormLabel 
                                    id="filter-radio-buttons-group"
                                    sx={{
                                        fontWeight: '700',
                                        color: 'customBlack.main',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    select brand
                                </FormLabel>
                                <RadioGroup
                                  row
                                  aria-label="brand-filter"
                                  name="selectedBrand"
                                  value={filters.selectedBrand}
                                  onChange={handleFilterChange}
                                >
                                  {
                                    brandRadio.map(
                                        brand => {
                                            return (
                                                <FormControlLabel 
                                                    value={brand} 
                                                    control={<Radio />} 
                                                    label={brand} 
                                                />
                                            )
                                        }
                                    )
                                  }
                                </RadioGroup>
                              </FormControl>
                            )
                        }
                        {
                            selectedFilter === "price" &&
                            (
                              <FormControl>
                                <FormLabel 
                                    id="filter-radio-buttons-group"
                                    sx={{
                                        fontWeight: '700',
                                        color: 'customBlack.main',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    select price
                                </FormLabel>
                                <RadioGroup
                                  row
                                  aria-label="price-filter"
                                  name="selectedPrice"
                                  value={filters.selectedPrice}
                                  onChange={handleFilterChange}
                                >
                                  {
                                    priceRadio.map(
                                        price => {
                                            return (
                                                <FormControlLabel 
                                                    value={price} 
                                                    control={<Radio />} 
                                                    label={`${price.charAt(0) === "U" ? "Under" : "Above"} ${price.slice(1)}`} 
                                                />
                                            )
                                        }
                                    )
                                  }
                                </RadioGroup>
                              </FormControl>
                            )
                        }
                        {
                            selectedFilter === "category" &&
                            (
                              <FormControl>
                                <FormLabel 
                                    id="filter-radio-buttons-group"
                                    sx={{
                                        fontWeight: '700',
                                        color: 'customBlack.main',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    select category
                                </FormLabel>
                                <RadioGroup
                                  row
                                  aria-label="category-filter"
                                  name="selectedCategory"
                                  value={filters.selectedCategory}
                                  onChange={handleFilterChange}
                                >
                                  {
                                    categoryRadio.map(
                                        category => {
                                            return (
                                                <FormControlLabel 
                                                    value={category} 
                                                    control={<Radio />} 
                                                    label={category.charAt(0).toUpperCase() + category.slice(1)} 
                                                />
                                            )
                                        }
                                    )
                                  }
                                </RadioGroup>
                              </FormControl>
                            )
                        }
                        {
                            selectedFilter === "displacement" &&
                            (
                              <FormControl>
                                <FormLabel 
                                    id="filter-radio-buttons-group"
                                    sx={{
                                        fontWeight: '700',
                                        color: 'customBlack.main',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    select displacement
                                </FormLabel>
                                <RadioGroup
                                  row
                                  aria-label="displacement-filter"
                                  name="selectedDisplacement"
                                  value={filters.selectedDisplacement}
                                  onChange={handleFilterChange}
                                >
                                  {
                                    displacementRadio.map(
                                        displacement => {
                                            return (
                                                <FormControlLabel 
                                                    value={displacement} 
                                                    control={<Radio />} 
                                                    label={displacement.includes('-') ? displacement : `${displacement}+`} 
                                                />
                                            )
                                        }
                                    )
                                  }
                                </RadioGroup>
                              </FormControl>
                            )
                        }
                    </ListItem>
                </List>
            </Dialog>
            {isLoading ? <Loader /> : <></>}
        </Box>
    )
}

export default Bikes;