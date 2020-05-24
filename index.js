
// load the enviroment variables from the .env file
require('dotenv').config();

// require the google news api
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY); // api key fom .env
