import React from 'react';
import './LayoutStyle.scss';
import Users from '../users/userList/Users';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function Layout(props){
    return(
        <div className="layout-container">
            <Router>
                <Switch>
                    <Route path="/" exact component={ Users }/>
                </Switch>
            </Router>
        </div>
    );

}