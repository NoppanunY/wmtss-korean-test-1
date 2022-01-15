import React, { useState, useEffect } from 'react'
import DatePicker, { registerLocale} from "react-datepicker";
import Moment from 'moment';
import ptBR from 'date-fns/locale/pt-BR';

import {
    getTags
} from './../../app/api';

  
registerLocale('pt-BR', ptBR)

const CreateBin = props => {
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

    useEffect(() => {
        fetchTags();        
    }, [])

    const onInputChange = event => {
        const {name, value} = event.target;
        setBin({...bin, [name]: value});
    }

    const create = event => {
        let isValid = true;
        event.preventDefault();
        setIsSumnit("was-validated");
        // console.log(bin);
        
        // if(!bin["lat"]) return
        // if(typeof(bin["lat"]) !== "undefined") 
            if(!bin["lat"].match(regex.lat)) return

        // if(!bin["lng"]) return
        // if(typeof(bin["lng"]) !== "undefined") 
            if(!bin["lng"].match(regex.lng)) return
        
        props.createBin({...bin, 
            date: Moment(bin.date).format('YYYY-DD-MM'),
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
                        defaultValue={bin.tag}
                        onChange={(event) => {setBin({ ...bin, tag: event.target.value })}}
                        required>
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
            <div>
                <button type="button" className="btn btn-light" onClick={cancel}>Cancel</button>
                <button type="button" className="btn btn-secondary" onClick={clear}>Clear</button>
                <button type="button" className="btn btn-success" onClick={create}>Save</button>
            </div>
        </form>
    )
}

export default CreateBin;
