const loadAllCategories = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    const data1 =data.data.news_category;
    return( data1)
}

const setAllCategoriesName= async()=>{
      
    try {
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
        
    } catch (error) {
        console.log(error)
        
    }    
   
}

const getNewsDetails=async(category_id)=>{
    toggleSpinner(true)
        // console.log(toggleSpinner)
    const url =`https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url);
    const data = await res.json();
    newsData=data.data
    // console.log(newsData);
    newsLoading (newsData);
    return (newsData);
    
}

const newsLoading = (news)=>{
    // console.log(news)
    // return {_id}=news;
    let sortView =function(a,b){
        if(a.total_view > b.total_view){
            return -1;
        }
        else if(a.total_view < b.total_view){
            return 1;
        }
     }
     
    news.sort(sortView);

    const categoryNews = document.getElementById('new-details'); 

    const newsCount = document.getElementById('news-count');
   
     const newNewsCount = news.length;
     newsCount.value = newNewsCount
    //  newsCount.innerHTML = `
    //      <p> ${newsCount.value > 0 ? ${newsCount.value},${news.category_name} : ' No News Found'}</p>
    //  `
     if(newNewsCount > 0){

          newsCount.value= newNewsCount + 'News Found'
     }
     else if(newNewsCount <=0){
         newsCount.value = 'No News Found'
     }
    
    categoryNews.textContent='';
    // const newsDetailsModal = document.getElementById('newsDetailsModalLabel');
    news.forEach(newsInfo =>{
     
               
        // console.log(newsInfo)
        const newsSection = document.createElement('div');
                newsSection.classList.add('col');
                const {thumbnail_url,title,details,author,total_view,image_url}=newsInfo;
                newsSection.innerHTML = `
                           
                <div class="card">
                <img src="${thumbnail_url}" class="card-img-fluid" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${title.length >15 ? title.slice(0,15)+ '...' : 'No Name Found'  }</h5>
                  <p class="card-text">${details.length>100 ?details.slice(0,100)+'...': details}</p>
                  <div class="d-flex p-2">
                  <p class="me-5"> ${author.name ?author.name : 'No Data Found' }</p>
                  <img  width="40" height="40"class="rounded-circle me-5"  src="${author.img}"/>
                  <p><span class="text-dark fw-bold">Views</span>: ${total_view ? total_view + 'K': 'No Data Found'}</p>
                  </div>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal"
                   onclick="displayNewsModal('${title}','${image_url}','${total_view}')"> Show Details</button>
        
                  </div>
                           
                `;
                categoryNews.appendChild(newsSection,newsCount);
                
            })
            toggleSpinner(false);

            // const {id}=news;
            // console.log(id)

}

// const newsLoadModal = async ()=>{
//     const newsData =  await getNewsDetails();
//     console.log(newsData)
    // const url = `https://openapi.programming-hero.com/api/news/${id}`;
    // console.log(newsData)
//     const res = await fetch(url);
//     const data = res.json();
//     const dataNews = data._id;
//     displayNewsModal (dataNews)
// }

 const displayNewsModal = (title,image_url,details,total_view)=>{
    // console.log(details,total_view)
    const modalTitle = document.getElementById('newsDetailsModalLabel');
    modalTitle.innerText=title;
    const newsModalDetails = document.getElementById('news-modal-details');
   newsModalDetails.innerHTML = `
   <p> <span class="text-dark fw-bold">Views:</span>${details}</p>
   
   <img class="img-fluid" src="${image_url}"/>
   `;
   
 }
 

// spinner

const toggleSpinner = isLoading =>{
    const loadingSpinner = document.getElementById('spinner');
    if(isLoading){
        loadingSpinner.classList.remove('d-none');
    }
    else{
        loadingSpinner.classList.add('d-none');
    }
}


getNewsDetails()


setAllCategoriesName()


 
