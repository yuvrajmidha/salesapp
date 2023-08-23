import { template } from "./template";
import calc from './formula';

var url = "https://bepoz.vercel.app/api/mail";
// url = 'http://localhost:3001/api/mail'

export const sendMail = (email=[], values, group="oolio") => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "to": [
        ...email,
    ],
    "from": "OolioPay Calculator <calc-mail-service@hellopos.net.au>",
    "subject": "Received an new quote from " + values['venue_name'],
    "message": template({
        ...values,
        ...calc(values)
    }, group)
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