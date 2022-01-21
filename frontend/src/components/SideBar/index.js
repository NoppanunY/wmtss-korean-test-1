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
                <button type="button" className="close-btn btn btn-light" onClick={hideSidebar}>Cancel</button>
            </div>
            <div className="sidebar-body">
                {/* <button type="button" className="btn btn-danger" onClick={remove}>Delete</button> */}
                <button type="button" className="edit-btn btn btn-warning" onClick={edit}>Edit</button>
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