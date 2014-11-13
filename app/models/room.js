var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoomSchema = new Schema({
  name: String,
  price : Number,
  customId: Number
});

var room = mongoose.model('Room', RoomSchema);

room.formage = {
    label: 'Chambres',
    singular: 'Chambre',
    list: ['name', 'price']
};

seedRooms();

function seedRooms() {
    room.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            room.create({ name: 'La chambre verte', price: 75 });
            room.create({ name: 'La maison de chasse', price: 135 });
        }
    });
}

exports.module = room;