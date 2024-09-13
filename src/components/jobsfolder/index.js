import {Component} from "react";

import {Link} from "react-router-dom";

import { RotatingLines } from 'react-loader-spinner'

import "./index.css";

const condition={
  
  loader:"isLoading",
  failure:"isFailure",
  success:"isSuccess"
}

class AllJobs extends Component{

    state={jobs:[],pageNumber:1,loading:false,showing:condition.initial}

    componentDidMount(){
        this.getJobs();
        window.addEventListener('scroll', this.handleScroll);
  
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
      }


    getJobs=async()=>{
        try{
       this.setState({showing:condition.loader});
        const {pageNumber }=this.state;

        const url=`https://testapi.getlokalapp.com/common/jobs?page=${pageNumber}`;
        const response=await fetch(url);
        const data=await response.json();
        if(response.ok){
            console.log(data);
            const { jobs } = this.state;
            this.setState({jobs:[...jobs,...data.results],showing:condition.success});
        }
        else{
            console.log("Error fetching data");
            this.setState({showing:condition.failure});
        }

      }
      catch(error){
        console.log("Error fetchingg",error);
        this.setState({showing:condition.failure})
      }
    }


    handleScroll = () => {
        const { loading } = this.state;
    
        // Check if the user has scrolled near the bottom (e.g., 100px from the bottom)
        if (
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100
        ) {
          // Only fetch more data if we're not already loading new data
          if (!loading) {
            this.setState({ loading: true,pageNumber:2 },()=>{this.getJobs()});
           
          }
        }
      };


  showingJobs=()=>{
    const{jobs}=this.state;
    return(
      <div className="jobs-container">
      {
        jobs.map((each,index)=>(
            <div className="each-job-card" key={each.id || index}>
                {
                    index===4||index ===15
                    ?<div>
                        <img className="image-short-banner" src={each.creatives[0].image_url} alt="not-found" />
                    </div>
                    :
                <div>
                <Link to={`/job/${each.id}`} className="job-link">
                <div className="job-title">Job Title: {each.title}</div>
                <div className="location">Location: {each.job_location_slug}</div>
                <div className="salary">Salary: {each.primary_details?.Salary==="-"?"Not specified":`${each.primary_details?.Salary}`}</div>
                <div className="phone-number">{each.custom_link}</div>
                </Link>
                </div>
                }
            </div>
        )
        )
      }

      </div>


    )
  }

  loaderSpinner=()=>{
    return(
      <div className="loader-container">
        <div className="loader"><RotatingLines
  visible={true}
  height="96"
  width="96"
  color="grey"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>
      </div>
    )
  }

  showingError=()=>{
    return(
      <div className="error-container">
        <div className="error-message">Failed to fetch data.</div>
        <div>
          <button type="button" className="retry-button" onClick={this.getJobs}>Retry</button>
        </div>
      </div>
    )
  }

  basedOnShowing = ()=>{
    const {showing} = this.state;
    switch(showing){
        case condition.loader:
            return this.loaderSpinner();
        case condition.failure:
            return this.showingError();
        case condition.success:
            return this.showingJobs();
        default:
            return null;
    }
  }

    render(){

      

        return(

            <div>

              
                {
                  this.basedOnShowing()
                }


            </div>
        )
    }
}

export default AllJobs;