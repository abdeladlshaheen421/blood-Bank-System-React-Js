import "./App.css";
import { NavComponent } from "./components/nav.component";
import { FooterComponent } from "./components/footer.component";
import { RequestComponent } from "./components/request.component";
import { DonateComponent } from "./components/donate.component";
import { HomeComponent } from "./components/home.component";
import { NotFoundComponent } from "./components/notfound.component";
import { RegisterComponent } from "./components/register.component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="container-fluid w-100 h-100 bg-light">
        <div className="row">
          <div className="col-12">
            <NavComponent />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Routes>
              <Route exact={true} path="/" element={<HomeComponent />}></Route>
              <Route
                exact={true}
                path="/request"
                element={<RequestComponent />}
              ></Route>
              <Route
                exact={true}
                path="/donate"
                element={<DonateComponent />}
              ></Route>
              <Route
                exact={true}
                path="/register"
                element={<RegisterComponent />}
              ></Route>
              <Route
                exact={true}
                path="*"
                element={<NotFoundComponent />}
              ></Route>
            </Routes>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <FooterComponent />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
