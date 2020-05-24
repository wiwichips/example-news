
// load the enviroment variables from the .env file
require('dotenv').config();

// require the google news api
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY); // api key fom .env

function containsCovid(article) {
  return true;
}

async function getCovidFreeHeadlines(language, country) {
  // get the headlines
  const articles = (await newsapi.v2.topHeadlines({ language, country })).articles;

  // reduce to a set of articles to a subset without covid
  const covidFree = articles.reduce((safe, article) => {
    // if the article is covid free, add it to the 'safe' arary
    if (containsCovid(article)) {
      safe.push(article);
    }
    return safe;
  }, []);

  // return covidFree articles
  return covidFree;
}

// get the articls and print them
getHeadlines('en', 'us')
  .then((articles) => console.log(articles))
  .catch((rej) => console.log(rej));
