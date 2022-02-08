import React from 'react'
import "./style.css";

const NavbarTop = props => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light" id="nav1">
                <div className="row">
                    <form className="form-inline">
                    <div className="col-1"> 
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>                  
                    <div className="col-4">
                        {/* <form className="form-inline"> */}
                            <div className="input-group" id="inputSearch">
                                <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" id="inputSrarch"/>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" id="iconSearch"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
                                    </button>
                                </div>
                            </div>
                        {/* </form> */}
                    </div>
                    
                    <div className="col"><button className="btn btn-light" type="button" id="btnNav">Groceries</button></div>          
                    <div className="col"><button className="btn btn-light" type="button" id="btnNav">Restaurants</button></div>
                    <div className="col"><button className="btn btn-light" type="button" id="btnNav">Hotels</button></div>
                    <div className="col"><button className="btn btn-light" type="button" id="btnNav">Coffee</button></div>
                    
                    </form>
                </div> 
                {/* layout */}
            </nav>
        </div>
    )
}

export default NavbarTop;
