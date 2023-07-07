import { getgolog,setgolog } from "../cookie/cookiecontrole.js";
import { headersec, headerbackphoto } from "../auth/logincontrol.js";
if (getgolog("golog")=="t") { 
    headersec.classList.toggle("onheaderseclog");
    headerbackphoto.classList.toggle("onheaderbackphotolog");
    setgolog("f");
}