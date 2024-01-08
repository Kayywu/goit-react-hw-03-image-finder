
const Api = {
  async fetchImages(query, page) {
    const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=38858109-c828e4419821e6c1b097414a2&image_type=photo&orientation=horizontal&per_page=12`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.hits;
    } catch (error) {
      console.error('Error', error);
      throw new Error('Error');
    }
  },
};

export default Api; 


/* https://pixabay.com/api/?q=${query}&page=${page}&key=38858109-c828e4419821e6c1b097414a2&image_type=photo&orientation=horizontal&per_page=12 */