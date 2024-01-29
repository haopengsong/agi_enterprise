import * as React from 'react';

import { useMarkNewsAsSeen } from '../src/apps/news/news.hooks';

import { withLayout } from '~/common/layout/withLayout';
import IndexPage from 'pages';


export default function NewsPage() {
  // 'touch' the last seen news version
  // useMarkNewsAsSeen();

  return <IndexPage />;
}