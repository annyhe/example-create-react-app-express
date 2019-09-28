import React, { Component } from "react";

import logo from "./logo.svg";

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

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.state.post })
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    // const {jackets, tops, bottoms, shoes, handbags} = this.state.response;
    return (
      <div className="App">
        <Closet {...this.state.response} renderNum={5} />
      </div>
    );
  }
}

export default App;
