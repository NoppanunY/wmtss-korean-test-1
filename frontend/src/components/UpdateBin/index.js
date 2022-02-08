import React, { useState, useEffect } from 'react'
import DatePicker, { registerLocale} from "react-datepicker";
import Moment from 'moment';
import ptBR from 'date-fns/locale/pt-BR';

import {
    getTags,
    getBinDetail
} from './../../app/api';
  
registerLocale('pt-BR', ptBR)

const UpdateBin = props => {
    const initialData = {
        "lat": "",
		"lng": "",
		"location": "",
		"type": "",
		"date": new Date(),
		"time": new Date(),
		"description": "",
		"tag": ""
    };
    const [bin, setBin] = useState(initialData); 

    const [options, setOptions] = useState([]);
    const [isSubmit, setIsSumnit] = useState("needs-validation");

    let regex = {
        "lat": "^[+-]?(([1-8]?[0-9])(\\.[0-9]{1,7})?|90(\\.0{1,7})?)$",
        "lng": "^[+-]?((([1-9]?[0-9]|1[0-7][0-9])(\\.[0-9]{1,7})?)|180(\\.0{1,7})?)$"
    }

    const fetchBinDetail = async () => {
        try {
            await getBinDetail(props.criteria.id)
            .then((res) => {
                let time = new Date(),
                    parts = res.data.time.match("(\\d+)\\:(\\d+)\\:(\\d+)"),
                    hours = parts[1],
                    minute = parts[2],
                    second = parts[3];

                time.setHours(hours);
                time.setMinutes(minute);
                time.setSeconds(second);

                setBin({...res.data, date: Date.parse(res.data.date), time: time });
            });
        } catch (err) {
            console.log(err);
        }
    }

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

    const remove = event => {
        props.deleteBin(bin.id);
        props.setActiveModal({ active: false });
    }

    useEffect(() => {
        fetchBinDetail();
        fetchTags();        
    }, [])

    const onInputChange = event => {
        const {name, value} = event.target;
        setBin({...bin, [name]: value});
    }

    const update = event => {
        // let isValid = true;
        event.preventDefault();
        setIsSumnit("was-validated");
        // console.log(bin);
        
        // if(!bin["lat"]) return
        // if(typeof(bin["lat"]) !== "undefined") 
            if(String(!bin["lat"]).match(regex.lat)) return

        // if(!bin["lng"]) return
        // if(typeof(bin["lng"]) !== "undefined") 
            if(String(!bin["lng"]).match(regex.lng)) return
        
        props.updateBin(bin.id, {...bin, 
            date: Moment(bin.date).format('YYYY-MM-DD'),
            time: Moment(bin.time).format('hh:mm:ss')
        });
        props.setActiveModal({active: false });
    }

    const clear = () => {
        setBin(initialData);
        setIsSumnit("needs-validated");
    }

    const cancel = event => {
        event.preventDefault();
        props.setActiveModal({active: false });
    }

    return (
        <form className={isSubmit}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>Latitude</label>
                    <input
                        type="text" 
                        pattern={regex.lat}
                        className="form-control"
                        name="lat"
                        value={bin.lat}
                        onChange={onInputChange}
                        required/>
                </div>
                <div className="form-group col-md-6">
                    <label>Longitude</label>
                    <input 
                        type="text" 
                        pattern={regex.lng}
                        className="form-control" 
                        name="lng"
                        value={bin.lng}
                        onChange={onInputChange}
                        required/>
                </div>
            </div>
            <div className="form-group">
                <label>Location</label>
                <input 
                    type="text" 
                    className="form-control"
                    name="location"
                    value={bin.location}
                    onChange={onInputChange}
                    required/>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>Date</label>
                    <DatePicker 
                        className="form-control" 
                        selected={bin.date} 
                        onChange={(event) => {setBin({ ...bin, date: event })}}
                        required/>
                </div>
                <div className="form-group col-md-6">
                    <label>Time</label>
                    <DatePicker
                        className="form-control"
                        selected={bin.time}
                        onChange={(event) => {setBin({ ...bin, time: event })}}
                        locale="pt-BR"
                        showTimeSelect
                        showTimeSelectOnly
                        timeCaption="Time"
                        dateFormat="pp"
                        required/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>Type</label>
                    <input 
                        type="type" 
                        className="form-control"
                        name="type"
                        value={bin.type}
                        onChange={onInputChange}
                        required/>
                </div>
                <div className="form-group col-md-6">
                    <label>Tag</label>
                    <select 
                        className="form-control" 
                        onChange={(event) => {setBin({ ...bin, tag: event.target.value })}}
                        required
                        value={bin.tag}>
                        <option value="" disabled hidden>---</option>
                        {options.map(el => (
                            <option key={el.id} value={el.id}>{el.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label>Description</label>
                <input 
                    type="text" 
                    className="form-control"
                    name="description"
                    value={bin.description}
                    onChange={onInputChange}/>
            </div>
            
            <div className="button">
                <div className="form-group row">
                    <div className="col-md-9"></div>
                    <div className="col-md-1">
                    <button type="button" className="btn btn-light" onClick={cancel}>Cancel</button>
                    </div>
                    <div className="col-md-1">
                    <button type="button" className="btn btn-danger" onClick={remove}>Delete</button>
                    </div>
                    <div className="col-md-1">
                    <button type="button" className="btn btn-success" onClick={update}>Save</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default UpdateBin;
