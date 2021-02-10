import React from 'react';
import { Link } from 'react-router-dom';
import './Setting/Setting';

function AdminHome() {


   return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                </li>
                                <li className="nav-item">
                                    <Link to='Setting'>Setting</Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </header>
            <section>
                <h1>Home Admin</h1>
            </section>
        </div>
    )
}
export default AdminHome;