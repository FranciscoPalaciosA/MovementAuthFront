import React from "react"
// Modules
import "src/mixins/chartjs"
import theme from "src/theme"

// Components
import MainComponent from "./MainComponent"

// Views
// Context providers / Utils
import { AuthProvider } from "./contexts/Auth"
// Hooks
// Material-UI *
import { ThemeProvider } from "@material-ui/core"

// Styles
import "react-toastify/dist/ReactToastify.min.css"
import "react-perfect-scrollbar/dist/css/styles.css"

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <MainComponent />
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
