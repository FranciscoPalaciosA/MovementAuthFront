import React, { useContext } from "react"
// Modules
import "src/mixins/chartjs"
import routes from "src/routes"
import { useRoutes } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

// Components
import GlobalStyles from "src/components/GlobalStyles"

// Views
// Context providers / Utils
import { AuthContext } from "./contexts/Auth"
// Hooks
// Material-UI *

// Styles
import "react-toastify/dist/ReactToastify.min.css"
import "react-perfect-scrollbar/dist/css/styles.css"

const MainComponent = () => {
    const { isLoggedIn } = useContext(AuthContext)
    const routing = useRoutes(routes(isLoggedIn))

    return (
        <>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
            <GlobalStyles />
            {routing}
        </>
    )
}

export default MainComponent
