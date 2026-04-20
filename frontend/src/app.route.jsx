import {createBrowserRouter} from 'react-router';

import Procted from './features/auth/components/proctected';
import Home from './features/interview/pages/Home';
import ResultPage from './features/interview/pages/ResultPage';
import Dashboard from './features/interview/pages/dashboard';
import Auth from './features/auth/pages/Auth';
import TechnicalQuestion from './features/interview/components/technicalQuestion';
import BehavioralQuestions from './features/interview/components/behaviouralQuestion';
import PreparationPlan from './features/interview/components/preprationPlan';
import ReportsLibrary from './features/interview/pages/reportLibrary';
import ResultPageSkeleton from './features/interview/components/skeletons/resultPage';
import DashboardSkeleton from './features/interview/components/skeletons/dashboard';
import ReportsLibrarySkeleton from './features/interview/components/skeletons/reportLibrary';


export const Router = createBrowserRouter(
    [
        {
            path:"/auth",
            element:<Auth/>
        },
        {
            path:'/',
            element:<Home/>
        },
        {
        path: "/report/:interviewId",
        element: <Procted Skeleton={<ResultPageSkeleton/>} ><ResultPage /></Procted>,
        children: [
            {
            path: "/report/:interviewId",
            element: <Procted ><TechnicalQuestion /></Procted>
            },
            {
            path: "technical",
            element: <Procted><TechnicalQuestion /></Procted>
            },
            {
            path: "behavioral",
            element: <Procted><BehavioralQuestions /></Procted>
            },
            {
            path: "preparation",
            element: <Procted><PreparationPlan /></Procted>
            }
        ]
        },
        {
            path:'/dashboard',
            element:<Procted Skeleton={<DashboardSkeleton/> } ><Dashboard/></Procted>
        },
        {
            path:'/allReports',
            element:<Procted Skeleton={<ReportsLibrarySkeleton/> } ><ReportsLibrary/></Procted>
        },
    ]
);
