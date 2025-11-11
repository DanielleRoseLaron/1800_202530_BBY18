class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <footer class="navbar bg-success fixed-bottom">
                <div class="container py-3 d-flex justify-content-around">
            <span id="back_arrow" class="material-icons">west</span>
				    <span id="home" class="material-icons">home</span>
				    <span class="material-icons">settings</span>
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

  if (progressDiv) {
    progressDiv.addEventListener("click", () => {
      window.location.href = "taskpage.html";
    });
  }
});
customElements.define("site-footer", SiteFooter);
