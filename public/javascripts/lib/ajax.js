let xmlhttp = new XMLHttpRequest();

function ajax(request) {
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            if (request.success !== undefined) {
                request.success(status, xmlhttp.responseText)
            }
        }
    };
    xmlhttp.onerror = ev => {
        if (request.error !== undefined) {
            request.error(ev.error, ev.message)
        }
    };
    let url = request.url;
    switch (request.method) {
        case 'GET':
            xmlhttp.open('GET', `${url}?${argBuilder(request.data)}`, true);
            xmlhttp.send();
            console.log('GET REQUEST ---', argBuilder(request.data));
            break;
        case 'POST':
            xmlhttp.open('POST', url, true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.send(argBuilder(request.data));
            console.log('POST REQUEST ---', argBuilder(request.data));
            break;
        case 'PUT':
            xmlhttp.open('PUT', url, true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send(argBuilder(request.data));
            break;
        case 'DELETE':
            xmlhttp.open('DELETE', url, true);
            xmlhttp.send(null);
            break;
    }
}

function argBuilder(data) {
    let args = '';
    if (data !== undefined) {
        Object.keys(data).forEach((item, index) => {
            if (index !== 0) {
                args += '&'
            }
            args += `${item}=${data[item]}`
        });
    }
    return args
}