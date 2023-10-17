import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const PaperHeader = ({ text, cart=false }) => {
    return (
        <>
            <Typography
                variant='h4'
                sx={{
                    textAlign: 'center',
                    fontWeight: '600',
                    pt: 1.5,
                    ...(
                        cart && {
                            width: "100%"
                        }
                    ),
                    ...(
                        !cart && {
                            width: '90%'
                        }
                    ),
                    textTransform: 'uppercase',
                    fontSize: { mobile: '0.85rem' , tablet: '1rem' , laptop: '1.5rem' }
                }}
            >
                {text}
            </Typography>
            <Divider
                variant='middle'
                sx={{
                    pt: 2.5,
                    ...(
                        cart && {
                            width: "100%",
                            mx: 0,
                            px: 16
                        }
                    ),
                    ...(
                        !cart && {
                            width: '90%'
                        }
                    ),
                    height: '1px',
                    borderColor: 'customRed.main'
                }}    
            />
        </>
    )
}

export default PaperHeader;