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
            <a onclick="getNewsDetails('${news.category_id}')" class="nav-link active" aria-current="page ">${news.category_name}</a>
            `;
            category.appendChild(li);
        }
        
        
}

const getNewsDetails=async(category_id)=>{
    const url =`https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url);
    const data = await res.json();
    newsData=data.data
    console.log(newsData);
    newsLoading (newsData);
}

const newsLoading = (news)=>{
    const categoryNews = document.getElementById('new-details'); 
    categoryNews.textContent='';
    news.forEach(newsInfo =>{

        const newsSection = document.createElement('div');
                newsSection.classList.add('col');
                const {thumbnail_url,title,details,author,total_view}=newsInfo;
                newsSection.innerHTML = `
                           
                <div class="card">
                <img src="${thumbnail_url}" class="card-img-fluid" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${title ? title : 'No Name Found'  }</h5>
                  <p class="card-text">${details.slice(0,100)}...</p>
                  <div class="d-flex p-2">
                  <p class="me-5"> ${author.name ?author.name : 'No Data Found' }</p>
                  <img  width="40" height="40"class="rounded-circle me-5"  src="${author.img}"/>
                  <p> ${total_view ?total_view : 'No Data Found'}</p>
                  </div>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal"> Show Details</button>
        
                  </div>
                           
                           
                `;
                categoryNews.appendChild(newsSection);

    })
}











// const setAllNews= async()=>{

//     const newsData =await getNewsDetails();
//     console.log(newsData)
//     // const categoryNews = document.getElementById('new-details');        
//     for( const newNews of newsData){
//         // console.log(newNews);
//         const newsSection = document.createElement('div');
//         newsSection.classList.add('col')
//         newsSection.innerHTML = `
                   
//         <div class="card">
//         <img src="${newNews.thumbnail_url}" class="card-img-fluid" alt="...">
//         <div class="card-body">
//           <h5 class="card-title">${newNews.title ? newNews.title : 'No Name Found'  }</h5>
//           <p class="card-text">${newNews.details.slice(0,100)}...</p>
//           <div class="d-flex p-2">
//           <p class="me-5"> ${newNews.author.name ?newNews.author.name : 'No Data Found' }</p>
//           <img  width="40" height="40"class="rounded-circle me-5"  src="${newNews.author.img}"/>
//           <p> ${newNews.total_view ?newNews.total_view : 'No Data Found'}</p>
//           </div>
//           <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal"> Show Details</button>

//           </div>
                   
                   
//         `;
//         categoryNews.appendChild(newsSection);
//     }
    
    
// }
getNewsDetails()
// document.getElementById('all-categories').addEventListener('click', async function(category_id){
//     const abd=categoryDetails(category_id)
//     console.log(abd)
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
//     console.log(allNewsSearch)
//     // for(const news of allNewsSearch)
//     // console.log(news.category_id)
// })


// const loadNews = async(category_id)=>{
//     const url =`https://openapi.programming-hero.com/api/news/category/${category_id}`
//     const res = await fetch(url);
//     const data = await res.json();
//     newsData=data.data
//     return(newsData);
// }

// setAllNews()

setAllCategoriesName()


