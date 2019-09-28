import React, { Component } from 'react'
import './index.css'

// Integer param
// returns 0 to endsAt - 1
function getRandom(endsAt) {
    return Math.floor(Math.random() * endsAt)
}
const shoes = [
    // korks black booties
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/07/24/5d38d78c1153ba071a94ee0b/m_5d38d7aeadb58dbeee6dd2d6.jpg',
    'https://m.media-amazon.com/images/I/61ZoPH1UygL._SR500,500_.jpg',
    // red booties
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/06/28/5d1671d219c157100dd6053f/m_5d1671f6afade89aecacde86.jpg',
    // red beautifeel
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/07/04/5d1e03dfbbf0768c475766bf/m_5d1e03ea79df27b717504250.jpg',
]
const bottoms = [
    // yellow skirt
    'https://shop.r10s.jp/crown-store/cabinet/item/112000/112800/112810-1.jpg',
    // black skirt
    'https://di2ponv0v5otw.cloudfront.net/posts/2018/11/12/5bea27e3077391d5aca5966f/m_5bea27e92e1478b30901b14c.jpeg',
    // high waisted black pants
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS3T61h_6pYUCujTemCuTPRp07RlqZ6eWD_rtEyOidSCdShiPqbZmg7zHRiGrhbkL8_FAzP-aTl6qTnInf-7N3jk3lojiM3da332XJ3EJvkkXucNqyDkY9D&usqp=CAc',
]
const handbags = [
    // green
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/05/05/5ccfc918bbf0760713618572/m_5ccfc93dabe1cef286261b78.jpg',
    // black
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/09/03/5d6ef71fc953d81fed1ca89a/m_5d6ef8348557afe6c97a24bc.jpg',
    // pink
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/08/21/5d5dc361e3775300c70b481c/m_5d5dc3648af9ff0a23109269.jpeg',
]
const jackets = [
    // black moto vest
    'https://dtpmhvbsmffsz.cloudfront.net/posts/2017/01/27/588b7a5c2599fe6ff0008f02/s_588b7a5c2599fe6ff0008f03.jpg',
    // black linen vest
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/08/03/5d4627fdffc2d4eca713dce6/s_5d4628812eb33f136ffc6f04.jpg',
    // black military BR cotton jacket
    'https://img-static.tradesy.com/item/22306019/banana-republic-black-military-blazer-size-0-xs-0-4-960-960.jpg',
    // orange elie tahari
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/08/01/5d43c80210f00fe40b175461/m_5d43ce9a79df2723cf6ace12.jpg',
]
const dresses = [
    // elie tahari linen dress
    'https://dtpmhvbsmffsz.cloudfront.net/posts/2017/10/05/59d6a816620ff7d516038e5e/m_59d6a8252599fe829c037a89.jpg',
]
const tops = [
    // j crew perfect shirt
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/07/26/5d3b8ab329f0302a53af50de/m_5d3b8afa138e1806d298c77a.jpg',
    // pink linen
    'https://i.ebayimg.com/images/g/r8cAAOSwJDVbLBnE/s-l300.jpg',
]

class PantsOrDress extends Component {
    render() {
        const _div = this.props.pantsOrDress ? (
            <div>
                <img className="tops" src={tops[getRandom(tops.length)]} />
                <img
                    className="bottoms"
                    src={bottoms[getRandom(bottoms.length)]}
                />
            </div>
        ) : (
            <div>
                <img
                    className="dresses"
                    src={dresses[getRandom(dresses.length)]}
                />
            </div>
        )

        return { ..._div }
    }
}

class DisplayCombination extends Component {
    render() {
        const { jackets, pantsOrDress, shoes, handbags } = this.props
        return (
            <div className="imageContainer">
                <img className="jackets" src={jackets} />
                <PantsOrDress pantsOrDress={pantsOrDress} />
                <img className="shoes" src={shoes} />
                <img className="handbags" src={handbags} />
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
        const { renderNum } = this.props
        const arr = []
        // TODO: refactor this to fill up empty array with obj
        let counter = renderNum
        while (counter > 0) {
            arr.push({
                jackets: jackets[getRandom(jackets.length)],
                pantsOrDress: this.state.pantsOrDress,
                shoes: shoes[getRandom(shoes.length)],
                handbags: handbags[getRandom(handbags.length)],
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
                    <DisplayCombination key={index} {...obj} />
                ))}
            </div>
        )
    }
}
