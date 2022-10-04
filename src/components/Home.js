import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import boardMan from '../assets/board-man-01.png'

const Home = () => {
    const [nickname, setNickname] = useState([localStorage.getItem('nickname') || "Stranger"]) 

    return (
        <main className='mainPage bg-half'>
            <img className="hidden lg:block" width="386" height="386" src={boardMan} alt="pencilMan" />
            <h1 className="intro">{ nickname }, Click you need.</h1>
            <div className="container">
                <div className="row panel">
                    <div className="col-sm-6 pos-rel">
                        <Link to="/login" className="item">
                            <figure className="content-wrap left-panel">
                                <figcaption>
                                    <h3 className="item-title">LOGIN</h3>
                                </figcaption>
                            </figure>
                        </Link>
                    </div>
                    <div className="col-sm-6">
                        <Link to="register" className="item">
                            <figure className="content-wrap right-panel">
                                <figcaption>
                                    <h3 className="item-title">REGISTER</h3>
                                </figcaption>
                            </figure>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home