import axios from 'axios';
import { IAuthor } from '../../types/types';

async function getAuthorsRequest(): Promise<IAuthor[]>  {
  const { data } = await axios.get('/api/authors');
  return data;
}

export default getAuthorsRequest;
