import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';

import * as indexRouter from './routes/index'
import * as usersRouter from './routes/users'

class App {

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public app: express.Application;

  private config(): void {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'pug');
  }

  private routes(): void {

    this.app.use('/', indexRouter);
    this.app.use('/users', usersRouter);
    // this.app.use(function(req, res, next) {
    //   next(createError(404));
    // });



  }

}

export default new App().app;
