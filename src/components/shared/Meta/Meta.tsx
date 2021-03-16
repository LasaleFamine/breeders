import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface IProps {
  description?: string;
  title?: string;
  children?: any;
}

export const Meta = ({
  description = 'Select a random image from your favourite breed and share with your friends!',
  title,
  children,
}: IProps) => {
  const router = useRouter();

  return (
    <Head>
      <title>
        {title ?? 'Home'}
        {' '}
        | BREEDERS
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={`${title ?? 'Home'} | BREEDERS`} />
      <meta name="og:description" property="og:description" content={description} />
      <meta property="og:site_name" content="BREEDERS" />
      <meta property="og:url" content={`https://breed-dashboard.vercel.app${router.asPath}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${title ?? 'Home'} | BREEDERS`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="BREEDERS" />
      <meta name="twitter:creator" content="@lasalefamine" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      <meta property="og:image" content="" />
      <meta name="twitter:image" content="" />
      <link rel="canonical" href={`https://breed-dashboard.vercel.app${router.asPath}`} />
      {children}
    </Head>
  );
};
