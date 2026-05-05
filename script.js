const featuredNotes = [
  { code: "YBS 205", title: "Web Tabanlı Uygulama Geliştirme", term: "2. Yıl Güz" },
  { code: "YBS 304", title: "Web Tasarım Teknikleri", term: "3. Yıl Bahar" },
  { code: "YBS 108", title: "Veri Tabanına Giriş", term: "1. Yıl Bahar" },
  { code: "YBS 301", title: "Sistem Analizi ve Tasarımı", term: "3. Yıl Güz" },
  { code: "İKT 101", title: "Mikro İktisat", term: "1. Yıl Güz" },
];

const courseTerms = [
  {
    term: "1. Yıl Güz",
    courses: [
      ["İKT 101", "Mikro İktisat"],
      ["TRD 109", "Türk Dili I"],
      ["YBS 103", "İşletme Yönetimi"],
      ["YBS 105", "Bilişim Sistemleri ve Teknolojilerine Giriş"],
      ["YBS 107", "Algoritma ve Programlamaya Giriş"],
      ["YBS 109", "İşletme Matematiği I"],
      ["YBS 111", "Muhasebe I"],
      ["YDİ 107", "İngilizce I"],
    ],
  },
  {
    term: "1. Yıl Bahar",
    courses: [
      ["İKT 102", "Makro İktisat"],
      ["TRD 110", "Türk Dili II"],
      ["YBS 104", "Yönetim ve Organizasyon"],
      ["YBS 106", "Nesne Tabanlı Programlama I"],
      ["YBS 108", "Veri Tabanına Giriş"],
      ["YBS 110", "İşletme Matematiği II"],
      ["YBS 112", "Muhasebe II"],
      ["YDİ 108", "İngilizce II"],
    ],
  },
  {
    term: "2. Yıl Güz",
    courses: [
      ["AİT 209", "Atatürk İlkeleri ve İnkılap Tarihi I"],
      ["YBS 201", "Finansal Yönetim I"],
      ["YBS 203", "İstatistik"],
      ["YBS 205", "Web Tabanlı Uygulama Geliştirme"],
      ["YBS 207", "Bilgisayar Donanımı ve Sistem Yazılımı"],
      ["YBS 209", "Pazarlama İlkeleri"],
      ["YBS 211", "Nesne Tabanlı Programlama II"],
    ],
  },
  {
    term: "2. Yıl Bahar",
    courses: [
      ["AİT 210", "Atatürk İlkeleri ve İnkılap Tarihi II"],
      ["YBS 202", "Finansal Yönetim II"],
      ["YBS 204", "Araştırma Yöntemleri"],
      ["YBS 206", "Yönetimsel İletişim"],
      ["YBS 208", "Veri İletişimi ve Ağlar"],
      ["YBS 210", "Bilişim İngilizcesi"],
      ["YBS 212", "Üretim Yönetimi"],
    ],
  },
  {
    term: "3. Yıl Güz",
    courses: [
      ["YBS 301", "Sistem Analizi ve Tasarımı"],
      ["YBS 303", "Veri Madenciliği"],
      ["YBS 305", "Veritabanı Sistemleri"],
      ["YBS 307", "Bilişim Hukuku"],
      ["YBS 309", "Yöneylem Araştırması"],
      ["YBS 311", "Proje Yönetimi"],
      ["YBS 313", "Mesleki Uygulama I"],
    ],
  },
  {
    term: "3. Yıl Bahar",
    courses: [
      ["YBS 302", "Kurumsal Bilgi Sistemleri"],
      ["YBS 304", "Web Tasarım Teknikleri"],
      ["YBS 306", "İş Uygulamaları Geliştirme"],
      ["YBS 308", "Karar Vermede Sayısal Analiz"],
      ["YBS 310", "Elektronik Ticaret ve Elektronik İşletme"],
      ["YBS 312", "Büyük Veri ve İş Analitiği"],
    ],
  },
];

const adminSeedItems = [
  { code: "YBS 107", title: "Algoritma ve Programlamaya Giriş", term: "1. Yıl Güz", status: "pending" },
  { code: "YBS 106", title: "Nesne Tabanlı Programlama I", term: "1. Yıl Bahar", status: "pending" },
  { code: "YBS 211", title: "Nesne Tabanlı Programlama II", term: "2. Yıl Güz", status: "pending" },
  { code: "YBS 208", title: "Veri İletişimi ve Ağlar", term: "2. Yıl Bahar", status: "pending" },
  { code: "YBS 303", title: "Veri Madenciliği", term: "3. Yıl Güz", status: "pending" },
  { code: "YBS 312", title: "Büyük Veri ve İş Analitiği", term: "3. Yıl Bahar", status: "pending" },
  { code: "YBS 201", title: "Finansal Yönetim I", term: "2. Yıl Güz", status: "pending" },
  { code: "YBS 310", title: "Elektronik Ticaret ve Elektronik İşletme", term: "3. Yıl Bahar", status: "pending" },
];

const state = {
  activeTerm: "Tümü",
  adminFilter: "all",
};

let uploadTimers = [];
let adminItems = loadAdminItems();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const queueStorageKey = "dersNotuTakasAdminQueue";
const preferredCourseKey = "dersNotuTakasPreferredCourse";

function loadAdminItems() {
  try {
    const saved = localStorage.getItem("dersNotuTakasAdminQueue");
    if (saved) return JSON.parse(saved);
  } catch (error) {
    console.warn("Demo kuyruğu okunamadı.", error);
  }

  return adminSeedItems.map((item) => ({ ...item, source: "Örnek PDF" }));
}

function saveAdminItems() {
  localStorage.setItem(queueStorageKey, JSON.stringify(adminItems));
}

function resetAdminItems() {
  localStorage.removeItem(queueStorageKey);
  adminItems = loadAdminItems();
}

function getAnalysisNotes() {
  const adminNotes = adminItems.map((note) => ({
    code: note.code,
    title: note.title,
    term: note.term,
    status: note.status,
    fileName: note.fileName,
    source: note.source,
  }));

  return [...featuredNotes, ...adminNotes];
}

function findCourseByCode(code) {
  const allCourses = courseTerms.flatMap((group) =>
    group.courses.map(([courseCode, title]) => ({ code: courseCode, title, term: group.term })),
  );

  return allCourses.find((course) => course.code === code);
}

function renderFeaturedNotes() {
  const holder = $("#noteCards");
  if (!holder) return;

  holder.innerHTML = featuredNotes
    .map(
      (note) => `
        <article class="note-card">
          <span class="course-code">${note.code}</span>
          <h3>${note.title}</h3>
          <span class="term-tag">${note.term}</span>
        </article>
      `,
    )
    .join("");
}

function renderFilters() {
  const holder = $("#termFilters");
  if (!holder) return;

  const filters = ["Tümü", ...courseTerms.map((group) => group.term)];
  holder.innerHTML = filters
    .map(
      (term) => `
        <button
          class="filter-pill ${term === state.activeTerm ? "active" : ""}"
          type="button"
          data-term="${term}"
          aria-pressed="${term === state.activeTerm}"
        >
          ${term}
        </button>
      `,
    )
    .join("");

  holder.onclick = (event) => {
    const button = event.target.closest("[data-term]");
    if (!button) return;
    state.activeTerm = button.dataset.term;
    renderFilters();
    renderCourses();
  };
}

function renderCourses() {
  const holder = $("#courseList");
  if (!holder) return;

  const input = $("#courseSearch");
  const query = input ? input.value.trim().toLocaleLowerCase("tr-TR") : "";
  const groups = courseTerms
    .filter((group) => state.activeTerm === "Tümü" || group.term === state.activeTerm)
    .map((group) => ({
      ...group,
      courses: group.courses.filter(([code, title]) => `${code} ${title}`.toLocaleLowerCase("tr-TR").includes(query)),
    }))
    .filter((group) => group.courses.length > 0);

  if (!groups.length) {
    holder.innerHTML = `<p class="empty-state">Arama kriterine uygun ders bulunamadı.</p>`;
    return;
  }

  holder.innerHTML = groups
    .map(
      (group) => `
        <article class="course-term">
          <h3>${group.term}<span>${group.courses.length}</span></h3>
          <ul>
            ${group.courses
              .map(
                ([code, title]) => `
                  <li>
                    <code>${code}</code>
                    <span>${title}</span>
                    <button class="course-action" type="button" data-upload-course="${code}">PDF yükle</button>
                  </li>
                `,
              )
              .join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function fillCourseSelect() {
  const select = $("#mockCourse");
  if (!select) return;

  const allCourses = courseTerms.flatMap((group) => group.courses.map(([code, title]) => ({ code, title, term: group.term })));
  const preferredCourse = localStorage.getItem(preferredCourseKey);
  select.innerHTML = allCourses
    .map((course) => `<option value="${course.code}">${course.code} - ${course.title} - ${course.term}</option>`)
    .join("");

  if (preferredCourse && allCourses.some((course) => course.code === preferredCourse)) {
    select.value = preferredCourse;
    localStorage.removeItem(preferredCourseKey);
  }

  updateUploadPreview();
}

function fillAnalysisSelect() {
  const select = $("#analysisNote");
  if (!select) return;

  const notes = getAnalysisNotes();
  select.innerHTML = notes
    .map((note, index) => `<option value="${index}">${note.code} - ${note.title} - ${note.term}</option>`)
    .join("");

  renderAnalysisNoteInfo();
}

function renderAdminQueue() {
  const holder = $("#adminQueue");
  if (!holder) return;

  const visibleItems = adminItems.filter((item) => state.adminFilter === "all" || item.status === state.adminFilter);

  if (!visibleItems.length) {
    holder.innerHTML = `<p class="empty-state">Bu filtrede gösterilecek PDF notu yok.</p>`;
    updateAdminCounts();
    updateAdminFilterButtons();
    return;
  }

  holder.innerHTML = visibleItems
    .map(
      (item) => {
        const index = adminItems.indexOf(item);
        return `
        <article class="admin-item" data-admin-index="${index}" data-status="${item.status}">
          <div>
            <span class="course-code">${item.code}</span>
            <h3>${item.title}</h3>
            <div class="admin-meta">
              <span class="term-tag">${item.term}</span>
              <span class="status-pill ${item.status}">${statusLabel(item.status)}</span>
              <span class="ai-tag">AI ön kontrol</span>
              ${item.fileName ? `<span class="file-tag">${item.fileName}</span>` : ""}
            </div>
          </div>
          <div class="admin-controls">
            <button class="admin-action approve" type="button" data-action="approved" aria-label="${item.code} PDF notunu onayla">
              <i data-lucide="check"></i>
              Onayla
            </button>
            <button class="admin-action reject" type="button" data-action="rejected" aria-label="${item.code} PDF notunu reddet">
              <i data-lucide="x"></i>
              Reddet
            </button>
          </div>
        </article>
      `;
      },
    )
    .join("");
  updateAdminCounts();
  updateAdminFilterButtons();
  refreshIcons();
}

function statusLabel(status) {
  if (status === "approved") return "Onaylandı";
  if (status === "rejected") return "Reddedildi";
  return "Admin onayı bekliyor";
}

function updateAdminCounts() {
  const pendingCount = $("#pendingCount");
  const approvedCount = $("#approvedCount");
  const rejectedCount = $("#rejectedCount");
  if (!pendingCount || !approvedCount || !rejectedCount) return;

  pendingCount.textContent = adminItems.filter((item) => item.status === "pending").length;
  approvedCount.textContent = adminItems.filter((item) => item.status === "approved").length;
  rejectedCount.textContent = adminItems.filter((item) => item.status === "rejected").length;
}

function updateAdminFilterButtons() {
  $$("[data-admin-filter]").forEach((button) => {
    const isActive = button.dataset.adminFilter === state.adminFilter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setupAdminFilters() {
  const filterBar = $(".admin-filter-bar");
  if (!filterBar) return;

  filterBar.addEventListener("click", (event) => {
    const filterButton = event.target.closest("[data-admin-filter]");
    const resetButton = event.target.closest("#resetQueue");

    if (filterButton) {
      state.adminFilter = filterButton.dataset.adminFilter;
      renderAdminQueue();
      return;
    }

    if (resetButton) {
      resetAdminItems();
      state.adminFilter = "all";
      renderAdminQueue();
      showToast("Admin demo kuyruğu sıfırlandı.");
    }
  });

  updateAdminFilterButtons();
}

function setupAdminActions() {
  const holder = $("#adminQueue");
  if (!holder) return;

  holder.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    const item = event.target.closest("[data-admin-index]");
    if (!button || !item) return;

    const index = Number(item.dataset.adminIndex);
    adminItems[index].status = button.dataset.action;
    saveAdminItems();
    renderAdminQueue();
    showToast(`${adminItems[index].code} durumu: ${statusLabel(adminItems[index].status)}`);
  });
}

function updateUploadPreview(status = "Hazır", detail = "Ders seçip PDF dosyası eklediğinde burada yükleme özeti görünecek.") {
  const preview = $("#uploadPreview");
  const courseSelect = $("#mockCourse");
  const fileInput = $("#mockPdf");
  if (!preview || !courseSelect || !fileInput) return;

  const course = findCourseByCode(courseSelect.value);
  const fileName = fileInput.files?.[0]?.name;
  const title = fileName ? fileName : "Henüz PDF seçilmedi";
  const courseLine = course ? `${course.code} - ${course.title} (${course.term})` : "Ders seçilmedi";

  preview.innerHTML = `
    <span class="status-pill pending">${status}</span>
    <h3>${title}</h3>
    <p>${courseLine}</p>
    <small>${detail}</small>
  `;
}

function createUploadedNote() {
  const courseSelect = $("#mockCourse");
  const fileInput = $("#mockPdf");
  const course = findCourseByCode(courseSelect.value);
  const file = fileInput.files?.[0];
  if (!course || !file) return null;

  const uploadedNote = {
    id: `upload-${Date.now()}`,
    code: course.code,
    title: course.title,
    term: course.term,
    status: "pending",
    source: "Yeni yükleme",
    fileName: file.name,
  };

  adminItems = [uploadedNote, ...adminItems];
  saveAdminItems();
  return uploadedNote;
}

function setupUploadInputs() {
  const courseSelect = $("#mockCourse");
  const fileInput = $("#mockPdf");
  if (!courseSelect || !fileInput) return;

  courseSelect.addEventListener("change", () => updateUploadPreview("Hazır", "Seçilen ders PDF yükleme akışına hazır."));
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    updateUploadPreview(file ? "PDF seçildi" : "Hazır", file ? "Süreci başlattığında demo admin kuyruğuna eklenecek." : undefined);
  });
}

function setupUploadFlow() {
  const form = $("#uploadForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    uploadTimers.forEach((timer) => window.clearTimeout(timer));
    uploadTimers = [];

    const steps = $$(".process-step");
    const submitButton = form.querySelector("button[type='submit']");
    steps.forEach((step) => step.classList.remove("done", "active"));
    if (submitButton) submitButton.disabled = true;
    updateUploadPreview("Kontrol ediliyor", "PDF ön kontrol ve admin kuyruğu animasyonu çalışıyor.");

    steps.forEach((step, index) => {
      const timer = window.setTimeout(() => {
        step.classList.add(index === steps.length - 1 ? "active" : "done");
        if (index === steps.length - 1) {
          const uploadedNote = createUploadedNote();
          updateUploadPreview("Kuyruğa eklendi", "Bu not artık Admin ve Özet & Soru sayfalarında demo veri olarak görünecek.");
          showToast(`${uploadedNote?.code || "PDF"} notu admin kuyruğuna eklendi.`);
          if (submitButton) submitButton.disabled = false;
        }
      }, index * 420);
      uploadTimers.push(timer);
    });
  });
}

function renderAnalysisNoteInfo() {
  const select = $("#analysisNote");
  const info = $("#analysisNoteInfo");
  if (!select || !info) return;

  const note = getAnalysisNotes()[Number(select.value)];
  if (!note) {
    info.innerHTML = `<span class="empty-state compact">Analiz için not bulunamadı.</span>`;
    return;
  }

  const status = note.status ? statusLabel(note.status) : "Örnek not";
  info.innerHTML = `
    <span class="course-code">${note.code}</span>
    <strong>${note.title}</strong>
    <span>${note.term} · ${status}${note.fileName ? ` · ${note.fileName}` : ""}</span>
  `;
}

function setupAnalysisTools() {
  const form = $("#analysisForm");
  if (!form) return;

  $("#analysisNote")?.addEventListener("change", renderAnalysisNoteInfo);

  form.addEventListener("click", (event) => {
    const button = event.target.closest("[data-analysis-action]");
    if (!button) return;

    const note = getAnalysisNotes()[Number($("#analysisNote").value)];
    const action = button.dataset.analysisAction;
    const target = action === "summary" ? $("#summaryOutput").closest(".result-box") : $("#questionOutput").closest(".result-box");

    target.classList.add("loading");
    button.disabled = true;

    window.setTimeout(() => {
      if (action === "summary") {
        renderSummary(note);
      } else {
        renderQuestions(note);
      }

      target.classList.remove("loading");
      button.disabled = false;
      showToast(`${note.code} için ${action === "summary" ? "özet" : "soru seti"} hazırlandı.`);
      refreshIcons();
    }, 520);
  });
}

function renderSummary(note) {
  const output = $("#summaryOutput");
  if (!output) return;

  const fileText = note.fileName ? ` "${note.fileName}" dosyası üzerinden` : "";
  output.textContent =
    `${note.code} - ${note.title} (${note.term}) notu için${fileText} örnek özet: dersin temel kavramları, önemli başlıkları ve sınavda dikkat edilmesi gereken ana noktalar kısa maddeler halinde toparlanır.`;
}

function renderQuestions(note) {
  const output = $("#questionOutput");
  if (!output) return;

  const questions = [
    `${note.title} dersinde temel kavramlar hangi amaçla kullanılır?`,
    `${note.code} notunda geçen önemli süreçleri kısa şekilde açıklayınız.`,
    `${note.term} kapsamında bu dersin diğer derslerle bağlantısı nedir?`,
    `${note.fileName ? note.fileName + " dosyasında" : "Bu dersten hazırlanacak bir PDF notunda"} en önemli 3 başlık ne olur?`,
  ];

  output.innerHTML = questions.map((question) => `<li>${question}</li>`).join("");
}

function setupAuthMock() {
  const loginForm = $("#authForm");
  const registerForm = $("#registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      showToast("Giriş alanı hazır.");
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      showToast("Kayıt alanı hazır.");
    });
  }
}

function setupSearch() {
  const input = $("#courseSearch");
  if (!input) return;

  input.addEventListener("input", renderCourses);
}

function setupCourseActions() {
  const holder = $("#courseList");
  if (!holder) return;

  holder.addEventListener("click", (event) => {
    const button = event.target.closest("[data-upload-course]");
    if (!button) return;

    localStorage.setItem(preferredCourseKey, button.dataset.uploadCourse);
    window.location.href = "yukle.html";
  });
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function init() {
  renderFeaturedNotes();
  renderFilters();
  renderCourses();
  fillCourseSelect();
  fillAnalysisSelect();
  renderAdminQueue();
  setupAdminFilters();
  setupAdminActions();
  setupUploadInputs();
  setupUploadFlow();
  setupAnalysisTools();
  setupAuthMock();
  setupSearch();
  setupCourseActions();
  refreshIcons();
}

document.addEventListener("DOMContentLoaded", init);
