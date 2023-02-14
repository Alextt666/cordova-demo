document.addEventListener("deviceready", onDeviceReady, false);
function cordovaDevice() {
  cordova.plugins.MyToast.shellExec("getprop vhd.hdmi2.pluged", (res) => {
    if (res.includes("true")) {
      window.localStorage.setItem("hdmi2", "1");
    } else {
      window.localStorage.setItem("hdmi2", "0");
    }
  });
  cordova.plugins.MyToast.shellExec("getprop vhd.hdmi1.pluged", (res) => {
    if (res.includes("true")) {
      window.localStorage.setItem("hdmi1", "1");
    } else {
      window.localStorage.setItem("hdmi1", "0");
    }
  });
}

function checkReload() {
  console.log("reloadlog");
  if (location.href.indexOf("#reloaded") == -1) {
    console.log("reload-in");
    //判断是否有刷新标记
    location.href = location.href + "#reloaded"; //没有添加标记
    location.reload();
  }
}

function playAudio() {
  // let src = "https://h5.classkid.net/room.mp3";
  let src = "/android_asset/www/audio/room.mp3";
  function onSuccess() {
    console.log("playAudio Success");
  }
  function onError(error) {
    console.log("playAudio Error: " + error.code);
  }
  var myMedia = new Media(src, onSuccess, onError);
  myMedia.play();
  return myMedia;
}

function onDeviceReady() {
  const resMedia = playAudio();
  setInterval(cordovaDevice, 3000);
  setInterval(onOnline, 3000);
  // Lottie start

// lottie.splashscreen.on('lottieAnimationEnd', ()=>{
//   alert('test')
// });
  setTimeout((resMedia) => {
    resMedia.stop();
    lottie.splashscreen
      .hide()
      .then((_) => console.log("Lottie successfully hid the animation"))
      .catch((_) =>
        console.error("Uh oh, there was an error hiding the animation")
      );
  }, 5000,resMedia);
  // setTimeout(checkReload, 3000);
  // setTimeout(playAudio,4000);
  // setTimeout(checkReload, 8000);
  window.MacAddress.getMacAddress(
    function (macAddress) {
      // alert('mac地址为：'+macAddress);
      if (!window.localStorage.getItem("roomId")) {
        // cordova.plugin.http.sendRequest(
        //   `https://gateway.classkid.net/api/getInfoByMacAddress/${macAddress}`,
        //   {},
        //   function (res) {
        //     // prints 200
        //     //   alert(res.status);
        //     const result = JSON.parse(res.data);
        //     window.localStorage.setItem("roomId", result.data.id);
        //     window.localStorage.setItem("mode", result.data.mode);
        //     window.localStorage.setItem("talkCloudId", result.data.talkCloudId);
        //     console.log("set-success");
        //   },
        //   function (response) {
        //     // prints 403
        //     console.log("success", response.status);

        //     //prints Permission denied
        //     console.log(response.error);
        //   }
        // );
        fetch(
          `https://gateway.classkid.net/api/getInfoByMacAddress/${macAddress}`
        )
          .then((res) => {
            const result = JSON.parse(res.data);
            window.localStorage.setItem("roomId", result.data.id);
            window.localStorage.setItem("mode", result.data.mode);
            window.localStorage.setItem("talkCloudId", result.data.talkCloudId);
            console.log("set-success");
          })
          .catch((err) => {
            console.log(new Error(err));
          });
      }
    },
    function (fail) {
      alert(fail);
    }
  );

  document.querySelector("#shutdown").addEventListener("click", () => {
    window.plugins.toast.showWithOptions(
      {
        message: "设备正在关机, 请稍后...",
        duration: "long", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
        position: "center",
        addPixelsY: -40, // added a negative value to move it up a bit (default 0)
      }
      // onSuccess, // optional
      // onError    // optional
    );
    setTimeout(() => {
      cordova.plugins.MyToast.shellExec("reboot -p");
      // cordova.plugins.MyToast.openApp("com.tencent.wemeet.app");
    }, 2000);
  });
  document.querySelector(".wemeet").addEventListener("click", () => {
    window.plugins.toast.showWithOptions(
      {
        message: "应用正在启动, 请稍后...",
        duration: "long", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
        position: "center",
        addPixelsY: -40, // added a negative value to move it up a bit (default 0)
      }
      // onSuccess, // optional
      // onError    // optional
    );
    setTimeout(() => {
      cordova.plugins.MyToast.openApp("com.tencent.wemeet.app");
    }, 2000);
  });
  document.querySelector(".bg2").addEventListener("click", () => {
    window.plugins.toast.showWithOptions(
      {
        message: "应用正在启动, 请稍后...",
        duration: "long", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
        position: "center",
        addPixelsY: -40, // added a negative value to move it up a bit (default 0)
      }
      // onSuccess, // optional
      // onError    // optional
    );
    setTimeout(() => {
      cordova.plugins.MyToast.openApp("com.ss.android.lark");
    }, 2000);
  });

  cordova.plugins.autoStart.enable();
}


function errorCallback(res) {
  alert(`${res} - error`);
}

document.addEventListener("online", onOnline, false);
document.addEventListener("offline", onOffline, false);
function onOnline() {
  window.localStorage.setItem("network", 1);
}
function onOffline() {
  window.localStorage.setItem("network", 0);
}


window.cloudTest = function (obj){
   cordova.plugins.TalkCloudToast.enterClassroom(obj);
}