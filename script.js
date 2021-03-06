var activeAccount;
var activeUserKey;

var storedAccounts = { // "demoAccounts"
    user1: {
        username: "admin",
        email: "admin@flippinsupreme.com",
        firstname: "Admin",
        lastname: "",
        password: "supreme",
        type: "admin",
        bio: "",
        company: "",
        location: "",
        listings: [],
    },
    user2: {
        username: "buyer",
        email: "buyer@flippinsupreme.com",
        firstname: "Oliver",
        lastname: "Huey",
        password: "supreme",
        type: "standard",
        bio: "",
        company: "",
        location: "",
        listings: [],
    },
    user3: {
        username: "seller",
        email: "seller@flippinsupreme.com",
        firstname: "Catherine",
        lastname: "Rhodes",
        password: "supreme",
        type: "standard",
        bio: "",
        company: "",
        location: "",
        listings: [],
    },
    user4: {
        username: "ricky",
        email: "rhuang@flippinsupreme.com",
        firstname: "Ricky",
        lastname: "Huang",
        password: "password",
        type: "standard",
        bio: "",
        company: "",
        location: "",
        listings: [],
    },
    user5: {
        username: "val",
        email: "vho@flippinsupreme.com",
        firstname: "Val",
        lastname: "Ho",
        password: "password",
        type: "standard",
        bio: "",
        company: "",
        location: "",
        listings: [],
    },
    user6: {
        username: "poe",
        email: "phwang@flippinsupreme.com",
        firstname: "Poe",
        lastname: "Hwang",
        password: "password",
        type: "standard",
        bio: "",
        company: "",
        location: "",
        listings: [],
    }
};

function saveSession1() {
    var saveSession = {
        activeAccount1: activeAccount1,
        storedAccounts1: storedAccounts1,
        activeUserKey1: activeUserKey1,
        listings1: listings1,
    };
    localStorage.setItem("saveSession", JSON.stringify(saveSession));
}

var savedSession = JSON.parse(localStorage.getItem("saveSession"));
var storedAccounts1;
var activeAccount1;
var activeUserKey1;
var listings1;


if (savedSession == null) {
    storedAccounts1 = storedAccounts;
    listings1 = listings;
    // initialize session data
    var saveSession = {
        activeAccount1: activeAccount,
        storedAccounts1: storedAccounts,
        activeUserKey1: activeUserKey,
        listings1: listings,
    };
    localStorage.setItem("saveSession", JSON.stringify(saveSession));
} else {
    storedAccounts1 = savedSession.storedAccounts1;
    listings1 = savedSession.listings1;
    activeAccount1 = savedSession.activeAccount1;
    activeAccount = activeAccount1;
    activeUserKey1 = savedSession.activeUserKey1;
    activeUserKey = activeUserKey1;
}

// Helper function to titlecase names
function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
}

// Display nav bar
var nav = document.querySelector("nav");
nav.innerHTML = '<div class="flex items-center justify-between flex-wrap p-6 shadow-md sticky"> <a href="index.html" class="text-black no-underline font-semibold tracking-tight"><img src="img/flippin-supreme-logo.jpg" class="align-bottom" style="height: 1.8rem"></a> <div class="text-sm"><ul class="inline-block mr-3"> <li><a id="navAbout" href="about.html" class="text-black hover:text-red">About</a></li>  <li><span id="navBrowse" class="text-black cursor-default">Browse</span> <ul class="dropdown shadow-lg"> <li><a href="apparel.html" class="text-black hover:text-red">Apparel</a></li> <li><a href="footwear.html" class="text-black hover:text-red">Footwear</a></li> <li><a href="accessories.html" class="text-black hover:text-red">Accessories</a></li> <li><a href="collectibles.html" class="text-black hover:text-red">Collectibles</a></li> </ul> </li> </ul> <span id="myaccount" class=""></span> </div> </div>';

// Display social buttons
var social = document.querySelector("#social");
social.innerHTML += `<div id="social-bubble"><ul><li class="mx-1"><iframe src="https://www.facebook.com/plugins/share_button.php?href=https://val.codes/flippin-supreme/&layout=button&size=small&width=59&height=20&appId" width="59" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe></li><li class="mx-1"><a class="twitter-share-button" href="https://twitter.com/intent/tweet" data-url="https://val.codes/flippin-supreme/" data-text="Check out Flippin Supreme for exclusive Supreme products!" data-hashtags="FlippinSurpreme" data-related="" data-show-count="false"></a></li></ul></div>`

// Display footer
var footer = document.querySelector("footer");
footer.innerHTML += '<div class="w-full sticky bg-black text-white p-20"><button class="text-red rounded p-3 font-bold bg-grey hover:text-white hover:bg-red text-base" onclick="resetDemo()">RESET DEMO</button> </div>';

// Display "login / register" or "account"
var myaccount = document.querySelector("#myaccount");
if (activeUserKey == null) { // if not logged in
    myaccount.innerHTML = '<a href="#ex3" rel="modal:open" class="inline-block text-black mt-4 mr-3 no-underline p-1 rounded border border-black hover:text-red hover:border-red"> Sell </a>  <a href="#ex1" rel="modal:open" class="inline-block text-black mt-4 no-underline p-1 hover:text-red">Login</a> / <a href="#ex2" rel="modal:open" class="inline-block text-black mt-4 mr-3 no-underline p-1 hover:text-red">Register</a>';
} else { // if logged in
    myaccount.innerHTML = '<a href="sell.html" id="navSell" class="inline-block text-black mt-4 mr-3 no-underline p-1 rounded border border-black hover:text-red hover:border-red"> Sell </a>  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">    <a href="settings.html" id="navSet" class="inline-block text-black mt-4 ml-3 no-underline p-1 hover:text-red"><i class="fas fa-user-circle mr-2" style="font-size:1.2rem"></i> <span id="settingsName">Settings</span></a> / <a href="#" onclick="logout();" class="inline-block text-black mt-4 mr-3 no-underline p-1 hover:text-red">Sign Out</a>';
}

// Check if admin
if (storedAccounts1[activeUserKey1].type === "admin") {
    document.getElementById("navSet").href = "settings-admin.html"
}

// Check active page, style active nav link
var path = window.location.pathname;
var pagename = path.split("/").pop();
if (pagename === "about.html") {
    document.querySelector("#navAbout").classList.add("text-red");
} else if (pagename === "accessories.html" || pagename === "apparel.html" || pagename === "footwear.html" || pagename === "collectibles.html") {
    document.querySelector("#navBrowse").classList.add("text-red");
} else if (pagename === "sell.html") {
    document.querySelector("#navSell").classList.remove("border");
    document.querySelector("#navSell").classList.remove("hover:text-red");
    document.querySelector("#navSell").classList.add("bg-red");
    document.querySelector("#navSell").classList.add("text-white");
} else if (pagename === "settings.html" || pagename === "settings-account.html") {
    document.querySelector("#navSet").classList.add("text-red");
}  else if (pagename === "about.html") {
    document.querySelector("#navAbout").classList.add("text-red");
}

// Display name on nav
var settingsName = document.getElementById("settingsName");
if (activeUserKey1 !== null && activeUserKey1 !== undefined) {
    settingsName.innerHTML = titleCase(activeAccount1.firstname) + " " + titleCase(activeAccount1.lastname);
}

// Logout function
function logout() {
    activeUserKey1 = null;
    saveSession1();
    window.location = "index.html";
    // If in settings, return to homepage
    // if (pagename === "settings.html") {
    //     window.location = "index.html";
    // } else {
    //     location.reload();
    // }
}

// Reset demo function
function resetDemo() {
    localStorage.clear();
    window.location = "index.html";
}

// Login function
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    // Check if required fields are entered, else display login help text
    if (password === "") {
        document.getElementById("loginPasswordHelper").innerHTML = "Please enter your password.";
        document.getElementById("password").classList.add("border-red");
    } else {
        document.getElementById("loginPasswordHelper").innerHTML = "";
        document.getElementById("password").classList.remove("border-red");
    }
    if (username === "") {
        document.getElementById("loginUsernameHelper").innerHTML = "Please enter a valid username or email.";
        document.getElementById("username").classList.add("border-red");
    } else {
        document.getElementById("loginUsernameHelper").innerHTML = "";
        document.getElementById("username").classList.remove("border-red");
    }
    if (password !== "" && username !== "") {
        for (var prop in storedAccounts1) {
            // If login matches an existing account, save and reload
            if (((storedAccounts1[prop].username == username) || (storedAccounts1[prop].email == username)) && (storedAccounts1[prop].password === password)) {
                document.getElementById("loginHelper").innerHTML = "";
                activeUserKey1 = [prop];
                activeAccount1 = storedAccounts1[prop];
                saveSession1();
                location.reload();
                break;
            } else {
                // Else display login help text
                document.getElementById("loginHelper").innerHTML = "Invalid credentials. Please try again.";
            }
        }
    }
}

// Register function
function register() {
    var newFirstName = document.getElementById("grid-first-name").value;
    var newLastName = document.getElementById("grid-last-name").value;
    var newPassword = document.getElementById("grid-password").value;
    var newEmail = document.getElementById("grid-email").value;
    var newUsername = document.getElementById("grid-username").value;
    var numOfIncomplete = 0;

    if (newFirstName === "") {
        document.getElementById("grid-first-name").classList.add("border-red");
        numOfIncomplete += 1;
    } else {
        document.getElementById("grid-first-name").classList.remove("border-red");
    }
    if (newLastName === "") {
        document.getElementById("grid-last-name").classList.add("border-red");
        numOfIncomplete += 1;
    } else {
        document.getElementById("grid-last-name").classList.remove("border-red");
    }
    if (newPassword === "") {
        document.getElementById("grid-password").classList.add("border-red");
        numOfIncomplete += 1;
    } else {
        document.getElementById("grid-password").classList.remove("border-red");
    }
    if (newLastName === "") {
        document.getElementById("grid-last-name").classList.add("border-red");
        numOfIncomplete += 1;
    } else {
        document.getElementById("grid-last-name").classList.remove("border-red");
    }
    if (newEmail === "") {
        document.getElementById("grid-email").classList.add("border-red");
        numOfIncomplete += 1;
    } else {
        if (isValidEmail(newEmail)) { // if new email is valid
            document.getElementById("grid-email").classList.remove("border-red");
            document.getElementById("registerEmailHelper").innerHTML = "";
        } else { // if invalid
            document.getElementById("grid-email").classList.add("border-red");
            numOfIncomplete += 1;
            document.getElementById("registerEmailHelper").innerHTML = "Please enter a valid email address.";
        }
    }
    if (newUsername === "") {
        document.getElementById("grid-username").classList.add("border-red");
        numOfIncomplete += 1;
    } else {
        document.getElementById("grid-username").classList.remove("border-red");
    }

    if (numOfIncomplete == 1 && newEmail !== "") { // if it's only email that is wrong
        document.getElementById('registerHelper').innerHTML = "";
    } else if (numOfIncomplete > 0) {
            document.getElementById('registerHelper').innerHTML = "All fields are required.";
    } else if (numOfIncomplete == 0) {
        console.log(numOfIncomplete);
        var userNum = Object.keys(storedAccounts1).length + 1;
        storedAccounts1['user' + userNum] = {
            username: newUsername,
            email: newEmail,
            firstname: newFirstName,
            lastname: newLastName,
            password: newPassword,
            type: "standard",
            bio: "",
            company: "",
            location: "",
            listings: [],
        }
        activeUserKey1 = ['user' + userNum];
        activeAccount1 = storedAccounts1['user' + userNum];
        saveSession1();
        location.reload();
    }
}

function isValidEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    return false;
}

function registerToSell() {
    var newFirstName = document.getElementById("grid-first-name2").value;
    var newLastName = document.getElementById("grid-last-name2").value;
    var newPassword = document.getElementById("grid-password2").value;
    var newEmail = document.getElementById("grid-email2").value;
    var newUsername = document.getElementById("grid-username2").value;
    var numOfIncomplete = 0;

    if (newFirstName === "") {
        document.getElementById("grid-first-name2").classList.add("border-red");
        numOfIncomplete += 1;
    } else {
        document.getElementById("grid-first-name2").classList.remove("border-red");
    }
    if (newLastName === "") {
        document.getElementById("grid-last-name2").classList.add("border-red");
        numOfIncomplete += 1;
    } else {
        document.getElementById("grid-last-name2").classList.remove("border-red");
    }
    if (newPassword === "") {
        document.getElementById("grid-password2").classList.add("border-red");
        numOfIncomplete += 1;
    } else {
        document.getElementById("grid-password2").classList.remove("border-red");
    }
    if (newLastName === "") {
        document.getElementById("grid-last-name2").classList.add("border-red");
        numOfIncomplete += 1;
    } else {
        document.getElementById("grid-last-name2").classList.remove("border-red");
    }
    if (newEmail === "") {
        document.getElementById("grid-email2").classList.add("border-red");
        numOfIncomplete += 1;
    } else {
        if (isValidEmail(newEmail)) { // if new email is valid
            document.getElementById("grid-email2").classList.remove("border-red");
            document.getElementById("registerEmailHelper2").innerHTML = "";
        } else { // if invalid
            document.getElementById("grid-email2").classList.add("border-red");
            numOfIncomplete += 1;
            document.getElementById("registerEmailHelper2").innerHTML = "Please enter a valid email address.";
        }
    }
    if (newUsername === "") {
        document.getElementById("grid-username2").classList.add("border-red");
        numOfIncomplete += 1;
    } else {
        document.getElementById("grid-username2").classList.remove("border-red");
    }

    if (numOfIncomplete == 1 && newEmail !== "") { // if it's only email that is wrong
        document.getElementById('registerHelper2').innerHTML = "";
    } else if (numOfIncomplete > 0) {
            document.getElementById('registerHelper2').innerHTML = "All fields are required.";
    } else if (numOfIncomplete == 0) {
        console.log(numOfIncomplete);
        var userNum = Object.keys(storedAccounts1).length + 1;
        storedAccounts1['user' + userNum] = {
            username: newUsername,
            email: newEmail,
            firstname: newFirstName,
            lastname: newLastName,
            password: newPassword,
            type: "standard",
            bio: "",
            company: "",
            location: "",
            listings: [],
        }
        activeUserKey1 = ['user' + userNum];
        activeAccount1 = storedAccounts1['user' + userNum];
        saveSession1();
        location.reload();
    }
}