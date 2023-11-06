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

import { useEffect, useMemo, useState } from "react"
import useGetRequest from "../../services/useGetRequest"

import { useMediaQuery } from '@mui/material';

const BASEURL = "http://localhost:5000/api/bikes";

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

console.log('filterOptions ', filterRadioSelect)
console.log('filterbrandRadio ', brandRadio)
console.log('filtercategoryRadio ', categoryRadio)
console.log('filterpriceRadio ', priceRadio)
console.log('filterdisplacementRadio ', displacementRadio)

const filterNames = ["selectedFilter", "selectedBrand", "selectedPrice", "selectedDisplacement", "selectedCategory"]


const Bikes = () => {
    console.log("start ")
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
        setSaved(false);
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

    
    // const handleFilterChange = (event) => {
    //   FOR HANDLING ALL FILTERS AT ONCE
    //   SERVICE NOT IMPLEMENTED YET
    // 
    //   const { name, value } = event.target;
    //   setFilters({ ...filters, [name]: value });
    // };

    const handleFilterChange = (event) => {
        //   FOR HANDLING SINGLE FILTERS AT ONCE
        console.log("filters event", event)
        const { name, value } = event.target;
        
        let  otherFilters;
        if ( name === "selectedFilter" ) {
            otherFilters = filterNames.filter( fName => fName !== name );
        }
        else {
            otherFilters = filterNames.filter( fName => fName !== name ).filter( i => i !== "selectedFilter" );
        }
        console.log('otherFilters ', otherFilters)
        
        setFilters((filters) => {
            const updatedFilters = { ...filters, [name]: value };

            otherFilters.map(
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
    
    const [sortDialogValue, setSortDialogValue] = useState(null);

    const handleSortDialog = (e) => {
        setSortDialogValue(e.target.value)
    }

    useEffect(() => {
        window.scrollTo(0,0)
        // console.log('searchParams ', searchParams)
        // console.log('sijze ', searchParams.size)
    }, [])

    // let url;
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
                console.log('filter async')
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
                console.log('view all filter async')
                return `${BASEURL}`;
            }
        }, [saved, selectedBrand, selectedPrice, selectedDisplacement, selectedCategory, viewAll])

        console.log("radio url ", url)
    const { isLoading, apiData, serverError } = useGetRequest("GET", `${url}`)

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
            {`'${String(url)}'`}
            {
                // (filterValue || sortValue) 
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
                ?
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
                    <Divider />
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
        </Box>
    )
}

export default Bikes;