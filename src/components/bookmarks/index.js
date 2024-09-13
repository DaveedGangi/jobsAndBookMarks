import {Component} from "react";

import "./index.css";

class BookMark extends Component{

    render(){

        const bookmark =JSON.parse(localStorage.getItem("bookMarkedJobs"))||[];
        console.log(bookmark);
        return(

            <div className="bookmarks-container">
                {
                    bookmark.length === 0?
                    <h2>No bookmarked jobs yet</h2>
                    :
                
                <div>
            {
                bookmark.map(each=><div className="bookmarks" key={each.id}>{each.title}</div>)
            }
                </div>

        }
            </div>
        )
    }
}

export default BookMark;