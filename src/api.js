import axios from "axios";
const KEY_PIXABAY = "36289056-d3890f079fda9298d504367c5"
// const url = `https://pixabay.com/api/?key=${KEY_PIXABAY}&image_type=photo&orientation=horizontal&safesearch=true&q=${searchQuery}&page=1&per_page=40`
export async function fetchData ({searchQuery, page}){

// return fetch(`https://pixabay.com/api/?key=36289056-d3890f079fda9298d504367c5&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`)
// .then(response => {


//   return response.json();
// })
const data = await axios.get(`https://pixabay.com/api/?key=${KEY_PIXABAY}&image_type=photo&orientation=horizontal&safesearch=true&q=${searchQuery}&page=${page}&per_page=40`)
// const data = await axios.get(`https://pixabay.com/api/?key=36289056-d3890f079fda9298d504367c5&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
console.log(data);
return data
};
