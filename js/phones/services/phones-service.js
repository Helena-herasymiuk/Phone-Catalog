import utils from "../../utils.js";

const API_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

let phonesFromServer; 

const PhonesService = {
  getAll({query = '', order = ''} = {}) {

    return fetch(API_URL + '/phones.json')
      .then((response) => response.json())
      .then((phones) => {
        phonesFromServer = phones;
      })
      .then(() => {
        const firltredPhones = phonesFromServer.filter((phone) => {
          return phone.name.toLowerCase().includes(query.toLowerCase());
        })
        const sortedPhones = firltredPhones; 

        if(order === 'name') {
          utils.sortFromName(sortedPhones);
        } else {
          utils.sortFromAge(sortedPhones);
        }
        
        return sortedPhones;
      })

    },
  getById(id) {
    return window.fetch(API_URL + '/phones/' + id + '.json')
      .then((response) => response.json());
  },
};
export default PhonesService;