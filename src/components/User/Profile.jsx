import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import { useSelector } from "react-redux";

const Profile = () => {
    const {
        uid,
        userName,
        email,
        state,
        country
    } = useSelector(state => state.user);

    const firstName = userName.split(" ")[0]
    const lastName = userName.split(" ")[1]

    const arr = [
        [
            {
                label: "User ID",
                value: uid
            },
            {
                label: "Email",
                value: email
            }
        ],
        [
            {
                label: "First Name",
                value: firstName
            },
            {
                label: "Last Name",
                value: lastName
            }
        ],
        [
            {
                label: "State",
                value: state
            },
            {
                label: "Country",
                value: country
            },
        ]
    ];

    return (
        <>
            <Box
                sx={{
                    height: 'auto',
                    py: { mobile: 10, laptop: 15 },
                    px: { mobile: 7.5, laptop: 15 },
                    bgcolor: 'customWhite.main',
                    display: 'flex',
                    flexDirection: 'column',
                    width: "100%"
                }}
            >
                {
                    arr.map(
                        (arrItem, index) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: { mobile: 'flex-start', laptop:'center'},
                                    flexDirection: { mobile: "column", laptop: "row"},
                                    ...((index !== arr.length - 1) && {
                                        marginBottom: '25px'
                                    })
                                }}
                            >

                                {
                                    arrItem.map(
                                        (item, i) => {
                                            return (
                                                <>
                                                    <Box
                                                        sx={{
                                                            width: '190px',
                                                            ...((arrItem.length -1 !== i) && {
                                                                mb: 5
                                                            })
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="h5"
                                                        >
                                                            {item.label}
                                                        </Typography>
                                                        <Typography>
                                                            {item.value}
                                                        </Typography>
                                                    </Box>
                                                </>
                                            )
                                        }
                                    )
                                }
                            </Box>
                        )
                    )
                }
            </Box>
        </>
    )
}

export default Profile;