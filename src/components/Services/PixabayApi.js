//особистий ключ при реєстрації
const pixabayKey = '29338502-d9e7525ed9dc6a9ae74eb85c1';

export  const  fetchImagesViaQuery = (searchQuery, page=1) => {

    return fetch(`https://pixabay.com/api/?q=${searchQuery}&key=${pixabayKey}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response =>  response.json())
            .then(data => data.hits);

}

//export default fetchImagesViaQuery