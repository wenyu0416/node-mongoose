const Dishes = require('./models/dishes');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('connected correctly to server')

    Dishes.remove({})
        .then(() => {
            console.log('dishes removed');
            return mongoose.connection.close();
        }).catch((err) => {
            console.log(err);
        });
});