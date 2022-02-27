import React, { useState, useEffect } from 'react'

import {
    getTags,
    getBinDetail,
    
    getImageBin
} from '../../app/api';

import placeholder from '../../assets/img/placeholder.png';
import "./style.css";

const SideBar = props => {
    const {criteria, hideSidebar, setModal} = props;

    const initialImage = {
        "1": {bin: null, image: null},
        "2": {bin: null, image: null},
        "3": {bin: null, image: null},
        "4": {bin: null, image: null},
        "5": {bin: null, image: null},
    }

    const [binDetail, setBinDetail] = useState({});
    const [imageDetail, setImageDetail] = useState(initialImage);

    const [options, setOptions] = useState([]);

    const fetchTags = async () => {
        try {
            await getTags()
            .then((response) => {
                setOptions(response.data);
            })
        } catch (err) {
            console.log(err);
        }
    }

    const fetchBinDetail = async () => {
        try {
            await getBinDetail(criteria.id)
            .then((res) => {
                setBinDetail(res.data);
            });
        } catch (err) {
            console.log(err);
        }
    }

    const fetchBinImage = async () => {
        try {
            await getImageBin(criteria.id)
            .then((res) => {
                const contentType = 'image/png';
                setImageDetail({
                    "1" : {
                        id: res.data[0] ? res.data[0].id : null,
                        image: res.data[0] ? URL.createObjectURL(b64toBlob(res.data[0].image, contentType)) : null,
                        seq: 1
                    },
                    "2" : {
                        id: res.data[1] ? res.data[1].id : null,
                        image: res.data[1] ? URL.createObjectURL(b64toBlob(res.data[1].image, contentType)) : null,
                        seq: 2
                    },
                    "3" : {
                        id: res.data[2] ? res.data[2].id : null,
                        image: res.data[2] ? URL.createObjectURL(b64toBlob(res.data[2].image, contentType)) : null,
                        seq: 3
                    },
                    "4" : {
                        id: res.data[3] ? res.data[3].id : null,
                        image: res.data[3] ? URL.createObjectURL(b64toBlob(res.data[3].image, contentType)) : null,
                        seq: 4
                    },
                    "5" : {
                        id: res.data[4] ? res.data[4].id : null,
                        image: res.data[4] ? URL.createObjectURL(b64toBlob(res.data[4].image, contentType)) : null,
                        seq: 5
                    },
                });
            })
        } catch (err) {
            console.log(err);
        }
    }

    const edit = event => {
        setModal({name: "Update bin", type: "UPDATE_BIN"})
        hideSidebar();
    }
    
    const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
        
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
            }
        
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    useEffect(() => {
        fetchTags();
        fetchBinDetail();
        fetchBinImage();
    }, [criteria.id]);

    return (
        <nav className="sidebar-wrapper">
            <div className="sidebar-header">
                <img className="image-header img-fluid" src={!imageDetail["1"].image ? placeholder : imageDetail["1"].image} alt="Responsive"/>
                <button type="button" id="btnClose" onClick={hideSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                    </svg>
                </button>
            </div>
            <div className="sidebar-body">
                {/* <button type="button" className="btn btn-danger" onClick={remove}>Delete</button> */}
                <button id="btnEdit" onClick={edit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                </button>
                <div className="content">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-sm">Latitude</label>
                        <div className="col-sm-10">
                            <div className="form-control-sm">{binDetail.lat}</div>
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-sm">Longitude</label>
                        <div className="col-sm-10">
                            <div className="form-control-sm">{binDetail.lng}</div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-sm">Location</label>
                        <div className="col-sm-10">
                            <div className="form-control-sm">{binDetail.location}</div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-sm">Type</label>
                        <div className="col-sm-10">
                            <div className="form-control-sm">{binDetail.type}</div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-sm">Tag</label>
                        <div className="col-sm-10">
                            <div className="form-control-sm">{options.filter(option => option.id === binDetail.tag).map(filterOption => (
                                filterOption.name
                            ))}</div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-sm">Date</label>
                        <div className="col-sm-10">
                            <div className="form-control-sm">{binDetail.time} &nbsp; {binDetail.date}</div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-sm">Description</label>
                        <div className="col-sm-10">
                            <div className="form-control-sm">{binDetail.description}</div>
                        </div>
                    </div>

                    <div className="form-group row image-display">
                        { Object.keys(imageDetail).filter(key => imageDetail[key].seq > 1).map((key, i) => (
                            <div key={key}>
                                <label htmlFor={"upload-button-" + key} style={{display: "inline"}}>
                                    <img src={!imageDetail[key].image ? placeholder : imageDetail[key].image} 
                                        className="image-field float-left" 
                                        alt="..."/>                                
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SideBar;