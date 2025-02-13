// cuz of export {}, you need to declare global
declare global {
  namespace Express {
    interface User {
      id: number;
      name: string;
      password?: string;
      email?: string;
      admin: boolean;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    messages: string;
  }
}

//This default is global

// declare namespace Express {
//   interface User {
//     id: number;
//     name: string;
//     password: string;
//     email: string;
//   }
// }

export {};
