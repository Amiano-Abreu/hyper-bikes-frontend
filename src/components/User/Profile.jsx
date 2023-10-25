import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"

const profileArray1 = [
    {
        type: 'Name',
        value: 'Amiano Abreu'
    },
    {
        type: 'Email',
        value: 'amianoabreu@gmail.com'
    }
]
const profileArray2 = [
    {
        type: 'State',
        value: 'Goa'
    },
    {
        type: 'Country',
        value: 'India'
    },
]

const Profile = () => {
    return (
        <>
            <Box
                sx={{
                    height: 'auto',
                    p: 15,
                    bgcolor: 'customWhite.main',
                    display: 'flex',
                    flexDirection: 'column',

                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginBottom: '25px'
                    }}
                >

                    {
                        profileArray1.map(
                            item => {
                                return (
                                    <>
                                        <div
                                            style={{
                                                width: '190px'
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                            >
                                                {item.type}
                                            </Typography>
                                            <Typography>
                                                {item.value}
                                            </Typography>
                                        </div>
                                    </>
                                )
                            }
                        )
                    }
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    {
                        profileArray2.map(
                            item => {
                                return (
                                    <>
                                        <div
                                            style={{
                                                width: '190px'
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                            >
                                                {item.type}
                                            </Typography>
                                            <Typography>
                                                {item.value}
                                            </Typography>
                                        </div>
                                    </>
                                )
                            }
                        )
                    }
                </div>
            </Box>
        </>
    )
}

export default Profile;