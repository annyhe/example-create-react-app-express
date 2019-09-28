import React, { Component } from 'react'

import './App.css'
import Closet from './Closet'

function groupArrByType(arr) {
    const obj = {}
    arr.forEach(row => {
        if (obj.hasOwnProperty(row.type)) {
            obj[row.type].push(row)
        } else {
            obj[row.type] = [row]
        }
    })
    return obj
}

// // given all clothing items and favorites, render favorites
// class Favorites extends Component() {
//     render() {
//         // [{"id":1,"combination":"14#1#9#16#7"},{"id":2,"combination":"13#1#10#17#5"},{"id":3,"combination":"12#4#9#16#7"},{"id":5,"combination":"12#4#9#17#5"},{"id":6,"combination":"14#2#10#16#7"},{"id":7,"combination":"13#2#9#16#7"}]
//         return <div>hello</div>
//     }
// }
class App extends Component {
    state = {
        response: {},
        post: '',
        responseToPost: '',
        favorites: [],
    }
    componentDidMount() {
        Promise.all([
            this.callApi('/api/hello'),
            this.callApi('/api/favorites'),
        ])
            .then(([one, two]) => {
                console.log(JSON.stringify(two.favorites))
                // TODO: show UI message: no records returned
                if (!one.express) return
                const obj = groupArrByType(one.express)
                this.setState({ response: obj, favorites: two.favorites })
            })
            .catch(err => console.log(err))
    }

    callApi = async url => {
        const response = await fetch(url)
        const body = await response.json()

        if (response.status !== 200) throw Error(body.message)

        return body
    }

    handleSubmit = async (outfitID, bool) => {
        const response = await fetch('/api/world', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: outfitID, isFavorite: bool }),
        })
        const body = await response.text()

        this.setState({ responseToPost: body })
    }

    render() {
        return (
            <div className="App">
                {this.state.responseToPost}
                <Closet
                    {...this.state.response}
                    renderNum={5}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}

export default App
