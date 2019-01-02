import React, { Component } from "react";
import Card from "./components/Card";
import "./css/style.css";

class Main extends Component {
  constructor(props) {
    super(props);
    let cards = [];
    for (var i = 0; i < 4; i++) {
      cards.push({ id: i, status: "inactive" });
    }
    this.state = { cards, isLoading: false };
    this.addCard = this.addCard.bind(this);
    this.getImagesOfDogs = this.getImagesOfDogs.bind(this);
  }

  // When a card is clicked
  // Go through all the cards, for the selected card change the property to active
  // Else set it to inactive
  activateCard = card => {
    let cards = this.state.cards;

    for (var i = 0; i < cards.length; i++) {
      if (cards[i].id === card.id) {
        cards[i].status = "active";
      } else {
        cards[i].status = "inactive";
      }
    }
    this.setState({
      cards
    });
  };

  addCard(e) {
    let cards = this.state.cards;
    let numberOfCards = cards.length;

    cards.push({
      id: numberOfCards,
      status: "inactive"
    });

    this.setState({
      cards
    });
  }

  getImagesOfDogs() {
    this.setState({
      isLoading: true
    });
    let cards = this.state.cards;
    let numberOfCards = cards.length;
    const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
    const shibuURL = `http://shibe.online/api/shibes?count=${numberOfCards}&urls=true&httpsUrls=true`;

    fetch(corsAnywhere + shibuURL, {
      method: "GET"
    })
      .then(response => response.json())
      .then(url => {
        for (var i = 0; i < cards.length; i++) {
          cards[i].image = url[i];
        }
        this.setState({
          cards,
          isLoading: false
        });
      })
      .catch(error => console.log("error in getting images"));
  }

  render() {
    const cards = this.state.cards.map(card => (
      <li
        className={"card" + " " + card.status}
        key={card.id}
        onClick={() => this.activateCard(card)}>
        <Card id={card.id} status={card.status} image={card.image}>
          {card.id}
        </Card>
      </li>
    ));
    return (
      <div>
        <h1 className="center">Adrian's Card App</h1>
        <p className="center">Click a card to make it active!</p>
        <ul>{cards}</ul>

        {this.state.isLoading === true && (
          <div className="center">LOADING IMAGES....</div>
        )}
        <div className="buttons">
          <button onClick={this.addCard} type="button">
            Add card
          </button>
          <button onClick={this.getImagesOfDogs} type="button">
            Populate cards with images!
          </button>
        </div>
      </div>
    );
  }
}

export default Main;
