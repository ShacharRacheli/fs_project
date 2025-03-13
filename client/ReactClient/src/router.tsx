import { createBrowserRouter } from "react-router";
import AppLayout from "./components/appLayout";
import AllChallenges from "./components/challenges/allChallenges";
import ShowChallenge from "./components/challenges/showChallenge";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: 'allChallenges', element: <AllChallenges /> },
            {
                path: 'allChallenges', element: <AllChallenges />,
                children: [
                    {
                        path: ':id',
                        element:<ShowChallenge/>
                    }]
            },
        ]
    }
])

