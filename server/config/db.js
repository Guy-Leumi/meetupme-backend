import moongose from 'mongoose';
import  env from '../environment/environment';



const mongoUri =`mongodb://${env.username}:${env.password}@${env.username}.documents.azure.com:${env.port}/${env.dbname}?ssl=true&replicaSet=globaldb`;

//const mongoUri =`mongodb://localhost/meetupME`;

export default () => {
    moongose.Promise = global.Promise;
    moongose.connect(mongoUri);
    moongose.connection
    .once('open', () => console.log('Mongodb running'))
    .on('error', err => console.error(err))
};