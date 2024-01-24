import { Router } from 'react-router-dom';
import { persistor, store } from "./redux/store";
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { createBrowserHistory } from "history";
import { renderRoutes } from 'react-router-config';
import routes from "./routes";

const history = createBrowserHistory();

function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            {renderRoutes(routes)}
          </Router>
        </PersistGate>
      </ReduxProvider>
    </>
  );
}

export default App;
