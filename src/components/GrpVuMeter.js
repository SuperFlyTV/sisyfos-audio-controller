import React, { PureComponent } from 'react';
import { connect } from "react-redux";

//assets:
import '../assets/css/VuMeter.css';
//Utils:
import { MixerProtocolPresets } from '../constants/MixerProtocolPresets';

class GrpVuMeter extends PureComponent {
    constructor(props) {
        super(props);
        this.faderIndex = this.props.faderIndex;


        this.state = {
        };
        this.mixerProtocol = MixerProtocolPresets[this.props.mixerProtocol]  || MixerProtocolPresets.genericMidi;

        this.totalHeight = this.totalHeight.bind(this);
        this.calcLower = this.calcLower.bind(this);
        this.calcMiddle = this.calcMiddle.bind(this);
        this.calcUpper = this.calcUpper.bind(this);
    }

    totalHeight() {
        return (this.props.showSnaps ? 1 : 2) * 200 / (this.mixerProtocol.meter.max - this.mixerProtocol.meter.min);
    }

    calcLower() {
        let val = this.props.vuVal;
        if (val >= this.mixerProtocol.meter.test) {
            val = this.mixerProtocol.meter.test;
        }
        return this.totalHeight()*val;
    }

    calcMiddle() {
        let val = this.props.vuVal;
        if (val < this.mixerProtocol.meter.test) {
            val = this.mixerProtocol.meter.test;
        } else if (val >= this.mixerProtocol.meter.zero) {
            val = this.mixerProtocol.meter.zero;
        }
        return this.totalHeight()*(val-this.mixerProtocol.meter.test)+1;
    }

    calcUpper() {
        let val = this.props.vuVal;
        if (val < this.mixerProtocol.meter.zero) {
            val = this.mixerProtocol.meter.zero;
        }
        return this.totalHeight()*(val-this.mixerProtocol.meter.zero)+1;
    }

    render() {

        return (
            <div className="vumeter-body"
                style={{
                    "height" : this.totalHeight() + 30
                }}
            >
                <canvas
                    className="vumeter-lower-part"
                    style={
                        {
                            "height": this.calcLower(),
                            "top": "5px"
                        }
                    }
                ></canvas>
                <canvas
                    className="vumeter-middle-part"
                    style={
                        {
                            "height": this.calcMiddle(),
                            "top": this.totalHeight()*this.mixerProtocol.meter.test+5
                        }
                    }
                ></canvas>
                <canvas
                    className="vumeter-upper-part"
                    style={
                        {
                            "height": this.calcUpper(),
                            "top": this.totalHeight()*this.mixerProtocol.meter.zero+5
                        }
                    }></canvas>

            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        vuVal: state.channels[0].grpVuMeters[props.faderIndex].vuVal,
        mixerProtocol: state.settings[0].mixerProtocol,
        showSnaps: state.settings[0].showSnaps
    }
}

export default connect(mapStateToProps)(GrpVuMeter);
