import React from 'react';
import clsx from 'clsx';
import style from './card-container.module.css';
import { CustomImage } from '../CustomImage';

interface IProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  backgroundImage?: string;
}

export const CardContainer = ({
  children,
  onClick,
  className,
  backgroundImage,
  ...other
}: IProps) => (
  <div
    {...other}
    className={clsx(style.CardContainer, className)}
  >
    {backgroundImage ? (
      <CustomImage
        layout="fill"
        src={backgroundImage}
      />
    ) : null}
    {children}
  </div>
);
