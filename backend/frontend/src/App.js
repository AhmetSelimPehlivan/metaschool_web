
import { BrowserRouter, Route, Switch
} from "react-router-dom";
import React, { Suspense } from 'react';
import AdminLayout from "layouts/Admin/Admin.js";
import UserLogin from "./views/UserLogin";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const isAuth = React.useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" render={(props) => (
          isAuth.isAuthenticated ? <AdminLayout /> : <UserLogin {...props} />
        )} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
