// Imports
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./firebase";

// Components
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { ReactRadioHover } from "./components/react.radio";

// Pages
import { Home } from "./pages/home";
// Account
import { AccountIndex } from "./pages/account";
import { AccountLogin } from "./pages/account/login";
import { AccountForgot } from "./pages/account/forgot";

// Dashboard
import { DashboardIndex } from "./pages/dashboard";

// css
import "./style/defaults/variables.css"
import "./style/defaults/page-setup.css"
import "./style/defaults/transitions.css"
import "./style/components/toast.css"

function App() {
  const currentUser = useAuth(null);

  return <>
    <BrowserRouter>

      <ScrollToTop />
      <Toaster
        containerClassName="toast-container"
      />

      <Header />

      {currentUser && <>
        <ReactRadioHover />
      </>}

      <main>
        <Routes>
          <>
            <Route path="/" element={<Home />} />

            <Route path="account">
              <Route index element={<AccountIndex />} />
              <Route path="login" element={<AccountLogin />} />
              <Route path="forgot" element={<AccountForgot />} />
            </Route>
          </>

          {currentUser && <>
            <Route path="dashboard">
              <Route index element={<DashboardIndex />} />
            </Route>
          </>}

          {currentUser === null && <Route path="*" element={<Home />} />}

        </Routes>
      </main>
      <Footer />

    </BrowserRouter>
  </>
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App;