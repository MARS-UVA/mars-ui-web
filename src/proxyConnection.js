const proxyAddress = "http://localhost:50050"

async function proxyRequest(url, data) {
  
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

export {proxyRequest};
