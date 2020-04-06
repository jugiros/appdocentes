  window.fbAsyncInit = function() {
    FB.init({
      appId      : '259024134898650',
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v3.0' // use graph api version 2.8
    });
  };
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
export const config = {
  apiKey: "AIzaSyBGaNfMPRsu3VnkgZFTDhH2giqZqUEsimA",
  authDomain: "docentes-7ca14.firebaseapp.com",
  databaseURL: "https://docentes-7ca14.firebaseio.com",
  projectId: "docentes-7ca14",
  storageBucket: "docentes-7ca14.appspot.com",
  messagingSenderId: "413550533899"
};
