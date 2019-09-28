import React, { Component } from 'react'
import './index.css'

// Integer param
// returns 0 to endsAt - 1
function getRandom(endsAt) {
    return Math.floor(Math.random() * endsAt)
}
const DELIMITER = '#'
const NUM_TO_RENDER = 5

class PantsOrDress extends Component {
    render() {
        const { top, bottom, dress } = this.props
        const _div = top ? (
            <div>
                <img className="tops" src={top} />
                <img className="bottom" src={bottom} />
            </div>
        ) : (
            <div>
                <img className="dress" src={dress} />
            </div>
        )

        return { ..._div }
    }
}

class DisplayCombination extends Component {
    render() {
        const {
            jacket,
            shoes,
            handbag,
            children,
            name,
            isFavorite,
            toggleFavorite,
        } = this.props
        let heartClass = 'heart'
        if (isFavorite) heartClass += ' active'
        return (
            <div className={'imageContainer ' + name}>
                <img className="jacket" src={jacket} />
                {children}
                <img className="shoes" src={shoes} />
                <img className="handbag" src={handbag} />
                <button onClick={toggleFavorite} className={heartClass}>
                    &#9829;
                </button>
            </div>
        )
    }
}

export default class Closet extends Component {
    state = {
        pantsOrDress: true,
        arr: [],
        favoritesObj: {},
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            (this.props.jacket !== prevProps.jacket && this.props.jacket) ||
            this.state.pantsOrDress != prevState.pantsOrDress
        ) {
            this.refreshItems()
        }
    }
    refreshItems = () => {
        const { jacket, shoes, handbag, top, bottom, dress } = this.props
        const arr = []
        // TODO: refactor this to fill up empty array with obj
        let counter = NUM_TO_RENDER
        if (!jacket) {
            return
        }
        const copyFavorites = JSON.parse(
            JSON.stringify(this.state.favoritesObj)
        )
        while (counter > 0) {
            const _jacket = jacket[getRandom(jacket.length)]
            const _shoes = shoes[getRandom(shoes.length)]
            const _handbag = handbag[getRandom(handbag.length)]
            const obj = {
                jacket: _jacket.url,
                shoes: _shoes.url,
                handbag: _handbag.url,
                id:
                    _jacket.id +
                    DELIMITER +
                    _shoes.id +
                    DELIMITER +
                    _handbag.id +
                    DELIMITER,
            }

            if (this.state.pantsOrDress) {
                const _top = top[getRandom(top.length)]
                const _bottom = bottom[getRandom(bottom.length)]
                obj.top = _top.url
                obj.bottom = _bottom.url
                obj.id += _top.id + DELIMITER + _bottom.id
            } else {
                const _dress = dress[getRandom(dress.length)]
                obj.dress = _dress.url
                obj.id += _dress.id
            }

            arr.push(obj)
            copyFavorites[obj.id] = false
            counter -= 1
        }
        this.setState({ arr: arr, favoritesObj: copyFavorites })
    }
    togglePantsOrDress = () => {
        this.setState({ pantsOrDress: !this.state.pantsOrDress })
    }
    toggleFavorite = e => {
        const id = e.target.parentNode.className.split(' ')[1]
        const copyFavorites = JSON.parse(
            JSON.stringify(this.state.favoritesObj)
        )
        copyFavorites[id] = !copyFavorites[id]
        this.setState({ favoritesObj: copyFavorites })
    }
    render() {
        return (
            <div>
                <h1>Closet idea generation</h1>
                <p>
                    <button onClick={this.togglePantsOrDress}>
                        Change to{' '}
                        {!this.state.pantsOrDress ? 'top and pants' : 'dress'}
                    </button>
                </p>
                {this.state.arr.map((obj, index) => (
                    <DisplayCombination
                        isFavorite={this.state.favoritesObj[obj.id]}
                        name={obj.id}
                        key={index}
                        {...obj}
                        toggleFavorite={this.toggleFavorite}
                    >
                        <PantsOrDress
                            top={obj.top}
                            bottom={obj.bottom}
                            dress={obj.dress}
                        />
                    </DisplayCombination>
                ))}
            </div>
        )
    }
}
