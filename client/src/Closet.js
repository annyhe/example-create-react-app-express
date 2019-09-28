import React, { Component } from 'react'
import './index.css'

// Integer param
// returns 0 to endsAt - 1
function getRandom(endsAt) {
    return Math.floor(Math.random() * endsAt)
}  

// TODO: make this more dumb: pass in the top, bottom, and dress URL
class PantsOrDress extends Component {
    render() {
        const { top, bottom, dress } = this.props;
        const _div = this.props.pantsOrDress ? (
            <div>
                <img className="tops" src={top} />
                <img
                    className="bottom"
                    src={bottom}
                />
            </div>
        ) : (
            <div>
                <img
                    className="dress"
                    src={dress}
                />
            </div>
        )

        return { ..._div }
    }
}

class DisplayCombination extends Component {
    render() {
        const { jacket, shoes, handbag, children } = this.props
        return (
            <div className="imageContainer">
                <img className="jacket" src={jacket} />
                {children}
                <img className="shoes" src={shoes} />
                <img className="handbag" src={handbag} />
                <button>Save combination</button>
            </div>
        )
    }
}

export default class Closet extends Component {
    state = {
        pantsOrDress: true,
    }
    togglePantsOrDress = () => {
        this.setState({ pantsOrDress: !this.state.pantsOrDress })
    }
    render() {
        const { renderNum, jacket, shoes, handbag, top, bottom, dress } = this.props
        const arr = []
        // TODO: refactor this to fill up empty array with obj
        let counter = renderNum
        if (!jacket) {
            return <p>Waiting</p>;
        }

        while (counter > 0) {
            arr.push({
                jacket: jacket[getRandom(jacket.length)].url,
                pantsOrDress: this.state.pantsOrDress,
                shoes: shoes[getRandom(shoes.length)].url,
                handbag: handbag[getRandom(handbag.length)].url,
                top: top[getRandom(top.length)].url,
                bottom: bottom[getRandom(bottom.length)].url,
                dress: dress[getRandom(dress.length)].url,
            })
            counter -= 1
        }

        return (
            <div>
                <h1>Closet idea generation</h1>
                <p>
                    <button onClick={this.togglePantsOrDress}>
                        Change to{' '}
                        {!this.state.pantsOrDress ? 'top and pants' : 'dress'}
                    </button>
                </p>
                {arr.map((obj, index) => (
                    <DisplayCombination key={index} {...obj}>
                        <PantsOrDress top={obj.top} 
                        bottom={obj.bottom}
                        dress={obj.dress}
                        pantsOrDress={obj.pantsOrDress} />
                    </DisplayCombination>
                ))}
            </div>
        )
    }
}
