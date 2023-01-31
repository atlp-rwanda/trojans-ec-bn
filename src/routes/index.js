import express, { Router } from 'express'
import home from "./api/home.route";
import user from "./api/user.route";

const routes = express.Router();



routes.use('/home', home);
routes.use('/', user)
export default routes