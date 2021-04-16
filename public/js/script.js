var firstname = document.forms['generalform']['firstname'];
var title = document.forms['generalform']['title'];
var lastname = document.forms['generalform']['lastname'];
var birthDate = document.forms['generalform']['birthDate'];
var phoneNumber = document.forms['generalform']['phoneNumber'];
var country = document.forms['generalform']['country'];
var passNumber = document.forms['generalform']['passNumber'];
var email = document.forms['generalform']['email'];
var Livingaus = document.forms['generalform']['Livingaus'];
var Arrivaldate = document.forms['generalform']['Arrivaldate'];
var departdate = document.forms['generalform']['departdate'];
var  expirydate= document.forms['generalform']['expirydate'];

        
// SELECTING ALL ERROR DISPLAY ELEMENTS
var firstname_error = document.getElementById('name_error');
var lastname_error = document.getElementById('name_error');
var email_error = document.getElementById('email_error');
// SETTING ALL EVENT LISTENERS
firstname.addEventListener('blur', firstnameVerify, true);
lastname.addEventListener('blur', lastnameVerify, true);
email.addEventListener('blur', emailVerify, true);
birthDate.addEventListener('blur',birthdayvalidate,true);
// validation function
function Validate() {
  // validate firstname
  if (firstname.value.length < 2) {
    firstname.style.border = "1px solid red";
    document.getElementById('firstname_div').style.color = "red";
    name_error.textContent = "firstname must be at least 2 characters";
    firstname.focus();
    return false;
  }
  // validate lastname
  if (lastname.value.length < 2) {
    lastname.style.border = "1px solid red";
    document.getElementById('lastname_div').style.color = "red";
    name_error.textContent = "lastnamename must be at least 2 characters";
    lastname.focus();
    return false;
  }
  
  //validate phonenum
    if (isNaN(num)){  
      document.getElementById("phoneNumber_div").innerHTML="Enter Numeric value only";  
      return false;  
    }else{  
      return true;  
      }  
}
//country validation
if(country.value == "Default")
{
alert('Select your country from the list');
country.focus();
return false;
}

//passport validation
var patt = new RegExp("^([A-Z a-z]){1}([0-9]){7}$");
var advalue = document.getElementById("passNumber").value;
if (patt.test(advalue)) {
                return true;
            }
            else {
                alert("Passport number is not valid");
            }
            return false;
        
    
  // validate email
  if (email.value == "") {
    email.style.border = "1px solid red";
    document.getElementById('email_div').style.color = "red";
    email_error.textContent = "Email is required";
    email.focus();
    return false;
  }

// event handler functions
function firstnameVerify() {
  if (firstname.value != "") {
   firstname.style.border = "1px solid #5e6e66";
   document.getElementById('username_div').style.color = "#5e6e66";
   name_error.innerHTML = "";
   return true;
  }
}
function lastnameVerify() {
    if (lastname.value != "") {
     lastname.style.border = "1px solid #5e6e66";
     document.getElementById('username_div').style.color = "#5e6e66";
     name_error.innerHTML = "";
     return true;
    }
  }
  
function emailVerify() {
  if (email.value != "") {
  	email.style.border = "1px solid #5e6e66";
  	document.getElementById('email_div').style.color = "#5e6e66";
  	email_error.innerHTML = "";
  	return true;
  }
}

function birthdayvalidate(date){
    var eightYearsAgo = momment().subtract("years", 18);
    var birthdayDate = moment(date);

    if(!birthdayDate.isValid()){
        // INVALID DATE
    }else if (eightYearsAgo.isAfter(birthday)){
        // 18+
    }else{
    // < 18
    }
}   