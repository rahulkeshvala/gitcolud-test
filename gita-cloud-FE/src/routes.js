import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './layouts/Auth';
import RequireAuthAdmin from './RequireAuthAdmin';
import DashboardLayout from './layouts/Dashboard';


const routes = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/login" />
    },
    {
        path: '/login',
        component: AuthLayout,
        routes: [
            {
                path: '/login',
                exact: true,
                component: lazy(() => import('./views/LoginForm'))
            },
            {
                component: () => <Redirect to="/errors/error-404" />
            }
        ]
    },
    {
        path: '/register',
        component: AuthLayout,
        routes: [
            {
                path: '/register',
                exact: true,
                component: lazy(() => import('./views/RegistrationForm'))
            },
            {
                component: () => <Redirect to="/errors/error-404" />
            }
        ]
    },
    {
        route: '*',
        component: DashboardLayout,
        routes: [
            {
                path: '/product/list',
                exact: true,
                component: RequireAuthAdmin(lazy(() => import('./views/ProductList')))
            },
            {
                path: '/product/add-product',
                exact: true,
                component: RequireAuthAdmin(lazy(() => import('./views/AddProduct')))
            },
            {
                path: '/product/edit-product/:id',
                exact: true,
                component: RequireAuthAdmin(lazy(() => import('./views/AddProduct')))
            },
        ]
    }
]

export default routes;