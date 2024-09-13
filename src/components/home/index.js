import {Component} from "react";

import { Link } from "react-router-dom";

import  "./index.css";

class Home extends Component{

    render(){

        return(

            <div className="bg-home">

                <div className="portal-title-name">Find Your Next Career Opportunity with <span className="portal-name">CareerLaunch</span></div>
                <p className="portal-description-for-title"><span className="portal-para-name">CareerLaunch </span> is a comprehensive job portal designed to connect job seekers with top employers. Whether you’re looking for your first job, a career change, or opportunities to advance your skills, we provide access to thousands of job listings across various industries. With our easy-to-use platform, you can search for jobs by location, role, and experience level, submit applications effortlessly, and track your progress. Join us today and take the next step toward your dream job!</p>
               
                <div className="home-buttons">

                    
                    <div>
                        <Link to="/jobsAll">
                        <button type="button" className="job-button">Jobs</button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/bookmark">
                        <button type="button" className="book-marks-button">Book Marks</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;