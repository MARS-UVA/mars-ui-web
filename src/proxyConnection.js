const proxyAddress = "http://localhost:50050"

async function proxyRequest(url, data) { // ChangeDriveState, StartAction, EmergencyStop
  
  const fullUrl = proxyAddress + url;
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    console.log("making proxyRequest to " + fullUrl + ", options:", options);
    await fetch(fullUrl, options);
  } catch (e) {
    console.error("error making proxyRequest:", e);
  }
}

async function proxyStreamToRequest(url) { // SendDDCommand
  // return WritableStream({
  //   start(controller) {
  
  //   },
  //   write(chunk, controller) {
  
  //   },
  //   close(controller) {
  
  //   },
  //   abort(reason) {
  
  //   }
  // });
}

async function proxyRequestToStream(url, data) { // StreamHeroFeedback
  // return http.request(url);
}


export { proxyRequest, proxyStreamToRequest, proxyRequestToStream };
