import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";

// Import HTML components
import heroSection from "./components/hero-section.html?raw";
import aboutSection from "./components/about-section.html?raw";
import workSection from "./components/work-section.html?raw";
import skillSection from "./components/skill-section.html?raw";
import projectSection from "./components/project-section.html?raw";
import sertifikasiSection from "./components/sertifikasi-section.html?raw";
import navbar from "./components/navbar.html?raw";

// import Data
import pengalaman from "./assets/data/pengalaman.json";
import { sertifikasi } from "./assets/data/sertifikasi.json";
import project from "./assets/data/projects.json";
import skill from "./assets/data/tech.json";

const preloader = document.getElementById("preloader");
const nameText = document.getElementById("name-text");
const loadingBar = document.getElementById("loading-bar");

// Animasi loading bar
setTimeout(() => {
  loadingBar.classList.add("w-full", "transition-all", "duration-[1200ms]");
}, 100);

// Munculkan nama
setTimeout(() => {
  nameText.classList.remove("opacity-0");
  nameText.classList.add("opacity-100", "transition-opacity", "duration-700");
}, 500);

// Hilangkan preloader
setTimeout(() => {
  preloader.classList.add("opacity-0", "transition-opacity", "duration-700");

  // Hapus preloader setelah animasi selesai
  setTimeout(() => {
    preloader.remove();
  }, 1000);
}, 4000);

// load component HTML
// cara production

// Load component HTML
function loadcomponent(id, html) {
  const element = document.getElementById(id);
  element.innerHTML = html;
}

loadcomponent("hero-section", heroSection);
loadcomponent("about-section", aboutSection);
loadcomponent("work-section", workSection);
loadcomponent("skill-section", skillSection);
loadcomponent("project-section", projectSection);
loadcomponent("sertifikasi-section", sertifikasiSection);

// cara lokal
// async function loadcomponent(id, file) {
//   const element = document.getElementById(id);

//   const response = await fetch(file);
//   element.innerHTML = await response.text();
// }
// await loadcomponent("hero-section", "/src/components/hero-section.html");
// await loadcomponent("about-section", "/src/components/about-section.html");
// await loadcomponent("work-section", "/src/components/work-section.html");
// await loadcomponent("skill-section", "/src/components/skill-section.html");
// await loadcomponent("project-section", "/src/components/project-section.html");
// await loadcomponent(
//   "sertifikasi-section",
//   "/src/components/sertifikasi-section.html",
// );

AOS.init();

// navbar
async function init() {
  loadcomponent("navbar", navbar);

  const navWrapper = document.getElementById("nav-wrapper");
  const navinside = document.getElementById("navbarinside");
  const navMenu = document.getElementById("navbar-menu");

  if (!navWrapper) {
    console.error("nav-wrapper tidak ditemukan setelah navbar dimuat");
    return;
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 5) {
      navWrapper.className =
        "container md:mx-auto md:px-50 inset-x-0  fixed z-50 top-0 md:mt-4 transition-all duration-200";
      navinside.className =
        "md:rounded-full navbar bg-black/800 md:border md:border-gray-500 backdrop-blur-sm shadow-lg transition-all duration-300 font-mono";
      // navMenu.classList.remove("mx-20");
    } else {
      navWrapper.className = "mt-0 transition-all duration-200 z-50 ";
      navinside.className =
        "navbar border-transparent backdrop-blur-sm  z-50 transition-all duration-300 font-mono";
      // navMenu.classList.add("mx-20");
    }
  });
}

init();
// end navbar

// animation typing
const words = ["System Analyst", "Web Developer", "Data Analyst"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  const el = document.getElementById("typewriter");

  if (isDeleting) {
    el.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    el.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1500; // jeda sebelum mulai hapus
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 300; // jeda sebelum ngetik kata baru
  }

  setTimeout(type, speed);
}

type();
// end of animation typing

// section work Experince

const experince = document.querySelector("#track");
experince.innerHTML = pengalaman.work_experince
  .map((item) => {
    return `
  <article
              class="flex w-full h-full bg-white/90 shrink-0 snap-center flex-col overflow-hidden rounded-xl border border-gray-700 md:flex-row"
            >
              <!-- Ganti src dengan screenshot/foto milikmu -->
              <img
                src="${item.img}"
                alt="Tampilan website DISPUSIP setelah redesign"
                class="grayscale aspect-video w-full transtion-all duration-700 hover:grayscale-0 object-cover md:aspect-auto md:w-1/2"
                loading="lazy"
              />
  
</figure>
              <div class="flex flex-col justify-center p-6 md:w-1/2 md:p-8">
                <p class="text-xs text-gray-800">${item.periode_awal} – ${item.periode_akhir}</p>
                <h3 class="mt-2 text-xl font-bold text-black">
                  ${item.posisi}
                </h3>
                <p class="mt-1 text-sm text-gray-800">
                  ${item.perusahaan}
                </p>
                <p class="mt-4 text-sm leading-relaxed text-gray-800">
                  ${item.deskripsi}
                </p>
                <ul class="mt-5 flex flex-wrap gap-2 text-xs text-gray-700">
                  ${item.skill
                    .map(
                      (skill) =>
                        `<li class="rounded-full border border-gray-700 px-2.5 py-1 transition duration-500 hover:bg-black hover:text-white">
                    ${skill}
                  </li>`,
                    )
                    .join("")}
                </ul>
              </div>
            </article>`;
  })
  .join("");
// end section work experince

// carousel
const track = document.getElementById("track");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const counter = document.getElementById("counter");
const dotsEl = document.getElementById("dots");
const cards = track.querySelectorAll("article");
const GAP = 16; // sama dengan gap-4

const step = () => track.clientWidth + GAP;
const current = () => Math.round(track.scrollLeft / step());
const goTo = (i) => {
  const card = cards[i];

  if (!card) return;

  const trackRect = track.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  const targetLeft =
    track.scrollLeft +
    (cardRect.left - trackRect.left) -
    (track.clientWidth - card.clientWidth) / 2;

  track.scrollTo({
    left: targetLeft,
    behavior: "smooth",
  });
};

// Buat titik indikator
cards.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Ke pengalaman ${i + 1}`);
  dot.className =
    "h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
  dot.addEventListener("click", () => goTo(i));
  dotsEl.appendChild(dot);
});

const update = () => {
  const i = Math.min(Math.max(current(), 0), cards.length - 1);
  prev.disabled = i === 0;
  next.disabled = i === cards.length - 1;
  counter.textContent = `${i + 1} / ${cards.length}`;
  [...dotsEl.children].forEach((d, idx) => {
    d.className =
      d.className.replace(/w-\d+|bg-\S+/g, "").trim() +
      (idx === i ? " w-6 bg-white" : " w-2 bg-gray-700");
  });
};

prev.addEventListener("click", () => goTo(current() - 1));
next.addEventListener("click", () => goTo(current() + 1));
track.addEventListener("scroll", update, { passive: true });
window.addEventListener("resize", update);

// Navigasi keyboard saat track difokuskan
track.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    e.preventDefault();
    goTo(current() + 1);
  }
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    goTo(current() - 1);
  }
});

update();
// end Carousel

// section Tech

const tech = document.getElementById("tech");
tech.innerHTML = skill.tols_tech
  .map((item) => {
    return `<div
                  class="flex items-center gap-3 h-11 px-4 rounded-md border border-white/10 bg-white/[0.03] text-gray-300 text-sm hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition duration-200"
                  data-aos="fade-up"
                  data-aos-delay="250"
                  data-aos-duration="2000"
                >
                  <i class="${item.icon} text-gray-400"></i>
                  <span>${item.tech}</span>
                </div>`;
  })
  .join("");

// end section Tech

// Section project
// filter data project
const filterButtons = document.querySelectorAll(".filter-btn");
let filterprojects = "web";
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterprojects = button.dataset.category;
    renderProject();
  });
});
// logic style btn filter
const buttons = [
  document.querySelector("#webApp"),
  document.querySelector("#desainSystem"),
  document.querySelector("#dataAnalyst"),
];

const activeClasses = ["bg-white", "text-black", "scale-105"];
const inactiveClasses = ["bg-transparent", "text-gray-400", "hover:text-white"];

function setActive(activeBtn) {
  buttons.forEach((btn) => {
    if (btn === activeBtn) {
      btn.classList.remove(...inactiveClasses);
      btn.classList.add(...activeClasses);
    } else {
      btn.classList.remove(...activeClasses);
      btn.classList.add(...inactiveClasses);
    }
  });
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => setActive(btn));
});

const projects = document.querySelector("#project");
async function renderProject() {
  projects.innerHTML = project.projects
    .filter(
      (item) => filterprojects === "all" || item.kategori === filterprojects,
    )
    .map((item) => {
      return `<div class="card w-full overflow-hidden rounded-xl border border-gray-700 shadow-sm flex flex-col h-full" data-aos="fade-up"
     data-aos-duration="2000">
  <figure class="aspect-video overflow-hidden">
    <img
      src="${item.img}"
      alt="${item.project}"
      loading="lazy"
      class="w-full h-full object-cover"
    />
  </figure>
  <div class="card-body flex-1">
    <h2 class="card-title text-xl font-bold text-white">
      ${item.project}
    </h2>
    <p class="text-sm leading-relaxed text-gray-300 mb-5">
      ${item.deskripsi}
    </p>
    <ul class="card-actions justify-end text-xs text-gray-400 mt-auto">
      ${item.tech
        .map(
          (tech) =>
            `<li class="rounded-full border border-gray-700 px-2.5 py-1">${tech}</li>`,
        )
        .join("")}
    </ul>
    ${
      item.kategori === "web" ? "" : `<button class="paper-btn">Tombol</button>`
    }
  </div>
</div>`;
    })
    .join("");
}
renderProject();

// serifikasi section
document.querySelector("#cert-list").innerHTML = sertifikasi
  .map((item) => {
    return `          <div
            class="cert-item group border-b border-neutral-800"
            data-type="${item.kategori}"
            data-open="false"
          >
            <button
              type="button"
              aria-expanded="true"
              class="cert-toggle group/row grid w-full grid-cols-[minmax(0,1fr)_24px] items-baseline gap-x-3 gap-y-1.5 px-0.5 py-4.5 text-left sm:grid-cols-[72px_minmax(0,1fr)_110px_24px] sm:gap-x-4 sm:px-1 sm:py-4.5 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#8a93ff]"
            >
              <span
                class="col-start-1 row-start-1 font-mono text-xs tabular-nums text-neutral-400"
                >${item.tahun}</span
              >
              <span
                class="col-start-1 row-start-2 min-w-0 sm:col-start-2 sm:row-start-1"
              >
                <span
                  class="block text-base font-semibold leading-snug text-gray-500 transition duration-200 group-hover/row:translate-x-1 group-data-[open=true]:text-white sm:text-xl text-balance"
                  >${item.nama}</span
                >
                <span
                  class="mt-1.5 block wrap-break-wordbreak-word font-mono text-[11px] text-neutral-400"
                  >${item.penerbit}</span
                >
              </span>
              <span
                class="col-start-1 row-start-3 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white sm:col-start-3 sm:row-start-1 sm:text-right"
                >${item.kategori}</span
              >
              <span
                aria-hidden="true"
                class="relative col-start-2 row-span-3 row-start-1 mt-1 h-3 w-3 self-start justify-self-end sm:col-start-4 sm:row-span-1 sm:self-center sm:mt-0"
              >
                <span
                  class="absolute inset-x-0 top-[5.5px] h-px bg-neutral-400 transition-colors group-hover/row:bg-white"
                ></span>
                <span
                  class="absolute inset-y-0 left-[5.5px] w-px bg-neutral-400 transition group-hover/row:bg-white group-data-[open=true]:scale-y-0"
                ></span>
              </span>
            </button>

            <div
              class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-data-[open=true]:grid-rows-[1fr] motion-reduce:transition-none"
            >
              <div class="min-h-0 overflow-hidden">
                <div
                  class="grid grid-cols-1 gap-4 px-0.5 pb-6 sm:grid-cols-[72px_minmax(0,1fr)_220px] sm:px-1 sm:pb-7"
                >
                  <div class="flex min-w-0 flex-col gap-3.5 sm:col-start-2">
                    <p
                      class="max-w-[60ch] text-[12.5px] leading-[1.7] text-neutral-300"
                    >
                      ${item.deskripsi}
                    </p>
                    <ul
                      class="flex flex-wrap font-mono text-[11px] text-neutral-300"
                    >
                    ${item.skill
                      .map(
                        (skill) =>
                          ` <li class="after:mx-2.5 after:text-neutral-600 after:content-['/'] last:after:content-none">
                        ${skill}
                      </li>`,
                      )
                      .join("")}
                    </ul>
                    <a
                      href="certification/${item.file}.pdf"
                      target="_blank"
                      rel="noopener"
                      class="self-start border-b border-white pb-0.5 text-xs font-semibold text-white transition-colors "
                      >See Certification</a
                    >
                  </div>

                  <!-- Pratinjau sertifikat (placeholder) -->
                  <div
                    class="cert-preview relative flex aspect-[1.42] max-w-65 flex-col items-center gap-1.5 overflow-hidden rounded-[3px] border border-neutral-700 bg-[#0d0d12] p-3 sm:col-start-3 sm:max-w-full"
                  >
                    <img src="img/certification/${item.file}.png" alt="Serifikasi" loading="lazy"/>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
  })
  .join("");
(function () {
  const section = document.getElementById("sertifikasi");
  if (!section) return;
  var items = Array.prototype.slice.call(
    section.querySelectorAll(".cert-item"),
  );
  var filters = Array.prototype.slice.call(
    section.querySelectorAll("#cert-filters [data-filter]"),
  );
  var countEl = document.getElementById("cert-count");

  function countOf(type) {
    return items.filter(function (i) {
      return type === "all" || i.dataset.type === type;
    }).length;
  }

  // Accordion: hanya satu baris terbuka
  function setOpen(item, open) {
    item.dataset.open = open ? "true" : "false";
    item
      .querySelector(".cert-toggle")
      .setAttribute("aria-expanded", open ? "true" : "false");
  }
  items.forEach(function (item) {
    item.querySelector(".cert-toggle").addEventListener("click", function () {
      var willOpen = item.dataset.open !== "true";
      items.forEach(function (o) {
        setOpen(o, false);
      });
      setOpen(item, willOpen);
    });
  });

  // Jumlah per kategori
  section.querySelectorAll("[data-count]").forEach(function (el) {
    el.textContent = countOf(el.dataset.count);
  });
  countEl.textContent = countOf("all") + " kredensial";

  // Filter
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.dataset.filter;
      filters.forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      items.forEach(function (item) {
        item.hidden = !(f === "all" || item.dataset.type === f);
      });
      countEl.textContent = countOf(f) + " kredensial";
    });
  });
})();

(function () {
  var btn = document.getElementById("footer-copy");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var email = btn.dataset.email;
    function done() {
      btn.textContent = "Tersalin";
      setTimeout(function () {
        btn.textContent = "Salin";
      }, 1800);
    }
    function fallback() {
      var r = document.createRange();
      r.selectNodeContents(document.getElementById("footer-email"));
      var s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done, fallback);
    } else {
      fallback();
    }
  });
})();
