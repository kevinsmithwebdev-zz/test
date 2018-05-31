"use strict";
const API_URL = "http://localhost:3000/api";
const $dataArea = document.getElementById('data-area');
let dataStore = {
    users: {},
    posts: {}
};
const renderPost = (post) => {
    console.log('rp', post);
    return `<div class="data-line">` +
        `<span class="post-title">${post.title}</span>` +
        `<span class="post-userid">${post.userId}</span>` +
        `<span class="post-body">${post.body}</span>` +
        `</div>`;
};
function showData(type, page) {
    console.log('showdata', type, dataStore[type]);
    // console.log('data line', renderPost(dataStore[type]))
    $dataArea.innerHTML = renderPost(dataStore[type]);
}
function getData(type) {
    fetch(API_URL + '/' + type)
        .then(function (response) {
        return response.json();
    })
        .then(function (json) {
        dataStore[type] = json.data;
        console.log(json);
        showData(type, 1);
    });
}
//# sourceMappingURL=main.js.map