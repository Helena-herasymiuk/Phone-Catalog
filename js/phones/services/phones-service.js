const API_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const PhonesService = {
  async getAll({ query = '', order = '' } = {}) {
    let result;
    try {
      const response = await window.fetch(API_URL + '/phones.json');
      result = await response.json();
    } catch (error) {
      result = [];
    }
    return result;
  },
  getById(id) {
    return window.fetch(API_URL + '/phones/' + id + '.json')
      .then((response) => response.json());
  },
};
export default PhonesService;