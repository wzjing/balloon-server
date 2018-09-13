function ajax(request) {
    let xhr = new XMLHttpRequest();
    xhr.timeout = 6000;
    xhr.responseType = request.type;
    // register events
    xhr.onerror = err => {
        console.error(`Network Error when receive: ${request.url}`)
    };
    xhr.ontimeout = () => {
        console.error(`Request receive time out: ${request.url}`)
    };
    xhr.onabort = () => {
        console.log(`Request abort when receive: ${request.url}`)
    };
    xhr.upload.onerror = err => {
        console.error(`Network Error when send: ${request.url}`)
    };
    xhr.upload.ontimeout = () => {
        console.error(`Request send time out: ${request.url}`)
    };
    xhr.upload.onabort = () => {
        console.log(`Request abort when receive: ${request.url}`)
    };
    xhr.onloadstart = () => {
        if (request.onStart !== undefined) request.onStart()
    };
    xhr.upload.onloadstart = () => {
        if (request.onUploadStart !== undefined) request.onUploadStart()
    };
    xhr.upload.onprogress = ev => {
        if (request.onUploading !== undefined) request.onUploading(ev)
    };
    xhr.upload.onload = () => {
        if (request.onUploadSuccess !== undefined) request.onUploadSuccess()
    };
    xhr.upload.onloadend = () => {
        if (request.onUploadFinish !== undefined) request.onUploadFinish()
    };
    xhr.onprogress = ev => {
        if (request.onDownloading !== undefined) request.onDownloading(ev)
    };
    xhr.onload = () => {
        if (request.onSuccess !== undefined) request.onSuccess()
    };
    xhr.onloadend = () => {
        if (request.onFinish !== undefined) request.onFinish()
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