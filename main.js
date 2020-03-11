
let newsList = [];
let callAPI = async () => {
    let apiKey = 'fd0ab51d4e2b4838bf61e1a790dacdb7'
    let url = `http://newsapi.org/v2/everything?q=vietnam&apiKey=${apiKey}`

    let data = await fetch(url);
    let result = await data.json();

    let newsList = result.articles;

    console.log("data", data);
    console.log("json", result);

    render(newsList);
}
let render = (array) => {
    let htmlForNews = array.map(item => {
        return ` 
        <div id="news" style="display: flex; border: 1px solid grey;"> 
        <img style="width:200px; border: 2px solid black;"    
        src="${item.urlToImage}"> 
        <div>
        <h2> ${item.title} </h2>
        <p> ${item.content} </p>
        <div> ${item.publishedAt}</div>
        <div> ${item.author} </div> 
        </div>
        </div>
        `
    }).join('')
    document.getElementById('newsArea').innerHTML = htmlForNews;

};
callAPI();