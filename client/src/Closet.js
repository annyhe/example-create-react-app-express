import React, { Component } from 'react'
import DisplayCombination from './DisplayCombination'
import PantsOrDress from './PantsOrDress'
import './index.css'

// Integer param
// returns 0 to endsAt - 1
function getRandom(endsAt) {
    return Math.floor(Math.random() * endsAt)
}
const DELIMITER = '#'

export default class Closet extends Component {
    state = {
        pantsOrDress: true,
        arr: [],
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
        const {
            jacket,
            shoes,
            handbag,
            top,
            bottom,
            dress,
            renderNum,
        } = this.props
        const arr = []
        let counter = renderNum
        if (!jacket) {
            return
        }

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

            // only push and increment iff combination is not in favorites
            const results = Object.keys(this.props.favorites).filter(
                key => key === obj.id
            )
            if (!results.length) {
                arr.push(obj)
                counter -= 1
            }
        }

        this.setState({ arr: arr })
    }
    togglePantsOrDress = () => {
        this.setState({ pantsOrDress: !this.state.pantsOrDress })
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
                        isFavorite={this.props.favorites[obj.id]}
                        name={obj.id}
                        key={index}
                        {...obj}
                        toggleFavorite={this.props.toggleFavorite}
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
