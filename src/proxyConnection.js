
const proxyAddress = "localhost:50050"

async function proxyRequest(url, data) {
  console.log("url:", url ,", data:", data);
  
  const fullUrl = proxyAddress + url;
  
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  try {
    await fetch(fullUrl, options);
  } catch (e) {
    console.log("error:", e);
  }
}

export {proxyRequest};