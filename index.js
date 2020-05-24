
// load the enviroment variables from the .env file
require('dotenv').config();

// require the google news api
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY); // api key fom .env

// stringContainsCovid - returns a boolean indicating whether a string contains covid
function stringContainsCovid(string) {
  // example coronavirus terms
  const covidTerms = ['covid', 'coronavirus', 'covid-19', 'wuhan', 'pandemic', 'virus'];
  let containsCovid = false;

  // iterate through the list of terms to determine if the string contains covid
  covidTerms.forEach((term) => {
    if (string.toLowerCase().includes(term)) {
      containsCovid =  true;
    }
  });

  return containsCovid;
}

// articleContainsCovid - returns a boolean indicating whether the article contains covid
function articleContainsCovid(article) {
  Object.keys(article).forEach(propKey => {
    if (stringContainsCovid(article[propKey] + '')) {
      return true;
    }
  });
  return false;
}

// getCovidFreeHeadlines - returns an array of covid free headlines
async function getCovidFreeHeadlines(language, country) {
  // get the headlines
  const articles = (await newsapi.v2.topHeadlines({ language, country })).articles;

  // reduce to a set of articles to a subset without covid
  const covidFree = articles.reduce((safe, article) => {
    // if the article is covid free, add it to the 'safe' arary
    if (!articleContainsCovid(article)) {
      safe.push(article);
    }
    return safe;
  }, []);

  // return covidFree articles
  return covidFree;
}

// get the articls and print them
getCovidFreeHeadlines('en', 'us')
  .then((articles) => console.log(articles))
  .catch((rej) => console.log(rej));