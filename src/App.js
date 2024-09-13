import {Switch,Route,Link} from "react-router-dom";

import AllJobs from "./components/jobsfolder";

import Home from "./components/home";

import Job from "./components/job";

import BookMark from "./components/bookmarks";

import { FaLinkedin } from "react-icons/fa";

import { BsTwitterX } from "react-icons/bs";


import "./App.css";

function App() {
  return (
    <div>

      <div className="nav-bar">
        <div>
        <Link className="home-link" to="/">Home</Link>
        </div>
        <div>
          <img className="app-logo" src="https://i.ibb.co/qyb2gt1/Screenshot-2024-09-12-225935.png" alt="not-found"/>
        </div>
      </div>

      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/jobsAll" component={AllJobs} />
        <Route exact path="/bookMark" component={BookMark} />
        <Route exact path="/job/:id" component={Job} />
      </Switch>

      <div className="footer">
      <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} CareerLaunch. All rights reserved.</p>
          <p>You can contact the developer at <a href="mailto:daveeddaveedd@gmail.com">daveeddaveedd@gmail.com</a></p>
          <p>This is a demo version of the CareerLaunch website, please use it responsibly.</p>
          <p>
            Connect with me: 
            <a href="https://x.com/Daveed53460412" target="_blank" rel="noopener noreferrer"><BsTwitterX /> Twitter</a> | 
            <a href="https://www.linkedin.com/in/g-daveed-365958190/" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>
          </p>
        </div>
     </div>

    </div>
  );
}

export default App;
