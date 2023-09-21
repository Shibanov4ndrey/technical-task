import { Alert } from '@mui/material';
import React from 'react';
import Loader from '../Loader';
import style from './Button.module.scss';

export interface IProps {
  error: string;
  isFetching: boolean;
  isLoading: boolean;
  setIsLoading: (isLoad: boolean) => void;
}

const Button = ({ error, isFetching, isLoading, setIsLoading, }: IProps) => <div
  className={style.buttonContainer}>
  {error && <Alert severity='error'>{error}</Alert>}

  {isFetching && !isLoading && <button
    className={style.button}
    onClick={() => setIsLoading(true)}
  >Загрузить еще
  </button>}

  {isLoading && <Loader/>}
</div>;

export default Button;
