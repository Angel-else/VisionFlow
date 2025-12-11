
document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const btnLogin = document.getElementById("btnLogin");
    const btnLogout = document.getElementById("btnLogout");

    if (user) {
        // Utilisateur connecté
        btnLogin.style.display = "none";
        btnLogout.style.display = "block";
    } else {
        // Aucun utilisateur connecté
        btnLogin.style.display = "block";
        btnLogout.style.display = "none";
    }
});



document.getElementById("btnLogout").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.reload();   // Rafraîchir pour mettre à jour l'affichage
});



document.getElementById("creeEvent").addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if(user) {
        window.location.href = "creation.html";
    }else{
        window.location.href = "compte.html";
    }

});

document.querySelectorAll(".lien2").forEach(btn => {
    btn.addEventListener("click", () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            window.location.href = "creation.html";
        } else {
            window.location.href = "compte.html";
        }
    });
});

document.querySelectorAll(".primary").forEach(btn => {
    btn.addEventListener("click", () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            window.location.href = "creation.html";
        } else {
            window.location.href = "compte.html";
        }
    });
});

document.addEventListener("DOMContentLoaded", async () => {

    const container = document.querySelector(".events-grid");

    if (!container) {
        console.error("La div .events-grid est introuvable dans le DOM !");
        return;
    }

    container.innerHTML = "";

    try {
        const response = await fetch(`http://localhost:3000/api/events`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (!data || data.length === 0 || data.message === "evenement non trouvés") {
            container.innerHTML = "<p>Aucun événement créé.</p>";
            return;
        }

        // Créer les cartes
        data.forEach(event => {
            const card = document.createElement("div");
            card.classList.add("event-card");

            card.innerHTML = `
                <div class="event-title">Nom Evènement</div>
                <div class="event-subtitle">${event.nom_evenement}</div>

                <div class="event-section">
                    <div class="section-label">Description</div>
                    <div class="section-content">${event.description}</div>
                </div>

                <div class="event-section">
                    <div class="section-label">Nombre de places</div>
                    <div class="section-content">${event.nbre_de_places}</div>
                </div>

                <div class="event-meta">
                    <div class="meta-item">
                        <div class="section-label">Lieu</div>
                        <div class="section-content">${event.lieu}</div>
                    </div>
                    <div class="meta-item">
                        <div class="section-label">Date</div>
                        <div class="section-content">${new Date(event.date_debut).toLocaleDateString("fr-FR")}</div>
                    </div>
                </div>

                <a href="inscrip.html"><button class="rejoin-btn">Rejoindre</button></a> `;

            container.appendChild(card);
             // Ajouter l'événement au bouton
            // Ajouter l'événement au bouton "Rejoindre"
rejoin-btn.addEventListener("click", async function(e) {
    e.preventDefault(); // Sécuriser même si c'est un bouton

    // Récupérer l'utilisateur connecté et le token
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
        alert("Vous devez être connecté pour vous inscrire !");
        return;
    }

    // id_user et id_event dynamiques
    const id_user = user._id;
    const id_event = event._id;

    try {
        const response = await fetch(`http://localhost:3000/api/insEvent/${id_user}/${id_event}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token // 🔥 token si besoin
            },
            body: JSON.stringify({
                email: user.email
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Inscription réussie !");
            joinBtn.innerText = "Inscrit ✅";  // Modifier le texte du bouton
            joinBtn.disabled = true;          // Désactiver le bouton
        } else {
            alert(data.message || "Erreur lors de l'inscription");
        }

    } catch (error) {
        console.error(error);
        alert("Serveur injoignable");
    }
});


        });
    }catch (error) {
        console.error(error);
        container.innerHTML = "<p>Erreur lors du chargement des événements.</p>";
    }
});