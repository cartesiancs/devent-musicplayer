import express from 'express';
import * as loaderExpress from './server/loaders/express.js';


async function startExpressServer() {
    const app = express();
  
    await loaderExpress.init(app);
  
    return app.listen(9012, err => {
        console.log(`[ + ] The server is running. `, '9012');
    });
}
  
let server = await startExpressServer();
export { server }