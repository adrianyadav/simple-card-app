import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <p>
        <span> {this.props.id + 1}</span>

        {this.props.image !== undefined && (
          <img src={this.props.image} alt="dog" />
        )}
      </p>
    );
  }
}

export default Card;
