var audio = new Audio();
var currentButton = null;

fetch('musiques.json')
    .then(response => response.json())
    .then(musiques => {
        musiques.forEach(musique => {
            document.querySelector('.liste-musiques').innerHTML += `
                <section class="static-music">
                    <img src="${musique.cover}" alt="">
                    <h2>${musique.musique}</h2>
                    <p>Artiste : ${musique.artiste}</p>
                    <p>${musique.descriptionsMusiques}</p>
                    <p>Album : ${musique.album}</p>
                    <div class="credits">Crédit
                        <div class="credits-popup">${musique.credit}</div>
                    </div>
                    <div class="redirection">
                        <a href="${musique.youtube}" target="_blank">
                            <img src="img/yt.webp" title="Écoute sur YouTube" alt="écouter la musique sur YouTube" aria-label="Écoute sur YouTube. Ce lien ouvrira une nouvelle fenêtre." class="youtube">
                        </a>
                        <a href="${musique.spotify}" target="_blank">
                            <img src="img/spotify.webp" title="Écoute sur Spotify" alt="écouter la musique sur Spotify" aria-label="Écoute sur YouTube. Ce lien ouvrira une nouvelle fenêtre." class="spotify">
                        </a>
                        <a href="${musique.deezer}" target="_blank">
                            <img src="img/deezer.png" title="Écoute sur Deezer" alt="écouter la musique sur Deezer" aria-label="Écoute sur YouTube. Ce lien ouvrira une nouvelle fenêtre." class="deezer">
                        </a>
                    </div>
                    <button class="bouton-play" data-music-url="${musique.lien}">⏵</button>
                </section>`;
        });

        document.querySelectorAll('.bouton-play').forEach(button => {
            button.addEventListener('click', function () {
                var musicUrl = button.getAttribute('data-music-url');

                if (currentButton && currentButton !== button) {
                    currentButton.innerHTML = '⏵';
                    audio.pause();
                }

                if (currentButton === button && !audio.paused) {
                    audio.pause();
                    button.innerHTML = '⏵';
                    currentButton = null;
                } else {
                    audio.src = musicUrl;
                    audio.play();
                    button.innerHTML = '⏸';
                    currentButton = button;
                }

                audio.addEventListener('ended', function () {
                    if (currentButton === button) {
                        button.innerHTML = '⏵';
                        currentButton = null;
                    }
                });
            });
        });
    });

// Formulaire d'ajout de propositions 
var boutonEnvoi = document.querySelector('.bouton-envoi');
if (boutonEnvoi) {
    boutonEnvoi.addEventListener('click', function (event) {
        event.preventDefault();
        var emailField = document.querySelector('#email');

        if (!emailField.value || !emailField.checkValidity()) {
            alert('Veuillez renseigner un email valide.');
            emailField.style.border = 'solid red 1.5px';
        } else {
            var titre = document.querySelector('#titre').value;
            var description = document.querySelector('#description').value;
            var artiste = document.querySelector('#artiste').value;
            var lienaudio = document.querySelector('#lienaudio').value;
            var image = document.querySelector('#image').value;

            document.querySelector('.liste-musiques').innerHTML += `
                <section class="dynamic-music">
                    <img src="${image}" alt="">
                    <h2>${titre}</h2>
                    <p>Artiste : <strong>${artiste}</strong></p>
                    <p>${description}</p>
                    <div class="credits">Proposé par : ${emailField.value}
                        <div class="credits-popup">Proposition par email</div>
                    </div>
                    <a href="${lienaudio}" class="lien-musique-user" target="_blank">Lien de la musique proposée</a>
                </section>`;

            emailField.style.border = 'solid blue 1.5px';
            alert('Musique ajoutée avec succès !');
        }
    });
}

// Suppr. les propositions
var boutonClear = document.querySelector('.clear');
if (boutonClear) {
    boutonClear.addEventListener('click', function () {
        document.querySelectorAll('.dynamic-music').forEach(section => section.remove());
    });
}


//popup
document.addEventListener("DOMContentLoaded", function () {
    // Ouverture du pop-up
    var btnMentions = document.querySelector('#openPopup');
    var popup = document.querySelector('#popupMentions');
    var fermer = document.querySelector('.fermer');

    btnMentions.addEventListener('click', function () {
    popup.style.display = 'block';
    });

    // Fermeture du pop-up
    fermer.addEventListener('click', function () {
    popup.style.display = 'none';
    });
});
