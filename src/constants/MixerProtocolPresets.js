//While developing mixer specific settings will be in one file.
//At first release these will be in seperate files
//So it´s easy to add new equipment.

export const MixerProtocolPresets = {
    reaper: {
        protocol: 'OSC',
        label: 'Reaper DAW (reaper.fm)',
        mode: "client", //master (ignores mixers faderlevel, and use faderlevel as gain preset),
                        //client (use feedback from mixers fader level)
        leadingZeros: false,  //some OSC protocols needs channels to be 01, 02 etc.
        pingCommand: [
            {
                oscMessage: "/note_in_use",
                value: 0,
                type: "f"
            }
        ],
        pingTime: 0,  //Bypass ping when pingTime is zero
        initializeCommands: [], // oscMessage, value, type
        fromMixer: {
            CHANNEL_FADER_LEVEL: '/track/{channel}/volume',
            CHANNEL_OUT_GAIN: '/track/{channel}/fx/1/fxparam/1/value',
            CHANNEL_VU: '/track/{channel}/vu',
            CHANNEL_NAME: '/track/{channel}/name',
            GRP_OUT_GAIN: '/dca/{channel}/fader',
            GRP_VU: 'none',
            GRP_NAME: '/dca/{channel}/config/name',
        },
        toMixer: {
            CHANNEL_FADER_LEVEL: '/track/{channel}/volume',
            CHANNEL_OUT_GAIN: '/track/{channel}/fx/1/fxparam/1/value',
            GRP_OUT_GAIN: '/dca/{channel}/fader',
        },
        fader: {
            min: 0,
            max: 1,
            zero: 0.75,
            step: 0.01,
            fadeTime: 40,  //Total time for a fade in ms.
        },
        meter: {
            min: 0,
            max: 1,
            zero: 0.75,
            test: 0.6,
        },
    },
// ---------------------------------------------------------
    behringerxrmaster: {
        protocol: 'OSC',
        label: 'Behringer XR 12,14,16 Mastermode',
        mode: "master", //master (ignores mixers faderlevel, and use faderlevel as gain preset),
                        //client (use feedback from mixers fader level)
        leadingZeros: true,
        pingCommand: [
            {
                oscMessage: "/xremote",
                value: "",
                type: "f"
            },
            {
                oscMessage: "/meters",
                value: "/meters/1",
                type: "s"
            },
            {
                oscMessage: "/meters",
                value: "/meters/5",
                type: "s"
            }
        ],
        pingTime: 9500,
        initializeCommands: [
            {
                oscMessage: "/info",
                value: 0,
                type: "f"
            }
        ],
        fromMixer: {
            CHANNEL_FADER_LEVEL: 'none',        //'none' ignores this command
            CHANNEL_OUT_GAIN: '/ch/{channel}/mix/fader',
            CHANNEL_VU: '/meters/1',
            CHANNEL_NAME: '/ch/{channel}/config/name',
            GRP_OUT_GAIN: '/dca/{channel}/fader',
            GRP_VU: 'none',
            GRP_NAME: '/dca/{channel}/config/name',
        },
        toMixer: {
            CHANNEL_FADER_LEVEL: 'none',
            CHANNEL_OUT_GAIN: '/ch/{channel}/mix/fader',
            GRP_OUT_GAIN: '/dca/{channel}/fader',
        },
        fader: {
            min: 0,
            max: 1,
            zero: 0.75,
            step: 0.01,
            fadeTime: 40,
        },
        meter: {
            min: 0,
            max: 1,
            zero: 0.75,
            test: 0.6,
        },
    },
// ---------------------------------------------------------
    behringerxrclient: {
        protocol: 'OSC',
        label: 'Behringer XR 12,14,16 Clientmode',
        mode: "client", //master (ignores mixers faderlevel, and use faderlevel as gain preset),
                        //client (use feedback from mixers fader level)
        leadingZeros: true,
        pingCommand: [
            {
                oscMessage: "/xremote",
                value: "",
                type: "f"
            },
            {
                oscMessage: "/meters",
                value: "/meters/1",
                type: "s"
            },
            {
                oscMessage: "/meters",
                value: "/meters/5",
                type: "s"
            }
        ],
        pingTime: 9500,
        initializeCommands: [
            {
                oscMessage: "/info",
                value: 0,
                type: "f"
            }
        ],
        fromMixer: {
            CHANNEL_FADER_LEVEL: '/ch/{channel}/mix/fader',        //'none' ignores this command
            CHANNEL_OUT_GAIN: '/ch/{channel}/mix/01/level',
            CHANNEL_VU: '/meters/1',
            CHANNEL_NAME: '/ch/{channel}/config/name',
            GRP_VU: 'none',
            GRP_NAME: '/dca/{channel}/config/name',
            GRP_OUT_GAIN: '/dca/{channel}/fader',
        },
        toMixer: {
            CHANNEL_FADER_LEVEL: '/ch/{channel}/mix/fader',
            CHANNEL_OUT_GAIN: '/ch/{channel}/mix/01/level',
            GRP_OUT_GAIN: '/dca/{channel}/fader',
        },
        fader: {
            min: 0,
            max: 1,
            zero: 0.75,
            step: 0.01,
            fadeTime: 40,
        },
        meter: {
            min: 0,
            max: 1,
            zero: 0.75,
            test: 0.6,
        },
    },
    // ---------------------------------------------------------
    midasMaster: {
        protocol: 'OSC',
        label: 'Midas M32 / Behringer X32 Master Mode',
        mode: "master", //master (ignores mixers faderlevel, and use faderlevel as gain preset),
                        //client (use feedback from mixers fader level)
        leadingZeros: true,
        pingCommand: [
            {
                oscMessage: "/xremote",
                value: "",
                type: "f"
            },
            {
                oscMessage: "/meters",
                value: "/meters/1",
                type: "s"
            }
        ],
        pingTime: 9500,
        initializeCommands: [
            {
                oscMessage: '/ch/{channel}/mix/fader',
                value: "",
                type: ""
            },
            {
                oscMessage: '/ch/{channel}/config/name',
                value: "",
                type: ""
            }
        ],
        fromMixer: {
            CHANNEL_FADER_LEVEL: 'none',        //'none' ignores this command
            CHANNEL_OUT_GAIN: '/ch/{channel}/mix/fader',
            CHANNEL_VU: '/meters/1',
            CHANNEL_NAME: '/ch/{channel}/config/name',
            GRP_OUT_GAIN: '/dca/{channel}/fader',
            GRP_VU: 'none',
            GRP_NAME: '/dca/{channel}/config/name',
        },
        toMixer: {
            CHANNEL_FADER_LEVEL: 'none',
            CHANNEL_OUT_GAIN: '/ch/{channel}/mix/fader',
            GRP_OUT_GAIN: '/dca/{channel}/fader',
        },
        fader: {
            min: 0,
            max: 1,
            zero: 0.75,
            step: 0.01,
            fadeTime: 40,
        },
        meter: {
            min: 0,
            max: 1,
            zero: 0.75,
            test: 0.6,
        },
    },
// ---------------------------------------------------------
    midasClient: {
        protocol: 'OSC',
        label: 'Midas M32 / Behringer X32 Client Mode',
        mode: "client", //master (ignores mixers faderlevel, and use faderlevel as gain preset),
                        //client (use feedback from mixers fader level)
        leadingZeros: true,
        pingCommand: [
            {
                oscMessage: "/xremote",
                value: "",
                type: "f"
            },
            {
                oscMessage: "/meters",
                value: "/meters/1",
                type: "s"
            },
            {
                oscMessage: "/meters",
                value: "/meters/5",
                type: "s"
            }
        ],
        pingTime: 9500,
        initializeCommands: [
            {
                oscMessage: '/ch/{channel}/mix/fader',
                value: "",
                type: ""
            },
            {
                oscMessage: '/ch/{channel}/mix/01/level',
                value: "",
                type: ""
            },
            {
                oscMessage: '/ch/{channel}/config/name',
                value: "",
                type: ""
            }
        ],
        fromMixer: {
            CHANNEL_FADER_LEVEL: '/ch/{channel}/mix/fader',        //'none' ignores this command
            CHANNEL_OUT_GAIN: '/ch/{channel}/mix/01/level',
            CHANNEL_VU: '/meters/1',
            CHANNEL_NAME: '/ch/{channel}/config/name',
            GRP_OUT_GAIN: '/dca/{channel}/mix/01/level',
            GRP_VU: 'none',
            GRP_NAME: '/dca/{channel}/config/name',
        },
        toMixer: {
            CHANNEL_FADER_LEVEL: '/ch/{channel}/mix/fader',
            CHANNEL_OUT_GAIN: '/ch/{channel}/mix/01/level',
            GRP_OUT_GAIN: '/dca/{channel}/mix/01/level',
        },
        fader: {
            min: 0,
            max: 1,
            zero: 0.75,
            step: 0.01,
            fadeTime: 40,
        },
        meter: {
            min: 0,
            max: 1,
            zero: 0.75,
            test: 0.6,
        },
    },
// ---------------------------------------------------------
    genericMidi: {
        protocol: 'MIDI',
        label: 'Generic Midi',
        mode: "client", //master (ignores mixers faderlevel, and use faderlevel as gain preset),
                        //client (use feedback from mixers fader level)
        leadingZeros: false,
        pingCommand: [
            /*
            {
                midiMessage: 0,
                value: 0,
            }
            */
        ],
        pingTime: 0,
        initializeCommands: [
            /*
            {
                midiMessage: 0,
                value: 0,
            }
            */
        ],
        fromMixer: {
            CHANNEL_FADER_LEVEL: 39,        //PgmChange 0 - ignores this command
            CHANNEL_OUT_GAIN: 0,            //PgmChange 0 - ignores this command
            CHANNEL_VU: 0,                   //PgmChange 0 - ignores this command
            CHANNEL_NAME: 'some sysex not yet build',
            GRP_FADER_LEVEL: 'none',
            GRP_VU: 'none',
            GRP_NAME: 'none',
        },
        toMixer: {
            CHANNEL_FADER_LEVEL: 39,
            CHANNEL_OUT_GAIN: 38,
            GRP_OUT_GAIN: 'none',
        },
        fader: {
            min: 0,
            max: 127,
            zero: 100,
            step: 1,
            fadeTime: 40,
        },
        meter: {
            min: 0,
            max: 127,
            zero: 100,
            test: 80,
        },
    },
    // ---------------------------------------------------------

    lawoClient: {
        protocol: 'EMBER',
        label: 'Lawo generic',
        mode: "client", //master (ignores mixers faderlevel, and use faderlevel as gain preset),
                        //client (use feedback from mixers fader level)
        leadingZeros: true,
        pingCommand: [
            {
                emberMessage: "/xremote",
                value: "",
                type: "f"
            },
            {
                emberMessage: "/meters",
                value: "/meters/1",
                type: "s"
            },
            {
                emberMessage: "/meters",
                value: "/meters/5",
                type: "s"
            }
        ],
        pingTime: 9500,
        initializeCommands: [
            {
                emberMessage: '/ch/{channel}/mix/fader',
                value: "",
                type: ""
            },
            {
                emberMessage: '/ch/{channel}/mix/01/level',
                value: "",
                type: ""
            },
            {
                emberMessage: '/ch/{channel}/config/name',
                value: "",
                type: ""
            }
        ],
        fromMixer: {
            CHANNEL_FADER_LEVEL: '/ch/{channel}/mix/fader',        //'none' ignores this command
            CHANNEL_OUT_GAIN: '/ch/{channel}/mix/01/level',
            CHANNEL_VU: '/meters/1',
            CHANNEL_NAME: '/ch/{channel}/config/name',
            GRP_OUT_GAIN: '/dca/{channel}/mix/01/level',
            GRP_VU: 'none',
            GRP_NAME: '/dca/{channel}/config/name',
        },
        toMixer: {
            CHANNEL_FADER_LEVEL: '/ch/{channel}/mix/fader',
            CHANNEL_OUT_GAIN: '/ch/{channel}/mix/01/level',
            GRP_OUT_GAIN: '/dca/{channel}/mix/01/level',
        },
        fader: {
            min: 0,
            max: 1,
            zero: 0.75,
            step: 0.01,
            fadeTime: 40,
        },
        meter: {
            min: 0,
            max: 1,
            zero: 0.75,
            test: 0.6,
        },
    },
// ---------------------------------------------------------
};


export const MixerProtocolList = Object.getOwnPropertyNames(MixerProtocolPresets).map((preset) => {
    return {
        value: preset,
        label: MixerProtocolPresets[preset].label
    };
});
