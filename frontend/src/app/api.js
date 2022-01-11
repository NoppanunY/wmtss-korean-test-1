import axios from 'axios';

// Common
function getTags(){
    const response = axios.get('api/tag');
    return response;
}

// Bin
function getBins(){
    const response = axios.get('api/bin');
    return response;
}

function getCreateBin({ lat, lng, location, type, date, time, description, tag}){
    const response = axios.post('api/bin/', {
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

export { 
    getTags, 
    getBins,
    getCreateBin
};