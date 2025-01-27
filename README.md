# fitnessWalkingTracksInfoApp
This is an Apache Cordova app that develops for the Android platform.\
To ensure the application deployment succeeds, please download the [node.js](https://nodejs.org/en) and execute a command of `npm install -g cordova`.



# Application Deployment:
After installing the `Cordova`, enter the project directory and execute the following command in sequence.
```bash
cordova platform add android 
cordova plugin add cordova-sqlite-storage
cordova build android
```
# How to obtain the `apk` file of fitnessWalkingTracksInfoApp
Go to the directory of `fitnessWalkingTracksInfoApp-main\platforms\android\app\build\outputs\apk\debug` to pick up the `app-debug.apk`.

# How to test the apk file
There are two methods to test the application

<br /> 1. Install the apk to your Android devices
<br /> If you configured an emulator on the Android Studio (here [tutorial](https://developer.android.com/studio/run/managing-avds)) to configure the emulator), you can run the cmd `cordova emulate android` to execute the application on the emulator.

<br /> 2. Run it in Android emulator
<br /> If you want to install and execute the application on your physical device, you need to turn on the `Developer Mode` and `USB Debugging` on it (Details on [here](https://developer.android.com/studio/debug/dev-options)), and then to run the cmd `cordova run android --device` after you connect your device to the computer.
