import React, { Component } from 'react'

import './App.css'
import FavoriteContainer from './FavoriteContainer'
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

class App extends Component {
    state = {
        response: {},
        post: '',
        responseToPost: '',
        favorites: {}, // {combination1: true, comb2: true, ...}
    }
    componentDidMount() {
        Promise.all([
            this.callApi('/api/hello'),
            this.callApi('/api/favorites'),
        ])
            .then(([one, two]) => {
                // TODO: show UI message: no records returned
                if (!one.express) return
                const obj = groupArrByType(one.express)
                const favorites = {}
                two.favorites.forEach(
                    obj => (favorites[obj.combination] = true)
                )
                this.setState({ response: obj, favorites })
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

    toggleFavorite = e => {
        const id = e.target.dataset.id
        const copyFavorites = JSON.parse(JSON.stringify(this.state.favorites))
        // if key was in there AND it was true, delete it, else set to true
        if (copyFavorites.hasOwnProperty(id) && copyFavorites[id]) {
            delete copyFavorites[id]
        } else {
            copyFavorites[id] = true
        }

        this.handleSubmit(id, copyFavorites[id])
        this.setState({ favorites: copyFavorites })
    }
    render() {
        return (
            <div className="App">
                {this.state.responseToPost}
                <FavoriteContainer
                    toggleFavorite={this.toggleFavorite}
                    favorites={this.state.favorites}
                    {...this.state.response}
                />
                <Closet
                    favorites={this.state.favorites}
                    toggleFavorite={this.toggleFavorite}
                    {...this.state.response}
                    renderNum={5}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}

export default App
