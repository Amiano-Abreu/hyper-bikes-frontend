import Paper from "@mui/material/Paper";

const CustomPaper = ({ content, children }) => {
    return (
        <>
            <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: { mobile: '320px', tablet: '500px' , laptop: '650px'},
                    mx: 'auto',
                    alignItems: 'center',
                    p: 5,
                    mt: 5,
                    bgcolor: 'customWhite.main',
                    ...(content && {
                        flexDirection: 'column'
                    })
                }}
            >
                {children}
            </Paper>
        </>
    )
}

export default CustomPaper;