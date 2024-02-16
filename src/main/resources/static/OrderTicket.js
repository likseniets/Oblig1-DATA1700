let Tickets = []; //Array for alle tickets

function validateMovie(movie, val) { //validering for p se om film er valgt
    if (movie === "") { //Sjekker at valgt film ikke er første som har tom string value
        const out = "<p style='color:red'>Du må velge film</p>" //lager feilmelding
        document.getElementById("movieError").innerHTML = out; //setter inn feilmelding i element med id movieError
        return false; //setter validering til å være false
    } else { //hvis den går gjennom valideringen fjerner den valideringen og returnerer tidligere val, dette er tilfelle noen tidligere valideringer har failet.
        document.getElementById("movieError").innerHTML = "";
        return val
    }
}
function validateNumber(number, val) { //funker likt som film validering
    if (isNaN(number) || number <= 0) {
        const out = "<p style='color:red'>Skriv inn antall biletter</p>"
        document.getElementById("numberError").innerHTML = out;
        return false;
    } else {
        document.getElementById("numberError").innerHTML = "";
        return val
    }
}

function validateFirstname(firstname, val) { //funker likt som film validering men bruker regex til å sjekke navn.
    if(!/^[A-Za-z\s]+$/.test(firstname)) {
        const out = "<p style='color:red'>Skriv inn gyldig navn</p>"
        document.getElementById("firstnameError").innerHTML = out;
        return false;
    } else {
        document.getElementById("firstnameError").innerHTML = "";
        return val
    }
}

function validateLastname(lastname, val) { //funker likt som film validering, men med regex
    if(!/^[A-Za-z\s]+$/.test(lastname)) {
        const out = "<p style='color:red'>Skriv inn gyldig etternavn</p>"
        document.getElementById("lastnameError").innerHTML = out;
        return false;
    } else {
        document.getElementById("lastnameError").innerHTML = "";
        return val
    }
}

function validatePhonenumber(phonenumber, val) { //funker likt som film validering, men bruker regex
    if(!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phonenumber)) {
        const out = "<p style='color:red'>Skriv inn gyldig telefonnummer</p>"
        document.getElementById("phoneError").innerHTML = out;
        return false;
    } else {
        document.getElementById("phoneError").innerHTML = "";
        return val
    }
}

function validateMail(mail, val) { //funker likt som film validering, men bruker regex
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(mail)) {
        const out = "<p style='color:red'>Skriv inn gyldig mail med landskode</p>"
        document.getElementById("mailError").innerHTML = out;
        return false;
    } else {
        document.getElementById("mailError").innerHTML = "";
        return val
    }
}

function clearInput() { //Setter input fields til å være tomme etter lagring
    document.getElementById("Film").value = "";
    document.getElementById("AntallInput").value = "";
    document.getElementById("FirstnameInput").value = "";
    document.getElementById("LastnameInput").value = "";
    document.getElementById("PhoneInput").value = "";
    document.getElementById("MailInput").value = "";
}
function OrderTicket() {
    let order = { //Objekt med all data
        film: document.getElementById("Film").value,
        antall: document.getElementById("AntallInput").value,
        fornavn: document.getElementById("FirstnameInput").value,
        etternavn: document.getElementById("LastnameInput").value,
        telefonnr: document.getElementById("PhoneInput").value,
        epost: document.getElementById("MailInput").value,
    }

    let validation = true; //initial validation er satt som true

    validation = validateMovie(order.film, validation); //når den går gjennom validering vil validation bli satt til false hvis den failer.
    validation = validateNumber(order.antall, validation); //hvis den allerede har failet vil den alltid returnere false.
    validation = validateFirstname(order.fornavn, validation); //men den vil fortsatt gjøre valideringer for å kunne sende feilmelding
    validation = validateLastname(order.etternavn, validation);
    validation = validatePhonenumber(order.telefonnr, validation);
    validation = validateMail(order.epost, validation);

    if (!validation) {
        return; //hvis valideringen ender med false så vil den bare returnere uten å gjøre noe
    } else {
        Tickets.push(order) //Hvis valideringen ender med true vil den opprette bestillingen
        displayTicketTable(); //og resetter input felt
        clearInput();
    }
}

function displayTicketTable() { //Etter bestilling har blitt oprettet vil den legge in en tabell
    let out = "<table><tr>" +
        "<th style='border: 1px solid #dddddd;'>Film</th>" +
        "<th style='border: 1px solid #dddddd;'>Antall</th>" +
        "<th style='border: 1px solid #dddddd;'>Fornavn</th>" +
        "<th style='border: 1px solid #dddddd;'>Etternavn</th>" +
        "<th style='border: 1px solid #dddddd;'>Telefon Nummer</th>" +
        "<th style='border: 1px solid #dddddd;'>Epost</th>"
    for (let p of Tickets) { //Etter head for tabell er laget vil den legge til alle bestillingene i rader under
        out += "<tr>";
        out += "<td style='border: 1px solid #dddddd;'>" + p.film + "</td>" + //bruker inline style ettersom styling ikke er brukt ellers så
            "<td style='border: 1px solid #dddddd;'>" + p.antall + "</td>" + // unngikk å legge til en css fil kun for dette.
            "<td style='border: 1px solid #dddddd;'>" + p.fornavn + "</td>" +
            "<td style='border: 1px solid #dddddd;'>" + p.etternavn + "</td>" +
            "<td style='border: 1px solid #dddddd;'>" + p.telefonnr + "</td>" +
            "<td style='border: 1px solid #dddddd;'>" + p.epost + "</td>";
        out += "</tr>";
    }
    document.getElementById("TicketTable").innerHTML = out; //Setter inn out, som er tabellen inn i element med id TicketTable
}