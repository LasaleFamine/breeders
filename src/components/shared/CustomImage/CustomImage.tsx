import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import style from './custom-image.module.css';

export const CustomImage: typeof Image = ({
  src,
  onLoad,
  ...rest
}) => {
  const [onLoadCount, setOnloadCount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (onLoadCount > 1) {
      setImageLoaded(true);
    }
  }, [onLoadCount]);

  return (
    <Fragment>
      {!imageLoaded && (
        <div className={style.Placeholder}>
          <Skeleton className={style.Skeleton} height="100%" width="100%" />
        </div>
      )}
      <Image
        onLoad={(e) => {
          setOnloadCount(prev => prev + 1);
          if (onLoad) { onLoad(e); }
        }}
        src={src}
        objectFit="cover"
        quality={100}
        {...rest}
      />
    </Fragment>
  );
};
