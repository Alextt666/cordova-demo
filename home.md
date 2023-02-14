```javascript
document.addEventListener("deviceready", onDeviceReady, false);

function cordovaDevice() {
  alert(
    "Cordova version: " +
      device.cordova +
      "\n" +
      "Device model: " +
      device.model +
      "\n" +
      "Device platform: " +
      device.platform +
      "\n" +
      "Device UUID: " +
      device.uuid +
      "\n" +
      "Device version: " +
      device.version +
      "\n" +
      "SDK version: " +
      device.sdkVersion
  );

  // const options = {
  //   method: 'post',
  //   data: { id: 12, message: 'test' },
  //   headers: { Authorization: 'OAuth2: token' }
  // };

  cordova.plugin.http.sendRequest(
    `https://gateway.classkid.net/api/getInfoByMacAddress/${device.uuid}`,
    {},
    function (res) {
      // prints 200
      alert(res.status);
      const result = JSON.parse(res.data);
      window.localStorage.setItem("roomId", result.data.id);
      window.localStorage.setItem("mode", result.data.mode);
      window.localStorage.setItem("talkCloudId", result.data.talkCloudId);
    },
    function (response) {
      // prints 403
      console.log(response.status);

      //prints Permission denied
      console.log(response.error);
    }
  );
}

function onDeviceReady() {
  cordovaDevice();
  cordova.plugins.autoStart.enable();
}

document.addEventListener("online", onOnline, false);
function onOnline(){
    window.localStorage.setItem("network", true);
}
document.addEventListener("offline", onOffline, false);
function onOffline(){
    window.localStorage.setItem("network", false);
}
```