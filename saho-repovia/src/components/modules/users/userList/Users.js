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
    const [isInitialStage, setIsInitialStage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        !isSearchAction && fetchUsers(searchedValue);  
    }, [currentPage]);

    const searchUsersAction = (event) => {
        const searchingWord = event.target.value;
        setSearchedValue(event.target.value);
        // call backend after 3 char typed only 
        if(searchingWord.length < 3){
            setSearchedResult([]);
            setIsLoading(false);
        }else if(searchingWord.length >= 3){
            setIsLoading(true);
            setIsInitialStage(false);
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
                setTimeout(()=>{
                    setSearchedResult([...response.data.items]);
                    setSearchedResultCount(response.data.total_count);
                    setIsSearchAction(false);
                    setIsLoading(false);
                }, 1000);
            },
            function errorCallback(error){
                console.log("error", error);
                setSearchedResult([]);
                setIsLoading(false);
            });
    }

    const pageChangeAction = (type) => {
        setIsLoading(true);
        if(type === "reduce"){
            setCurrentPage(currentPage - 1);
        }else{
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
            { 
                !isLoading && searchedResult.length >0 &&
                <div className="users-list-container row">
                    {
                        searchedResult.map((user) => {
                            return(
                                <div key={user.login} className="single-user col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <Link to={"saho-repovia/userInfo?name=" + user.login}>
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
            }
            {
                (!isInitialStage && searchedResult.length === 0 && !isLoading) &&
                <div className="no-result-img-block text-center">
                    <img src="https://cdn.dribbble.com/users/1883357/screenshots/6016190/search_no_result.png" alt="No Result Found"/>
                </div>
            }

            {
                isLoading && 
                <div className="text-center spin-block">
                    <img className="loading-spin" src="http://pa1.narvii.com/7491/d8b2fb62d9bc8d6c042da4fd6ad5be92a8d97825r1-200-200_00.gif"></img>
                    <div className="searching-wrd">Searching For Users .  .</div>
                </div>
            }

            {
                isInitialStage &&
                <div className="text-center welcome-note">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwZW-tdxCVOl-zgvr0245JDK65mc7mJGHdqw&usqp=CAU"></img>
                </div>
            }

            {
                searchedResult.length > 0 && !isLoading &&
                <div className="pagination-block">
                    <i className="fa fa-angle-left" onClick={ () => ((currentPage !== 1)) && pageChangeAction("reduce") }></i>
                    <span className="page-num">{ currentPage }</span>
                    <i className="fa fa-angle-right" onClick={ () => ((Math.ceil(searchedResultCount/8) !== currentPage) && (Math.ceil(searchedResultCount/8) !== 0)) && pageChangeAction("increase") }></i>
                </div>
            }
        </div>
    );

}