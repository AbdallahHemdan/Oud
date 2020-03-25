import React, { Component } from "react";
import "./Home.css";
import Sidebar from "../../components/Home/Sidebar/Sidebar";
import Navbar from "../../components/Home/Navbar/Navbar";
import MusicItem from "../../components/Home/MusicItem/MusicItem";
import axios from "axios"

let fetchCategoriesUrl = "http://localhost:2022/categories?limit=50";

function MainContent({ items }) {
  return (
    <section className="main-content">
      <section className="music-component main">
        {
          items.map((item, index) => {
            return (
              <MusicItem item={item} key={index} />
            )
          })
        }
      </section>
    </section>
  )
}

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
  }

  componentDidMount() {
    // get all categories
    axios.get(fetchCategoriesUrl)
      .then((result) => {
        console.log(result)
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
        <MainContent items={this.state.items} />
      </div>
    );
  }
}

export default Home;
