const loadAllCategories = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    const data1 =data.data.news_category;
    return( data1)
}

const setAllCategoriesName= async()=>{

        const data1 =await loadAllCategories();
        const category = document.getElementById('all-categories');        
        for( const news of data1){
            // console.log(news.category_name);
            const li = document.createElement('li');
            li.innerHTML = `
            <a  class="nav-link active" aria-current="page ">${news.category_name}</a>
            `;
            category.appendChild(li);
        }
        
        
}
// document.getElementById('all-categories').addEventListener('click',function(category_id){
//     console.log(category_id)
// })

// const categoryDetails=async(category_id) =>{
//     const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
//     console.log(url)
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data)
// }

// const newsSearch = document.getElementById('all-categories');

// newsSearch.addEventListener('click',async(event)=>{
//     const allNewsSearch = await loadAllCategories()
//     // console.log(allNewsSearch.category_id)
//     // for(const news of allNewsSearch)
//     // console.log(news.category_id)
// })


const loadNews = async()=>{
    const url ='https://openapi.programming-hero.com/api/news/category/02'
    const res = await fetch(url);
    const data = await res.json();
    newsData=data.data
    return(newsData);
}

const setAllNews= async()=>{

    const newsData =await loadNews();
    console.log(newsData)
    const categoryNews = document.getElementById('new-details');        
    for( const newNews of newsData){
        console.log(newNews);
        const newsSection = document.createElement('div');
        newsSection.classList.add('col')
        newsSection.innerHTML = `
                   
        <div class="card">
        <img src="${newNews.thumbnail_url}" class="card-img-fluid" alt="...">
        <div class="card-body">
          <h5 class="card-title">${newNews.title ? newNews.title : 'No Name Found'  }</h5>
          <p class="card-text">${newNews.details.slice(0,100)}...</p>
          <div class="d-flex p-2">
          <p class="me-5"> ${newNews.author.name ?newNews.author.name : 'No Data Found' }</p>
          <img  width="40" height="40"class="rounded-circle me-5"  src="${newNews.author.img}"/>
          <p> ${newNews.total_view ?newNews.total_view : 'No Data Found'}</p>
          </div>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal"> Show Details</button>

          </div>
                   
                   
        `;
        categoryNews.appendChild(newsSection);
    }
    
    
}
setAllNews()

setAllCategoriesName()


