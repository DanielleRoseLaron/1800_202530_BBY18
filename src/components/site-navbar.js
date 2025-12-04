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
                        <li style="cursor: pointer"><a class="dropdown-item" href="pet.html">Pet</a></li>
                        <li style="cursor: pointer"><a class="dropdown-item" href="leaderboard.html">Leaderboard</a></li>
                        <li style="cursor: pointer"><a class="dropdown-item" href="taskpage.html">Add/Edit goals</a></li>
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

  // -------------------------------------------------------------
  // Renders the authentication controls (login/logout) based on user state
  // Uses Firebase Auth's onAuthStateChanged to listen for changes
  // and updates the navbar accordingly.
  // Also adds a "Profile" link when the user is logged in.
  // This keeps the navbar in sync with the user's authentication status.
  // -------------------------------------------------------------
  // renderAuthControls() {
  //   const authControls = this.querySelector("#authControls");
  //   const navList = this.querySelector("ul"); // your main nav <ul>

  //   // invisible placeholder to maintain layout
  //   authControls.innerHTML = `<div class="btn btn-outline-light" style="visibility: hidden; min-width: 80px;">Log out</div>`;

  //   onAuthStateChanged(auth, (user) => {
  //     let updatedAuthControl;

  //     // Remove existing "Profile" link if present (avoid duplicates)
  //     const existingProfile = navList?.querySelector("#profileLink");
  //     if (existingProfile) existingProfile.remove();

  //     if (user) {
  //       // 1️⃣ Add Profile item to menu
  //       if (navList) {
  //         const profileItem = document.createElement("li");
  //         profileItem.classList.add("nav-item");
  //         profileItem.innerHTML = `<a class="nav-link" id="profileLink" href="/profile.html">Profile</a>`;
  //         navList.appendChild(profileItem);
  //       }

  //       // 2️⃣ Show logout button
  //       updatedAuthControl = `<button class="btn btn-outline-light" id="signOutBtn" type="button" style="min-width: 80px;">Log out</button>`;
  //       authControls.innerHTML = updatedAuthControl;

  //       const signOutBtn = authControls.querySelector("#signOutBtn");
  //       signOutBtn?.addEventListener("click", logoutUser);
  //     } else {
  //       // Remove Profile if user logs out
  //       if (existingProfile) existingProfile.remove();

  //       // Show login button
  //       updatedAuthControl = `<a class="btn btn-outline-light" id="loginBtn" href="/login.html" style="min-width: 80px;">Log in</a>`;
  //       authControls.innerHTML = updatedAuthControl;
  //     }
  //   });
  // }
}

//profile icon => profile
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
