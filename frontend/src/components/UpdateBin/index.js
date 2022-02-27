import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import DatePicker, { registerLocale} from "react-datepicker";
import Moment from 'moment';
import ptBR from 'date-fns/locale/pt-BR';
import axios from 'axios';

import {
    updateBin,
    deleteBin,
} from '../../services/actions/binAction';

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
        "1": {id: null, image: null},
        "2": {id: null, image: null},
        "3": {id: null, image: null},
        "4": {id: null, image: null},
        "5": {id: null, image: null},
    }
    const dispatch = useDispatch();

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
                const contentType = 'image/png';
                setSelectedImage({
                    "1" : {
                        id: res.data[0] ? res.data[0].id : null,
                        image: res.data[0] ? URL.createObjectURL(b64toBlob(res.data[0].image, contentType)) : null
                    },
                    "2" : {
                        id: res.data[1] ? res.data[1].id : null,
                        image: res.data[1] ? URL.createObjectURL(b64toBlob(res.data[1].image, contentType)) : null
                    },
                    "3" : {
                        id: res.data[2] ? res.data[2].id : null,
                        image: res.data[2] ? URL.createObjectURL(b64toBlob(res.data[2].image, contentType)) : null
                    },
                    "4" : {
                        id: res.data[3] ? res.data[3].id : null,
                        image: res.data[3] ? URL.createObjectURL(b64toBlob(res.data[3].image, contentType)) : null
                    },
                    "5" : {
                        id: res.data[4] ? res.data[4].id : null,
                        image: res.data[4] ? URL.createObjectURL(b64toBlob(res.data[4].image, contentType)) : null
                    },
                });
            })
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
        dispatch(deleteBin(bin.id));
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
        console.log("selectedImage",selectedImage);
        let imageBase64 = [];   
        for(const [key, value] of Object.entries(selectedImage)){
            if(value.image == null){
                break;
            }
            axios({
                method: "GET",
                url: value.image,
                responseType: "blob"
            }).then(function(response){
                var reader = new FileReader();
                reader.readAsDataURL(response.data);
                reader.onloadend = function () {
                    var base64data = reader.result;
                    base64data = base64data.substring(22);
                    imageBase64.push({"id": value.id, "image": base64data});
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
        
        dispatch(updateBin(bin.id, {...bin, 
            date: Moment(bin.date).format('YYYY-MM-DD'),
            time: Moment(bin.time).format('hh:mm:ss')
        }, imageBase64));

        props.setActiveModal({active: false });
    }

    const cancel = event => {
        event.preventDefault();
        props.setActiveModal({active: false });
    }

    const selectImage = (e, seq) => {
        // access to e.target here
        e.preventDefault();
        console.log(seq);
        if(e.target.files.length > 0){
            if(e.target.files.length > 0){
                for(const [key, value] of Object.entries(selectedImage)){
                    if(value.image == null){
                        setSelectedImage({ ...selectedImage, [key]: {"id": value.id, "image": URL.createObjectURL(e.target.files[0])} })
                        break;
                    }
                    if(seq === key){
                        setSelectedImage({ ...selectedImage, [seq]: {"id": value.id, "image": URL.createObjectURL(e.target.files[0])} })
                        break;
                    }
                }
            }
            // setSelectedImage({ ...selectedImage, [seq]: URL.createObjectURL(e.target.files[0])})
        }
        console.log(selectedImage);
        // console.log(file.files);
        // setSelectedImage({...selectedImage, })
        // var fileSelector = buildFileSelector();
        // fileSelector.click();
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
                                <img src={!selectedImage[key].image ? placeholder : selectedImage[key].image} 
                                    className="image-field float-left" 
                                    alt="..."/>                                
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
