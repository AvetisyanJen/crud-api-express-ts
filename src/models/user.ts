export interface User {
    id: number | string; 
    name: string;
    email: string;
    password: string;
    createdAt: Date; 
    updatedAt?: Date; 
  }
  