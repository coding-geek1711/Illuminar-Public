const cardData = [{
        year: 2017,
        title: "ipsum dolor sit amet consectetur",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aliquid, qui.Iure mollitia suscipit quos dolorem. Lorem ipsum dolor sit ame",
        thumbnail: "project-1.jpg",
        likes: 100
    },
    {
        year: 2017,
        title: "ipsum dolor sit amet consectetur",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aliquid, qui.Iure mollitia suscipit quos dolorem. Lorem ipsum dolor sit ame",
        thumbnail: "project-2.jpg",
        likes: 290
    }, {
        year: 2018,
        title: "ipsum dolor sit amet consectetur",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aliquid, qui.Iure mollitia suscipit quos dolorem. Lorem ipsum dolor sit ame",
        thumbnail: "project-2.jpg",
        likes: 290
    },
    {
        year: 2019,
        title: "ipsum dolor sit amet consectetur",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aliquid, qui.Iure mollitia suscipit quos dolorem. Lorem ipsum dolor sit ame",
        thumbnail: "project-3.jpg",
        likes: 843
    }, {
        year: 2019,
        title: "ipsum dolor sit amet consectetur",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aliquid, qui.Iure mollitia suscipit quos dolorem. Lorem ipsum dolor sit ame",
        thumbnail: "project-1.jpg",
        likes: 777
    }, {
        year: 2019,
        title: "ipsum dolor sit amet consectetur",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aliquid, qui.Iure mollitia suscipit quos dolorem. Lorem ipsum dolor sit ame",
        thumbnail: "project-2.jpg",
        likes: 111
    }, {
        year: 2020,
        title: "ipsum dolor sit amet consectetur",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aliquid, qui.Iure mollitia suscipit quos dolorem. Lorem ipsum dolor sit ame",
        thumbnail: "project-4.jpg",
        likes: 343
    }, {
        year: 2020,
        title: "Lorem ipsum dolor sit ipsum dolor sit amet consectetur",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aliquid, qui.Iure mollitia suscipit quos dolorem. Lorem ipsum dolor sit ame",
        thumbnail: "project-2.jpg",
        likes: 228
    }, {
        year: 2020,
        title: "Lorem ipsum dolor sit ipsum dolor sit amet consectetur",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aliquid, qui.Iure mollitia suscipit quos dolorem. Lorem ipsum dolor sit ame",
        thumbnail: "project-1.jpg",
        likes: 90
    }
];


const yearSelection = document.getElementById("year");
const cardSection = document.getElementById("card-collection");
console.log(cardSection);
var uniqueYears = [];

cardData.forEach(element => {
    var identifiedIndex = uniqueYears.findIndex(x => x == element.year)
    if (identifiedIndex == -1) {
        uniqueYears.push(element.year);
        var el = document.createElement("option");
        el.textContent = element.year;
        el.value = element.year;
        yearSelection.appendChild(el);
    }
});

var defaultYear = Math.max(...uniqueYears);

for (var i, j = 0; i = yearSelection.options[j]; j++) {
    if (i.value == defaultYear) {
        yearSelection.selectedIndex = j;
        break;
    }
}

yearSelection.addEventListener("change", () => {
    displayCards(yearSelection.value);
    console.log(yearSelection.value);
});



console.log(uniqueYears)


function displayCards(year) {
    const yearData = cardData.filter(item => item.year == year);
    cardSection.innerHTML = "";
    yearData.forEach(item => {
        var x = document.createElement("article");
        x.setAttribute("class", "project-card");
        x.innerHTML = `<a href="single-project.html">
                    <div class="project-img-container">
                        <img src="./imgs/${item.thumbnail}" alt="" class="project-img">
                        <p class="project-likes"><span><i class="fa fa-thumbs-up"></i></span> (${item.likes})</p>
                    </div>
                    <div class="project-info">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>

                    <!-- <div class="project-footer">
                    <p>2017</p>
                    <p>UG</p>
                    <p>Main</p>
                </div> -->
                </a>`;
        cardSection.appendChild(x);
    })

    return yearData;
}


console.log(displayCards(defaultYear));

// filter out the content
// add cards