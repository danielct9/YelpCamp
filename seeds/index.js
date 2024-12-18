const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// array[Math.floor(Math.random() * array.length)]

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new Campground({
            author: '6750935b1f380549332fd0d2',
            location: `${cities[random1000].city} - ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, voluptatum corporis! Officia laboriosam saepe nostrum vel pariatur nisi rerum eius porro. Labore excepturi facere porro rem animi fugit asperiores sapiente?',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dzszqcvcv/image/upload/v1734107644/YelpCamp/ktkkali3ewo2joymy89j.jpg',
                  filename: 'YelpCamp/ktkkali3ewo2joymy89j',
                },
                {
                  url: 'https://res.cloudinary.com/dzszqcvcv/image/upload/v1734107642/YelpCamp/gk42joalgbdmtgkalded.jpg',
                  filename: 'YelpCamp/gk42joalgbdmtgkalded',
                },
                {
                  url: 'https://res.cloudinary.com/dzszqcvcv/image/upload/v1734107643/YelpCamp/mqsmww8fqr52xhmqa0gk.jpg',
                  filename: 'YelpCamp/mqsmww8fqr52xhmqa0gk',
                },
                {
                  url: 'https://res.cloudinary.com/dzszqcvcv/image/upload/v1734107643/YelpCamp/g5mnti24nd7yzrbjppen.jpg',
                  filename: 'YelpCamp/g5mnti24nd7yzrbjppen',
                }
              ],
            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    db.close()
})