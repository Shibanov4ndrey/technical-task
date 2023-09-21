import { useEffect, useState } from 'react';

import getCommentsRequest from '../api/comments/getCommentsRequest';
import { IComment } from '../types/types';


const useViewController = () => {
  const [page, setPage] = useState<number>(1);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [comments, setComments] = useState<IComment[]>([]);
  const [likedComments, setLikedComments] = useState<IComment[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let count = 0;
    if (isLoad && (page <= totalPage || !totalPage)) {
      getCommentsRequest(page)
        .then(data => {
          setComments(comments.concat(data.data));
          setPage(page + 1);
          setTotalPage(data.pagination.total_pages);
          setError('');
        })
        .catch(error => {
          ++count;
          setError('Упс, что-то пошло не так, попробуйте позже');
          console.error(error);
        })
        .finally(() => setIsLoad(false));
    }

    // const request = () => {
    //   getCommentsRequest(page).then(data => {
    //     setComments(comments.concat(data.data));
    //     setPage(page + 1);
    //     setTotalPage(data.pagination.total_pages);
    //     count = 0;
    //   }).catch(error => {
    //     ++count;
    //     if (count < 5) request();
    //     console.error(error);
    //   });};
    // if (!totalPage || page <= totalPage) {
    //   request();
    // }
  }, [isLoad]);
  const isLoadComments = page <= totalPage || !totalPage;

  return {
    isLoadComments,
    isLoad,
    comments,
    likedComments,
    error,
    setIsLoad,
    setLikedComments,
  };
};

export default useViewController;
