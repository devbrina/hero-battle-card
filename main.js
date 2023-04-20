// Componentes da URL
const BASE_URL = 'https://superheroapi.com/api.php/';
const ACCESS_TOKEN = '689862149579456' + '/';

let heros = []; console.log(heros)
var points = [0, 0];

var urls = [];
urls[0] = BASE_URL + ACCESS_TOKEN + getRandomHeroId();
urls[1] = BASE_URL + ACCESS_TOKEN + getRandomHeroId();

urls.forEach(function(url) {
    fetch(url)
        .then((resp) => resp.json())
        .then(function(data){
            heros.push(data);
            if (heros.length == 2) {
                mountCard();
            }
        })
        .catch(function(error) {
            console.log(error);
        });
})

function getRandomHeroId() {
    return Math.round(Math.random() * 731) + 1;
}



function mountCard(){
    let cards = document.querySelector("#cards");
    heros.forEach(function(p){
        cards.innerHTML += `<div class="card">
                                <img src='${p.image.url}'> <br>
                                Name: ${p.name}<br>
                                Intelligence: ${p.powerstats.intelligence}<br>
                                Strength: ${p.powerstats.strength}<br>
                                Speed: ${p.powerstats.speed}<br>
                                Durability: ${p.powerstats.durability}<br>
                                Power: ${p.powerstats.power}<br>
                                Combat: ${p.powerstats.combat}<br>
                                </div>`
                                
    });

    let name_powerstats = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat']

    if (heros[0].powerstats && heros[1].powerstats) {
        for (let i=0; i<name_powerstats.length; i++) {
            if(heros[0].powerstats[name_powerstats[i]] > heros[1].powerstats[name_powerstats[i]])
                points[0]++;
            else
                points[1]++;
        }
    }

    if (points[0] > points[1]) {
        alert(heros[0].name + " venceu de "+ points[0] + " a " + points[1]+"!");
    } else if (points[1] > points[0]) {
        alert(heros[1].name + " venceu de "+ points[1] + " a " + points[0] + "!");
    } else {
        alert("Empate!\nPontuação: " + points[1] + " a " + points[0]);
    }
}
