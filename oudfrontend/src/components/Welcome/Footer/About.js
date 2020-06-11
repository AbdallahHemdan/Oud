import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';

import './../welcome.css';
class About extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container aboutSection">
          <div className="Help_text">
            <h1 className="AboutHead">About US </h1>
            <p className="AboutPara">
              With OUD, it’s easy to find the right music or podcast for every
              moment – on your phone, your computer, your tablet and more. There
              are millions of tracks and episodes on OUD. So whether you’re
              behind the wheel, working out, partying or relaxing, the right
              music or podcast is always at your fingertips. Choose what you
              want to listen to, or let OUD surprise you. You can also browse
              through the collections of friends, artists, and celebrities, or
              create a radio station and just sit back. Soundtrack your life
              with OUD. Subscribe or listen for free.
            </p>
            <h1 className="AboutHead">Customer Service and Support</h1>
            <p>
              <ul>
                <li className="AboutPara">
                  <a href="/help">Help site.</a> Check out our help site for
                  answers to your questions and to learn how to get the most out
                  of OUD and your music.
                </li>
                <li className="AboutPara">
                  Community. Get fast support from expert OUD users. If there
                  isn't already an answer there to your question, post it and
                  someone will quickly answer. You can also suggest and vote on
                  new ideas for OUD or simply discuss music with other fans.
                </li>
                <li className="AboutPara">
                  <a href="/contactus">Contact us.</a> Contact our Customer
                  Support if you don't find a solution on our support site or
                  Community.
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    );
  }
}


export default About;