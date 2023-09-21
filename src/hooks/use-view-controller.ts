import { useEffect, useState } from 'react';
import getAuthorsRequest from '../api/authors/getAuthorsRequest';
import getCommentsRequest from '../api/comments/getCommentsRequest';
import { IAuthor, IComment } from '../types/types';

const useViewController = () => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [comments, setComments] = useState<IComment[]>([]);
  const [likedComments, setLikedComments] = useState<IComment[]>([]);
  const [error, setError] = useState<string>('');
  const [authors, setAuthors] = useState<IAuthor[]>([]);

  useEffect(() => {
    getAuthorsRequest()
      .then(data => {
        setAuthors(data);
        setError('');
      })
      .catch(() => {
      setError('Упс, что-то пошло не так, попробуйте позже');
    })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (isLoading && (page <= totalPage || !totalPage)) {
      getCommentsRequest(page)
        .then(data => {
          setComments(comments.concat(data.data));
          setPage(page + 1);
          setTotalPage(data.pagination.total_pages);
          setError('');
        })
        .catch(() => {
          setError('Упс, что-то пошло не так, попробуйте позже');
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoading]);

  const isFetching = page <= totalPage || !totalPage;

  return {
    isFetching,
    isLoading,
    comments,
    authors,
    likedComments,
    error,
    setIsLoading,
    setLikedComments,
  };
};

export default useViewController;
