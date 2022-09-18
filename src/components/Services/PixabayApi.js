import axios from 'axios';

//особистий ключ при реєстрації
const options = {
    params: {
        key: '29338502-d9e7525ed9dc6a9ae74eb85c1',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
    }
};

 export const fetchImagesViaQuery = async (query, page) => {
    const response = await axios.get('https://pixabay.com/api/', {
    params: { ...options.params, query, page },
  });
  return response;

}

// export const api = {
//   fetchImagesViaQuery,
// };

//export default fetchImagesViaQuery