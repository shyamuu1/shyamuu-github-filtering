
import React from 'react';
import SearchPage from "./containers/Search Container/SearchPage";
import Layout from './components/Layout/Layout';



const App:React.FC = () => {
  
  


  return (
    <div className="App">
      <Layout >
      <SearchPage />
      </Layout>
    </div>
  );
}

export default App;
