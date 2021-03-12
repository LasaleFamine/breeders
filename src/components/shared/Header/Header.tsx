import React, { PropsWithChildren, HTMLAttributes } from 'react';
import clsx from 'clsx';
import style from './header.module.css';

interface IProps extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}

export const Header = ({ className }: IProps) => (
  <div className={clsx(style.Header, className)}>
    <h2>
      Choose the
      {' '}
      <span className={style.Breed}>BREED</span>
    </h2>
  </div>
);
