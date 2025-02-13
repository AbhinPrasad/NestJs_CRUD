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
