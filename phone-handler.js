/**
 * Premium Phone Number Validator
 * Custom UI with Searchable Country Dropdown
 */

const countryRules = [
  { code: "ET", name: "Ethiopia", dialCode: "+251", digits: 9, flag: "🇪🇹" },
  { code: "KE", name: "Kenya", dialCode: "+254", digits: 9, flag: "🇰🇪" },
  { code: "NG", name: "Nigeria", dialCode: "+234", digits: 10, flag: "🇳🇬" },
  { code: "IN", name: "India", dialCode: "+91", digits: 10, flag: "🇮🇳" },
  { code: "US", name: "United States", dialCode: "+1", digits: 10, flag: "🇺🇸" },
  {
    code: "GB",
    name: "United Kingdom",
    dialCode: "+44",
    digits: 10,
    flag: "🇬🇧",
  },
  { code: "DE", name: "Germany", dialCode: "+49", digits: 10, flag: "🇩🇪" },
  { code: "ZA", name: "South Africa", dialCode: "+27", digits: 9, flag: "🇿🇦" },
  { code: "AE", name: "UAE", dialCode: "+971", digits: 9, flag: "🇦🇪" },
  { code: "Other", name: "Other", dialCode: "+", digits: 0, flag: "🌐" },
];

class PhoneHandler {
  constructor(inputId, containerId) {
    this.input = document.getElementById(inputId);
    // If containerId is provided, use it. If not, we might wrap the input.
    this.container = document.getElementById(containerId);
    this.selectedCountry = countryRules[0]; // Default

    if (this.input) {
      this.init();
    }
  }

  init() {
    this.injectStyles();
    this.buildUI();
    this.setCountry(this.selectedCountry);
    this.attachEvents();
  }

  injectStyles() {
    if (document.getElementById("phone-custom-style")) return;
    const style = document.createElement("style");
    style.id = "phone-custom-style";
    style.textContent = `
            .phone-wrapper { position: relative; font-family: 'Inter', sans-serif; }
            .phone-input-group { 
                display: flex; 
                border: 1px solid #ddd; 
                border-radius: 8px; 
                background: white; 
                transition: border-color 0.2s, box-shadow 0.2s;
                overflow: hidden;
            }
            .phone-input-group:focus-within {
                border-color: #0d6efd; 
                box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.15);
            }
            
            /* Trigger Button */
            .country-trigger {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 10px 12px;
                background: #f8f9fa;
                border: none;
                border-right: 1px solid #ddd;
                cursor: pointer;
                font-size: 0.95rem;
                color: #333;
                white-space: nowrap;
                transition: background 0.2s;
            }
            .country-trigger:hover { background: #e9ecef; }
            .country-trigger .arrow { font-size: 0.8rem; margin-left: 4px; color: #666; transition: transform 0.2s; }
            .country-trigger.active .arrow { transform: rotate(180deg); }

            /* Input Field */
            .phone-input-field {
                flex: 1;
                border: none;
                padding: 10px 12px;
                font-size: 1rem;
                outline: none;
                color: #333;
                background: transparent;
            }
            .phone-input-field::placeholder { color: #adb5bd; }

            /* Dropdown Menu */
            .country-dropdown {
                position: absolute;
                top: 100%;
                left: 0;
                width: 300px;
                max-width: 90vw;
                background: white;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                margin-top: 8px;
                display: none;
                z-index: 1000;
                overflow: hidden;
                animation: fadeIn 0.15s ease-out;
            }
            .country-dropdown.show { display: block; }
            
            /* Search Box */
            .dropdown-search {
                padding: 10px;
                border-bottom: 1px solid #eee;
                background: #fdfdfd;
            }
            .dropdown-search input {
                width: 100%;
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 0.9rem;
                outline: none;
            }
            .dropdown-search input:focus { border-color: #0d6efd; }

            /* List */
            .country-list {
                max-height: 250px;
                overflow-y: auto;
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .country-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 15px;
                cursor: pointer;
                border-bottom: 1px solid #f5f5f5;
                transition: background 0.15s;
                font-size: 0.9rem;
            }
            .country-item:last-child { border-bottom: none; }
            .country-item:hover { background: #f0f4ff; }
            .country-item.selected { background: #e7f1ff; color: #0d6efd; font-weight: 500; }
            .country-item .flag { font-size: 1.2rem; }
            .country-item .dial-code { color: #666; margin-left: auto; font-size: 0.85rem; }

            /* Validation Msg */
            .validation-msg { font-size: 0.85rem; margin-top: 5px; height: 18px; }
            .validation-msg.valid { color: #198754; }
            .validation-msg.invalid { color: #dc3545; }

            @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        `;
    document.head.appendChild(style);
  }

  buildUI() {
    // Prevent double init if wrapper already exists
    if (this.input.parentNode.classList.contains("phone-input-group")) return;
    if (this.input.closest(".phone-wrapper")) return;

    // Create Wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "phone-wrapper";

    // Custom Input Group
    const group = document.createElement("div");
    group.className = "phone-input-group";

    // Trigger Button
    this.trigger = document.createElement("button");
    this.trigger.className = "country-trigger";
    this.trigger.type = "button"; // Prevent form submit
    this.trigger.innerHTML = `<span class="flag"></span> <span class="code"></span> <span class="arrow">▼</span>`;
    this.trigger.onclick = (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    };

    // Custom Dropdown
    this.dropdown = document.createElement("div");
    this.dropdown.className = "country-dropdown";
    this.dropdown.innerHTML = `
            <div class="dropdown-search">
                <input type="text" placeholder="Search countries..." id="country-search-box">
            </div>
            <ul class="country-list"></ul>
        `;

    // Validation Msg
    this.msgBox = document.createElement("div");
    this.msgBox.className = "validation-msg";

    // Assemble
    // Insert wrapper where input is
    this.input.parentNode.insertBefore(wrapper, this.input);
    wrapper.appendChild(group);
    group.appendChild(this.trigger);
    group.appendChild(this.input);
    wrapper.appendChild(this.dropdown);
    wrapper.appendChild(this.msgBox);

    // Clean input styles
    this.input.className = "phone-input-field"; // Remove bootstrap form-control to avoid doubles
    this.input.classList.remove("form-control"); // Ensure removal

    this.renderList(countryRules);
  }

  renderList(list) {
    const ul = this.dropdown.querySelector(".country-list");
    ul.innerHTML = "";
    list.forEach((c) => {
      const li = document.createElement("li");
      li.className = "country-item";
      if (c.code === this.selectedCountry.code) li.classList.add("selected");
      li.innerHTML = `
                <span class="flag">${c.flag}</span>
                <span class="name">${c.name}</span>
                <span class="dial-code">${c.dialCode}</span>
            `;
      li.onclick = () => {
        this.setCountry(c);
        this.closeDropdown();
      };
      ul.appendChild(li);
    });
  }

  toggleDropdown() {
    const isOpen = this.dropdown.classList.contains("show");
    if (isOpen) this.closeDropdown();
    else {
      this.dropdown.classList.add("show");
      this.trigger.classList.add("active");
      setTimeout(() => this.dropdown.querySelector("input").focus(), 50);
    }
  }

  closeDropdown() {
    this.dropdown.classList.remove("show");
    this.trigger.classList.remove("active");
  }

  setCountry(country) {
    this.selectedCountry = country;

    // Update Trigger
    this.trigger.querySelector(".flag").textContent = country.flag;
    this.trigger.querySelector(".code").textContent = country.dialCode;

    // Reset Input
    this.input.value = "";
    this.input.placeholder = `${country.dialCode} 000 000...`; // Dynamic placeholder
    this.input.focus();
    this.validate();

    // Re-render list to highlight selection
    this.renderList(countryRules);
  }

  attachEvents() {
    // Search Filter
    const searchBox = this.dropdown.querySelector("#country-search-box");
    searchBox.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = countryRules.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.dialCode.includes(term) ||
          c.code.toLowerCase().includes(term)
      );
      this.renderList(filtered);
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (
        !this.dropdown.contains(e.target) &&
        !this.trigger.contains(e.target)
      ) {
        this.closeDropdown();
      }
    });

    // Input Validation
    this.input.addEventListener("input", () => this.validate());
  }

  validate() {
    // Simple numeric clean
    let val = this.input.value.replace(/[^\d+]/g, ""); // Allow + just in case user types it

    this.input.value = this.input.value.replace(/[^\d\s-]/g, ""); // Allow spaces/dashes for format

    const cleanBody = this.input.value.replace(/\D/g, "");
    const required = this.selectedCountry.digits;

    if (cleanBody.length === 0) {
      this.setMsg("", "");
      return;
    }

    if (cleanBody.length === required) {
      this.setMsg("✅ Valid Number", "valid");
    } else if (cleanBody.length < required) {
      this.setMsg(
        `Enter ${required} digits (Type ${required - cleanBody.length} more)`,
        "invalid"
      );
    } else {
      this.setMsg(`Too long! (Max ${required} digits)`, "invalid");
    }
  }

  setMsg(text, type) {
    this.msgBox.textContent = text;
    this.msgBox.className = "validation-msg " + type;
  }
}
