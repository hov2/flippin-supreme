var activeAccount;
var activeUserKey;

var storedAccounts = { // "demoAccounts"
    user1: {
        username: "admin",
        email: "",
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
        email: "",
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
        email: "",
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
        username: "rhuang",
        email: "",
        firstname: "Ricky",
        lastname: "Huang",
        password: "password",
        type: "admin",
        bio: "",
        company: "",
        location: "",
        listings: [],
    },
    user5: {
        username: "vho",
        email: "valerie.s.ho@gmail.com",
        firstname: "Val",
        lastname: "Ho",
        password: "password",
        type: "admin",
        bio: "",
        company: "",
        location: "",
        listings: [],
    },
    user6: {
        username: "phwang",
        email: "",
        firstname: "Poe",
        lastname: "Hwang",
        password: "password",
        type: "admin",
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
    };
    localStorage.setItem("saveSession", JSON.stringify(saveSession));
}

var savedSession = JSON.parse(localStorage.getItem("saveSession"));
var storedAccounts1;
var activeAccount1;
var activeUserKey1;


if (savedSession == null) {
    storedAccounts1 = storedAccounts;
    // initialize session data
    var saveSession = {
        activeAccount1: activeAccount,
        storedAccounts1: storedAccounts,
        activeUserKey1: activeUserKey,
    };
    localStorage.setItem("saveSession", JSON.stringify(saveSession));
} else {
    storedAccounts1 = savedSession.storedAccounts1;
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
nav.innerHTML = '<div class="flex items-center justify-between flex-wrap p-6 shadow-md sticky"> <a href="index.html" class="text-black no-underline font-semibold text-xl tracking-tight"><img src="img/flippin-supreme-logo.jpg" class="align-bottom" style="height: 1.7rem"></a> <div class="text-sm"> <a href="about.html" id="navAbout" class="inline-block text-black mt-4 mr-3 no-underline p-1 hover:text-red"> About </a> <a href="collectibles.html" id="navCat" class="inline-block text-black mt-4 mr-3 no-underline p-1 hover:text-red"> Collectibles </a> <a href="sell.html" id="navSell" class="inline-block text-black mt-4 mr-3 no-underline p-1 rounded border border-black hover:text-red hover:border-red"> Sell </a> <span id="myaccount" class=""></span> </div> </div>';

// Display "login / register" or "account"
var myaccount = document.querySelector("#myaccount");
if (activeUserKey == null) {
    myaccount.innerHTML = '<a href="#ex1" rel="modal:open" class="inline-block text-black mt-4 no-underline p-1 hover:text-red">Login</a> / <a href="#ex2" rel="modal:open" class="inline-block text-black mt-4 mr-3 no-underline p-1 hover:text-red">Register</a>';
} else {
    myaccount.innerHTML = '<a href="settings.html" id="navSet" class="inline-block text-black mt-4 mr-3 no-underline p-1 hover:text-red">Settings</a> <a href="#" onclick="logout();" class="inline-block text-black mt-4 mr-3 no-underline p-1 hover:text-red">Sign Out</a>';
}

// Check active page, style active nav link 
var path = window.location.pathname;
var pagename = path.split("/").pop();
if (pagename === "about.html") {
    document.querySelector("#navAbout").classList.add("text-red");
} else if (pagename === "collectibles.html") {
    document.querySelector("#navCat").classList.add("text-red");
} else if (pagename === "sell.html") {
    document.querySelector("#navSell").classList.remove("border");
    document.querySelector("#navSell").classList.remove("hover:text-red");
    document.querySelector("#navSell").classList.add("bg-red");
    document.querySelector("#navSell").classList.add("text-white");
} else if (pagename === "settings.html") {
    document.querySelector("#navSet").classList.add("text-red");
}

// Display welcome message on homepage
var welcome = document.getElementsByClassName("welcome");
if (activeUserKey1 == null) {
    for (var i = 0; i < welcome.length; i++) {
        welcome[i].innerHTML = '';
    }
} else {
    for (var i = 0; i < welcome.length; i++) {
        welcome[i].innerHTML = 'Hi ' + titleCase(activeAccount1.firstname) + "!<br><br>";
    }
}

// Logout function
function logout() {
    activeUserKey1 = null;
    saveSession1();
    // If in settings, return to homepage
    if (pagename === "settings.html") {
        window.location = "index.html";
    } else {
        location.reload();
    }
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