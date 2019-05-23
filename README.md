# AR-zombie
Sample Augmented Reality Zombie Game build using [ViroReact](https://viromedia.com/viroreact) as a Proof of Concept for a Hackathon.

![AR Zombie Test](https://raw.githubusercontent.com/newbreedofgeek/AR-zombie/master/giphy.gif)

[Full Video](https://www.youtube.com/watch?v=S-Q_-jOotRY)

## What's happening in this game?
- Its a fun proof of concept, but shows actual calculations required for converting geoCodes to 3D AR space and integrating a 3D Zombie with sound. A strong base to bring your VR/AR ideas to life.
- It shows a list of medical services near a given Geocode (all hard-coded but you can integrate with the Google Maps API and your actual location and it will work)
- A Zombie appears, the idea is that zombies appear closer to medical services but we just hardcoded a path
- Tap on the Zombie's foot any time after it appears and it falls down


### Get your dev environment running as per here
https://docs.viromedia.com/docs/quick-start

### Notes about local dev environment
- Tested and works on node v10.15.1 and npm 6.9.0 - but should work on node > 10x
- Needs > iPhone 6S. Tested on Android as well but it was not as good as iOS
- `npm start` uses ngrok (which is a web based tunnel and can be slow) - we put the phone and development machine on the same WIFI/Hotspot and used the development machine IP in the Viro Media TestBed and its very fast

### AR Positioning?
The following images will give you an idea of the XYZ position used in AR space.

![Image 1](https://raw.githubusercontent.com/newbreedofgeek/AR-zombie/master/1.jpg)
![Image 2](https://raw.githubusercontent.com/newbreedofgeek/AR-zombie/master/2.jpg)
![Image 3](https://raw.githubusercontent.com/newbreedofgeek/AR-zombie/master/3.jpg)
![Image 4](https://raw.githubusercontent.com/newbreedofgeek/AR-zombie/master/4.jpg)
