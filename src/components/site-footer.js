class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <footer class="navbar bg-success fixed-bottom">
                <div class="container py-3 d-flex justify-content-around">
            <span id="back_arrow" class="material-icons" style="cursor: pointer">west</span>
				    <span id="home" class="material-icons" style="cursor: pointer">home</span>
            <span id="setting" class="material-icons" style="cursor: pointer">settings</span>
                </div>
            </footer>
        `;
  }
}

// back arrow functionality
document.addEventListener("DOMContentLoaded", () => {
  const backArrow = document.getElementById("back_arrow");

  if (backArrow) {
    backArrow.addEventListener("click", () => {
      window.history.back();
    });
  }
});

//home button functionality
document.addEventListener("DOMContentLoaded", () => {
  const homeButton = document.getElementById("home");

  if (homeButton) {
    homeButton.addEventListener("click", () => {
      window.location.href = "taskpage.html";
    });
  }
});

//home button functionality
document.addEventListener("DOMContentLoaded", () => {
  const settingsButton = document.getElementById("setting");

  if (settingsButton) {
    settingsButton.addEventListener("click", () => {
      window.location.href = "profile.html";
    });
  }
});

customElements.define("site-footer", SiteFooter);
