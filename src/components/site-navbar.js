class SiteNavbar extends HTMLElement {
  constructor() {
    super();
    window.addEventListener("DOMContentLoaded", () => {
      this.renderNavbar();
    });
  }

  renderNavbar() {
    this.innerHTML = `
            <div 
            class="d-flex justify-content-between align-items-center px-3 py-2 border-bottom bg-success"
            >

                <div class="dropdown">
                    <button 
                    class="btn btn-secondary" 
                    type="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    >

                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            fill="currentColor" 
                            class="bi bi-list" 
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 
                                0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 
                                .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 
                                0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 
                                0 0 1-.5-.5"
                            />
                        </svg>
                    </button>

                    <ul class="dropdown-menu">
                        <li style="cursor: pointer"><a class="dropdown-item" href="leaderboard.html">Leaderboard</a></li>
                        <li style="cursor: pointer"><a class="dropdown-item" href="grouppage.html">Groups</a></li>
                    </ul>
                </div>
                <img
                    src="images/proflie-image.jpg"
                    alt="Profile"
                    id="prof"
                    style="cursor: pointer"
                    class="rounded-circle"
                    width="32"
                    height="32"
                />
            </div>
        `;
  }
}

// profile icon => profile
// Run after the HTML document has fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get the button element with id="prof"
  const profButton = document.getElementById("prof");

  // Only proceed if the button exists
  if (profButton) {
    // When the button is clicked, go to profile.html
    profButton.addEventListener("click", () => {
      window.location.href = "profile.html";
    });
  }
});

customElements.define("site-navbar", SiteNavbar);
