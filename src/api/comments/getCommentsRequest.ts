import axios from 'axios';
import { IComment, IPagination } from '../../types/types';

const getCommentsRequest = async (page: number): Promise<{ pagination: IPagination, data: IComment[] }> => {
  const { data } = await axios.get('/api/comments', { params: { page } });
  return data;
};

export default getCommentsRequest;
