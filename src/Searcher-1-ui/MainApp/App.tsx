import { BrowserRouter, Route } from "react-router-dom";
import { Redirect, withRouter } from 'react-router';
import { Provider } from "react-redux"
import AuthCallback from './AuthCallback';
import SearchPage from './../SearchPage/SearchPage';
import store from "../../Searcher-2-bll/ReduxToolkit/redux";


const App: React.FC = () => {
  return (
    <div>
      <Route exact path='/' render={() => <Redirect to={"/sercher"} />} />
      <Route path='/sercher' render={() => <SearchPage />} />
      <Route path='/authcallback' render={() => <AuthCallback />} />
    </div>
  );
}


let AppC = withRouter(App)

const AppContainer = () => {
  return (
    <AppC />
  )
}

let MainApp: React.FC = () => {
  return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp
