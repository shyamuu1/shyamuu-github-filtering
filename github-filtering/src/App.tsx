
import React, {Suspense} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import Layout from './components/Layout/Layout';
import Loader from "./UI/Spinner/Loader";
import OwnerContextProvider from "./context/owner-context";

const SearchPage = React.lazy(() => {
  return import("./containers/Search Container/SearchPage");
});

const SearchDetailPage = React.lazy(() => {
  return import("./containers/Search Detail/SearchDeatailPage");
})

const App:React.FC = () => {
  
  const routes = 
  <Switch>
    <Route path="/" exact component={SearchPage} />
    <Route path="/detail" component={SearchDetailPage} />
    <Redirect to="/" />
  </Switch>
  


  return (
    <div className="App">
      <Layout >
      <OwnerContextProvider>
      <Suspense fallback={<Loader />}>{routes}</Suspense>
      </OwnerContextProvider>
      </Layout>
    </div>
  );
}

export default App;
