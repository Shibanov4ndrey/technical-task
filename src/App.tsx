import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ButtonContainer from './components/ButtonContainer';
import CommonWrapper from './components/CommonWrapper';
import MediaCounter from './components/MediaCounter';
import Comments from './components/Сomments';
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
    isLoad,
    isLoadComments,
    setIsLoad,
    likedComments,
    setLikedComments,
    comments,
    error,
  } = useViewController();

  const handleClick = (likedComments: IComment[]) => {
    setLikedComments(likedComments);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={style.app}/>
      <CommonWrapper>
        <MediaCounter
          likedComments={likedComments}
          comments={comments}
        />
        <Comments
          comments={comments}
          likedComments={likedComments}
          setLikedComments={handleClick}
        />
        <ButtonContainer
          error={error}
          isLoad={isLoad}
          setIsLoad={setIsLoad}
          isLoadComments={isLoadComments}
        />
      </CommonWrapper>
    </ThemeProvider>
  );
};

export default App;
