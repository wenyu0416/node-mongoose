const Dishes = require('./models/dishes');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('connected correctly to server')

    Dishes.create({
            name: 'wellry5',
            description: 'test for add via mongoose'
        })
        .then((dish) => {
            return Dishes.findByIdAndUpdate(dish._id, {
                    $set: { description: 'Updated test' }
                }, {
                    new: true
                })
                .exec();
        })
        .then((dish) => {
            console.log('dish ' + dish + ' updated successfully!');

            dish.comments.push({
                rating: 5,
                comment: 'I\'m getting a sinking feeling!',
                author: 'Leonardo di Carpaccio'
            });

            return dish.save();
        })
        .then(() => {
            return Dishes.find({});
        })
        .then((dishes) => {
            // console.log(dishes);
            for (var i = 0; i < dishes.length; i++) {
                console.log('dishes._doc[' + i + ']:' + JSON.stringify(dishes[i]._doc, null, 2));
                // console.log('dishes._doc[' + i + '].comment[0]:' + JSON.stringify(dishes[i]._doc.comments[0]));
            }
            return Dishes.remove({});
        }).then(() => {
            console.log('dishes removed');
            return mongoose.connection.close();
        }).catch((err) => {
            console.log(err);
        });
});