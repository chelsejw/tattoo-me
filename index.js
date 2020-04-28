//SETTING STUFF UP...

const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public/"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
const reactEngine = require("express-react-views").createEngine();
app.engine("jsx", reactEngine);
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
let port = process.env.PORT

if (port==null || port=="") {
    port = 3000
};
app.listen(port, () => console.log('~~~ Tuning in to the waves of port '+port+' ~~~'));
const date = new Date();
const today = date.getDate() + "/" + (parseInt(date.getMonth())+1) + "/" + date.getFullYear()




const authURL = `https://api.instagram.com/oauth/authorize
  ?client_id={513489939332885}
  &redirect_uri={redirect-uri}
  &scope=user_profile,user_media
  &response_type=code`;

//=========================GET REQUESTS=================================

//====FORM FOR NEW RECIPE====
app.get('*', (req,res)=> {

    res.render(`index`)
})