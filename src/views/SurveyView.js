import React, { useState, useContext } from "react"
import * as Survey from "survey-react"
import "survey-react/survey.css"

import { Box, Container, Typography, makeStyles } from "@material-ui/core"
import Page from "src/components/Page"
import networking from "../utils/Networking"
import { AuthContext } from "../contexts/Auth"

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: "100%",
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
    },
}))

// Strongly agree", Agree", Neutral", Disagree", Strongly Disagree

const SurveyView = () => {
    const classes = useStyles()
    const { loggedUID } = useContext(AuthContext)

    let choices = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    let CHOICES_TO_NUM = {
        "Strongly Disagree": 1,
        Disagree: 2,
        Neutral: 3,
        Agree: 4,
        "Strongly Agree": 5,
    }
    let json = {
        elements: [
            {
                type: "radiogroup",
                name: "question1",
                title: "I think that I would like to use this system frequently.",
                isRequired: true,
                choices: choices,
            },
            {
                type: "radiogroup",
                name: "question2",
                title: "I found the system unnecessarily complex.",
                isRequired: true,
                choices: choices,
            },
            {
                type: "radiogroup",
                name: "question3",
                title: "I thought the system was easy to use.",
                isRequired: true,
                choices: choices,
            },
            {
                type: "radiogroup",
                name: "question4",
                title: "I think that I would need the support of a technical person to be able to use this system.",
                isRequired: true,
                choices: choices,
            },
            {
                type: "radiogroup",
                name: "question5",
                title: "I found the various functions in this system were well integrated.",
                isRequired: true,
                choices: choices,
            },
            {
                type: "radiogroup",
                name: "question6",
                title: "I thought there was too much inconsistency in this system.",
                isRequired: true,
                choices: choices,
            },
            {
                type: "radiogroup",
                name: "question7",
                title: "I would imagine that most people would learn to use this system very quickly.",
                isRequired: true,
                choices: choices,
            },
            {
                type: "radiogroup",
                name: "question8",
                title: "I found the system very cumbersome to use.",
                isRequired: true,
                choices: choices,
            },
            {
                type: "radiogroup",
                name: "question9",
                title: "I felt very confident using the system.",
                isRequired: true,
                choices: choices,
            },
            {
                type: "radiogroup",
                name: "question10",
                title: "I needed to learn a lot of things before I could get going with this system.",
                isRequired: true,
                choices: choices,
            },
        ],
    }

    const [model, setModel] = useState(new Survey.Model(json))

    function saveResults(results) {
        results["userId"] = loggedUID
        console.log("Results = ", results)
        networking.post("/users/survey", results).then(res => {
            if (res.data) {
                console.log("res = ", res.data)
            } else {
            }
        })
    }

    function onComplete(survey, options) {
        //Write survey results into database
        console.log("Survey results: " + JSON.stringify(survey.data))
        let counter = 1
        let sum = 0
        let results = {}
        Object.entries(survey.data).forEach(function(response) {
            let value = CHOICES_TO_NUM[response[1]]
            if (counter % 2 === 0) {
                console.log("Even - ", value)
                sum += 5 - value
            } else {
                console.log("Odd - ", value)
                sum += value - 1
            }
            results[response[0]] = value
            counter++
        })
        results.sum = sum
        results.total = sum * 2.5
        saveResults(results)
    }

    return (
        <Page className={classes.root} title="Login">
            <Box display="flex" flexDirection="column" height="100%">
                <Container maxWidth="md">
                    <Typography color="textPrimary" variant="h2">
                        Please answer this short survey
                    </Typography>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                        If you have answerd it before, answering again will overwrite your answers.
                    </Typography>
                    <Survey.Survey model={model} onComplete={onComplete} />
                </Container>
            </Box>
        </Page>
    )
}

export default SurveyView
