import {Component} from "react";

import { FaRegStar,FaStar } from "react-icons/fa";

import { RotatingLines } from "react-loader-spinner";

import "./index.css";

const condition={
  
    loader:"isLoading",
    failure:"isFailure",
    success:"isSuccess"
  }
  


class Job extends Component{

    constructor(props){
        super(props);
        this.state = {
            job:[],showing:condition.initial
        }
    }

    componentDidMount(){
        this.gettingJobs();
    }

    gettingJobs=async()=>{

        try{
            this.setState({showing:condition.loader});
        
        const response1 = await fetch("https://testapi.getlokalapp.com/common/jobs?page=1");
        const data1 = await response1.json();
        const response2 = await fetch("https://testapi.getlokalapp.com/common/jobs?page=2");
        const data2 = await response2.json();
       


        if(response1.ok && response2.ok){
        const jobsData=[...data1.results,...data2.results];
        const{match}=this.props;
        console.log(match);
        const{params}=match;
        console.log("params",params)
        const {id}=params;
        console.log(id);
        console.log(typeof(id));
        const filteringJob=jobsData.filter(each=>each.id===parseInt(id));

        this.setState({job:filteringJob,showing:condition.success});
        }
        else{
            console.log("Error fetching data", response1.status);
            this.setState({showing:condition.failure});
        }
        }catch(err){
            console.log(err);
            this.setState({showing:condition.failure});
        }
    }

    addToBookMark=(item)=>{
        
        //check if jobId exist in local storage
        

        const bookMark=JSON.parse(localStorage.getItem("jobId")) || [];
        const jobsLocal=JSON.parse(localStorage.getItem("bookMarkedJobs")) || [];
        console.log(bookMark);

            if(bookMark.includes(item.id)){
                console.log("Job id is already in local storage");
                return;
            }
            localStorage.setItem("jobId",JSON.stringify([...bookMark,item.id]));
            localStorage.setItem("bookMarkedJobs",JSON.stringify([...jobsLocal,{id:item.id,title:item.title}]));
            console.log("Job id is in local storage");
            this.gettingJobs();
   
   
    }

    removeBookMark=(id)=>{
        console.log("Getid",id);

        //check if jobId exist in local storage

        const bookMark=JSON.parse(localStorage.getItem("jobId")) || [];
        const bookMarkedLocally=JSON.parse(localStorage.getItem("bookMarkedJobs"))||[];

        console.log(bookMark);
        const filteredBookMark=bookMark.filter(each=>each!==id);
        const filteredBookMarkLocally=bookMarkedLocally.filter(each=>each.id!==id)
        localStorage.setItem("jobId",JSON.stringify(filteredBookMark));
        localStorage.setItem("bookMarkedJobs",JSON.stringify(filteredBookMarkLocally));

        console.log("Job id is in local storage");
        console.log("Job id is removed from local storage");
        this.gettingJobs();
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
              <button type="button" className="retry-button" onClick={this.gettingJobs}>Retry</button>
            </div>
          </div>
        )
      }

      showingJobDetails=()=>{
        const {job} = this.state;

        const bookMark=JSON.parse(localStorage.getItem("jobId")) || [];

        console.log("jobs",job);

        return(
            <div>
            {job.map(each=>(
                <div className="job-card" key={each.id}>
                    <div className="title">{each.title}</div>

                    <div className="card-top">
                        <div>
                    <div className="job-type">Job Type: {each.primary_details.Job_Type}</div>
                    <div className="experience">Experience: {each.primary_details.Experience}</div>
                    <div className="fee-charged">Fee Charged: {each.primary_details.Fees_Charged}</div>
                    <div className="place">Place: {each.primary_details.Place}</div>
                    <div className="qualification">Qualification: {each.primary_details.Qualification}</div>
                    <div className="salary-for-job">Salary: {each.primary_details.Salary}</div>
                        </div>
                        <div>
                    <div className="category">Category: {each.job_category}</div>
                    <div className="hours">Job Hours: {each.job_hours}</div>
                    <div className="role">Job Role: {each.job_role}</div>

                    <div className="min">Salary min: {each.salary_min}</div>
                    <div className="max">Salary max: {each.salary_max}</div>
                    
                    <div className="views">views: {each.views}</div>
                        </div>
                    </div>

                    <div className="whatsapp">whatsapp number: {each.whatsapp_no}</div>
                    <div className="job-poster">
                        <img className="poster" src={each.creatives[0].file} alt="not-found" />
                    </div>

                    <div>
                        {
                            bookMark.includes(each.id) ? <button onClick={()=>this.removeBookMark(each.id)} type="button" className="button-remove-bookmark"><FaStar /> Book Marked</button> :
                            <button onClick={()=>this.addToBookMark(each)} type="button" className="button-add-bookmark"><FaRegStar /> Add to Book Mark</button>
                        }

                    
                    </div>
            

                    
                    
                    </div>





            ))}

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
                return this.showingJobDetails();
            default:
                return null;
        }
      }


    

    render(){
        

        return(

            <div className="job-container">
               
               
             

                {
                    this.basedOnShowing()
                }
            </div>
        )
    }
}

export default Job;