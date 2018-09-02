const User = require('../models/user');
const Car  = require('../models/car');


module.exports = {
  index : async (req, res, next)=>{
    const users = await User.find({});
    res.status(200).json(users);
  },

  newUser : async (req, res, next) => {
    const newUser = new User(req.body)
    const user = await newUser.save();
    res.status(201).json(user)
  },

  getUser : async (req, res, next) => {
    const { userId } = req.value.params;
    console.log(userId)
    const user = await User.findById(userId);
    res.status(200).json(user);
  },
  // Patch
  replaceUser : async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    const result = await User.findByIdAndUpdate(userId, newUser)
    res.status(200).json(result);
    
  },
  // Update/ Put
  updateUser : async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    const result = await User.findByIdAndUpdate(userId, newUser)
    res.status(200).json({success : true});
  },

  getUserCars : async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('cars');
    res.status(200).json(user.cars);
  },

  newUserCars : async (req, res, next ) => {
    const { userId } = req.params
    // create new car
    const newCar = new Car(req.body)
    // get user
    const user = await User.findById(userId)
    // assign a user as a car seller
    newCar.seller = user;
    // save the car
    await newCar.save()
    // add to car to the user's selling array 'cars'
    user.cars.push(newCar)
    // user save
    await user.save();
    res.status(201).json(newCar);
  },

  about : (req, res)=>{
    res.status(200).send(' ini page about')
  } 
}