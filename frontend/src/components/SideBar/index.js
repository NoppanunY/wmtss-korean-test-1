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
                <button type="button" className="btn btn-primary" onClick={hideSidebar}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
</svg></button>
            </div>
            <div className="sidebar-body">
                {/* <button type="button" className="btn btn-danger" onClick={remove}>Delete</button> */}
                <button type="button" className="edit-btn btn btn-warning" onClick={edit}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>
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