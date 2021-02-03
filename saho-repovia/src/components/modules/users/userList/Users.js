import React, { useState } from 'react';
import Input from '../../../common/Input';
import './UsersStyle.scss';
import { http_Request } from '../../../../utils/HTTP_Request';
import { API_URL } from '../../../../const/API_URLS';
import SingleUser from '../userInfo/SingleUser';

export default function Users(props){
    const [searchedValue, setSearchedValue] = useState("");
    const [searchedResult, setSearchedResult] = useState([]);
    const [searchedResultCount, setSearchedResultCount] = useState(0);

    const searchUsersAction = (event) => {
        console.log(event.target.value);
        const searchingWord = event.target.value;
        setSearchedValue(event.target.value);

        // call backend after 3 char typed only 
        if(searchingWord.length < 3){
            setSearchedResult([]);
        }else if(searchingWord.length >= 3){
            http_Request(
            {
                url: API_URL.users.list.replace("{searchKey}", searchingWord).replace("{pageNo}", 1).replace("{pageCount}", 10),
                method: 'GET',
            }, 
            function successCallback(response){
                console.log("response", response.data);
                setSearchedResult(response.data.items);
                setSearchedResultCount(response.data.total_count);
            },
            function errorCallback(error){
                console.log("error", error);
            });
        }

    };

    return(
        <div className="users-container">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <h2 className="main-Heading">Users</h2>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 search-block">
                    <Input
                        inputId = "search"
                        inputName =  "search"
                        inputPlaceholder ="Search Here"
                        inputValue = { searchedValue }
                        inputOnchangeAction = { searchUsersAction }
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
                                <SingleUser
                                    imageUrl={ user.avatar_url }
                                    name={ user.login }
                                />
                            </div>
                        );
                    }) 
                }

                
                <h1>wewzcx</h1>,
                <img src="https://cdn.dribbble.com/users/1883357/screenshots/6016190/search_no_result.png" alt="Avatar" className="card-img2"/>
                <img src={require("../../../../assets/images/search_no_result.png")} alt="Avatar" className="card-img2"/>

                

            </div>
        </div>
    );

}