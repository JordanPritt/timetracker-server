import userRoutes from './UserRoutes';
import express from 'express';

export default (router: express.Router) => {
    userRoutes(router);
    return router;
};