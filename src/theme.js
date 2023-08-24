import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        customWhite: {
            light: '#fbfbf280',
            main: "#fbfbf2" //whtie
        },
        customBlack: {
            light: '#2a2727c4', 
            main: '#2a2727' //black
        },
        customRed: {
            main: '#bc1024' //red
        }
    },
    spacing: 5,
    breakpoints: {
        values: {
          mobile: 0,
          tablet: 640,
          laptop: 1024,
          desktop: 1200,
        }
    }
})

export default theme;