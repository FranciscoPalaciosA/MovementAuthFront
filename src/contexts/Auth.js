import React, { useState } from "react"

export const AuthContext = React.createContext(null)

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedUID, setLoggedUID] = useState("650a4df7-c55d-482b-9e91-0901a8fc6280")

    function setLoggedIn() {
        setIsLoggedIn(true)
    }

    return (
        <AuthContext.Provider
            value={{
                setLoggedIn,
                isLoggedIn,
                setLoggedUID,
                loggedUID,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
