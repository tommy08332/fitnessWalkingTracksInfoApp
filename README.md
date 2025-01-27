# fitnessWalkingTracksInfoApp
This is an Apache Cordova app that develops for the Android platform.\
To ensure the application deployment succeeds, please download the node.js and execute a command of `npm install -g cordova`.

# Application Deployment:
After installing the `Cordova`, enter the project directory and execute the following command in sequence.\
```bash
cordova platform add android 
cordova plugin add cordova-sqlite-storage
cordova build android
```
# How to obtain the `apk` file of fitnessWalkingTracksInfoApp
Go to the directory of `fitnessWalkingTracksInfoApp-main\platforms\android\app\build\outputs\apk\debug` to pick up the `app-debug.apk`.
