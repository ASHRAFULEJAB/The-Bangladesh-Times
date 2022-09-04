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
        
    const url =`https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url);
    const data = await res.json();
    newsData=data.data
    
    newsLoading (newsData);
    return (newsData);
    
}

const newsLoading = (news)=>{
    
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
      
     if(newNewsCount > 0){

          newsCount.value= newNewsCount + 'News Found'
     }
     else if(newNewsCount <=0){
         newsCount.value = 'No News Found'
     }
    
    categoryNews.textContent='';
    
    news.forEach(newsInfo =>{
     
               
        
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
                   onclick="displayNewsModal('${title}','${image_url}')"> Show Details</button>
        
                  </div>
                           
                `;
                categoryNews.appendChild(newsSection,newsCount);
                
            })
            toggleSpinner(false);


}



 const displayNewsModal = (title,image_url,details,total_view)=>{
    
    const modalTitle = document.getElementById('newsDetailsModalLabel');
    modalTitle.innerText=title;
    const newsModalDetails = document.getElementById('news-modal-details');
    
   newsModalDetails.innerHTML = `
   
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


 
