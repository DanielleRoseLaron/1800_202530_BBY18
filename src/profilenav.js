document.addEventListener("DOMContentLoaded", () => {
  const progressDiv = document.getElementById("progress");

  if (progressDiv) {
    progressDiv.addEventListener("click", () => {
      window.location.href = "progress.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const accountDiv = document.getElementById("account");

  if (accountDiv) {
    accountDiv.addEventListener("click", () => {
      window.location.href = "profilesettings.html";
    });
  }
});
