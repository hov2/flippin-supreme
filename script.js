var account = {
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    type: "",
    listings: [],
};

var demoAccounts = {
    user1: {
        username: "admin",
        firstname: "Admin",
        lastname: "",
        password: "supreme",
        type: "admin",
        listings: [],
    },
    user2: {
        username: "buyer",
        firstname: "Oliver",
        lastname: "Huey",
        password: "supreme",
        type: "standard",
        listings: [],
    },
    user3: {
        username: "seller",
        firstname: "Catherine",
        lastname: "Rhodes",
        password: "supreme",
        type: "standard",
        listings: [],
    }
}

function saveSession () {
    var saveSession = {
        account1: account
    };
    localStorage.setItem("saveSession", JSON.stringify(saveSession));
}

var savedAccount = JSON.parse(localStorage.getItem("saveSession"));

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
nav.innerHTML = '<div class="flex items-center justify-between flex-wrap p-6 shadow-md sticky"> <a href="index.html" class="text-black no-underline font-semibold text-xl tracking-tight">Flippin\' <img src="img/Supreme-Logo-White-Red-01.jpg" class="align-bottom" style="height: 1.7rem"></a> <div class="text-sm"> <a href="about.html" id="navAbout" class="inline-block text-black mt-4 mr-3 no-underline p-1 hover:text-red"> About </a> <a href="collectibles.html" id="navCat" class="inline-block text-black mt-4 mr-3 no-underline p-1 hover:text-red"> Collectibles </a> <a href="sell.html" id="navSell" class="inline-block text-black mt-4 mr-3 no-underline p-1 rounded border border-black hover:text-red hover:border-red"> Sell </a> <span id="myaccount" class=""></span> </div> </div>';

// Display "login / register" or "account"
var myaccount = document.querySelector("#myaccount");
if ((savedAccount == undefined ) || (savedAccount == null ) || (savedAccount.account1.username == "")) {
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
if ((savedAccount == undefined ) || (savedAccount == null ) || (savedAccount.account1.username == "")) {
    for (var i = 0; i < welcome.length; i++) {
        welcome[i].innerHTML = '';
    }
} else {
    for (var i = 0; i < welcome.length; i++) {
        welcome[i].innerHTML = 'Hi ' + titleCase(savedAccount.account1.firstname) + "!<br><br>";
    }
}

// Logout function
function logout() {
    account.name = "";
    saveSession();
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
        document.getElementById("loginUsernameHelper").innerHTML = "Please enter your username.";
        document.getElementById("username").classList.add("border-red");
    } else {
        document.getElementById("loginUsernameHelper").innerHTML = "";
        document.getElementById("username").classList.remove("border-red");
    }
    if (password !== "" && username !== "") {
        for (var prop in demoAccounts) {
            // If login matches an existing account, save and reload
            if ((demoAccounts[prop].username == username) && (demoAccounts[prop].password === password)) {
                document.getElementById("loginHelper").innerHTML = "";
                account = demoAccounts[prop];
                saveSession();
                location.reload();
                break;
            } else {
                // Else display login help text
                document.getElementById("loginHelper").innerHTML = "Invalid username/password. Please try again.";
            }
        }
    }
}