import axios from 'axios';

export const http_Request = (data, successCallback, errorCallback) => {
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