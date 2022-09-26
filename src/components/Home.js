import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import boardMan from '../assets/board-man-01.png'

const Home = () => {

    return (
        <main className='mainPage bg-half'>

            <img className="hidden lg:block" width="386" height="386" src={boardMan} alt="pencilMan" />
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 pos-rel">
                        <a href="#" className="item">
                            <figure className="content-wrap left-panel">
                                <figcaption>
                                    <h3 className="item-title">Sell</h3>
                                </figcaption>
                            </figure>
                        </a>
                    </div>
                    <div className="col-sm-6">
                        <a href="#" className="item">
                            <figure className="content-wrap right-panel">
                                <figcaption>
                                    <h3 className="item-title">Buy</h3>
                                </figcaption>
                            </figure>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home