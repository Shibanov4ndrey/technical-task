import axios from 'axios';
import { ICommentWithChildren, IPagination } from '../../types/types';

const getCommentsRequest = async (page: number): Promise<{ pagination: IPagination, data: ICommentWithChildren[] }> => {
  const { data } = await axios.get('/api/comments', { params: { page } });
  return data;
};

export default getCommentsRequest;
