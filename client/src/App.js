import React, { Component } from "react";

import "./App.css";
import Closet from "./Closet";

function groupArrByType(arr) {
  const obj = {};
  arr.forEach((row) => {
    if (obj.hasOwnProperty(row.type)) {
      obj[row.type].push(row)
    } else {
      obj[row.type] = [row];
    }
  })
  return obj;
}

class App extends Component {
  state = {
    response: {},
    post: "",
    responseToPost: ""
  };
  componentDidMount() {
    this.callApi()
      .then(res => {
        // TODO: show UI message: no records returned
        if (!res.express) return;
        const obj = groupArrByType(res.express)
        this.setState({ response: obj });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async (outfitID, bool) => {
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: outfitID, isFavorite: bool })
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className="App">
        {this.state.responseToPost}
        <Closet {...this.state.response} renderNum={5} handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;
