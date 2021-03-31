import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
const Home = lazy(() => import("./pages/Home"));

const Routes = () => {
  return (
    <div>
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Routes;
