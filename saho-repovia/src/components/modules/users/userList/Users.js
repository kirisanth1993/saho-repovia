import React, { useEffect, useState } from 'react';
import Input from '../../../common/Input';
import './UsersStyle.scss';
import { http_Request } from '../../../../utils/HTTP_Request';
import { API_URL } from '../../../../const/API_URLS';
import SingleUser from '../singleUser/SingleUser';
import { Link } from 'react-router-dom';

export default function Users(props){
    const [searchedValue, setSearchedValue] = useState("");
    const [searchedResult, setSearchedResult] = useState([]);
    const [searchedResultCount, setSearchedResultCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearchAction, setIsSearchAction] = useState(false);

    useEffect(() => {
        !isSearchAction && fetchUsers(searchedValue);  
    }, [currentPage]);

    const searchUsersAction = (event) => {
        const searchingWord = event.target.value;
        setSearchedValue(event.target.value);
        // call backend after 3 char typed only 
        if(searchingWord.length < 3){
            setSearchedResult([]);
        }else if(searchingWord.length >= 3){
            setCurrentPage(1);
            setIsSearchAction(true);
            fetchUsers(event.target.value);
        }
    };

    const fetchUsers = (searchedWord) => {
        http_Request(
            {
                url: API_URL.users.list.replace("{searchKey}", searchedWord).replace("{pageNo}", currentPage).replace("{pageCount}", 8),
                method: 'GET',
            }, 
            function successCallback(response){
                console.log("response", response.data);
                setSearchedResult([...response.data.items]);
                setSearchedResultCount(response.data.total_count);
                setIsSearchAction(false);
            },
            function errorCallback(error){
                console.log("error", error);
            });

    }

    const pageChangeAction = (type) => {
        if(type === "reduce"){
            setCurrentPage(currentPage - 1);
        }else{
            console.log("kooduthu");
            setCurrentPage(currentPage + 1);
        }
    }

    return(
        <div className="users-container">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <h2 className="main-Heading">Users</h2>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 search-block">
                    <Input
                        inputid = "search"
                        inputname =  "search"
                        inputplaceholder ="Search For Users . ."
                        inputvalue = { searchedValue }
                        inputonchangeaction = { searchUsersAction }
                        className="form-control search-input"
                    />
                    <i className="fa fa-search" ></i>
                </div>
            </div>
            <hr/>
            <div className="users-list-container row">
                { 
                    searchedResult.map((user) => {
                        return(
                            <div key={user.login} className="single-user col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Link to={"/userInfo?name=" + user.login}>
                                    <SingleUser
                                        imageUrl={ user.avatar_url }
                                        name={ user.login }
                                    />
                                </Link>
                            </div>
                        );
                    }) 
                }
            </div>
            <div>
                {/* <img src="https://cdn.dribbble.com/users/1883357/screenshots/6016190/search_no_result.png" alt="Avatar" className="card-img2"/> */}
            </div>

            {
                searchedResult.length > 0 && 
                <div className="pagination-block">
                    <i className="fa fa-angle-left" onClick={ () => ((currentPage !== 1)) && pageChangeAction("reduce") }></i>
                    <span className="page-num">{ currentPage }</span>
                    <i className="fa fa-angle-right" onClick={ () => ((Math.ceil(searchedResultCount/8) !== currentPage) && (Math.ceil(searchedResultCount/8) !== 0)) && pageChangeAction("increase") }></i>
                </div>
            }
            
        </div>
    );

}