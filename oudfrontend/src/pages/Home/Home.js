import React, { Component } from "react";
import "./Home.css";
import Sidebar from "../../components/Home/Sidebar/Sidebar";
import Navbar from "../../components/Home/Navbar/Navbar";
import MusicItem from "../../components/Home/MusicItem/MusicItem";
import axios from "axios"

let fetchCategoriesUrl = "http://localhost:2022/categories?limit=50";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      limit: 0,
      offset: 0,
      total: 0
    }
  }

  handleStoringData = ({ items, limit, offset, total }) => {
    this.setState({ items, limit, offset, total });
    console.log(this.state)
  }

  componentDidMount() {
    // get all categories
    axios.get(fetchCategoriesUrl)
      .then((result) => {
        this.handleStoringData(result.data);
      }).catch((err) => {
        console.log(err)
      });
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Navbar />
        <section className="main-content">
          <section className="music-component main">
            {
              this.state.items.map((item, index) => {
                return (
                  <MusicItem item={item} key={index} />
                )
              })
            }
          </section>
        </section>
      </div>
    );
  }
}

export default Home;
