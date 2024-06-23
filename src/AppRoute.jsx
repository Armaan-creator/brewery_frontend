import React from 'react';
import { createBrowserRouter, Navigate, useOutletContext } from 'react-router-dom';
import CardForm from './components/CardForm';
import BreweryDetails from './components/BreweryDetails';
import Login from './components/Login';
import Signup from './SignUP'; // Corrected import name
import App from './App';
import Protected from './Protected';



const AppRoute = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/home',
    element: (
      <Protected Component={CardForm} />
    ),
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/brewery/:id',
    element: (
      <Protected Component={BreweryDetails} />
    ),
  },
]);

export default AppRoute;
