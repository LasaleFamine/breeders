import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';
import style from './container.module.css';

interface IProps extends PropsWithChildren<{
  debug?: boolean;
  size?: 'full' | 'medium' | 'large';
  className?: string;
}> {}

export const Container = ({
  children, debug, className, size = 'full', ...attributes
}: IProps) => (
  <div
    className={clsx(style.Container, className)}
    data-size={size}
    data-debug={debug}
    {...attributes}
  >
    {children}
  </div>
);
