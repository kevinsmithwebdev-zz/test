"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// "use strict";
const node_fetch_1 = __importDefault(require("node-fetch"));
const API_URL = 'https://jsonplaceholder.typicode.com/';
// interface Post {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }
//
// interface User {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//
//   phone: string;
//   website: string;
//
// }
// function api<T>(url: string): Promise<T> {
//   return fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json<T>();
//     })
// }
exports.getUsers = (req, res) => {
    node_fetch_1.default(API_URL + 'users/1')
        .then(data => data.json())
        .then(users => {
        res.json({ data: users });
    });
};
exports.getPosts = (req, res) => {
    node_fetch_1.default(API_URL + 'posts/1')
        .then(data => data.json())
        .then(users => {
        res.json({ data: users });
    });
};
//# sourceMappingURL=api.js.map