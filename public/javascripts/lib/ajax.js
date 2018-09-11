let xmlhttp = new XMLHttpRequest();
const boundary = 'ballooooooooooooon';

function ajax(request) {
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                console.log(`Ajax Response: [${xmlhttp.responseType}] ${xmlhttp.response}`);
                if (request.success !== undefined) {
                    request.success(xmlhttp.status, JSON.parse(xmlhttp.responseText))
                }
            } else {
                console.error(`${xmlhttp}: ${xmlhttp.responseText}`);
                if (request.error !== undefined) {
                    request.error(xmlhttp.status, xmlhttp.responseText)
                }
            }
        }
    };
    xmlhttp.onerror = ev => {
        if (request.error !== undefined) {
            request.error(xmlhttp.status, ev.message)
        }
    };
    let url = request.url;
    let data;
    if (request.data instanceof FormData) {
        data = request.data
    } else {
        data = formData(request.data)
    }
    switch (request.method) {
        case 'GET':
            xmlhttp.open('GET', `${url}?${data}`, true);
            xmlhttp.send();
            console.log('GET REQUEST ---', data);
            break;
        case 'POST':
            xmlhttp.open('POST', url, true);
            // xmlhttp.setRequestHeader("content-type", `multipart/form-data; boundary=${boundary}`);
            // xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send(data);
            console.log('POST REQUEST ---', data);
            break;
        case 'PUT':
            xmlhttp.open('PUT', url, true);
            // xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send(data);
            console.log('PUT REQUEST ---', data);
            break;
        case 'DELETE':
            xmlhttp.open('DELETE', url, true);
            xmlhttp.send(null);
            console.log('DELETE REQUEST ---');
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