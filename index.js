const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    const myRecipe = {
      title: 'Toast Hawaii', 
      level: 'UltraPro Chef', 
      ingredients: ['Toast', 'Pineapple', 'Whaddevayagot'], 
      cuisine: 'transcending cultures', 
      dishType: 'snack', 
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.familienkost.de%2Frezept_toast_hawai.html&psig=AOvVaw2g6BsX2RAHp-6DoebbHbcd&ust=1671201446348000&source=images&cd=vfe&ved=0CBEQjhxqFwoTCPj4ntbs-_sCFQAAAAAdAAAAABAE', 
      duration: 3, 
      creator: 'Hans Karl Adam'
    }

  return Recipe.create(myRecipe) 
  })
  .then (newRecipe => console.log('Recipe successfully created', newRecipe.title))

.then (() => {
  return Recipe.insertMany(data)
})
.then(newRecipes => console.log('Many Recipes successfully created', newRecipes[0].title))
  
.then(() => Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true}))

.then(updatedRecipe => console.log('updated recipe', updatedRecipe.duration))

.then(() => Recipe.deleteOne({title: 'Carrot Cake'}))

.then(deletedRecipe => console.log('deleted recipe', deletedRecipe))

.then(() => {
  mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // title: 'Toast Hawaii', level: 'UltraPro Chef', ingredients: ['Toast', 'Pineapple', 'Whaddevayagot'], cuisine: 'transcending cultures', dishType: 'snack', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.familienkost.de%2Frezept_toast_hawai.html&psig=AOvVaw2g6BsX2RAHp-6DoebbHbcd&ust=1671201446348000&source=images&cd=vfe&ved=0CBEQjhxqFwoTCPj4ntbs-_sCFQAAAAAdAAAAABAE', duration: 3, creator: 'Hans Karl Adam'