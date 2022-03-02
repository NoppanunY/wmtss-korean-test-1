import axios from 'axios';
import client from '../services/utils/axiosInstance';

// Default config options
// const defaultOptions = {
//     headers: {
//         'Content-Type': 'application/json',
//     },
// };

// Create instance
// let client = axios.create(defaultOptions);

// Set the AUTH token for any request
// client.interceptors.request.use(function (config) {
//     const token = JSON.parse(localStorage.getItem('authTokens'));
//     config.headers.Authorization =  token ? `Bearer ${token.access}` : '';
//     return config;
// });

// client.interceptors.response.use((response) => {
//     console.log("interceptors response", response);
//     return response;
// });

// Common
function getUser(token){
    const response = client.post("api/auth/token/verify/", {
        "token": token
    });
    return response;
}

function getTags(){
    const response = client.get('api/tag');
    return response;
}

// Bin
function getBins(){
    const response = client.get('api/bin');
    return response;
}

function getBinDetail(id){
    const response = client.get(`api/bin/${id}`);
    return response;
}

function getCreateBin({ lat, lng, location, type, date, time, description, tag }){
    const response = client.post('api/bin/', {
        "lat": lat,
        "lng": lng,
        "location": location,
        "type": type,
        "date": date,
        "time": time,
        "description": description,
        "tag": tag
    });

    return response;
}

function getUpdatedBin(id, bin) {
    const response = client.put(`api/bin/${id}/`, {
        "lat": bin.lat,
        "lng": bin.lng,
        "location": bin.location,
        "type": bin.type,
        "date": bin.date,
        "time": bin.time,
        "description": bin.description,
        "tag": bin.tag
    });
  
    return response;
  }

function getDeleteBin(id){
    const response = client.delete(`api/bin/${id}`);
    return response;
}

// Image
function getCreateImage(image){
    const response = client.post('api/image/', {
        "image": image
    });

    return response;
}

function getUpdateImage(image){
    console.log("Update image", image);
    const response = client.patch(`api/image/${image["id"]}/`, {
        "image": image.image
    });

    return response;
}

function getImageBin(id){
    const response = client.get('api/image', {
        params:{
            bin: id
        }
    });

    return response;
}

export { 
    getUser,
    getTags, 

    getBins,
    getBinDetail,
    getCreateBin,
    getUpdatedBin,
    getDeleteBin,

    getCreateImage,
    getUpdateImage,
    getImageBin,
};