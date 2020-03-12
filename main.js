
let newsList = [];
let page = 1;
let apiKey = 'fd0ab51d4e2b4838bf61e1a790dacdb7'
let moreButton = document.querySelector(".moreButton");

let shouldReplaceAllArticles = true;

moreButton.addEventListener("click", () => {
    shouldReplaceAllArticles = false;
    page = page + 1;
    callAPI();
});



let callAPI = async () => {
    if (page > 4) {
        return;
    }

    let url = `https://newsapi.org/v2/everything?page=${page}&pageSize=20&q=vietnam&apiKey=${apiKey}`

    let data = await fetch(url);
    let result = await data.json();

    let newsList = result.articles;

    console.log("data", data);
    console.log("json", result);

    render(newsList);
}

let searchBySource = () => {
    let sourceNames = newsList.map((item) => item.source.name)
    console.log("source", source);
    let sourceObJect = sourceNames.reduce((total, name) => {
        if (name in total) {
            total[name]++
        } else {
            total[name] = 1
        }
        return total;
    }, {})

    let sourceArray = Object.keys(sourceObject);

    let htmlForSource = sourceArray.map((item) => `<input onchange='sourceClicked(${item}') type="checkbox" id="${item}"/> ${item} (${sourceObject[item]})`)
    document.getElementById('sourceArea').innerHTML = htmlForSource;

}

let sourceClicked = index => {
    if (document.getElementById(index).checked == true) {
        let filteredNews = newsList.filter(item => item.source.name === index);
        render(filteredNews);
    } else {
        render(newsList);
    }
};

let searchByCategory = async () => {
    shouldReplaceAllArticles = true;
    let category = document.getElementById("category").value;
    let url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
    let data = await fetch(url);
    let result = await data.json();

    newsList = result.articles;
    render(newsList);
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
    if(shouldReplaceAllArticles === true){
        document.getElementById('newsArea').innerHTML=htmlForNews; 
    }else {
        const newsDiv = document.createElement("div");
        newsDiv.innerHTML = htmlForNews;
        document.getElementById('newsArea').appendChild(newsDiv); 
    }
    
};
callAPI();


