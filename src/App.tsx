import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from './components/Button';
import CommonWrapper from './components/CommonWrapper';
import MediaCounter from './components/MediaCounter';
import Comments from './components/Сomments';
import useViewController from './hooks/use-view-controller';
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
    error,
    commentsData,
    setIsLoading,
    handleClickLike,
    commentsCount,
    likesCount,
    isLoadingCount,
  } = useViewController();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={style.app}/>
      <CommonWrapper>
        <MediaCounter
          commentsCount={commentsCount}
          likesCount={likesCount}
          isLoadingCount={isLoadingCount}
        />
        <Comments
          handleClickLike={handleClickLike}
          comments={commentsData}
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
