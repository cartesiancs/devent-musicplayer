import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import helmet from "helmet";

import clientRouter from '../../client/router.js';
import apiRouter from '../../server/api.js';



export async function init (app) {
    app.engine("hbs",
        engine({
            extname: "hbs",
            defaultLayout: false
        })
    );
    app.set('trust proxy', 1);
    app.set("view engine", "hbs");    
    app.set('views','./client/views');

    app.use('/', express.static('client/static/root'));
    app.use('/static', express.static('client/static'));
    app.use('/static/dist', express.static('dist'));
    app.use('/uploads', express.static('uploads'));

    app.disable('x-powered-by');
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(cookieParser());

    app.use(helmet.expectCt());
    app.use(helmet.frameguard());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(helmet.xssFilter());
    app.use(helmet.referrerPolicy());


    app.use('/', clientRouter);
    app.use('/api', apiRouter);

    return app;
}
