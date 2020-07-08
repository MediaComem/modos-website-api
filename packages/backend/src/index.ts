import { App } from './config/app';
import { createConnection } from "typeorm";
import "reflect-metadata";
import * as config from './config/config';
import * as connectionOptions from '../ormconfig';


// Open a connection pool for the database.
createConnection(connectionOptions).then(async connection => {

    if (config.env === 'development') {
        // Start with a clean database
        const dropBeforeSync = true;
        connection.synchronize(dropBeforeSync);
    }

    // Basic server setup.
    const server = new App(config);

    // Start the server.
    server.start();

}).catch(error => console.log(error));