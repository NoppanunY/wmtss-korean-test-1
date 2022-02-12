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

function getBinDetail(id){
    const response = axios.get(`api/bin/${id}`);
    return response;
}

function getCreateBin({ lat, lng, location, type, date, time, description, tag }){
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

function getUpdatedBin(id, bin) {
    const response = axios.put(`api/bin/${id}/`, {
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
    const response = axios.delete(`api/bin/${id}`);
    return response;
}

// Image
function getCreateImage(image){
    const response = axios.post('api/image/', {
        "image": image
    });

    return response;
}

function getUpdateImage(image){
    const response = axios.patch('api/image/', {
        "image": image
    });

    return response;
}

function getImageBin(id){
    const response = axios.get('api/image', {
        params:{
            bin: id
        }
    });

    return response;
}

export { 
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