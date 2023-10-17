import Box from "@mui/material/Box"

import ducatiLogo from '../../assets/Bikes/logo/ducati-logo.png'

import SelectCategory from "./SelectCategory"
import Preview from './Preview'

import { useEffect } from "react"

const grid = [
    {
        title: 'brand',
        gridArr: [
            {
                bikeBrand: 'ducati',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                bikeBrand: 'ducati',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                bikeBrand: 'ducati',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                bikeBrand: 'ducati',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                bikeBrand: 'ducati',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                bikeBrand: 'ducati',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            }
        ]
    },
    {
        title: 'cubic capacity (cc)',
        gridArr: [
            {
                property: '100cc - 150cc'
            },
            {
                property: '150cc - 300cc'
            },
            {
                property: '300cc - 500cc'
            },
            {
                property: '500cc - 650cc'
            },
            {
                property: '650cc - 1000cc'
            },
            {
                property: '1000cc+'
            }
        ]
    },
    {
        title: 'category',
        gridArr: [
            {
                bikeBrand: 'ducati',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                bikeBrand: 'ducati',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                bikeBrand: 'ducati',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                bikeBrand: 'ducati',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                bikeBrand: 'ducati',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            },
            {
                bikeBrand: 'ducati',
                imgLogo: ducatiLogo,
                imgAlt: 'ducati-logo'
            }
        ]
    },
    {
        title: 'price',
        gridArr: [
            {
                property: 'Under ₹3lakh'
            },
            {
                property: 'Under ₹4lakh'
            },
            {
                property: 'Under ₹7lakh'
            },
            {
                property: 'Under ₹15lakh'
            },
            {
                property: 'Under ₹20lakh'
            },
            {
                property: 'Above ₹20lakh'
            }
        ]
    }
]



const Bikes = () => {

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return (
        <Box
            sx={{
                height: 'auto',
                pt: 10,
                bgcolor: 'customWhite.main'
            }}
        >
            <Preview />
            {grid.map((item,i) => {
                return (
                    <SelectCategory key={item.title + i} grid={item}/>
                )
            })}
        </Box>
    )
}

export default Bikes;