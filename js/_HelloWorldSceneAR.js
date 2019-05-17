'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

// var merc = require('mercator-projection');

import {
  ViroARScene,
  ViroText,
  ViroConstants,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[235.52347306666667, 153.63353901107786, -1]} style={styles.helloWorldTextStyle} />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    // try {
    //   var xy = merc.fromLatLngToPoint({lat: -33.8777943, lng: 151.2035553});
    // }
    // catch (e) {}
    

    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : 'jjjj'
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;
