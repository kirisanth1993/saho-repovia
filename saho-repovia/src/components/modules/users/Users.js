import React, { useState } from 'react';
import Input from '../../common/Input';
import './UsersStyle.scss';
import { http_Request } from '../../../utils/HTTP_Request';
import { API_URL } from '../../../const/API_URLS';

export default function Users(props){
    const [searchedValue, setSearchedValue] = useState("");

    const searchUsersAction = (event) => {
        console.log(event.target.value);
        const searchingWord = event.target.value;
        setSearchedValue(event.target.value);

        if(searchingWord.length > 0){
            http_Request(
            {
                url: API_URL.userManagement.users.GETUSERS,
                method: 'GET'
            }, 
            function successCallback(response){
                console.log("response", response);
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
        </div>
    );

}