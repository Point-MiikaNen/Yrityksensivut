document.addEventListener("DOMContentLoaded", () => {
    naytaSivu('etusivu');
    
});

function naytaSivu(sivu) {
    let sisalto = {
        etusivu: `<h2>Tervetuloa Yritys Oy:n kotisivuille!</h2><p>Tämä on yrityksen virallinen sivusto.</p>`,
        yritysesittely: `<h2>Yritysesittely</h2><p>Yritys Oy on johtava toimija alallaan...</p>`,
        yhteystiedot: `<h2>Yhteystiedot</h2><p>Sähköposti: info@yritys.fi<br>Puhelin: 012-3456789</p>`,
        henkilokunta: `<h2>Henkilökunta</h2><table id="henkilokuntaTaulu"><tr><th>Nimi</th><th>Tehtävä</th></tr></table>`
    };

    document.getElementById("main_alue").innerHTML = sisalto[sivu] || "<h2>Sivua ei löytynyt</h2>";

    if (sivu === "henkilokunta") {
        haeHenkilokunta();
    }
}

function haeHenkilokunta() {
    fetch('http://localhost:4000/api/henkilokunta')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-virhe! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Henkilökunnan tiedot haettu:", data); // 🛠 Debuggaus
            let taulu = document.getElementById("henkilokuntaTaulu");
            taulu.innerHTML = "<tr><th>Nimi</th><th>Tehtävä</th></tr>"; // Tyhjennetään taulukko ennen uutta täyttöä
            
            data.forEach(henkilo => {
                let rivi = document.createElement("tr");
                rivi.innerHTML = `<td>${henkilo.nimi}</td><td>${henkilo.tehtava}</td>`;
                taulu.appendChild(rivi);
            });
        })
        .catch(error => console.error('Virhe haettaessa henkilökunnan tietoja:', error));
}