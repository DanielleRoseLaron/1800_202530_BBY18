class SiteNavbar extends HTMLElement {
    constructor() {
        super();
        this.renderNavbar();
        this.renderAuthControls();
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
                        <li><a class="dropdown-item" href="#">Home</a></li>
                        <li><a class="dropdown-item" href="#">Leaderboard</a></li>
                        <li><a class="dropdown-item" href="#">Add/Edit goals</a></li>
                    </ul>
                </div>

                <form class="d-flex" role="search">
                    <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button class="btn btn-outline-light" type="submit">Search</button>
                </form>

                <img
                    src="images/proflie-image.jpg"
                    alt="Profile"
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
    renderAuthControls() {
        const authControls = this.querySelector('#authControls');
        const navList = this.querySelector('ul'); // your main nav <ul>

        // invisible placeholder to maintain layout
        authControls.innerHTML = `<div class="btn btn-outline-light" style="visibility: hidden; min-width: 80px;">Log out</div>`;

        onAuthStateChanged(auth, (user) => {
            let updatedAuthControl;

            // Remove existing "Profile" link if present (avoid duplicates)
            const existingProfile = navList?.querySelector('#profileLink');
            if (existingProfile) existingProfile.remove();

            if (user) {
                // 1️⃣ Add Profile item to menu
                if (navList) {
                    const profileItem = document.createElement('li');
                    profileItem.classList.add('nav-item');
                    profileItem.innerHTML = `<a class="nav-link" id="profileLink" href="/profile.html">Profile</a>`;
                    navList.appendChild(profileItem);
                }

                // 2️⃣ Show logout button
                updatedAuthControl = `<button class="btn btn-outline-light" id="signOutBtn" type="button" style="min-width: 80px;">Log out</button>`;
                authControls.innerHTML = updatedAuthControl;

                const signOutBtn = authControls.querySelector('#signOutBtn');
                signOutBtn?.addEventListener('click', logoutUser);
            } else {
                // Remove Profile if user logs out
                if (existingProfile) existingProfile.remove();

                // Show login button
                updatedAuthControl = `<a class="btn btn-outline-light" id="loginBtn" href="/login.html" style="min-width: 80px;">Log in</a>`;
                authControls.innerHTML = updatedAuthControl;
            }
        });
    }
}

customElements.define('site-navbar', SiteNavbar);