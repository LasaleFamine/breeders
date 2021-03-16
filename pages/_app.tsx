import React from 'react';
import '@native-elements/core';
import '@/css/theme/light-theme.css';

import '@/css/_app.css';
import 'what-input';
import { EmptyLayout } from '@/components/layouts/EmptyLayout';

const LAYOUTS = {
  empty: EmptyLayout,
};

export function reportWebVitals(metric: any) {
  // These metrics can be sent to any analytics service
  console.log(metric);
}

const App = ({ pageProps, Component }: any) => {
  const Layout = (pageProps.layout && LAYOUTS[pageProps.layout]) || LAYOUTS.empty;
  const layoutProps = pageProps.className ? { className: pageProps.className } : {};

  return (
    <Layout {...layoutProps}>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
