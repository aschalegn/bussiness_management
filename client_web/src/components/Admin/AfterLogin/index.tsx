import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { userContext } from '../../../context/User';
import './adminHome.css';

const Home = () => {
    const { user } = useContext(userContext)
    return (
        <>
            <header className='adminHeader'>
                <h1>{user.name}</h1>

                <img src="./logo.jpg" alt="logo" />
            </header>
            <main>
                <div className="grid-container">
                    <div className="grid-item">
                         <Link to="">
                        <button >1</button>
                      </Link> 
                    </div>
                    
                    <div className="grid-item">
                         <Link to="">
                        <button >1</button>
                      </Link> 
                    </div>
                    <div className="grid-item">
                         <Link to="">
                        <button >1</button>
                      </Link> 
                    </div>
                    <div className="grid-item">
                         <Link to="">
                        <button >1</button>
                      </Link> 
                    </div>
                    <div className="grid-item">
                         <Link to="">
                        <button >1</button>
                      </Link> 
                    </div>
                    <div className="grid-item">
                         <Link to="">
                        <button >1</button>
                      </Link> 
                    </div>
                    <div className="grid-item">
                         <Link to="">
                        <button >1</button>
                      </Link> 
                    </div>
                    <div className="grid-item">
                         <Link to="">
                        <button >1</button>
                      </Link> 
                    </div>
                    <div className="grid-item">
                         <Link to="">
                        <button >1</button>
                      </Link> 
                    </div>
                </div>
            </main>
        </>
    );
}
export default Home