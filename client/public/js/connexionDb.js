document.getElementById("loginFormC").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const motpasse = document.getElementById("motpasse").value;

    try {
        const response = await fetch("http://localhost:3000/api/user/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, motpasse })
        });

        const data = await response.json();

        // Vérifie directement le message renvoyé par le serveur
        if (data.message === "Connexion réussie") {
            // Stockage local (optionnel)
            localStorage.setItem("user", JSON.stringify({
        email: email
    }));

            // Redirection
            window.location.href = "listeeve.html";
        } else {
            document.getElementById("message").innerText = data.message || "Erreur lors de la connexion";
        }

    } catch (error) {
        console.error(error);
        document.getElementById("message").innerText = "Serveur injoignable";
    }
});
