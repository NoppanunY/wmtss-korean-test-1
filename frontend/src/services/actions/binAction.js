import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,

    BIN_LOADING,
    BIN_LOADED,
    ADD_BIN,
    EDIT_BIN,
    DELETE_BIN,
} from '../../services/constants/actionType';

import {
    getBins,
    getCreateBin,
    getUpdatedBin,
    getDeleteBin,
    getCreateImage,
    getUpdateImage,
} from '../../app/api';

import { axiosInstance } from '../../services/utils/axiosInstance';

// Fetch Bins from API
export const fetchBins = () => ( dispatch, getState ) => {
    dispatch({ type: BIN_LOADING });

    try {
        getBins()
        .then((res) => {
            dispatch({type: BIN_LOADED, data: res.data})
        })
    } catch (err) {
        console.log(err);
    }
}

// Create Bin from API
export const createBin = (bin, image) => ( dispatch, getState ) => {
    dispatch({ type: BIN_LOADING });

    try {
        getCreateBin(bin)
        .then(res => {
            if(image.length > 0){
                image.forEach((element, index)  => {
                    image[index]["bin"] = res.data.id;
                });
                createImage(image);
            }
            dispatch({ type: ADD_BIN, data: res.data });
        });
    } catch (err) {
        console.log(err);
    }
}

// Update Bin from API
export const updateBin = (id, updateBin, image) => ( dispatch, getState ) => {
    dispatch({ type: BIN_LOADING });

    try {
        getUpdatedBin(id, updateBin)
        .then(res => {
            dispatch({ type: EDIT_BIN, data: res.data });
            if(image.length > 0){
                const promises = [];
                image.forEach((element, index)  => {
                    if(image[index]["id"] != null){
                        promises.push(updateImageAsync({"id": element["id"], "image": element["image"]}));
                    }else{
                        promises.push(createImageAsync([{"bin": id, "image": element["image"]}]));
                    }
                });
                Promise.all(promises)
                .then((result) => {
                    console.log("All done", result);
                })
            }
        });
    } catch (err) {
        console.log(err);
    }
}

// Delete Bin from API
export const deleteBin = (id) => ( dispatch, getState ) => {
    dispatch({ type: BIN_LOADING });

    try {
        getDeleteBin(id)
        .then(res => {
            dispatch({ type: DELETE_BIN, data: id });
        });
    } catch (err) {
        console.log(err);
    }
}


// Create Images from API
const createImage = async (image) => {
    console.log(image);
    try {
        await  getCreateImage(image)
        .then(res => {
        console.log("Success");
        });
    } catch (err) {
        console.log(err);
    }
}

// Create Images from API with promise
const createImageAsync = async (image) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Resolving " + image);
            getCreateImage(image);
            // resolve(value);
        }, Math.floor(Math.random() * 1000));
    });
}

// Update Images from API with promise
const updateImageAsync = async (image) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Resolving " + image);
            getUpdateImage(image);
            // resolve(value);
        }, Math.floor(Math.random() * 1000));
    });
}