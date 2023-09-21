import React, { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from './components/Button';
import CommonWrapper from './components/CommonWrapper';
import MediaCounter from './components/MediaCounter';
import Comments from './components/Сomments';
import { getCommentsWithChildren } from './helpers/helpers';
import useViewController from './hooks/use-view-controller';
import { IComment } from './types/types';
import style from './App.module.scss';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const {
    isLoading,
    isFetching,
    likedComments,
    comments,
    error,
    authors,
    setIsLoading,
    setLikedComments,
  } = useViewController();

  const handleClick = (likedComments: IComment[]) => {
    setLikedComments(likedComments);
  };

  console.log(1)
  const commentsWithChildren = useMemo(() => getCommentsWithChildren(comments), [comments]);
  const commentsCounter = comments.length;

  const likesCount = () => comments
    .filter((comment) => comment.id !== likedComments.find((likedComment) => likedComment.id === comment.id)?.id)
    .reduce((sum, elem) => sum + elem.likes, 0) + likedComments
    .reduce((sum, elem) => sum + elem.likes, 0);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={style.app}/>
      <CommonWrapper>
        <MediaCounter
          likesCount={likesCount()}
          commentsCounter={commentsCounter}
        />
        <Comments
          authors={authors}
          commentsWithChildren={commentsWithChildren}
          likedComments={likedComments}
          setLikedComments={handleClick}
        />
        <Button
          error={error}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isFetching={isFetching}
        />
      </CommonWrapper>
    </ThemeProvider>
  );
};

export default App;
