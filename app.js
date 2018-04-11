const apiKey = '65640cb9a1bd4c99b6be20f0bef32503';
const newsArticles = document.querySelector('.vikta_dump')
const sourceSelector = document.querySelector('#sources');
const defaultSource = 'techcrunch'


//check for service worker
 if ('serviceWorker' in navigator) {
        window.addEventListener('load', () =>
            navigator.serviceWorker.register('sw.js')
                .then(registration => console.log('Service Worker registered'))
                .catch(err => 'SW registration failed'));
    } 




window.addEventListener("load", async function(){
    updateNews();

    await updateNewsSources();

    sourceSelector.value = defaultSource;
    //listen to the select for changes
    sourceSelector.addEventListener('change', function(e){
        updateNews(e.target.value);
    });

})



async function updateNewsSources() {
    const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
    const json = await response.json();
    sourceSelector.innerHTML =
        json.sources
            .map(source => `<option value="${source.id}">${source.name}</option>`)
            .join('\n');
}


async function updateNews(source = defaultSource) {
    newsArticles.innerHTML = '';
    const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
    const json = await response.json();
    newsArticles.innerHTML =
        json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
    <div class="article col-md-12">
    <div class="col-md-6">
      <a href=" target="_blank" ${article.url}">
        <h2>${article.title}</h2></a>
         <p>${article.description}</p>
        <p style="padding-bottom:4em;"> <a style="color:blue" target="_blank" href="${article.url}">Read More</a></li></p>
        </div>

        <div class="col-md-6">
        <img class="img-responsive img-thumbnail controlimage" src="${article.urlToImage}" alt="${article.title}">
      </div>
      <div class="clearfix"></div>
    </div>
  `;
}