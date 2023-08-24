import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Box from "@mui/material/Box";

const ReactCarousel = ({ images }) => {
    return (
        <Box
            sx={{
                '& .carousel-slider p': {
                    display: 'none'
                },
                '& .carousel-slider button': {
                    display: 'none'
                },
                '& .carousel': {
                    textAlign: 'center'
                },
                '& .carousel .slide img': {
                    height: { mobile: '250px' , tablet: '400px' , laptop: '400px'},
                    width: { mobile: '400px' , tablet: '650px' , laptop: '800px'}
                },
                '& .control-dots .dot': {
                    backgroundColor: 'customBlack.main'
                }
            }}
        >
            <Carousel
                autoPlay
                infiniteLoop
                interval={3000}
            >
                {
                    images.map((image, i) => {
                        return (
                            <Box
                                key={i}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}

                                />
                            </Box>
                        )
                    })
                }
            </Carousel>
        </Box>
    )
}

export default ReactCarousel;
