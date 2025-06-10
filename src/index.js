import { initMongoDbConnection } from './db/initMongoDbConnection.js';
import { startServer } from './server.js';

await initMongoDbConnection();
startServer();
