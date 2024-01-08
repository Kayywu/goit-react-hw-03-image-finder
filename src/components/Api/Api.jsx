import axios from 'axios';

const fetchImages = async (query, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=31998203-230b8715d00921ede83d56272&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};

export default Api;