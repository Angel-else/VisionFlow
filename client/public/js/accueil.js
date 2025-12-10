
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
