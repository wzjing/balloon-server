function ajax(request) {
    let xhr = new XMLHttpRequest();
    // register events
    xhr.onreadystatechange = () => {
        console.log(`onreadystatechange: ${xhr.readyState}`);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(`Ajax Response: [${xhr.responseType}] ${xhr.response}`);
                if (request.success !== undefined) {
                    request.success(xhr.status, JSON.parse(xhr.responseText))
                }
            } else {
                console.error(`${xhr.status}: ${xhr.statusText}`);
                if (request.error !== undefined) {
                    request.error(xhr.status, xhr.statusText)
                }
            }
        }
    };
    xhr.onerror = err => {
        console.log(`onerror: ${xhr.readyState}`)
    };
    xhr.ontimeout = () => {
        console.log(`ontimeout: ${xhr.readyState}`)
    };
    xhr.onabort = () => {
        console.log(`onabort: ${xhr.readyState}`)
    };
    xhr.upload.onerror = err => {
        console.log(`upload.onerror: ${xhr.readyState}`)
    };
    xhr.upload.ontimeout = () => {
        console.log(`upload.ontimeout: ${xhr.readyState}`)
    };
    xhr.upload.onabort = () => {
        console.log(`upload.onabort: ${xhr.readyState}`)
    };
    xhr.onloadstart = () => {
        console.log(`onloadstart: ${xhr.readyState}`)
    };
    xhr.upload.onloadstart = () => {
        console.log(`upload.onloadstart: ${xhr.readyState}`)
    };
    xhr.upload.onprogress = () => {
        console.log(`upload.onprogress: ${xhr.readyState}`)
    };
    xhr.upload.onload = () => {
        console.log(`upload.onload: ${xhr.readyState}`);
    };
    xhr.upload.onloadend = () => {
        console.log(`upload.onloadend: ${xhr.readyState}`);
    };
    xhr.onprogress = () => {
        console.log(`onprogress: ${xhr.readyState}`);
    };
    xhr.onload = () => {
        console.log(`onload: ${xhr.readyState}`);
    };
    xhr.onloadend = () => {
        console.log(`onloadend: ${xhr.readyState}`);
    };
    // decode parameter data
    let url = request.url;
    let data;
    if (request.data instanceof FormData) {
        data = request.data
    } else {
        data = formData(request.data)
    }
    // open request
    switch (request.method) {
        case 'GET':
            xhr.open('GET', `${url}?${data}`, true);
            xhr.send();
            console.log('GET REQUEST ---', data);
            break;
        case 'POST':
            xhr.open('POST', url, true);
            xhr.send(data);
            console.log('POST REQUEST ---', data);
            break;
        case 'PUT':
            xhr.open('PUT', url, true);
            xhr.send(data);
            console.log('PUT REQUEST ---', data);
            break;
        case 'DELETE':
            xhr.open('DELETE', url, true);
            xhr.send(null);
            console.log('DELETE REQUEST --- null');
            break;
    }
}

function formData(data) {
    let form = new FormData();
    if (data !== undefined) {
        Object.keys(data).forEach((item) => {
            form.append(item, data[item])
        });
    }
    return form
}