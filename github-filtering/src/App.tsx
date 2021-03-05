
import React, {Suspense} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import Layout from './components/Layout/Layout';

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
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
}

export default App;
