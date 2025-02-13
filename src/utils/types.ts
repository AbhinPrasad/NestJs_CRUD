export interface ResponseJson {
  success: boolean;
  message: string;
  data: any;
}

export interface User {
  id: number;
  name: string;
  age: number;
  job: string;
}

/*
? A DTO(Data Transfer Object) is an object that specifies how data should be sent over the network.
? We could define the DTO schema using TypeScript interfaces or simple classes. 
? However, we recommend using classes here. Why? Classes are part of the JavaScript ES6 standard, 
? so they remain intact as real entities in the compiled JavaScript. 
? In contrast, TypeScript interfaces are removed during transpilation, meaning Nest can't 
? reference them at runtime. This is important because features like Pipes rely on having 
? access to the metatype of variables at runtime, which is only possible with classes.
*/
export class AddUserDto {
  name: string;
  age: number;
  job: string;
}
