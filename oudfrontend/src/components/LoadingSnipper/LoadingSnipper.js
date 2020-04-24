import React, { Component } from 'react'
import "./LoadingSnipper.css"

/**
 * component to render the loading snipper
 *
 * @author Abdallah Hemdan
 *
 * @component
 *
 */
class LoadingSnipper extends Component {
  /**
   * @function
   * @name render
   * @description Render all snipper items 
   *
   * @returns {JSX} Component for Home
  */
  render() {
    return (
      <div
        className="spinner"
        data-testid="snipper"
      >
        <div className="rect1" data-testid="snipper-1"></div>
        <div className="rect2" data-testid="snipper-2"></div>
        <div className="rect3" data-testid="snipper-3"></div>
        <div className="rect4" data-testid="snipper-4"></div>
        <div className="rect5" data-testid="snipper-5"></div>
      </div>
    )
  }
}

export default LoadingSnipper
