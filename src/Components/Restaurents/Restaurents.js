import React, { Component } from "react";
import RestaurentDataList from "./../../restaurent-data.json";
import Restaurent from "../Restaurent/Restaurent";

class Restaurents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.category,
      restaurentList: Restaurents.getRestautentList(this.props.category),
      totalItems: 5,
      moreItemExist: true
    };
  }
  componentDidMount() {
    const something = Restaurents.getRestautentList();
    this.setState({ restaurantList: something });
  }
  static getDerivedStateFromProps(props, current_state) {
    if (current_state.category !== props.category) {
      return {
        category: props.category,
        restaurentList: Restaurents.getRestautentList(props.category),
      }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.setState({
        category: this.props.category
      })
    }
  }
  /* componentWillReceiveProps(nextProps) {
    this.setState({ restaurantList: this.getRestautentList() });
  } */
  static getRestautentList(category) {
    for (let categoryObj of RestaurentDataList) {
      if (categoryObj.category === category) {
        return categoryObj.restaurantList;
      }
    }
  }
  renderRestaurent() {
    let restaurentElemList = [];
    for (let i = 0; i < this.state.totalItems; i++) {
      if (this.state.restaurentList[i]) {
        restaurentElemList.push(
          <div className="col-sm-4 mt-2"><Restaurent
            name={this.state.restaurentList[i].name}
            ratings={this.state.restaurentList[i].ratings}
            foodTypes={this.state.restaurentList[i].food_types}
            isExclusive={this.state.restaurentList[i].isExlusive}
            delvTime={this.state.restaurentList[i].delivery_time}
            priceForTwo={this.state.restaurentList[i].price_for_two}
            key={this.state.category + this.state.restaurentList[i].name}
          /></div>)
      } else {
        return restaurentElemList;
      }
    }
    return restaurentElemList;

  }
  loadFiveMore() {
    debugger
    this.setState({ totalItems: this.state.totalItems + 6 });
    debugger
  }
  render() {
    return (
      <section>
        <div className="row mt-1">
          {this.renderRestaurent()}
          <div className="col-sm-4">
            <button type="button" onClick={() => this.loadFiveMore()}>Lod 6 more</button>
          </div>
        </div>
      </section>
    );
  }
}

export default Restaurents;