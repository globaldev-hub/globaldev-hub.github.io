
/* ==========================================
   GLOBALDEV HUB — WEBSITE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Automatically update the copyright year.
  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile navigation menu.
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close the mobile menu after selecting a link.
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });

    // Reset the menu when the screen becomes desktop-sized.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      }
    });
  }

  // Website search.
  const searchForm = document.getElementById("siteSearch");
  const searchInput = document.getElementById("searchInput");
  const searchMessage = document.getElementById("searchMessage");

  if (searchForm && searchInput && searchMessage) {
    const searchItems = [
      {
        title: "Home",
        keywords: "home globaldev hub homepage",
        url: "index.html"
      },
      {
        title: "Technology Guides",
        keywords: "guides tutorials learn beginner technology",
        url: "guides.html"
      },
      {
        title: "Digital Tools",
        keywords: "tools free online resources utilities",
        url: "tools.html"
      },
      {
        title: "Social Toolkit",
        keywords: "social media sharing content",
        url: "social.html"
      },
      {
        title: "Careers",
        keywords: "careers jobs remote work employment",
        url: "careers.html"
      },
      {
        title: "Online Opportunities",
        keywords: "opportunities online earning tasks scam safety",
        url: "resources.html"
      },
      {
        title: "Resources",
        keywords: "resources learning useful websites",
        url: "resources.html"
      },
      {
        title: "About GlobalDev Hub",
        keywords: "about mission information",
        url: "about.html"
      },
      {
        title: "Contact",
        keywords: "contact email message help",
        url: "contact.html"
      },
      {
        title: "Privacy Policy",
        keywords: "privacy data policy",
        url: "privacy.html"
      },
      {
        title: "Terms and Conditions",
        keywords: "terms conditions rules",
        url: "terms.html"
      },
      {
        title: "How to Build Your First Website",
        keywords: "website build html css beginner development",
        url: "article-first-website.html"
      },
      {
        title: "Publish a Website with GitHub Pages",
        keywords: "github pages publish hosting deploy website",
        url: "article-github-pages.html"
      },
      {
        title: "Essential Digital Skills for Beginners",
        keywords: "digital skills learning computer internet",
        url: "article-digital-skills.html"
      },
      {
        title: "Website Basics Everyone Can Learn",
        keywords: "website basics technology html css tools",
        url: "article-website-basics.html"
      }
    ];

    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const query = searchInput.value.trim().toLowerCase();

      if (!query) {
        searchMessage.textContent =
          "Please enter a topic to search.";
        searchInput.focus();
        return;
      }

      const words = query.split(/\s+/).filter(Boolean);

      const results = searchItems.filter(function (item) {
        const searchableText =
          (item.title + " " + item.keywords).toLowerCase();

        return words.some(function (word) {
          return searchableText.includes(word);
        });
      });

      if (results.length === 1) {
        window.location.href = results[0].url;
        return;
      }

      if (results.length > 1) {
        searchMessage.textContent =
          "Found " + results.length +
          " matching pages. Opening the first result: " +
          results[0].title + ".";

        window.location.href = results[0].url;
        return;
      }

      // If no page matches, check article keywords on the current page.
      const articleCards = Array.from(
        document.querySelectorAll(".article-card")
      );

      const matchingCard = articleCards.find(function (card) {
        const cardText = (
          (card.innerText || "") + " " +
          (card.getAttribute("data-search") || "")
        ).toLowerCase();

        return words.some(function (word) {
          return cardText.includes(word);
        });
      });

      if (matchingCard) {
        matchingCard.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

        searchMessage.textContent =
          "Found an article on this page.";
        return;
      }

      searchMessage.textContent =
        "No matching page found. Try words like guides, tools, careers or digital skills.";
    });
  }
});
