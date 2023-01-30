import express from 'express'
import home from "./api/home.route";

const routes = express.Router();

routes.use('/home', home);

export default routes