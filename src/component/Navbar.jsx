import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <Fragment>
            <header>
                <Link to="/" className="logo">work-io</Link>
                <nav>
                    <ul>
                        <li>
                            <Link to={'/'}>Add</Link>
                        </li>
                        <li>
                            <Link to={'/profiles'}>Profiles</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </Fragment>
    )
}

export default Navbar