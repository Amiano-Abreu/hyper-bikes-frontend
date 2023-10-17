import Divider from '@mui/material/Divider';

const CustomDivider = ({ title }) => {
    return (
        <Divider
                    variant='middle'
                    textAlign='center'
                    sx={{
                        py: 10,
                        '&::before': {
                            backgroundColor: 'customRed.main'
                        },
                        '&::after': {
                            backgroundColor: 'customRed.main'
                        },
                        height: '2px',
                        '& span': {
                            textAlign: 'center',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            color: 'customRed.main',
                            fontSize: { mobile: '1rem' , tablet: '1.5rem' , laptop: '2.125rem' }
                        }                        
                    }}    
            >
                {title}
        </Divider>
    )
}

export default CustomDivider;