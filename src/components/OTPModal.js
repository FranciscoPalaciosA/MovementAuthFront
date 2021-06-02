import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Container, Grid, Link, TextField, Typography, makeStyles } from "@material-ui/core"

import OtpInput from "react-otp-input"
//https://www.npmjs.com/package/react-otp-input

import Countdown from "./Countdown"

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: "100%",
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
    },
}))

const OTPModal = props => {
    const {
        otp,
        onOTPChange = () => null,
        randomSequence,
        setRandomSequence = () => null,
        setNumAttempts = () => null,
    } = props
    const classes = useStyles()
    const navigate = useNavigate()

    const NUMBERSLETTERS = "F47F47" //Y2N
    const CHAR_TO_SHAPE = {
        F: "Circle",
        //Y: "Diamond",
        //N: "Triangle",
        //2: "S_Shape",
        4: "Infinity",
        7: "Square",
    }

    function getRandomSequence() {
        let sequence = []
        sequence.push(NUMBERSLETTERS[Math.floor(Math.random() * NUMBERSLETTERS.length)])
        sequence.push(NUMBERSLETTERS[Math.floor(Math.random() * NUMBERSLETTERS.length)])
        sequence.push(NUMBERSLETTERS[Math.floor(Math.random() * NUMBERSLETTERS.length)])
        sequence.push(NUMBERSLETTERS[Math.floor(Math.random() * NUMBERSLETTERS.length)])
        // sequence = ["F", "F", "F", "F"]
        setRandomSequence(sequence)
    }

    useEffect(() => {
        getRandomSequence()
    }, [])

    return (
        <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
            <Container maxWidth="sm" className="movements-parent-container">
                <div className="movements-container">
                    {randomSequence.map((char, index) => {
                        return (
                            <img
                                key={"char-" + char + index}
                                className="movement-img"
                                src={"/static/images/shapes/" + CHAR_TO_SHAPE[char] + ".png"}
                            />
                        )
                    })}
                </div>
                <div className="totp-input-container">
                    <OtpInput
                        className="totp-input"
                        value={otp}
                        onChange={onOTPChange}
                        numInputs={6}
                        separator={<span>-</span>}
                    />
                </div>

                <Countdown resetShapes={getRandomSequence} setNumAttempts={setNumAttempts} />
            </Container>
        </Box>
    )
}

export default OTPModal
