import React, { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Container } from '@/components/shared/Container/Container';
import style from './empty-layout.module.css';

interface IProps extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}

export const EmptyLayout = ({
  className,
  children,
  ...attributes
}: IProps) => (
  <main className={clsx(style.EmptyLayout, className)} {...attributes}>
    <Container size="medium">
      {children}
    </Container>
  </main>
);
