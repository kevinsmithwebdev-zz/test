"use strict";

const API_URL: string = "http://localhost:3000/api"

interface Address {
  city: string;
  geo: {
    lat: number,
    lng: number
  };
  street: string;
  suite: string;
  zipcode: string;
}

interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}

//*************

interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

interface User {
  address: Address;
  company: Company;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

interface DataStore {
  users: User;
  posts: Post;
}

const $dataArea: HTMLElement = document.getElementById('data-area');


let dataStore: DataStore = {
  users: {},
  posts: {}
};

const renderPost = (post: Post):string => {
  console.log('rp', post)
  return  `<div class="data-line">` +
            `<span class="post-title">${post.title}</span>` +
            `<span class="post-userid">${post.userId}</span>` +
            `<span class="post-body">${post.body}</span>` +
          `</div>`
}

function showData(type: string, page: number) {
  console.log('showdata', type, dataStore[type])
  // console.log('data line', renderPost(dataStore[type]))
  $dataArea.innerHTML = renderPost(dataStore[type])
}


function getData(type: string): void {
  fetch(API_URL + '/' + type)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    dataStore[type] = json.data
    console.log(json);
    showData(type, 1)
  });
}
