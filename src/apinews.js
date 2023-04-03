const NewsAPI = require("newsapi");

const newsapi = new NewsAPI("9f133693e41344ef9ea4b3e2eed4df22");

let data;
var d = new Date();
datetoday = d.toISOString().split("T")[0];
d.setDate(d.getDate() - 1);
dateytsday = d.toISOString().split("T")[0];

newsapi.v2
  .everything({
    q: "technology",
    from: dateytsday,
    to: datetoday,
    language: "en",
    page: 2,
  })
  .then((response) => {
    data = response.articles;
  })
  .catch((e) => {
    data = e;
  });

module.exports = data;
