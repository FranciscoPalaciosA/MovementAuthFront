import React, { useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Box, Button, Container, Link, TextField, Typography, makeStyles } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Page from "src/components/Page"
import networking from "../../utils/Networking"
import "./auth.css"
var QRCode = require("qrcode.react")

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: "100%",
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
    },
}))

const RegisterView = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    const { register, handleSubmit, errors } = useForm()
    const [open, setOpen] = React.useState(false)
    const [QRString, setQRString] = useState("")

    const onSubmit = handleSubmit(data => {
        networking.post("/users/", data).then(res => {
            setQRString(res.data)
            setOpen(true)
        })
    })

    const handleClose = () => {
        setOpen(false)
        navigate("/login")
    }

    return (
        <Page className={classes.root} title="Register">
            <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
                <Container maxWidth="sm">
                    <form onSubmit={onSubmit}>
                        <Box mb={3}>
                            <Typography color="textPrimary" variant="h2">
                                Create new account
                            </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2">
                                Use your email to create new account
                            </Typography>
                        </Box>
                        <Box my={2}>
                            <TextField
                                inputRef={register({
                                    required: "Your full name is required",
                                })}
                                my={2}
                                fullWidth
                                label="Full Name"
                                name="fullName"
                                size="small"
                                type="text"
                                variant="outlined"
                            />
                            {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
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
                        <Box my={2}>
                            <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                                Sign up now
                            </Button>
                        </Box>
                        <Typography color="textSecondary" variant="body1">
                            Have an account?{" "}
                            <Link component={RouterLink} to="/login" variant="h6">
                                Sign in
                            </Link>
                        </Typography>
                    </form>
                </Container>
            </Box>
            {QRString !== "" && (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Scan this QR with your Movement Auth app"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <QRCode value={QRString} size={256}></QRCode>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Done!
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Page>
    )
}

export default RegisterView
