
let newsList = [];
let page = 1;
let moreButton = document.querySelector(".moreButton");
moreButton.addEventListener("click", () => {
    page = page + 1;
    callAPI();
});

let callAPI = async () => {
    let apiKey = 'fd0ab51d4e2b4838bf61e1a790dacdb7'
    let url = `https://newsapi.org/v2/everything?page=${page}&pageSize=20&q=vietnam&apiKey=${apiKey}`

    let data = await fetch(url);
    let result = await data.json();

    let newsList = result.articles;

    console.log("data", data);
    console.log("json", result);

    render(newsList);
}

const ArticleCount = (articles) => {
    document.getElementById("numberOfArticles").innerHTML = `${articles.length} of ${newsArticles.length}`;
}

let render = (array) => {
    let htmlForNews = array.map(item => {
        return ` 
        <div id="newsArea">
            <div id="news" style="display: flex;"> 
                <img style="width:250px;" src="${item.urlToImage}">
                <div>
                     <a href=${item.url}> ${item.title} </a>
                    <p> ${item.content} </p>
                    <div> ${item.publishedAt}</div>
                    <div> ${item.author} </div> 
                </div>
            </div>
         </div>
        `
    }).join('')
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = htmlForNews;
    document.getElementById('newsArea').appendChild(newsDiv); 
};
callAPI();


