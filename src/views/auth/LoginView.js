import React, { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { Box, Button, Container, Grid, Link, TextField, Typography, makeStyles } from "@material-ui/core"
import Page from "src/components/Page"
import networking from "../../utils/Networking"

import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

import OTPModal from "../../components/OTPModal"

import { AuthContext } from "../../contexts/Auth"

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: "100%",
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
    },
}))

const LoginView = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    const { setLoggedIn } = useContext(AuthContext)
    const { setLoggedUID } = useContext(AuthContext)

    const { register, handleSubmit, errors } = useForm()
    const [open, setOpen] = useState(false)
    const [error, setError] = useState({ flag: false, message: "" })
    const [otp, setOTP] = useState("")
    const [otpError, setOTPError] = useState("")
    const [userId, setUserId] = useState("")
    const [randomSequence, setRandomSequence] = useState([])
    const [numAttempts, setNumAttempts] = useState(0)

    const onSubmit = handleSubmit(emailObj => {
        setError({ flag: true, message: "Loading..." })
        networking.post("/users/check_exists", emailObj).then(res => {
            if (res.data) {
                setError({ flag: false, message: "" })
                setOpen(true)
                setUserId(res.data)
            } else {
                setError({ flag: true, message: "This email is not registered. Please sign up first" })
            }
        })
    })

    const handleClose = () => {
        setRandomSequence([])
        setOpen(false)
    }

    function login() {
        setOTPError("")
        let data = {
            userId,
            sequence: randomSequence.join(),
            otp,
        }

        networking
            .post("/users/login", data)
            .then(res => {
                if (res.data === true) {
                    setLoggedIn(true)
                    setLoggedUID(userId)
                    setOTPError("")
                } else {
                    setOTPError("The password is not correct, try again later.")
                }
            })
            .catch(error => {
                console.log("Error = ", error)
            })
        setNumAttempts(numAttempts + 1)
    }

    function validateOTP() {
        if (numAttempts > 2) {
            setOTPError("You have maxed out your attempts, wait until the next cycle to try again.")
            return
        }
        if (otp.length !== 6) {
            setOTPError("The code should have 6 characters")
            return
        }
        login()
    }

    return (
        <Page className={classes.root} title="Login">
            <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
                <Container maxWidth="sm">
                    <form onSubmit={onSubmit}>
                        <Box mb={1}>
                            <Typography color="textPrimary" variant="h2">
                                Sign in
                            </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2">
                                Use your email
                            </Typography>
                        </Box>
                        <TextField
                            inputRef={register({
                                required: "The email address is required",
                            })}
                            spacing={2}
                            fullWidth
                            label="Email"
                            name="email"
                            size="small"
                            type="email"
                            variant="outlined"
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                        {error.flag && <p className="error-message">{error.message}</p>}
                        <Box my={2}>
                            <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                                Sign in
                            </Button>
                        </Box>
                        <Typography color="textSecondary" variant="body1">
                            Don&apos;t have an account?{" "}
                            <Link component={RouterLink} to="/register" variant="h6">
                                Sign up
                            </Link>
                        </Typography>
                    </form>
                </Container>
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="totp-modal"
            >
                <DialogContent>
                    <div className="totp-instructions">
                        <div>1. Open your app.</div>
                        <div>2. Click on 'Get Password'.</div>
                        <div>3. Do these movements following the instructions on the app.</div>
                        <div>4. Type in the password given by the app.</div>
                    </div>
                    <OTPModal
                        otp={otp}
                        onOTPChange={setOTP}
                        randomSequence={randomSequence}
                        setRandomSequence={setRandomSequence}
                        setNumAttempts={setNumAttempts}
                    />
                    {otpError !== "" && <p className="error-message">{otpError}</p>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={validateOTP} color="primary" autoFocus>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </Page>
    )
}

export default LoginView
