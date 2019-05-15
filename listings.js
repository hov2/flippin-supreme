var listings = {
    collectibles: {
        listing1: {
            name: "Supreme Boxing Gloves",
            askPrice: "100",
            avgSold: "150",
            imgSrc: "images/collectibles/collectibles_1_boxing.jpg",
            imgAlt: "Boxing Gloves",
            description: "",
            dateCreated: "",
        },
        listing2: {
            name: "Supreme Nunchucks",
            askPrice: "500",
            avgSold: "600",
            imgSrc: "images/collectibles/collectibles_2_nunchucks.jpg",
            imgAlt: "Nunchucks",
            description: "",
            dateCreated: "",
        },
        listing3: {
            name: "Supreme Basketball",
            askPrice: "200",
            avgSold: "225",
            imgSrc: "images/collectibles/collectibles_3_basketball.jpg",
            imgAlt: "Basketball",
            description: "",
            dateCreated: "",
        },
        listing4: {
            name: "Supreme Baseball",
            askPrice: "300",
            avgSold: "350",
            imgSrc: "images/collectibles/collectibles_4_baseball.jpg",
            imgAlt: "Baseball",
            description: "",
            dateCreated: "",
        },
        listing5: {
            name: "Supreme Nunchucks",
            askPrice: "500",
            avgSold: "600",
            imgSrc: "images/collectibles/collectibles_2_nunchucks.jpg",
            imgAlt: "Nunchucks",
            description: "",
            dateCreated: "",
        },
        listing6: {
            name: "Supreme Skate Tool",
            askPrice: "50",
            avgSold: "75",
            imgSrc: "images/collectibles/collectibles_5_skate_tool.jpg",
            imgAlt: "Skate Tool",
            description: "",
            dateCreated: "",
        },
        listing7: {
            name: "Supreme Bolt Cutters",
            askPrice: "300",
            avgSold: "350",
            imgSrc: "images/collectibles/collectibles_6_bolt_cutters.jpg",
            imgAlt: "Bolt Cutters",
            description: "",
            dateCreated: "",
        }
    }
}

// Loop through each collectible and display on page
for (var listing in listings.collectibles) {
    var pageListings = document.querySelector("#pageListings");
    pageListings.innerHTML += '<div class="max-w-sm rounded overflow-hidden shadow-lg"> <img class="w-full" src="' + listings.collectibles[listing].imgSrc + '" alt="' + listings.collectibles[listing].imgAlt + '"> <div class="px-6 pt-4"> <div class="font-bold text-xl mb-2">' + listings.collectibles[listing].name + '</div> <div class="flex pt-2 mb-2"> <div class="w-1/2 h-4">Ask Price</div> <div class="w-1/2 h-4">Avg. Sold</div> </div> </div> <div class="px-6"> <div class="flex pb-4"> <div style="color: #f687b3" class="w-1/2 h-12">$' + listings.collectibles[listing].askPrice + '</div> <div style="color: #f56565" class="w-1/2 h-12">$' + listings.collectibles[listing].avgSold + '</div> </div> </div> </div>';
}

// Stop at 10 listings
// Page 2 generates listings 11 - 20; Page 3 generates listings 21-30, and so on.

// Clicking into each listing will generate page using object properties