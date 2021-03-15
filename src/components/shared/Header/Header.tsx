import React, { PropsWithChildren, HTMLAttributes } from 'react';
import clsx from 'clsx';
import style from './header.module.css';

interface IProps extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}

export const Header = ({ className }: IProps) => (
  <div className={clsx(style.Header, className)}>
    <h2>
      {' '}
      <span className={style.Breed}>BREED</span>
      ERS
    </h2>
    <p>Get a random image choosing between aaaaall the breeds.</p>
  </div>
);
