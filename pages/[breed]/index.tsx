import React, {
  Fragment,
  Suspense,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { RandomPhoto, useRandomImage } from 'src/services/api/useRandomImage';
import { isServer } from '@/core/helpers/is-server';
import style from '@/css/pages/breed/breed.module.css';
import Link from 'next/link';
import { CustomImage } from '@/components/shared/CustomImage';
import { Meta } from '@/components/shared/Meta';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary/ErrorBoundary';

const BreedDetail = () => {
  const router = useRouter();
  const {
    data,
    revalidate,
    isValidating,
  } = useRandomImage(router.query.breed as string);
  const [selectedPhoto, setSelectedPhoto] = useState<RandomPhoto | undefined>(data);
  const [latestPhotos, setLatestPhotos] = useState<RandomPhoto[]>([]);

  const currentPhoto = useMemo(() => selectedPhoto ?? data, [selectedPhoto, data]);

  const fetchNewImge = async () => {
    const currentImage = { ...data };

    await revalidate();

    if (currentImage?.image && !latestPhotos.find(photo => photo.image === currentImage.image)) {
      // Maintain the latest 4 objects so we can select the image
      setLatestPhotos(oldPhotos => [{
        name: currentImage.name ?? '',
        image: currentImage.image ?? '',
      }, ...oldPhotos].slice(0, 4));
    }
    // Restore selection so that the new photo can be shown
    setSelectedPhoto(undefined);
  };

  return (
    <Fragment>
      <Meta title={data?.name?.toUpperCase() ?? 'Loading...'} />
      <header className={style.Header}>
        <div className={style.Back}>
          <Link href="/">
            <a data-cy="BackButton" href="/" ne-button="true" data-kind="round-small">
              <img width="30" height="30" src="/svg/left-arrow.svg" alt="" />
            </a>
          </Link>
        </div>
        <h1>{data?.name}</h1>
      </header>
      <article className={style.MainContainer}>
        <div className={style.ImageContainer}>
          {currentPhoto && (
          <CustomImage
            data-cy="CurrentImage"
            objectFit="cover"
            layout="fill"
            data-full-url={currentPhoto.image}
            src={currentPhoto.image}
            alt={currentPhoto.name}
          />
          )}
        </div>
        <div className={style.Actions}>
          <button data-cy="FetchNewButton" disabled={isValidating} className={style.Item} type="button" onClick={fetchNewImge}>
            Fetch new
            <img width="20" height="20" src="/svg/refresh.svg" alt="" />
          </button>
          <button data-cy="CopyButton" className={style.Item} type="button" onClick={async () => navigator.clipboard.writeText(currentPhoto?.image ?? '')}>Copy URL</button>
          <a data-cy="OpenNewTabButton" className={style.Item} href={currentPhoto?.image} target="_blank" rel="noreferrer noopener" ne-button="true">Open in new tab</a>
          {latestPhotos.length > 0 && (
            <div className={style.Latest}>
              <h6>Photo history</h6>
              <div className={style.LatestPhotos}>
                {latestPhotos.map(photo => (
                  <div key={photo.image}>
                    <CustomImage
                      data-cy="HistoryImage"
                      alt={photo.name}
                      onClick={() => setSelectedPhoto(photo)}
                      width={100}
                      height={100}
                      src={photo.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </Fragment>
  );
};

const Breed = () => (
  <div>
    {!isServer ? (
      <Suspense fallback="Loading">
        <ErrorBoundary fallback={(
          <Fragment>
            <h2>Could not fetch this breedz.</h2>
            <Link href="/"><a href="/">Go back.</a></Link>
          </Fragment>
        )}
        >
          <BreedDetail />
        </ErrorBoundary>
      </Suspense>
    ) : null}
  </div>
);

export default Breed;
