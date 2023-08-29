import React from "react";
// import { useKeycloak } from "@react-keycloak/web";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";
// import PrivateRoute from "./helpers/PrivateRoute";
import ConsultUsers from "./pages/ConsultUsers";
import Contracts from "./pages/Contracts";
import Chat from "./pages/Chat.jsx";


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
  { path: "/contratos", element: <Contracts />, isPrivate: true },
  { path: "/chat", element: <Chat />, isPrivate: true },
];

const AppRouter = () => {
    // const { initialized } = useKeycloak();

    return(
        <>
            
              <Routes>
                {routes.map(({path, element, isPrivate}) => (
                  <Route 
                    key={path} 
                    path={path} 
                    element={element}
                    // element={isPrivate ? <PrivateRoute>{element}</PrivateRoute> : element} 
                  />
                ))}
              </Routes>

        {/* {initialized && (
          )} */}
        </>
    );
}

export default AppRouter;
