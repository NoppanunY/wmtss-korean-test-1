import React, { useState, useEffect } from 'react'

import {
    getBinDetail
} from '../../app/api';

import "./style.css";

const SideBar = props => {
    const {criteria, hideSidebar} = props;

    const [binDetial, setBinDetail] = useState({});

    const fetchBinDetail = async () => {
        try {
            await getBinDetail(criteria.id)
            .then((res) => {
                console.log(res);
                setBinDetail(res.data);
            });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchBinDetail();
    }, []);

    return (
        <div className="sidebar-wrapper">
            <button type="button" className="btn btn-light" onClick={hideSidebar}>Cancel</button>
            <div className="content">
                <div>{binDetial.lat}</div>
                <div>{binDetial.lng}</div>
                <div>{binDetial.location}</div>
                <div>{binDetial.date}</div>
                <div>{binDetial.time}</div>
                <div>{binDetial.tag}</div>
                <div>{binDetial.type}</div>
                <div>{binDetial.description}</div>
            </div>
        </div>
    )
}

export default SideBar;