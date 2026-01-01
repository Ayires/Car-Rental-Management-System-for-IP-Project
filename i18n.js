/**
 * Internationalization (i18n) Logic
 * Handles language switching and content translation
 */

class I18nHandler {
  constructor() {
    this.currentLang = localStorage.getItem("driveeasy_lang") || "en";
    this.translations = window.translations || {};

    this.init();
  }

  init() {
    // Apply initial translation
    this.translatePage();

    // Create language switcher if it doesn't exist
    this.setupLanguageSwitcher();

    // Listen for dynamic content updates
    document.addEventListener("languageChanged", () => this.translatePage());
  }

  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem("driveeasy_lang", lang);

      // Update document language attribute
      document.documentElement.lang = lang;

      // Apply translations
      this.translatePage();

      // Update button text
      this.updateSwitcherText();

      // Dispatch event for other scripts
      const event = new CustomEvent("languageChanged", {
        detail: { language: lang },
      });
      document.dispatchEvent(event);
    }
  }

  translatePage() {
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = this.getTranslation(key);

      if (translation) {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          if (element.hasAttribute("placeholder")) {
            element.setAttribute("placeholder", translation);
          }
        } else {
          // Check if element has child nodes (like icons or spans) that shouldn't be overwritten entirely
          // But for simple implementation, we assume data-i18n targets text-only elements or we wrap text in spans

          // Specific handling for complex elements could go here,
          // but best practice is to put data-i18n on the specific span containing the text.
          element.textContent = translation;
        }
      }
    });

    // Handle specific dynamic updates if needed
    this.updateDynamicContent();
  }

  getTranslation(key) {
    return this.translations[this.currentLang][key] || key;
  }

  setupLanguageSwitcher() {
    const navbarNav = document.querySelector(".navbar-nav");
    const customContainer = document.getElementById(
      "language-custom-container"
    );

    if (document.getElementById("langSwitcherItem")) return;

    if (navbarNav) {
      // Navbar style switcher
      const li = document.createElement("li");
      li.className = "nav-item dropdown";
      li.id = "langSwitcherItem";

      li.innerHTML = `
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownLang" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-globe me-1"></i> <span id="currentLangLabel">${
                      this.translations[this.currentLang].lang_name
                    }</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownLang">
                    <li><a class="dropdown-item" href="#" data-lang="en">English</a></li>
                    <li><a class="dropdown-item" href="#" data-lang="am">አማርኛ (Amharic)</a></li>
                </ul>
            `;
      navbarNav.appendChild(li);
      this.attachSwitcherEvents(li);
    } else if (customContainer) {
      // Custom container switcher (e.g. for Login page)
      customContainer.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-outline-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-globe me-1"></i> <span id="currentLangLabel">${
                          this.translations[this.currentLang].lang_name
                        }</span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#" data-lang="en">English</a></li>
                        <li><a class="dropdown-item" href="#" data-lang="am">አማርኛ (Amharic)</a></li>
                    </ul>
                </div>
            `;
      this.attachSwitcherEvents(customContainer);
    }
  }

  attachSwitcherEvents(container) {
    container.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.setLanguage(e.target.getAttribute("data-lang"));
      });
    });
  }

  updateSwitcherText() {
    const label = document.getElementById("currentLangLabel");
    if (label) {
      label.textContent = this.translations[this.currentLang].lang_name;
    }
  }

  updateDynamicContent() {
    // Helper to translate things that might be set dynamically by other scripts
    // For example, if main.js sets a "Welcome User" message, we might need to intercept or re-translate it.
    // For now, this is a placeholder.
  }
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  window.i18n = new I18nHandler();
});
