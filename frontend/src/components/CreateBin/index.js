import React, { useState, useEffect, useRef } from 'react'
import DatePicker, { registerLocale} from "react-datepicker";
import Moment from 'moment';
import ptBR from 'date-fns/locale/pt-BR';
import axios from 'axios';

import {
    getTags
} from './../../app/api';

import placeholder from '../../assets/img/placeholder.png';
import "./style.css";

import Select from 'react-select';

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

    const initialImage = {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
    }

    const icon = [
        {
          value: 1,
          text: 'Up Arrow',
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
          </svg>
        },
        {
          value: 2,
          text: 'Down Arrow',
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
          </svg>
        },
        {
          value: 3,
          text: 'Left Arrow',
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
          </svg>
        },
        {
          value: 4,
          text: 'Right Arrow',
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
        }
      ];

    const [bin, setBin] = useState(initialData); 
    const [selectedImage, setSelectedImage] = useState(initialImage);

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
        // let isValid = true;
        // console.log(bin);
        console.log(selectedImage);
        let imageBase64 = [];
        for(const [key, value] of Object.entries(selectedImage)){
            if(value == null){
                break;
            }
            axios({
                method: "GET",
                url: value,
                responseType: "blob"
            }).then(function(response){
                var reader = new FileReader();
                reader.readAsDataURL(response.data);
                reader.onloadend = function () {
                    var base64data = reader.result;
                    base64data = base64data.substring(22);
                    imageBase64.push({"bin": null, "image": base64data});
                    // imageBase64['' + key] = base64data;
                }
            })
        }
        // axios({
        //     methos: "get",
        //     url: selectedImage["1"],
        //     responseType: "blob"
        // }).then(function(response){
        //     var reader = new FileReader();
        //     reader.readAsDataURL(response.data);
        //     reader.onloadend = function () {
        //         var base64data = reader.result;
        //         base64data = base64data.substring(22);
        //         axios({
        //             method: "POST",
        //             url: "api/image/",
        //             data: [{
        //                     "image": base64data,
        //                     "bin": 1
        //                 },
        //                 {
        //                     "image": base64data,
        //                     "bin": 1
        //                 }]
        //         }).then((res) => {
        //             console.log("Complete");
        //         }).catch((err) => {
        //             console.log(err);
        //         })
        //     };
        // });

        // console.log(bin);
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
            date: Moment(bin.date).format('YYYY-MM-DD'),
            time: Moment(bin.time).format('hh:mm:ss')
        }, imageBase64);

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

    function buildFileSelector(){
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        return fileSelector;
    }

    const selectImage = (e, seq) => {
        // access to e.target here
        // e.preventDefault();
        console.log(seq);
        if(e.target.files.length > 0){
            setSelectedImage({ ...selectedImage, [seq]: URL.createObjectURL(e.target.files[0])})
        }
        console.log(selectedImage);
        // console.log(file.files);
        // setSelectedImage({...selectedImage, })
        // var fileSelector = buildFileSelector();
        // fileSelector.click();
    }

    // const seleteImage = (e: React.ChangeEvent<HTMLInputElement>, data): void => {
    //     const files = Array.from(e.target.files)
    //     console.log("files:", files)
    //   }

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
                    {/* <Select
                        placeholder="Select Option"
                        value={bin.tag}
                        options={icon}
                        onChange={(event) => {setBin({ ...bin, tag: event })}}
                        getOptionLabel={e => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {e.icon}
                                <span style={{ marginLeft: 5 }}>{e.text}</span>
                            </div>
                        )}
                    /> */}
                    <select 
                        className="form-control" 
                        onChange={(event) => {setBin({ ...bin, tag: event.target.value })}}
                        required
                        value={bin.tag}>
                        <option value="" disabled hidden>---</option>
                        {options.map(el => (
                            <option key={el.id} value={el.id}>
                                
                                {el.name}
                            </option>
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
            <div className="form-row">
                <div className="from-group">
                    {Object.keys(selectedImage).map((key, i) => (
                        <div key={key}>
                            <label htmlFor={"upload-button-" + key} style={{display: "inline"}}>
                                <img src={!selectedImage[key] ? placeholder : selectedImage[key]} 
                                    className="image-field float-left" 
                                    alt={selectedImage[key] }/>                                
                            </label>
                            <input type="file" id={"upload-button-" + key} style={{display: "none"}} onChange={((e) => selectImage(e, key))}/>
                        </div>
                    ))}
                </div>     
            </div>
            <div className="button">
                <div className="form-group row">
                    <div className="col-md-9"></div>
                    <div className="col-md-1">
                        <button type="button" className="btn btn-light" onClick={cancel}>Cancel</button>
                    </div>
                    <div className="col-md-1">
                        <button type="button" className="btn btn-secondary" onClick={clear}>Clear</button>
                    </div>
                    <div className="col-md-1">
                        <button type="button" className="btn btn-success" onClick={create}>Save</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateBin;
