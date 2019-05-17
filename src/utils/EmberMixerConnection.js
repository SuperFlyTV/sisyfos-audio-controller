//Node Modules:
import os from 'os'; // Used to display (log) network addresses on local machine
import osc from 'osc'; //Using OSC fork from PieceMeta/osc.js as it has excluded hardware serialport support and thereby is crossplatform
import { DeviceTree, Ember } from 'emberplus';

//Utils:
import { MixerProtocolPresets } from '../constants/MixerProtocolPresets';

export class EmberMixerConnection {
    constructor() {
        this.sendOutMessage = this.sendOutMessage.bind(this);
        this.pingMixerCommand = this.pingMixerCommand.bind(this);

        this.store = window.storeRedux.getState();
        const unsubscribe = window.storeRedux.subscribe(() => {
            this.store = window.storeRedux.getState();
        });

        this.mixerProtocol = MixerProtocolPresets[this.store.settings[0].mixerProtocol]  || MixerProtocolPresets.genericMidi;

        this.emberConnection = new DeviceTree(
            this.store.settings[0].machineOscIp,
            parseInt(this.store.settings[0].machineOscPort)
        );
        this.setupMixerConnection();
    }

    setupMixerConnection() {
        this.emberConnection.connect()
        .then(() => {
            return this.emberConnection.getDirectory();
        })
        .then((r) => {
            let elementsRoot = r ;
            return this.emberConnection.expand(elementsRoot.elements[0]);
        })
        .then((elements) => {
            return this.emberConnection.getNodeByPath('/R3LAYVirtualPatchBay/Environments/EnvironmentRows');
        })
        .then((elements) => {
            console.log("All elements :", elements);
            console.log("done");
        })
        .catch((e) => {
            console.log(e.stack);
        });
        /*
        .then(() => {
            console.log("Receiving state of desk");
            this.mixerProtocol.initializeCommands.map((item) => {
                if (item.oscMessage.includes("{channel}")) {
                    this.store.channels[0].channel.map((channel, index) => {
                        this.sendOutRequest(item.oscMessage,(index +1));
                    });
                } else {
                    this.sendOutMessage(item.oscMessage, 1, item.value, item.type);
                }
            });
        })
        .on('message', (message) => {
            if ( this.checkOscCommand(message.address, this.mixerProtocol.fromMixer
                .CHANNEL_FADER_LEVEL)){
                let ch = message.address.split("/")[2];
                window.storeRedux.dispatch({
                    type:'SET_FADER_LEVEL',
                    channel: ch - 1,
                    level: message.args[0]
                });
                if (this.mixerProtocol.mode === 'master') {
                    if (this.store.channels[0].channel[ch - 1].pgmOn)
                    {
                        this.updateOutLevel(ch-1);
                    }
                }
            } else if ( this.checkOscCommand(message.address, this.mixerProtocol.fromMixer
                .CHANNEL_OUT_GAIN)){
                let ch = message.address.split("/")[2];
                if (this.mixerProtocol.mode === 'master'
                    && !this.store.channels[0].channel[ch - 1].fadeActive
                    &&  message.args[0] > this.mixerProtocol.fader.min)
                {
                    window.storeRedux.dispatch({
                        type:'SET_FADER_LEVEL',
                        channel: ch - 1,
                        level: message.args[0]
                    });
                    if (!this.store.channels[0].channel[ch - 1].pgmOn) {
                        window.storeRedux.dispatch({
                            type:'TOGGLE_PGM',
                            channel: ch - 1
                        });
                    }
                }
            } else if (this.checkOscCommand(message.address, this.mixerProtocol.fromMixer
                .CHANNEL_VU)){
                if (this.store.settings[0].mixerProtocol.includes('behringer')) {
                    behringerMeter(message.args);
                } else if (this.store.settings[0].mixerProtocol.includes('midas')) {
                    midasMeter(message.args);
                } else {
                    let ch = message.address.split("/")[2];
                    window.storeRedux.dispatch({
                        type:'SET_VU_LEVEL',
                        channel: ch - 1,
                        level: message.args[0]
                    });
                }
            } else if (this.checkOscCommand(message.address, this.mixerProtocol.fromMixer
                .CHANNEL_NAME)) {
                    let ch = message.address.split("/")[2];
                    window.storeRedux.dispatch({
                        type:'SET_CHANNEL_LABEL',
                        channel: ch - 1,
                        label: message.args[0]
                    });
                console.log("OSC message: ", message.address);
            } else if ( this.checkOscCommand(message.address, this.mixerProtocol.fromMixer
                .GRP_OUT_GAIN)){
                let ch = message.address.split("/")[2];
                if (!this.store.channels[0].grpFader[ch - 1].fadeActive
                    &&  message.args[0] > this.mixerProtocol.fader.min)
                {
                    window.storeRedux.dispatch({
                        type:'SET_GRP_FADER_LEVEL',
                        channel: ch - 1,
                        level: message.args[0]
                    });
                    if (!this.store.channels[0].grpFader[ch - 1].pgmOn) {
                        window.storeRedux.dispatch({
                            type:'TOGGLE_GRP_PGM',
                            channel: ch - 1
                        });
                    }
                }
            } else if (this.checkOscCommand(message.address, this.mixerProtocol.fromMixer
                .GRP_VU)){
                if (this.store.settings[0].mixerProtocol.includes('behringer')) {
                    behringerGrpMeter(message.args);
                } else if (this.store.settings[0].mixerProtocol.includes('midas')) {
                    midasGrpMeter(message.args);
                } else {
                    let ch = message.address.split("/")[2];
                    window.storeRedux.dispatch({
                        type:'SET_GRP_VU_LEVEL',
                        channel: ch - 1,
                        level: message.args[0]
                    });
                }
            } else if (this.checkOscCommand(message.address, this.mixerProtocol.fromMixer
                .GRP_NAME)) {
                    let ch = message.address.split("/")[2];
                    window.storeRedux.dispatch({
                        type:'SET_GRP_LABEL',
                        channel: ch - 1,
                        label: message.args[0]
                    });
                console.log("OSC message: ", message.address);
            }
        })
        .on('error', (error) => {
            console.log("Error : ", error);
            console.log("Lost OSC connection");
        });
        this.oscConnection.open();
        console.log(`OSC listening on port ` + this.store.settings[0].oscPort );
*/

        //Ping OSC mixer if mixerProtocol needs it.
        if (this.mixerProtocol.pingTime > 0) {
            let emberTimer = setInterval(
                () => {
                    this.pingMixerCommand();
                },
                this.mixerProtocol.pingTime
            );
        }
    }

    pingMixerCommand() {
        //Ping OSC mixer if mixerProtocol needs it.
        this.mixerProtocol.pingCommand.map((command) => {
            this.sendOutMessage(
                command.emberMessage,
                0,
                command.value,
                command.type
            );
        });
    }

    checkOscCommand(message, command) {
        if (message === command) return true;

        let cmdArray = command.split("{channel}");
        if (
            message.substr(0, cmdArray[0].length) === cmdArray[0] &&
            message.substr(-cmdArray[1].length) === cmdArray[1] &&
            message.length >= command.replace("{channel}", "").length
        ) {
            return true;
        } else {
            return false;
        }
    }

    sendOutMessage(emberMessage, channel, value, type) {
        let channelString = this.mixerProtocol.leadingZeros ? ("0"+channel).slice(-2) : channel.toString();
        let message = emberMessage.replace(
                "{channel}",
                channelString
            );
        if (message != 'none') {
            this.emberConnection.send({
                address: message,
                args: [
                    {
                        type: type,
                        value: value
                    }
                ]
            });
        }
    }


    sendOutGrpMessage(emberMessage, channel, value, type) {
        let message = emberMessage.replace(
                "{channel}",
                channel
            );
        if (message != 'none') {
            this.emberConnection.send({
                address: message,
                args: [
                    {
                        type: type,
                        value: value
                    }
                ]
            });
        }
    }

    sendOutRequest(emberMessage, channel) {
        let channelString = this.mixerProtocol.leadingZeros ? ("0"+channel).slice(-2) : channel.toString();
        let message = emberMessage.replace(
                "{channel}",
                channelString
            );
        if (message != 'none') {
            this.emberConnection.send({
                address: message
            });
        }
    }

    updateOutLevel(channelIndex) {
        this.sendOutMessage(
            this.mixerProtocol.toMixer.CHANNEL_OUT_GAIN,
            channelIndex+1,
            this.store.channels[0].channel[channelIndex].outputLevel,
            "f"
        );
        this.sendOutMessage(
            this.mixerProtocol.toMixer.CHANNEL_FADER_LEVEL,
            channelIndex+1,
            this.store.channels[0].channel[channelIndex].faderLevel,
            "f"
        );
    }

    updateFadeIOLevel(channelIndex, outputLevel) {
        this.sendOutMessage(
            this.mixerProtocol.toMixer.CHANNEL_OUT_GAIN,
            channelIndex+1,
            outputLevel,
            "f"
        );
    }


    updateGrpOutLevel(channelIndex) {
        this.sendOutGrpMessage(
            this.mixerProtocol.toMixer.GRP_OUT_GAIN,
            channelIndex+1,
            this.store.channels[0].grpFader[channelIndex].outputLevel,
            "f"
        );
    }

    updateGrpFadeIOLevel(channelIndex, outputLevel) {
        this.sendOutGrpMessage(
            this.mixerProtocol.toMixer.GRP_OUT_GAIN,
            channelIndex+1,
            outputLevel,
            "f"
        );
    }

}

