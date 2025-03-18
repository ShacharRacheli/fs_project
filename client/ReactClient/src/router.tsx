import { createBrowserRouter } from "react-router";
import AppLayout from "./components/appLayout";
import AllChallenges from "./components/challenges/allChallenges";
import ShowChallenge from "./components/challenges/showChallenge";
import HomePage from "./components/homePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            // { path: '/', element: <HomePage /> },
            { path: 'allChallenges', element: <AllChallenges /> },
            { path: 'winners', element: <Winners/> },
            { path: 'allChallenges/:id', element: <ShowChallenge /> },
        ]
    }
])

