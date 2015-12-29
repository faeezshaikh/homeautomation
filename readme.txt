Publishing:
http://ionicframework.com/docs/guide/publishing.html

sudo ionic platform add android
ionic hooks add (optional)
cordova build --release android
sudo ionic build android

Test if socialsharing is working before every update.If not then the cordova socialsharing plugin needs to be added

cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
Ref: http://ngcordova.com/docs/plugins/socialSharing/


(Optional step - Already generated - do not lose - If Key not already present)
keytool -genkey -v -keystore  awsArch-key.keystore -alias awsArch- -keyalg RSA -keysize 2048 -validity 100000


jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore aws-release1-key.keystore android-release-unsigned.apk aws-release1-alias

C:\Users\FSHAI\AppData\Local\Android\android-sdk\build-tools\23.0.1\zipalign -v 4 android-release-unsigned.apk AWS-Dev.apk
/Users/faeezshaikh/Library/Android/sdk/build-tools/23.0.2/zipalign -v 4 android-release-unsigned.apk AWS-Dev.apk
-------------------


1. Start Android Virtual Device from AVD manager (either standalone or from android studio)

2. Install the apk in the emulator using this command:
~/Android/~platform-tools/adb install yourfile.apk

3. For Screenshots, Android Studio --> DDMS --> Select emulator --> Camera icon.