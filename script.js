
document.addEventListener("DOMContentLoaded", () => {

    if (window.lucide) {
      lucide.createIcons();
    }
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
      }
  
    const cards = document.querySelectorAll(".explore-card");
    const projects = document.querySelectorAll(".project-card");
    const message = document.getElementById("filter-message");
    const clearButton = document.getElementById("clear-filter");
    const noProjects = document.getElementById("no-projects");
    const yearElement = document.getElementById("copyright-year");
  
    const labels = {
      "financial-services": "Financial Services",
      "real-estate": "Real Estate",
      "telecom": "Telecom",
      "consulting": "Consulting",
      "analytics": "Analytics",
      "ai-ml": "AI & Machine Learning",
      "genai": "GenAI",
      "geospatial": "Geospatial",
      "data-engineering": "Data Engineering",
      "governance": "Data Governance"
    };
  
    const industries = [
      "financial-services",
      "real-estate",
      "telecom",
      "consulting"
    ];
  
    function applyFilter(filter) {
  
      let visibleCount = 0;
  
      projects.forEach(project => {
  
        const projectIndustries =
          project.dataset.industry.split(" ");
  
        const projectCapabilities =
          project.dataset.capabilities.split(" ");
  
        const matches = industries.includes(filter)
          ? projectIndustries.includes(filter)
          : projectCapabilities.includes(filter);
  
        project.hidden = !matches;
  
        if (matches) visibleCount++;
      });
  
      message.textContent =
        `Showing ${visibleCount} project(s) for ${labels[filter]}.`;
  
      noProjects.hidden = visibleCount !== 0;
      clearButton.hidden = false;
    }
  
    cards.forEach(card => {
  
      card.setAttribute("aria-pressed", "false");
  
      card.addEventListener("click", () => {
  
        cards.forEach(item => {
          item.classList.remove("active");
          item.setAttribute("aria-pressed", "false");
        });
  
        card.classList.add("active");
        card.setAttribute("aria-pressed", "true");
  
        applyFilter(card.dataset.filter);
  
        document.getElementById("projects")
          .scrollIntoView({ behavior: "smooth" });
      });
    });
  
    clearButton.addEventListener("click", () => {
  
      cards.forEach(card => {
        card.classList.remove("active");
        card.setAttribute("aria-pressed", "false");
      });
  
      projects.forEach(project => {
        project.hidden = false;
      });
  
      message.textContent =
        "Explore selected projects across data, AI, analytics and geospatial intelligence.";
  
      noProjects.hidden = true;
      clearButton.hidden = true;
    });
  
  });
  