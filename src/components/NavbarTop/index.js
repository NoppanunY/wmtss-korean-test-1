import React from 'react'
import "./style.css";

const NavbarTop = props => {
    return (
        <div>
            {/* <div className="row">
            <div className="col-sm-1"> 
                    <button className="btn btn-secondary1" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    </button>
                </div>       

                <div className="col-sm-3">
                    <div className="input-group" id="inputSearch">
                        <input className="form-control border-end-0 border" type="search" id="BoxinputS" />
                        <span className="input-group-append">
                            <button className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5" type="button">
                                <i className="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </div>
                
                <div className="col-1">
                    <button className="btn btn-light" type="button" id="btnNav">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                        </svg>
                    Groceries</button>
                </div>          
                <div className="col-1">
                    <button className="btn btn-light" type="button" id="btnNav">
                    <i className="fas fa-utensils"></i>
                    Restaurants</button>
                </div>
                
                <div className="col-1">
                    <button className="btn btn-light" type="button" id="btnNav">
                        <i className='fas fa-bed'></i>
                    Hotels</button>
                </div>
                <div className="col-1">
                    <button className="btn btn-light" type="button" id="btnNav">
                        <i className='fas fa-coffee'></i>
                    Coffee</button>
                </div>
                <div className="col-5"></div>
                
                </div>  */}
                

            <div className="topnav">
                <a className="btn-secondary1" onClick={() => {props.showSidebar({type: "MENU", active: true});}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </a>
                <a className="boxSearch">
                    <div className="search-container">
                        <form action="/action_page.php">
                        <input type="text" placeholder="Search.." name="search"/>
                        <button type="submit"><i className="fa fa-fw fa-search"></i></button>
                        </form>
                    </div>
                </a>
                <a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                    </svg> Groceries
                </a>
                <a><i className="fas fa-utensils"></i> Restaurants</a>
                <a><i className='fas fa-bed'></i> Hotels</a>
                <a><i className='fas fa-coffee'></i> Coffee</a>
            </div>
            
        </div>
    )
}

export default NavbarTop;
