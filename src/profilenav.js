//profile page: go to progress page
document.addEventListener("DOMContentLoaded", () => {
  const progressDiv = document.getElementById("progress");

  if (progressDiv) {
    progressDiv.addEventListener("click", () => {
      window.location.href = "progress.html";
    });
  }
});
