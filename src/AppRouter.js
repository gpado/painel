import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";
import PrivateRoute from "./helpers/PrivateRoute";
import ConsultUsers from "./pages/ConsultUsers";

const TestePage = () => (
    <div>
      <h1>Teste Page</h1>
      <p>Well, this route works...</p>
    </div>
);

const routes = [
  { path: "/teste", element: <TestePage />, isPrivate: false },
  { path: "/", element: <WelcomePage />, isPrivate: false },
  { path: "/secured", element: <SecuredPage />, isPrivate: true },
  { path: "/usuarios", element: <ConsultUsers />, isPrivate: true },
];

const AppRouter = () => {
    const { initialized } = useKeycloak();

    return(
        <>
        {initialized && (
            <BrowserRouter>
              <Routes>
                {routes.map(({path, element, isPrivate}) => (
                  <Route 
                    key={path} 
                    path={path} 
                    element={isPrivate ? <PrivateRoute>{element}</PrivateRoute> : element} 
                  />
                ))}
              </Routes>
            </BrowserRouter>
          )}
        </>
    );
}

export default AppRouter;
