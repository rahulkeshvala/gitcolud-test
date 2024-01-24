import { Box, LinearProgress, styled } from '@mui/material';
import React, { Fragment, Suspense } from 'react'
import { renderRoutes } from 'react-router-config';
import { TopBar } from './components';

const MainContainer = styled(Box)({
  "& .topbar-container": {
    position: 'absolute',
    width: '100%'
  }
});

const Dashboard = (props) => {
  const { route } = props;
  return (
    <Fragment>
      <MainContainer>
        <Box className="topbar-container">
          <TopBar />
        </Box>
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(route.routes)}
        </Suspense>
      </MainContainer>
    </Fragment>
  )
}

export default Dashboard
