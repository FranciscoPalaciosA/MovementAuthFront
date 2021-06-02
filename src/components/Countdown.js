import React, { Component } from "react"

export default class Countdown extends Component {
    constructor(props) {
        super(props)

        this.state = {
            minutes: 0,
            seconds: 0,
        }
    }

    componentDidMount() {
        let TIME_INTERVAL = 120

        let time = Math.round(Date.now() / 1000)
        let remainingTime = TIME_INTERVAL - Math.floor(time % TIME_INTERVAL)

        this.setState(() => ({
            minutes: Math.floor(remainingTime / 60),
        }))

        this.setState(() => ({
            seconds: remainingTime % 60,
        }))

        this.myInterval = setInterval(() => {
            let { minutes, seconds } = this.state
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1,
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    this.props.resetShapes()
                    this.props.setNumAttempts(0)
                    this.setState(() => ({
                        minutes: 2,
                    }))
                    this.setState(() => ({
                        seconds: 0,
                    }))
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59,
                    }))
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div className="totp-instructions">
                Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
        )
    }
}
