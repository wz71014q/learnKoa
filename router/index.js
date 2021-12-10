const Router = require('koa-router');
import getPreference from '../controller';

const preferenceRouter = new Router();

preferenceRouter.get('/', getPreference);

module.exports = preferenceRouter;
