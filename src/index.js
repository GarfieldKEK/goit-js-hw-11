import { fetchData } from './api';
import Notiflix from 'notiflix'
const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
let page = 1
const loadBtn = document.querySelector(".load")
loadBtn.style.display = 'none'
form.addEventListener('submit', handleSubmit);
async function getData(params) {
    try {
        const data = await fetchData(params);
        if (!data) {
          throw new Error('Data is undefined');
        }
    
        appendCardsToGallery(data.data.hits.map(createCard));
        if(data.data.total === 0){
            loadBtn.style.display = 'none'
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            return
           }
        if(page===1){
Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`)

        }
       
        if (data.data.totalHits<=page*40) {
            loadBtn.style.display ="none"
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
          }
          else {
            loadBtn.style.display ="block"
          }
    
      } catch (error) {
        console.error('Error:', error);
        Notiflix.Notify.failure('Failed to fetch data');
      }
    }
    
async function handleSubmit(e) {
  e.preventDefault();
  page = 1
  const searchQuery = form.elements.searchQuery.value.trim();
  
  if (!searchQuery) {
    return;
  }
  gallery.innerHTML = '';
  
  getData({searchQuery, page})

}

function appendCardsToGallery(cards) {
  gallery.append(...cards);
}

function createCard(hit) {
  const card = document.createElement('div');
  card.classList.add('photo-card');

  const img = document.createElement('img');
  img.src = hit.webformatURL;
  img.alt = hit.tags;
  img.loading = 'lazy';
  card.appendChild(img);

  const info = document.createElement('div');
  info.classList.add('info');
  card.appendChild(info);

  const likes = document.createElement('p');
  likes.classList.add('info-item');
  likes.innerHTML = `<b>Likes:</b> ${hit.likes}`;
  info.appendChild(likes);

  const views = document.createElement('p');
  views.classList.add('info-item');
  views.innerHTML = `<b>Views:</b> ${hit.views}`;
  info.appendChild(views);

  const comments = document.createElement('p');
  comments.classList.add('info-item');
  comments.innerHTML = `<b>Comments:</b> ${hit.comments}`;
  info.appendChild(comments);

  const downloads = document.createElement('p');
  downloads.classList.add('info-item');
  downloads.innerHTML = `<b>Downloads:</b> ${hit.downloads}`;
  info.appendChild(downloads);

  return card;
}
loadBtn.addEventListener("click", ()=>{
    page +=1
    const searchQuery = form.elements.searchQuery.value.trim();
    getData({searchQuery, page})
    
})