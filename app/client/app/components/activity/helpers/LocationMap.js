import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class LocationMap extends Component {

    constructor (props) {
        super(props)
    }

    componentDidMount(){

        this.map = L.map('map', {
            zoom: 2,
            minZoom: 2,
            maxZoom:12,
            height: '28rem',
            center: [8.00, 24.00],
            scrollWheelZoom: false
        });

        //L.tileLayer("https://api.mapbox.com/styles/v1/zimmerman2014/ciwgiium3000u2pnv87enxt4y/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemltbWVybWFuMjAxNCIsImEiOiJhNUhFM2YwIn0.sedQBdUN7PJ1AjknVVyqZw").addTo(this.map)
        this.circles = L.layerGroup([]);
        this.circles.addTo(this.map)
    }

    updateMap() {
        console.log('<<<updateMap')
        this.map.removeLayer(this.circles);
        console.log('<<<removeLayer')
        this.circles.clearLayers();

        const {results, mapKey} = this.props;

        const newCircles = results.map((result, k) => {

            const radius = (Math.sqrt(result.expenditure)/250);
            let minRadius = 10.0;
            if (results.size < 12){
                minRadius = 15.0;
            }
            let currentRadius = radius > minRadius ? radius : minRadius;

            const popupProps = {
                minWidth: 200,
                maxWidth: 300,
                closeButton: false,
                className: "country-popup",
            };

            let popup = L.popup(popupProps)
                .setContent(
                    <div>
                        <h6>
                            <i class="flag-icon"></i>
                            <a href=""></a>
                        </h6>
                    </div>
            );

            let circle = L.circleMarker([result[mapKey].location.coordinates[1], result[mapKey].location.coordinates[0]], {
                key: result[mapKey].code,
                color: '#ffffff',
                opacity:0.9,
                fillColor: '#00786C',
                fillOpacity: 0.6,
                weight: 1,
                className: 'circle-marker',
            }).bindPopup(popup);
            circle.setRadius(currentRadius);
            return circle
        });
        this.circles = L.layerGroup(newCircles);
        this.circles.addTo(this.map)
    }

    componentDidUpdate() {
        if (!this.props.loading) {
            this.updateMap()
        }
    }

    render() {
        const {loading} = this.props;

        let loadingDiv = (
            <div className="loading">
                <div className="loader large">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        );

        return (
            <div id="iati-map">
                <div id="map" style={{height: '100%'}}></div>
                <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {loading ? loadingDiv : null}
                </ReactCSSTransitionGroup>

			</div>
        )
    }
}

export default LocationMap;