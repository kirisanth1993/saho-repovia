import axios from 'axios';

export const http_Request = (data, successCallback, errorCallback) => {
    // console.log('Bearer ' + (sessionStorage.getItem('jwtToken') ? sessionStorage.getItem('jwtToken') : ""));
    axios({
        url: data.url,
        method: data.method,
        data: data.bodyData, 
        contentType: 'application/json',
        headers: {
            // "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Pragma': 'no-cache',
            // 'Authorization': 'Bearer ' + 'c3a7ca0586ae3e0a37c3ed21e0ba6ca22df1d0d4',
            // 'Authorization': 'Bearer ' + (sessionStorage.getItem('jwtToken') ? sessionStorage.getItem('jwtToken') : ""),
            // 'Access-Control-Expose-Headers': "jwt_token"
        },
        responseType: 'json'
    })
    .then(function(response){
        successCallback(response);
    })
    .catch(function(error){
        errorCallback(error);
    })
}