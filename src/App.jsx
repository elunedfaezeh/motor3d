import React from 'react';
import { Helmet } from 'react-helmet';
import Scene3d from './Scene3d';
import Layout from './layout/Layout';

function App() {
  return (
    <Layout>
      <Helmet>
        {/* اندروید */}
        <meta name="theme-color" content="#000000" />
        {/* آیفون */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Helmet>

      <Scene3d />
    </Layout>
  );
}

export default App;
