import React, { Component } from 'react'
import "./Card.css"
import Icon1 from "./icons8-circled-play-96.png"
import { Link } from "react-router-dom"
class A extends Component {
    render() {
        return (
            <div className="row">
                <div className="small-7 medium-5 large-4 column end small-centered card">
                    <div className="card-top">
                        <Link to="/playlist">
                            <div className="overlay">
                                <h1>MUSIC</h1>
                            </div>
                        </Link>
                        <img
                            className="card-img"
                            src={this.props.img}
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                            alt="card"
                        />

                    </div>
                    <div className="triangle">
                        <div className="circle-button" id="circleDrop">
                            <img
                                className="close"
                                src={Icon1}
                                alt="circle button"

                            />
                        </div>
                    </div>
                    <div className="card-bottom">
                        <h2 className="card-title text-center">Amr Diab</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default A
