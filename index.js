document.addEventListener("DOMContentLoaded", () => {
  const aboutTab = document.querySelector(".span1 a");
  const whyTab = document.querySelector(".span2 a");
  const aboutContent = document.getElementById("headlineOne");
  const whyContent = document.getElementById("headlineTwo");

  function toggleSection(showAbout) {
    if (showAbout) {
      aboutContent.style.display = "block";
      whyContent.style.display = "none";
      whyTab.style.color = "#a5a5a5";
      aboutTab.style.color = "#222222";
      aboutTab.classList.add("active");
      whyTab.classList.remove("active");
    } else {
      aboutContent.style.display = "none";
      whyContent.style.display = "flex";
      whyTab.style.color = "#222222";
      aboutTab.style.color = "#a5a5a5";
      aboutTab.classList.remove("active");
      whyTab.classList.add("active");
    }
  }

  aboutTab.addEventListener("click", (e) => {
    e.preventDefault();
    toggleSection(true);
  });

  whyTab.addEventListener("click", (e) => {
    e.preventDefault(); 
    toggleSection(false);
  });

  toggleSection(true);
});


document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', function() {
      document.querySelectorAll('.nav-list a').forEach(el => el.classList.remove('active'));
      this.classList.add('active');
  });
});

