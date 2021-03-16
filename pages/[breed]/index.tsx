import React, { Fragment, Suspense } from 'react';
import { useRouter } from 'next/router';
import { useRandomImage } from 'src/services/api/useRandomImage';
import { isServer } from '@/core/helpers/is-server';
import style from '@/css/pages/breed/breed.module.css';
import Link from 'next/link';
import { CustomImage } from '@/components/shared/CustomImage';

const BreedDetail = () => {
  const router = useRouter();
  const { data } = useRandomImage(router.query.breed as string);

  return (
    <Fragment>
      <header className={style.Header}>
        <Link href="/">
          <a href="/" ne-button="true" data-kind="round-small">
            <img width="30" height="30" src="/svg/left-arrow.svg" alt="" />
          </a>
        </Link>
        <h1>{data?.name}</h1>
      </header>
      <article>
        <div className={style.ImageContainer}>
          {data?.image && <CustomImage width="300px" height="300px" objectFit="cover" layout="responsive" src={data.image} />}
        </div>
      </article>
    </Fragment>
  );
};

const Breed = () => (
  <div>
    {!isServer ? (
      <Suspense fallback="Loading">
        <BreedDetail />
      </Suspense>
    ) : null}
  </div>
);

export default Breed;
