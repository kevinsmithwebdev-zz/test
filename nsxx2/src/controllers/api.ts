// "use strict";
import fetch from 'node-fetch';
import async from "async";
import { Response, Request, NextFunction } from "express";

const API_URL: string = 'https://jsonplaceholder.typicode.com/'

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


export let getUsers = (req: Request, res: Response) => {
  fetch(API_URL + 'users/1')
  .then(data => data.json())
  .then(users => {
    res.json({ data: users });
  });
};

export let getPosts = (req: Request, res: Response) => {
  fetch(API_URL + 'posts/1')
  .then(data => data.json())
  .then(users => {
    res.json({ data: users });
  });
};
