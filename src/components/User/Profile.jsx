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
                    p: 15,
                    bgcolor: 'customWhite.main',
                    display: 'flex',
                    flexDirection: 'column',

                }}
            >
                {
                    arr.map(
                        (arrItem, index) => (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    ...((index !== arr.length - 1) && {
                                        marginBottom: '25px'
                                    })
                                }}
                            >

                                {
                                    arrItem.map(
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
                                                            {item.label}
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
                        )
                    )
                }
            </Box>
        </>
    )
}

export default Profile;