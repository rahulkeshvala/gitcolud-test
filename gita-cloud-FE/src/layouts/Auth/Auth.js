import React, { Fragment, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { LinearProgress } from '@mui/material';

const Auth = props => {
  const { route } = props;

  return (
    <Fragment>
      <Suspense fallback={<LinearProgress />}>
        {renderRoutes(route.routes)}
      </Suspense>
    </Fragment>
  );
};


export default Auth;
