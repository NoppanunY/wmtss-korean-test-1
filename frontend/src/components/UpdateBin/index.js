import React, { useState, useEffect } from 'react'
import DatePicker, { registerLocale} from "react-datepicker";
import Moment from 'moment';
import ptBR from 'date-fns/locale/pt-BR';
import axios from 'axios';

import {
    getTags,
    getBinDetail,

    getImageBin
} from './../../app/api';

import placeholder from '../../assets/img/placeholder.png';

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

    const initialImage = {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
    }

    const [bin, setBin] = useState(initialData); 
    const [selectedImage, setSelectedImage] = useState(initialImage);

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

    const fetchBinImage = async () => {
        try {
            await getImageBin(props.criteria.id)
            .then((res) => {
                console.log("RES", res.data[0]);
                // res.data.forEach((element, index) => {
                //     let i = (index+1).toString();
                   
                //     setSelectedImage({...selectedImage, "2": element.image});
                // });

                setSelectedImage({
                    "1" : `data:image/png;base64,${res.data[0].image}`,
                    "2" : `data:image/png;base64,${res.data[1].image}`,
                    "3" : `data:image/png;base64,${res.data[2].image}`,
                    "4" : `data:image/png;base64,${res.data[3].image}`,
                    "5" : `data:image/png;base64,${res.data[4].image}`,
                });

                console.log("THEN", selectedImage);
            })
        } catch (err) {
            console.log(err);
        } finally {
            console.log("FINALLY", selectedImage);
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
        fetchBinImage();
        fetchTags();        
    }, [])

    const onInputChange = event => {
        const {name, value} = event.target;
        setBin({...bin, [name]: value});
    }

    const update = event => {
        // let isValid = true;
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
                    <label>Affiliation</label>
                    <input 
                        type="type" 
                        className="form-control"
                        name="type"
                        value={bin.type}
                        onChange={onInputChange}
                        required/>
                </div>
                <div className="form-group col-md-6">
                    <label>Type</label>
                    <select 
                        className="form-control" 
                        onChange={(event) => {setBin({ ...bin, tag: event.target.value })}}
                        required
                        value={bin.tag}>
                        <option value="" disabled hidden>---</option>
                        {options.map(el => (
                            <option key={el.id} value={el.id}> &#xF287; {el.name}</option>
                        ))}
                    </select>
                </div>
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
                                <img src={![key] ? placeholder : selectedImage[key]} 
                                    className="image-field float-left" 
                                    alt={selectedImage[key] }/>                                
                            </label>
                            <input type="file" id={"upload-button-" + key} style={{display: "none"}} onChange={((e) => selectImage(e, key))}/>
                        </div>
                    ))}
                </div>     
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={cancel}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={remove}>Delete</button>
                <button type="button" className="btn btn-success" onClick={update}>Save</button>
            </div>
        </form>
    )
}

export default UpdateBin;
