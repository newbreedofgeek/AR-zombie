'use strict';

import React, { Component } from 'react';
import {StyleSheet, Alert} from 'react-native';

import {
  ViroARScene,
  ViroBox,
  ViroARPlaneSelector,
  ViroARPlane,
  ViroNode,
  ViroAmbientLight,
  ViroSpotLight,
  ViroMaterials,
  Viro3DObject,
  ViroText,
  ViroAnimations,
  ViroFlexView,
  ViroSound,
  ViroCamera
} from 'react-viro';

  // mock search data 
  const myGeo = {
    location: {lat: -33.880967, lon: 151.219605},
    doc1: {lat: -33.880162, lon: 151.221173, serviceName: "Dr Jessica Green"},
    doc2: {lat: -33.880382, lon: 151.219219, serviceName: "Dr Philip Change"},
    doc3: {lat: -33.880615, lon: 151.220034, serviceName: "Dr Craig Waller"},
    doc4: {lat: -33.880911, lon: 151.219187, serviceName: "Dr Rohan Gett"},
    doc5: {lat: -33.880826, lon: 151.219470, serviceName: "Dr Richard Parkinson"},
    doc6: {lat: -33.880908, lon: 151.219642, serviceName: "Diagnostic Endoscopy centre"},
    doc7: {lat: -33.880745, lon: 151.219958, serviceName: "Dr David H Bryant"},
    doc8: {lat: -33.881047, lon: 151.219707, serviceName: "Dr James Yu, Pain Specialist"},
    doc9: {lat: -33.881059, lon: 151.219460, serviceName: "Dr Paul Janz"},
    doc10: {lat: -33.881165, lon: 151.219642, serviceName: "St Vincent Medical Centre"},
    doc11: {lat: -33.881545, lon: 151.219561, serviceName: "NSW Cardiology"},
    doc12: {lat: -33.881320, lon: 151.220160, serviceName: "Boundary Medical Centre"},
    doc13: {lat: -33.881861, lon: 151.219109, serviceName: "Oxford Medical"},
    doc14: {lat: -33.881944, lon: 151.220565, serviceName: "West Street Clinic"}
  };

  // mock my coordinates
  const egGeo = {
    location: {lat: 47.618534, lon: -122.338478},
    north: {lat: 47.618574, lon: -122.338475},
    east: {lat: 47.618534, lon: -122.338061},
    west: {lat: 47.618539, lon: -122.338644},
    south: {lat: 47.618210, lon: -122.338455}
  };

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      doc1X: 0,
      doc1Z: 0,
      doc2X: 0,
      doc2Z: 0,
      doc3X: 0,
      doc3Z: 0,
      doc4X: 0,
      doc4Z: 0,
      doc5X: 0,
      doc5Z: 0,
      doc6X: 0,
      doc6Z: 0,
      doc7X: 0,
      doc7Z: 0,
      doc8X: 0,
      doc8Z: 0,
      doc9X: 0,
      doc9Z: 0,
      doc10X: 0,
      doc10Z: 0,
      doc11X: 0,
      doc11Z: 0,
      doc12X: 0,
      doc12Z: 0,
      doc13X: 0,
      doc13Z: 0,
      doc14X: 0,
      doc14Z: 0,

      mainAnimation: "fadeOut",
      zombieVrx: require('./res/zombie/zombiewalk.vrx'),
      zombieSound: false
      
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._latLongToMerc = this._latLongToMerc.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
  }
  

  startAnim() {
    console.log("XXXX hello")
    this.setState({
      zombieVrx: require('./res/zombie/zombiewalk.vrx'),
      zombieSound: true
    })
  }

  zombieSwiped(position, source) {
    Alert.alert(`We just Clicked the image! position=${position}, source=${source}, node=${Object.keys(node)}`);
    this.setState({
      zombieVrx: require('./res/zombie/zombie.vrx'),
      zombieSound: false

    })
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroAmbientLight color={"#aaaaaa"} intensity={3000} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        
          <ViroNode position={[-18, -18, -36]} dragType="FixedToWorld" onDrag={()=>{}}
              onClick={(position, source) => this.zombieSwiped(position, source)}>
            <Viro3DObject
              source={this.state.zombieVrx}
              resources={[require('./res/zombie/zombie_diffuse.png'),
                require('./res/zombie/zombie_normal.png'),
                require('./res/zombie/zombie_specular.png')]}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              animation={
                {
                  name: "animateZombie1",
                  run: true,
                  loop:true,
                  onStart: () => this.startAnim()
                }
              }              
              scale={[.1, .1, .1]}
              type="VRX" 
              transformBehaviors={["billboardY"]}
              />         
          </ViroNode>

        <ViroSound paused={!this.state.zombieSound}
           muted={this.state.zombieSound}
           source={require('./res/zombie/Zombie-sound.mp3')}
           loop={true}
           volume={1.0}
           onFinish={this.onFinishSound}
           onError={this.onErrorSound} />        


      </ViroARScene>
    );
  }

  _onInitialized() {
    var doc1Point = this._transformPointToAR(myGeo.doc1.lat, myGeo.doc1.lon);
    var doc2Point = this._transformPointToAR(myGeo.doc2.lat, myGeo.doc2.lon);
    var doc3Point = this._transformPointToAR(myGeo.doc3.lat, myGeo.doc3.lon);
    var doc4Point = this._transformPointToAR(myGeo.doc4.lat, myGeo.doc4.lon);
    var doc5Point = this._transformPointToAR(myGeo.doc5.lat, myGeo.doc5.lon);
    var doc6Point = this._transformPointToAR(myGeo.doc6.lat, myGeo.doc6.lon);
    var doc7Point = this._transformPointToAR(myGeo.doc7.lat, myGeo.doc7.lon);
    var doc8Point = this._transformPointToAR(myGeo.doc8.lat, myGeo.doc8.lon);
    var doc9Point = this._transformPointToAR(myGeo.doc9.lat, myGeo.doc9.lon);
    var doc10Point = this._transformPointToAR(myGeo.doc10.lat, myGeo.doc10.lon);
    var doc11Point = this._transformPointToAR(myGeo.doc11.lat, myGeo.doc11.lon);
    var doc12Point = this._transformPointToAR(myGeo.doc12.lat, myGeo.doc12.lon);
    var doc13Point = this._transformPointToAR(myGeo.doc13.lat, myGeo.doc13.lon);
    var doc14Point = this._transformPointToAR(myGeo.doc14.lat, myGeo.doc14.lon);

    this.setState({
      text : "--- Menu ---",
      doc1X: doc1Point.x,
      doc1Z: doc1Point.z,

      doc2X: doc2Point.x,
      doc2Z: doc2Point.z,
      
      doc3X: doc3Point.x,
      doc3Z: doc3Point.z,
      
      doc4X: doc4Point.x,
      doc4Z: doc4Point.z,

      doc5X: doc5Point.x,
      doc5Z: doc5Point.z,

      doc6X: doc6Point.x,
      doc6Z: doc6Point.z,

      doc7X: doc7Point.x,
      doc7Z: doc7Point.z,

      doc8X: doc8Point.x,
      doc8Z: doc8Point.z,

      doc9X: doc9Point.x,
      doc9Z: doc9Point.z,

      doc10X: doc10Point.x,
      doc10Z: doc10Point.z,

      doc11X: doc11Point.x,
      doc11Z: doc11Point.z,

      doc12X: doc12Point.x,
      doc12Z: doc12Point.z,

      doc13X: doc13Point.x,
      doc13Z: doc13Point.z,

      doc14X: doc14Point.x,
      doc14Z: doc14Point.z,

      zombieSound: true
    });
    
  }

  _latLongToMerc(lat_deg, lon_deg) {
   var lon_rad = (lon_deg / 180.0 * Math.PI)
   var lat_rad = (lat_deg / 180.0 * Math.PI)
   var sm_a = 6378137.0
   var xmeters  = sm_a * lon_rad
   var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))
   return ({x:xmeters, y:ymeters});
  }

  _transformPointToAR(lat, long) {
  var objPoint = this._latLongToMerc(lat, long);
  var devicePoint = this._latLongToMerc(myGeo.location.lat, myGeo.location.lon);
  console.log("objPointZ: " + objPoint.y + ", objPointX: " + objPoint.x)
  // latitude(north,south) maps to the z axis in AR
  // longitude(east, west) maps to the x axis in AR
  var objFinalPosZ = objPoint.y - devicePoint.y;
  var objFinalPosX = objPoint.x - devicePoint.x;
  //flip the z, as negative z(is in front of us which is noπrth, pos z is behind(south).
  return ({x:objFinalPosX, z:-objFinalPosZ});
  }

}

// ViroMaterials.createMaterials({
//   zombie: {
//     diffuseTexture: require('./res/zombie/Zombie.png'),
//     normalTexture: require('./res/zombie/Zombie_nm.png'),
//     specularTexture: require('./res/zombie/Zombie_specular.png'),
//     lightingModel: "Phong"
//   },
// });

ViroAnimations.registerAnimations({
  animateZombie1: {
    properties: {
      positionX:"+=1",
      positionY:"+=0",
      positionZ:"+=2"
    
    }, 
    easing: "Linear",
    duration: 1500
  },
  animateZombie2: {
    properties: {
      positionX:"-=2",
      positionY:"+=0",
      positionZ:"+=2"
    
    }, 
    easing: "Linear",
    duration: 1000
  }
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 22,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
    width: 500
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: "#ffffffdd",
    padding: .2,
  },
  prodTitleText: {
    fontFamily: 'sans-serif-light',
    fontSize: 30,
    color: '#222222',
    textAlignVertical: 'center',
    textAlign: 'left',
  },
  prodDescriptionText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    color: '#222222',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  }
});

module.exports = HelloWorldSceneAR;

/*
Product Shocase Tile design
https://github.com/viromedia/viro
https://github.com/viromedia/viro/blob/master/js/ProductShowcase/ProductShowcase.js

getting GeoLocation
https://github.com/viromedia/viro/issues/131#issuecomment-383117425
*/
