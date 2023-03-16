class ColorToggler extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    this.wrapper = wrapper;
    wrapper.setAttribute("class", "color-toggler__wrapper");
    wrapper.setAttribute("aria-label", "Toggler Dark Mode");
    wrapper.innerHTML = `
      <label class="color-toggler__label">
        <span class="visually-hidden">Toggle Dark Mode</span>
        <input
          type="checkbox"
          class="color-toggler__input"
          checked
        />
      </label>
      <div class="color-toggler__slider"></div>`;

    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "main.css");

    const style = document.createElement("style");

    //css variables defined in main stylesheet
    style.textContent = `
    .color-toggler__wrapper {
      position: absolute;
      top: var(--spacing);
      right: var(--spacing);
      display: flex;
      flex-flow: row nowrap;
      filter: var(--drop-shadow);
    }

    .color-toggler__wrapper::after {
      content: "";
      background-image: var(--toggler-icon-url);
      position: absolute;
      top: 0.5rem;
      left: var(--toggler-icon-left);
      color: var(--color-bg);
      width: 50%;
      height: 2rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      transition: var(--transition);
    }    
    
    .color-toggler__label {
      margin: 0;
      display: block;
      width: 6rem;
      height: 3rem;
      border-radius: 1.5rem;
      background-color: var(--toggler-on);
    }
    
    .color-toggler__input {
      opacity: 0;
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
    
    .color-toggler__input:hover {
      cursor: pointer;
    }
    
    .color-toggler__slider {
      position: absolute;
      top: var(--toggler-top);
      left: var(--toggler-left);
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 0.75rem;
      background-color: var(--toggler-slider);
      transition: var(--transition);
    }    
    `;

    this.shadowRoot.append(wrapper, style, linkElem);
  }

  connectedCallback() {
    this.input = this.shadowRoot.querySelector("input");
    this.input.addEventListener("change", this.handleChange);
  }

  handleChange = (e) => {
    const body = document.body;
    const checked = e.target.checked;
    const input = this.shadowRoot.querySelector("input");

    //default is default mode active
    if (checked) {
      body.removeAttribute("light");
      input.setAttribute("checked", true);
    }

    if (!checked) {
      body.setAttribute("light", "");
      input.removeAttribute("checked");
    }
  };
}

customElements.define("color-toggler", ColorToggler);

//customized built-in elements unsupported on safari
// floating action button - visible on mobile devices to scroll to top
class FabScroll extends HTMLButtonElement {
  constructor() {
    super();
    this.innerText = "↑";
  }

  connectedCallback() {
    this.addEventListener("click", this.handleClick);
  }

  handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

customElements.define("fab-scroll", FabScroll, { extends: "button" });

class MobileMenu extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const nav = document.createElement("nav");
    nav.classList.add("menu__nav");
    this.nav = nav;

    const button = `        
    <button class="menu__expand btn btn--ghost" aria-label="Open menu" aria-expanded="false">
      <div class="menu__hamburger"></div>
      <div class="menu__hamburger"></div>
      <div class="menu__hamburger"></div>
    </button>
    `;

    nav.innerHTML = button;

    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "main.css");

    const style = document.createElement("style");

    style.textContent = `
    .menu__expand {
      width: 3rem;
      height: 3rem;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-evenly;
      align-items: center;
      background: var(--color-bg);
    }

    .menu__expand:hover {
      cursor: pointer;
    }

    .menu__hamburger {
      width: 100%;
      height: .25rem;
      border-radius: .25rem;
      background-color: var(--color-fg);
    }

    .menu__hamburger:hover {
      cursor: pointer;
    }

    .menu__list {
      margin: 0;
      padding: var(--spacing);
      list-style: none;
      background: var(--color-menu);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      z-index: 100;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-evenly;
      align-items: center;
      box-sizing: border-box;
      left: -100vw;
      transition: var(--transition);
    }

    .menu__nav--expanded .menu__list {
      left: 0;
    }

    .menu__link {
      color: var(--color-bg);
      text-decoration: none;
      text-transform: capitalize;
      font-size: 2rem;
    }

    .menu__list-item {
      position: relative;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      transition: var(--transition);
    }

    .menu__list-item::after {
      content: '';
      display: block;
      width: 0;
      height: 3px;
      opacity: 0;
      position: relative;
      z-index: -1;
      background-color: var(--color-bg);
      transition: var(--transition);
    }

    .menu__list-item:hover::after {
      width: 130%;
      opacity: 1;
    }

    .menu__link--active {
      font-weight: bold;
    }

    @media (min-width: 768px) {
      .menu__nav .menu__expand {
        // display: none;
      }

      .menu__nav .menu
    }
    
    `;

    this.shadowRoot.append(nav, linkElem);
  }

  getLinks(separator) {
    return this.dataset.links.split(separator);
  }

  createList() {
    const links = this.getLinks(this.dataset.linksSeparator);
    const list = document.createElement("ul");
    list.classList.add("menu__list");
    let listInnerHTML = `<li class="menu__close-wrapper"><button class="btn btn--close">X</button></li>`;

    links.map((link) => {
      listInnerHTML += `
      <li class="menu__list-item">
        <a class="menu__link" href="#${link}">${link}</a>
      </li>`;
    });

    list.innerHTML = listInnerHTML;
    return list;
  }

  connectedCallback() {
    //create menu from data-links prop
    this.nav.appendChild(this.createList());

    this.btn = this.shadowRoot.querySelector(".menu__expand");
    this.btn.addEventListener("click", this.expand);
    this.menu = this.shadowRoot.querySelector(".menu__list");
    this.menu.addEventListener("click", this.collapse);

    //collapse menu when escape or delete pressed
    document.addEventListener("keyup", (e) => {
      const key = e.which;
      if (key === 27 || key === 8) this.collapse();
    });
  }

  expand = () => {
    this.nav.classList.add("menu__nav--expanded");
    this.btn.setAttribute("aria-expanded", true);
    // should be unscrollable if menu expanded
    document.body.setAttribute("unscrollable", true);
  };

  collapse = () => {
    this.nav.classList.remove("menu__nav--expanded");
    this.btn.setAttribute("aria-expanded", false);
    document.body.removeAttribute("unscrollable");
  };
}

customElements.define("mobile-menu", MobileMenu);

class SkillList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const list = document.createElement("ul");
    list.classList.add("skills__list");
    this.list = list;

    const style = document.createElement("style");
    style.textContent = `
    `;

    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "styles.css");

    this.shadowRoot.append(list, style, linkElem);
  }

  connectedCallback() {
    const { skills, skillsSeparator } = this.dataset;
    const listItems = this.createSkills(skills, skillsSeparator);
    this.list.innerHTML = listItems;
  }

  createSkills(skills, separator) {
    const arr = skills.split(separator);
    let listInnerHTML = "";

    arr.map((skill) => {
      listInnerHTML += `<li class="skills__list-item">${skill}</li>`;
    });

    return listInnerHTML;
  }
}

customElements.define("skill-list", SkillList);
