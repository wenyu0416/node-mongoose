const Dishes = require('./models/dishes');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('connected correctly to server')

    var newDish = Dishes({
        name: 'wellry3',
        description: 'test for add via mongoose'
    })

    newDish.save().then((dish) => {
        console.log('dish ' + dish + ' saved successfully!');

        return Dishes.find({}).exec();
    }).then((dishes) => {
        console.log(dishes);
        return Dishes.remove({});
    }).then(() => {
        console.log('dishes removed');
        return mongoose.connections.close();
    }).catch((err) => {
        console.log(err);
    });
});