import './UserInfoStyle.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { http_Request } from '../../../../utils/HTTP_Request';
import  { API_URL } from '../../../../const/API_URLS';

export default function UserInfo(){
    const [repos, setRepos] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [userFollows, setUserFollows] = useState([]);
    const [user, setUser] = useState("");
    var url = new URL(document.URL);
    var search_params = url.searchParams;
    const userName = search_params.get("name");

    useEffect(() => {
        setUser(userName);
        fetchUserRepos();
        fetchUserfollowers();
        fetchUserFollows();
    },[]);

    const fetchUserRepos = () => {

        http_Request(
        {
            url: API_URL.repos.list.replace("{login}", userName),
            method: 'GET',
        }, 
        function successCallback(response){
            console.log("respos", response.data);
            setRepos(response.data);
        },
        function errorCallback(error){
            console.log("error", error);
        });
    }

    const fetchUserfollowers = () => {
        http_Request(
        {
            url: API_URL.followes.list.replace("{login}", userName),
            method: 'GET',
        }, 
        function successCallback(response){
            console.log("followers", response.data);
            setFollowers(response.data);
        },
        function errorCallback(error){
            console.log("error", error);
        });
    }

    const fetchUserFollows = () => {
        http_Request(
        {
            url: API_URL.follows.list.replace("{login}", userName),
            method: 'GET',
        }, 
        function successCallback(response){
            console.log("follows", response.data);
            setUserFollows(response.data);
        },
        function errorCallback(error){
            console.log("error", error);
        });
    }

    return(
        <div className="user-info-container">
            <div>
                <Link to="/">
                    <i className="fa fa-arrow-left"></i>
                </Link>
                <label className="back-label">Back To Users</label>
            </div>
            <div className="mt-3">
                <h2>{"User Info - " + user }</h2>
            </div>
            <hr/>

            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
                    <div className="grp-section">
                        <h3>Repositories</h3>
                        {
                            repos.map((singleRepo) => {
                                return(
                                    <div className="single-sec">{ singleRepo.name }</div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
                    <div className="grp-section">
                        <h3>Followers</h3>
                        {
                            followers.map((singleUser) => {
                                return(
                                    <div className="single-sec">{ singleUser.login }</div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
                    <div className="grp-section">
                        <h3>Follows</h3>
                        {
                            userFollows.map((singleFollow) => {
                                return(
                                    <div className="single-sec">{ singleFollow.login }</div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            
        </div>
    );

}