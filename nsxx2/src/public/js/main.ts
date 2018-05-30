const API_URL: string = "http://localhost:3000/api"

interface: 
let usersData: any
let postsData: any

function showData(type: string, page: number) {
  console.log('showdata', type, page)
}


function getData(type: string): void {
  console.log('get' + type)
  fetch(API_URL + '/' + type)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    usersData = data
    console.log(data);
    showData('users', 1)
  });
}
