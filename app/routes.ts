import {
    type RouteConfig,
    index,
    route,
    layout,
    prefix,
} from '@react-router/dev/routes'

export default [
    layout('routes/layout/Layout.tsx', [
        index('routes/Home.tsx'),
        route('*', 'routes/NotFound.tsx'),
    ]),
] satisfies RouteConfig
