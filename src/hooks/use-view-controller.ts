import { useEffect, useState } from 'react';
import getAuthorsRequest from '../api/authors/getAuthorsRequest';
import getCommentsRequest from '../api/comments/getCommentsRequest';
import { getCommentsData, getAmount, recursionMap } from '../helpers/helpers';
import { IAuthor, ICommentWithChildren } from '../types/types';

const useViewController = () => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [comments, setComments] = useState<ICommentWithChildren[]>([]);
  const [commentsData, setCommentsData] = useState<ICommentWithChildren[]>([]);
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
    if (authors.length && comments.length) {
      setCommentsData(getCommentsData( comments, authors));
    }
  }, [authors]);

  useEffect(() => {
    if (isLoading && (page <= totalPage || !totalPage)) {
      getCommentsRequest(page)
        .then(data => {
          setCommentsData(commentsData.concat(getCommentsData(data.data, authors)));
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

  const handleClickLike = (comment: ICommentWithChildren) => {
    setCommentsData((prev) => [...recursionMap(prev, comment)]);
  };

  const isFetching = page <= totalPage || !totalPage;

  const likesCount = getAmount(commentsData);
  const commentsCounter = comments.length;

  return {
    isFetching,
    isLoading,
    error,
    commentsData,
    commentsCounter,
    likesCount,
    setIsLoading,
    setCommentsData,
    handleClickLike,
  };
};

export default useViewController;
