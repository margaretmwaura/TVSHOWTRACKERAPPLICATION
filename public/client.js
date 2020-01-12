
const publicVapidKey = 'BMtwc-UhhkFA3TnKpx64d5FS6mzBl74aMXi7pso8tXIzQOSkdrpbtIx5QNqCTgfJ_ek8TvgIqXeM2BMLA1mDwg8';

if('serviceWorker' in navigator)
{
    send().catch(error => console.error(error))
}

//register sw , register push , send push
async function send()
{
    //Register service worker
    console.log("Registering service worker");
    const register = await navigator.serviceWorker.register('./worker.js',{
        scope : 'http://localhost:3000/',
    });
    console.log("Service worker registered");

    askPermission();
    //Register push
    console.log('Registering push');
    const subscription = await  register.pushManager.subscribe({
        userVisibleOnly : true,
        applicationServerKey : urlBase64ToUint8Array(publicVapidKey)
    });

    console.log("Push registered");
    //Send push notification
    console.log("Sending push");

    //This is the part where the user decides what the information will be displayed to the user on push notification
    await fetch("http://localhost:4000/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });
    console.log("Push Sent...");

}

function askPermission() {
    return new Promise(function(resolve, reject) {
        const permissionResult = Notification.requestPermission(function(result) {
            resolve(result);
        });
        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    })
        .then(function(permissionResult) {
            if (permissionResult !== 'granted') {
               console.log("We were never granted permission");
            }
            if (permissionResult === 'granted') {
                console.log("We were grated permission");
            }
            if(permissionResult === 'default')
            {
                console.log("We were here initially");
            }
        });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

