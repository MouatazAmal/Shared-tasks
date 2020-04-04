export interface TodosList {
  id?: string;
  name: string;
  description: string;
  owner: string;
  allowedToRead: string[];
  allowedToWrite: string[];
}
