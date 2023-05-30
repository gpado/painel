import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";
import PrivateRoute from "./helpers/PrivateRoute";

const TestePage = () => (
    <div>
      <h1>Teste Page</h1>
      <p>Well, this route works...</p>
    </div>
  );

const AppRouter = () => {
    const { initialized } = useKeycloak();

    return(
        <>
        {initialized && (
            <BrowserRouter>
              <Routes>
                <Route exact path="/teste" element={<TestePage />} />
                <Route exact path="/" element={<WelcomePage />} />
                <Route
                  path="/secured"
                  element={
                    <PrivateRoute>
                      <SecuredPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          )}
        </>
    );
}

export default AppRouter;
