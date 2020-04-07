import React, { Component } from 'react'
import Sidebar from "../../components/Home/Sidebar/Sidebar"
import Navbar from "../../components/Home/Navbar/Navbar";
import "./Search.css"

class Search extends Component {
    render() {
        return (
            <div>
                <Sidebar />
                <Navbar />
                <section className="main-content">
                    <section className="music-component main">
                        <div className="toto">Genres & Modes</div>
                        <h3>Welcome to search page</h3>
                    </section>
                </section>
            </div>
        )
    }
}

export default Search
