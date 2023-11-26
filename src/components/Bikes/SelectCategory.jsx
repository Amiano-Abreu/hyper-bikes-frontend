import { useMediaQuery } from "@mui/material";

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

const SelectCategory = ({ grid, onFilterChange, onSave, onViewAll }) => {
    const isMobile = useMediaQuery('(max-width:1024px)')

    return (
        <>
            <Typography
                variant='h4'
                component='h2'
                sx={{
                    textAlign: 'center',
                    color: 'customBlack.main',
                    textTransform: 'uppercase',
                    fontSize: { mobile: '1.5rem', laptop: '2.125rem' },
                    '& span': {
                        borderBottom: '2px solid #bc1024',
                        pb: .5
                    }
                }}
            >
                select by <span>{grid.title}</span>
            </Typography>
            <Grid
                container
                spacing={0}
                sx={{
                    width: { mobile: '330px' , tablet: '500px' , laptop: '950px'},
                    mt: 5,
                    mx: 'auto',
                    height: { mobile: '600px', laptop: '205.594px'},
                    ...(!isMobile && {
                        height: '205.594px',
                    })
                }}
            >
                {grid.gridArr.map((item, i) => {
                    return (
                        <Grid
                            key={item.property ? item.property + i : item.imgAlt + i}
                            item
                            mobile={6}
                            laptop={2}
                            sx={{
                                pt: 5,
                                pr: 5,
                                height: 'auto',
                                ...(!isMobile && {
                                    height: '100%'
                                })
                            }}
                        >
                            <Paper
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        cursor: 'pointer'
                                    },
                                    ...( !item.property && {
                                        justifyContent: 'space-evenly'
                                    })
                                }}
                                elevation={6}
                                onClick={ () => {
                                    console.log('yo')
                                    const selectFilterObj = {
                                        target: {
                                            name: 'selectedFilter',
                                            value: ''
                                        }
                                    }

                                    const obj = {
                                        target: {
                                            name: '',
                                            value: ''
                                        }
                                    }

                                    if( grid.title === "brand") {
                                        obj.target.name = "selectedBrand"
                                        obj.target.value = item.name
                                        selectFilterObj.target.value = grid.title
                                        onFilterChange(selectFilterObj);
                                        onFilterChange(obj);
                                    }
                                    else if( grid.title === "cubic capacity (cc)") {
                                        obj.target.name = "selectedDisplacement"
                                        obj.target.value = item.filter
                                        selectFilterObj.target.value = "displacement"
                                        onFilterChange(selectFilterObj);
                                        onFilterChange(obj);
                                    }
                                    else if( grid.title === "category") {
                                        obj.target.name = "selectedCategory"
                                        obj.target.value = item.name
                                        selectFilterObj.target.value = grid.title
                                        onFilterChange(selectFilterObj);
                                        onFilterChange(obj);
                                    }
                                    else if( grid.title === "price") {
                                        obj.target.name = "selectedPrice"
                                        obj.target.value = item.filter
                                        selectFilterObj.target.value = grid.title
                                        onFilterChange(selectFilterObj);
                                        onFilterChange(obj);
                                    }

                                    onSave()
                                }}
                            >
                                {item.property ? 
                                    <Typography
                                        sx={{
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            color: 'customBlack.light',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            ...(isMobile && {
                                                fontWeight: '800',
                                                fontSize: '.75rem'
                                            })
                                        }}
                                    >
                                        {item.property.split(' ').map((pItem, pIndex) => {
                                            return (
                                                <span
                                                    key={pItem + pIndex}
                                                >{pItem}</span>
                                            )
                                        })}
                                    </Typography>
                                : 
                                    <>
                                        <Box
                                            sx={{
                                                height: '40%',
                                                width: { mobile: '100%' , tablet: '70%', laptop: '100%'},
                                                px: "10px",
                                                '& img': {
                                                    height: '100%',
                                                    width: '100%',
                                                    objectFit: "contain"
                                                },
                                                // mb: { mobile: 5 , laptop: 5 }
                                            }}
                                        >
                                            <img src={item.imgLogo} alt={item.imgAlt} />
                                        </Box>
                                        <Typography
                                            variant='h6'
                                            component='p'
                                            sx={{
                                                textTransform: 'uppercase',
                                                color: 'customBlack.light',
                                                fontWeight: { mobile: '800' , laptop: '600'},
                                                fontSize: { mobile: '.7rem' , laptop: '1rem'},
                                                height: '40px',
                                                ...(
                                                    !item.name.trim().includes(" ") && {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }
                                                )
                                            }}
                                        >
                                            {
                                                item.name.trim().includes(" ") ?
                                                    <>
                                                        {
                                                            item.name.trim().split(" ").map(
                                                                (textContent, i) => {
                                                                    return (
                                                                        <span
                                                                            key={textContent + i}
                                                                            style={{
                                                                                display: 'block',
                                                                                textAlign: 'center'
                                                                            }}
                                                                        >{textContent}</span>
                                                                    )
                                                                }
                                                            )
                                                        }
                                                    </>
                                                : 
                                                
                                                item.name
                                            }
                                        </Typography>
                                    </>
                                    
                                }
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
            <Button 
                    variant='contained'
                    color='customRed'
                    size={ isMobile ? 'small' : 'medium'}
                    endIcon={<ArrowRightAltRoundedIcon />}
                    sx={{
                        color: 'customWhite.main',
                        width: '50%',
                        px: 4,
                        fontWeight: '600',
                        py: 1,
                        mx: '25%',
                        textTransform: 'uppercase',
                        my: 10,
                        ...(isMobile && {
                            fontSize: '0.75rem'
                        })
                    }}
                    onClick={() => {
                        onViewAll();
                    }}
                >
                    view all
            </Button>
        </>
    )
}

export default SelectCategory;