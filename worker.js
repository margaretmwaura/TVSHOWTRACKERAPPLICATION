console.log("Service worker loaded");

self.addEventListener('push' , evt => {
    const data = evt.data.json();
    console.log("Push has been received");
    self.registration.showNotification(data.title, {body: ' Notified by Maggie Movies'});
});
