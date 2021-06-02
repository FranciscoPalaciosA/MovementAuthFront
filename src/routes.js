import React from "react"
import { Navigate } from "react-router-dom"
import DashboardLayout from "src/layouts/DashboardLayout"
import MainLayout from "src/layouts/MainLayout"
import LoginView from "src/views/auth/LoginView"
import NotFoundView from "src/views/errors/NotFoundView"
import RegisterView from "src/views/auth/RegisterView"

import SurveyView from "src/views/SurveyView"

const routes = isLoggedIn => [
    {
        path: "app",
        element: isLoggedIn ? <SurveyView /> : <Navigate to="/login" />,
        children: [
            { path: "survey", element: <SurveyView /> },
            { path: "*", element: <Navigate to="/404" /> },
        ],
    },
    {
        path: "/",
        element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/survey" />,
        children: [
            { path: "login", element: <LoginView /> },
            { path: "register", element: <RegisterView /> },
            { path: "404", element: <NotFoundView /> },
            { path: "/", element: <Navigate to="/login" /> },
            { path: "*", element: <Navigate to="/404" /> },
        ],
    },
]

export default routes
