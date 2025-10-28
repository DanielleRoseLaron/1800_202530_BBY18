class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="navbar bg-success fixed-bottom">
                <div class="container py-3 d-flex justify-content-around">
                    <span class="material-icons">help</span>
				    <span class="material-icons">home</span>
				    <span class="material-icons">settings</span>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-footer', SiteFooter);

