# fitnessWalkingTracksInfoApp
This is an Apache Cordova app that develops for the Android platform. This application aims to show the info on Hong Kong Fitness Walking Tracks, to benefit the people who want to engage in fitness walking. This application used the [Dataset](https://data.gov.hk/en-data/dataset/hk-lcsd-facility-facility-fw) that comes from the DATA.GOV.HK.

# Preparation
To ensure the application deployment succeeds, please download the following tools:
<br /> [node.js](https://nodejs.org/en) and execute a command of `npm install -g cordova`.
<br /> [Android Studio](https://developer.android.com/studio) with android SDK 33.0.2
<br /> [JDK 8](https://www.oracle.com/hk/java/technologies/javase/javase8-archive-downloads.html)
<br /> [Gradle](https://gradle.org/install/)

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

# Application Previews
![alt text](https://github.com/tommy08332/fitnessWalkingTracksInfoApp/blob/main/pictures/pic_1.png?raw=true)<br />
![alt text](https://github.com/tommy08332/fitnessWalkingTracksInfoApp/blob/main/pictures/pic_2.png?raw=true)<br />
![alt text](https://github.com/tommy08332/fitnessWalkingTracksInfoApp/blob/main/pictures/pic_5.png?raw=true)<br />
![alt text](https://github.com/tommy08332/fitnessWalkingTracksInfoApp/blob/main/pictures/pic_3.png?raw=true)
