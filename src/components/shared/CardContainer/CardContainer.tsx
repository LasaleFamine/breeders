import React, { useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import style from './card-container.module.css';

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
}: IProps) => {
  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ENTER' && onClick) {
      event.preventDefault();
      onClick();
    }
  }, [onClick]);

  return (
    <div
      {...other}
      tabIndex={0}
      role="button"
      data-pointer={Boolean(onClick)}
      onClick={onClick}
      className={clsx(style.CardContainer, className)}
      onKeyDown={onKeyDown}
    >
      {backgroundImage ? (
        <Image
          layout="fill"
          objectFit="cover"
          quality={100}
          src={backgroundImage}
        />
      ) : null}
      {children}
    </div>
  );
};
