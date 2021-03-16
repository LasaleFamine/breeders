import React, {
  Fragment, Suspense, useCallback, useEffect, useState,
} from 'react';
import Link from 'next/link';
import { Meta } from '@/components/shared/Meta';
import { Header } from '@/components/shared/Header';
import { MappedBreed, useBreeds } from 'src/services/api/useBreeds';
import { CardContainer } from '@/components/shared/CardContainer';
import style from '@/css/pages/index.module.css';
import { useDebounce } from 'src/core/helpers/useDebounce';
import Skeleton from 'react-loading-skeleton';

const isServer = typeof window === 'undefined';

const List = () => {
  const { data } = useBreeds();
  const [filteredList, setFilteredList] = useState<MappedBreed[]>([]);
  const [search, setSearch] = useState<string>();

  const debouncedSearchTerm = useDebounce(search, 500);

  const onChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  }, []);

  useEffect(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm === '') {
      setFilteredList(data?.list ?? []);
      return;
    }

    setFilteredList(
      data?.list.filter(item => item.name.includes(debouncedSearchTerm)) ?? [],
    );
  }, [debouncedSearchTerm, data?.list]);

  return (
    <Fragment>
      <div className={style.Actions}>
        <input placeholder="Search" type="text" onChange={onChangeSearch} />
      </div>
      <div className={style.ListContainer} data-count={filteredList.length}>
        {filteredList.map(item => (
          <Link href={`/${item.tag}`}>
            <a href={`/${item.tag}`}>
              <CardContainer key={item.previewUrl} backgroundImage={item.previewUrl}>
                <div className={style.ListItem}>
                  <h6 className={style.ListItemTitle}>
                    {item.name}
                  </h6>
                </div>
              </CardContainer>
            </a>
          </Link>
        ))}
      </div>
    </Fragment>
  );
};

const Home = () => (
  <Fragment>
    <Meta title="Some awesome title" />
    <Header />
    {!isServer && (
      <Suspense fallback={(
        <div>
          <div className={style.Actions}>
            <Skeleton height={40} width="100%" />
          </div>
          <div className={style.ListContainer}>
            <Skeleton height={250} width="100%" />
            <Skeleton height={250} width="100%" />
            <Skeleton height={250} width="100%" />
            <Skeleton height={250} width="100%" />
            <Skeleton height={250} width="100%" />
            <Skeleton height={250} width="100%" />
            <Skeleton height={250} width="100%" />
            <Skeleton height={250} width="100%" />
          </div>
        </div>
      )}
      >
        <List />
      </Suspense>
    )}
  </Fragment>
);

export default Home;
