import React, { useState, useEffect } from 'react'

import {
    getTags,
    getBinDetail
} from '../../app/api';

import placeholder from '../../assets/img/placeholder.png';
import "./style.css";

const SideBar = props => {
    const {criteria, hideSidebar, deleteBin, setModal} = props;

    const [binDetial, setBinDetail] = useState({});

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

    

    const edit = event => {
        setModal({name: "Update bin", type: "UPDATE_BIN"})
        hideSidebar();
    }
    
    useEffect(() => {
        fetchTags();
        fetchBinDetail();
    }, [criteria.id]);

    return (
        <nav className="sidebar-wrapper">
            <div className="sidebar-header">
                <img className="image-header img-fluid" src={placeholder} alt="Responsive"/>
                <button type="button" id="btnClose" onClick={hideSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                    </svg>
                </button>
            </div>
            <div className="sidebar-body">
                {/* <button type="button" className="btn btn-danger" onClick={remove}>Delete</button> */}
                <button id="btnEdit" onClick={edit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                </button>
                <div className="content">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-sm">Latitude</label>
                        <div className="col-sm-10">
                            <div className="form-control-sm">{binDetial.lat}</div>
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-sm">Longitude</label>
                        <div className="col-sm-10">
                            <div className="form-control-sm">{binDetial.lng}</div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-sm">Location</label>
                        <div className="col-sm-10">
                            <div className="form-control-sm">{binDetial.location}</div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-sm">Type</label>
                        <div className="col-sm-10">
                            <div className="form-control-sm">{binDetial.type}</div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-sm">Tag</label>
                        <div className="col-sm-10">
                            <div className="form-control-sm">{options.filter(option => option.id === binDetial.tag).map(filterOption => (
                                filterOption.name
                            ))}</div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-sm">Date</label>
                        <div className="col-sm-10">
                            <div className="form-control-sm">{binDetial.time} &nbsp; {binDetial.date}</div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label col-form-label-sm">Description</label>
                        <div className="col-sm-10">
                            <div className="form-control-sm">{binDetial.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SideBar;