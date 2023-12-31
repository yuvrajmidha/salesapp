import { template } from "./template";
import calc from './formula';

var url = "https://bepoz.vercel.app/api/mail";
// url = 'http://localhost:3000/api/mail'

export const sendMail = (email, values) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "to": [
        ...email,
        "quotes@bepoz.com.au"
    ],
    "subject": "Received an new quote from " + values['venue_name'],
    "message": template({
        ...values,
        ...calc(values)
    })
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode: 'no-cors'
    };

    return fetch(url, requestOptions)
    .then(response => response.text())
    .catch(error => console.log('error', error));
}