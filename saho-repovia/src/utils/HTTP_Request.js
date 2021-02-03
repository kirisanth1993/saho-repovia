import axios from 'axios';

export const http_Request = (data, successCallback, errorCallback) => {
    // console.log('Bearer ' + (sessionStorage.getItem('jwtToken') ? sessionStorage.getItem('jwtToken') : ""));
    axios({
        url: data.url,
        method: data.method,
        data: data.bodyData, 
        contentType: 'application/json',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Pragma': 'no-cache',
            // 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBYmR1bGxhaCIsInVzZXJuYW1lIjoiQWJkdWxsYWgiLCJwcml2aWxlZ2UiOlt7ImF1dGhvcml0eSI6IkJLX0NBTl9BUFBPSU5UIn0seyJhdXRob3JpdHkiOiJQUl9BRERfUEFUSUVOVCJ9LHsiYXV0aG9yaXR5IjoiUFJfVklXX1BBVElFTlQifSx7ImF1dGhvcml0eSI6IlVNX0FDVF9VU0VSIn0seyJhdXRob3JpdHkiOiJVTV9BRERfVVNFUiJ9LHsiYXV0aG9yaXR5IjoiVU1fREFDX1VTRVIifSx7ImF1dGhvcml0eSI6IlVNX0VESV9VU0VSIn0seyJhdXRob3JpdHkiOiJVTV9WSVdfVVNFUiJ9LHsiYXV0aG9yaXR5IjoiVklFV19BRE1JTl9EQVNIQk9BUkQifSx7ImF1dGhvcml0eSI6IlZJRVdfVU0ifV0sImV4cCI6MTYwOTY1MTI4OSwiaWF0IjoxNjA5NTY0ODg5fQ.EUctL_rDe79b_OJpu7jjdiEWLXd4AjYj9C0tTg9jSDXXwUo8flIXHb8JvjUp-7ibB1MbVzvlUNs4PfTwFYMzdQ',
            // 'Authorization': 'Bearer ' + (sessionStorage.getItem('jwtToken') ? sessionStorage.getItem('jwtToken') : ""),
            'Access-Control-Expose-Headers': "jwt_token"
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