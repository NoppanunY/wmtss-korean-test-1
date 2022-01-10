import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker, { registerLocale} from "react-datepicker";
import { Modal, Form, Row, Col, Container, Button, Image} from 'react-bootstrap';
import Moment from 'moment';
import ptBR from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR)

export const ModalForm = ({handleClose, show}) => {
    const [options, setOptions] = useState([]);
    const [error, setError] = useState(null);
    
	const [data, setData] = useState({
		"lat": "",
		"lng": "",
		"location": "",
		"type": "",
		"date": new Date(),
		"time": new Date(),
		"description": "",
		"tag": 'default'
	})

    useEffect(() => {
        async function getOptions(){
            await axios.get('api/tag/')
            .then((response) => {
                setOptions(response.data);
				console.log("Fetch")
            })
            .catch(error => {
                setError(error);
            })
        }
        getOptions();
    }, [show])

    function add(){
        console.log(data);
        axios.post('api/bin/',{
          "lat": data.lat,
          "lng": data.lng,
          "location": data.location,
          "type": data.type,
          "date": Moment(data.date).format('YYYY-DD-MM'),
          "time": Moment(data.time).format('hh:mm:ss'),
          "description": data.description,
          "tag": data.tag
        })
        .then(() => {
			clear()
          	handleClose()
        })
    }
	
	function clear(){
		setData({
			"lat": "",
			"lng": "",
			"location": "",
			"type": "",
			"date": new Date(),
			"time": new Date(),
			"description": "",
			"tag": 'default'
		})
		console.log(data);
	}
	
    if (error) return `Error : ${error.message}`;

    return (
        <Modal size="lg" show={show} onHide={handleClose} aria-labelledby="example-modal-sizes-title-lg">
			<Modal.Header>
				<Modal.Title id="example-modal-sizes-title-lg">
					Rubbish bin location
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Form id="create-course-form">
						<Row className="mb-3">
							<Form.Group as={Col} className="md-6">
								<Form.Label>Latitude</Form.Label>
								<Form.Control value={data.lat} onChange={(event) => {setData({...data, lat: event.target.value})}}/>
							</Form.Group>
							<Form.Group as={Col} className="md-6">
								<Form.Label>Latitude</Form.Label>
								<Form.Control value={data.lng} onChange={(event) => {setData({...data, lng: event.target.value})}}/>
							</Form.Group>
						</Row>
						<Row className="mb-3">
							<Form.Group>
								<Form.Label>Location</Form.Label>
								<Form.Control value={data.location} onChange={(event) => {setData({...data, location: event.target.value})}}/>
							</Form.Group>
						</Row>
						<Row className="mb-3">
							<Form.Group as={Col} className="md-6">
								<Form.Label>Date</Form.Label>
								<DatePicker className="form-control" selected={data.date} onChange={(event) => {setData({...data, date: event})}}/>
							</Form.Group>
							<Form.Group as={Col} className="md-6">
								<Form.Label>Time</Form.Label>
								<DatePicker
									className="form-control"
									selected={data.time}
									onChange={(event) => {setData({...data, time: event})}}
									locale="pt-BR"
									showTimeSelect
									showTimeSelectOnly
									timeCaption="Time"
									dateFormat="pp"
								/>
							</Form.Group>
						</Row>
						<Row className="mb-3">
							<Form.Group as={Col} className="md-6">
								<Form.Label>Type</Form.Label>
								<Form.Control value={data.type} onChange={(event) => {setData({...data, type: event.target.value})}}/>
							</Form.Group>
							<Form.Group as={Col} className="md-6">
								<Form.Label>Tag</Form.Label>
								<Form.Select defaultValue={data.tag} onChange={(event) => {setData({...data, tag: event.target.value})}}>
									<option value="default" disabled hidden>---</option>
									{options.map((option) => 
										<option key={option.id} value={option.id}>{option.name}</option>
									)}
								</Form.Select>
							</Form.Group>
						</Row>
						<Row className="mb-3">
							<Form.Group>
								<Form.Label>Description</Form.Label>
								<Form.Control value={data.description} onChange={(event) => {setData({...data, description: event.target.value})}}/>
							</Form.Group>
						</Row>
						<Row className="mb-3">
							{/* <Image roundedCircle="true" src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></Image> */}
						</Row>
						<Row className="mb-3 justify-content-md-end">
							<Button as={Col} lg="2" variant="link" size="sm" onClick={() => {clear(); handleClose();}}>Cancel</Button>{' '}
							<Button as={Col} lg="2" variant="secondary" size="sm" onClick={clear}>Clear</Button>{' '}
							<Button type="submit" as={Col} lg="2" variant="success" size="sm" onClick={add} >Save</Button>{' '}
						</Row>
					</Form>
				</Container>
			</Modal.Body>
        </Modal>
    )
}
