import { Alert } from '@mui/material';
import React from 'react';
import Loader from '../Loader';
import style from './ButtonContainer.module.scss';

export interface IProps {
  error: string;
  isLoadComments: boolean;
  isLoad: boolean;
  setIsLoad: (isLoad: boolean) => void;
}

const ButtonContainer = ({ error, isLoadComments, isLoad, setIsLoad, }: IProps) => <div
  className={style.buttonContainer}>
  {error && <Alert severity='error'>{error}</Alert>}

  {isLoadComments && !isLoad && <button
    className={style.button}
    onClick={() => setIsLoad(true)}
  >Загрузить еще
  </button>}

  {isLoad && <Loader/>}
</div>;

export default ButtonContainer;
