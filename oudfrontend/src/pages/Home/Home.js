import React, { Component } from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import MusicItem from "../../components/MusicItem/MusicItem";

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [{
        itemName: "Recently played"
      },
      {
        itemName: "Recommended playlists"
      },
      {
        itemName: "New releases"
      },
      {
        itemName: "Arabic"
      },
      {
        itemName: "Throwback"
      },

      ]
    }
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
                  <MusicItem itemName={item.itemName} key={index} />
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
