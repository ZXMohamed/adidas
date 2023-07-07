let session = {
    wantedproduct: null,
    golog: null
}
export function setgolog(golog) { 
    session.golog = golog;
    document.cookie = "lastpage=" + session.user + "," + "wanted=" + session.wantedproduct + "," + "golog=" + session.golog + "; path=/";
}
export function getgolog(cname) { 
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(',');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}
export function setwanted(wanted) { 
    session.wantedproduct = wanted;
    document.cookie = "lastpage=" + session.lastpage + " , " + "wanted=" + session.wantedproduct + "," + "golog=" + session.golog + "; path=/";
}
export function getwanted(cname) { 
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(',');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
    }