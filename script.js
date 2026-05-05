const featuredNotes = [
  { code: "YBS 205", title: "Web Tabanli Uygulama Gelistirme", term: "2. Yil Guz" },
  { code: "YBS 304", title: "Web Tasarim Teknikleri", term: "3. Yil Bahar" },
  { code: "YBS 108", title: "Veri Tabanina Giris", term: "1. Yil Bahar" },
  { code: "YBS 301", title: "Sistem Analizi ve Tasarimi", term: "3. Yil Guz" },
  { code: "IKT 101", title: "Mikro Iktisat", term: "1. Yil Guz" },
];

const courseTerms = [
  {
    term: "1. Yil Guz",
    courses: [
      ["IKT 101", "Mikro Iktisat"],
      ["TRD 109", "Turk Dili I"],
      ["YBS 103", "Isletme Yonetimi"],
      ["YBS 105", "Bilisim Sistemleri ve Teknolojilerine Giris"],
      ["YBS 107", "Algoritma ve Programlamaya Giris"],
      ["YBS 109", "Isletme Matematigi I"],
      ["YBS 111", "Muhasebe I"],
      ["YDI 107", "Ingilizce I"],
    ],
  },
  {
    term: "1. Yil Bahar",
    courses: [
      ["IKT 102", "Makro Iktisat"],
      ["TRD 110", "Turk Dili II"],
      ["YBS 104", "Yonetim ve Organizasyon"],
      ["YBS 106", "Nesne Tabanli Programlama I"],
      ["YBS 108", "Veri Tabanina Giris"],
      ["YBS 110", "Isletme Matematigi II"],
      ["YBS 112", "Muhasebe II"],
      ["YDI 108", "Ingilizce II"],
    ],
  },
  {
    term: "2. Yil Guz",
    courses: [
      ["AIT 209", "Ataturk Ilkeleri ve Inkilap Tarihi I"],
      ["YBS 201", "Finansal Yonetim I"],
      ["YBS 203", "Istatistik"],
      ["YBS 205", "Web Tabanli Uygulama Gelistirme"],
      ["YBS 207", "Bilgisayar Donanimi ve Sistem Yazilimi"],
      ["YBS 209", "Pazarlama Ilkeleri"],
      ["YBS 211", "Nesne Tabanli Programlama II"],
    ],
  },
  {
    term: "2. Yil Bahar",
    courses: [
      ["AIT 210", "Ataturk Ilkeleri ve Inkilap Tarihi II"],
      ["YBS 202", "Finansal Yonetim II"],
      ["YBS 204", "Arastirma Yontemleri"],
      ["YBS 206", "Yonetimsel Iletisim"],
      ["YBS 208", "Veri Iletisimi ve Aglar"],
      ["YBS 210", "Bilisim Ingilizcesi"],
      ["YBS 212", "Uretim Yonetimi"],
    ],
  },
  {
    term: "3. Yil Guz",
    courses: [
      ["YBS 301", "Sistem Analizi ve Tasarimi"],
      ["YBS 303", "Veri Madenciligi"],
      ["YBS 305", "Veritabani Sistemleri"],
      ["YBS 307", "Bilisim Hukuku"],
      ["YBS 309", "Yoneylem Arastirmasi"],
      ["YBS 311", "Proje Yonetimi"],
      ["YBS 313", "Mesleki Uygulama I"],
    ],
  },
  {
    term: "3. Yil Bahar",
    courses: [
      ["YBS 302", "Kurumsal Bilgi Sistemleri"],
      ["YBS 304", "Web Tasarim Teknikleri"],
      ["YBS 306", "Is Uygulamalari Gelistirme"],
      ["YBS 308", "Karar Vermede Sayisal Analiz"],
      ["YBS 310", "Elektronik Ticaret ve Elektronik Isletme"],
      ["YBS 312", "Buyuk Veri ve Is Analitigi"],
    ],
  },
];

const state = {
  activeTerm: "Tumu",
  adminFilter: "all",
};

let uploadTimers = [];
let adminItems = [];
let uploadedNotes = [];
let currentUser = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const preferredCourseKey = "dersNotuTakasPreferredCourse";

async function apiRequest(path, options = {}) {
  const headers = { ...(options.headers || {}) };

  if (options.body && !(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(path, {
    credentials: "include",
    ...options,
    headers,
  });

  let payload = {};
  try {
    payload = await response.json();
  } catch (error) {
    payload = {};
  }

  if (!response.ok) {
    throw new Error(payload.error || "Islem tamamlanamadi.");
  }

  return payload;
}

async function loadSession() {
  try {
    const payload = await apiRequest("/api/auth/me");
    currentUser = payload.user || null;
  } catch (error) {
    currentUser = null;
  }

  updateSessionUi();
}

function updateSessionUi() {
  const isAdmin = currentUser?.role === "admin";
  $$('a[href="admin.html"]').forEach((link) => link.classList.toggle("is-hidden", !isAdmin));

  $$(".nav-session").forEach((button) => button.remove());
  const nav = $(".section-nav");
  if (!nav || !currentUser) return;

  const logoutButton = document.createElement("button");
  logoutButton.className = "nav-session";
  logoutButton.type = "button";
  logoutButton.textContent = `${isAdmin ? "Admin" : "Kullanici"} cikis`;
  logoutButton.addEventListener("click", async () => {
    await apiRequest("/api/auth/logout", { method: "POST" });
    currentUser = null;
    showToast("Oturum kapatildi.");
    window.location.href = "giris.html";
  });
  nav.appendChild(logoutButton);
}

function nextTarget() {
  const params = new URLSearchParams(window.location.search);
  return params.get("next") === "admin" ? "admin.html" : "index.html";
}

async function loadAdminItems() {
  if (!$("#adminQueue")) return;

  try {
    const payload = await apiRequest("/api/admin/queue");
    adminItems = payload.items || [];
  } catch (error) {
    adminItems = [];
    showToast(error.message);
    window.location.href = "giris.html?next=admin";
  }
}

async function loadUploadedNotes() {
  if (!$("#analysisNote")) return;

  try {
    const payload = await apiRequest("/api/notes");
    uploadedNotes = payload.notes || [];
  } catch (error) {
    uploadedNotes = [];
  }
}

async function resetAdminItems() {
  const payload = await apiRequest("/api/admin/queue/reset", { method: "POST" });
  adminItems = payload.items || [];
}

function getAnalysisNotes() {
  const backendNotes = uploadedNotes.map((note) => ({
    code: note.code,
    title: note.title,
    term: note.term,
    status: note.status,
    fileName: note.fileName,
    source: note.source,
  }));

  return [...featuredNotes, ...backendNotes];
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

  const filters = ["Tumu", ...courseTerms.map((group) => group.term)];
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
    .filter((group) => state.activeTerm === "Tumu" || group.term === state.activeTerm)
    .map((group) => ({
      ...group,
      courses: group.courses.filter(([code, title]) => `${code} ${title}`.toLocaleLowerCase("tr-TR").includes(query)),
    }))
    .filter((group) => group.courses.length > 0);

  if (!groups.length) {
    holder.innerHTML = `<p class="empty-state">Arama kriterine uygun ders bulunamadi.</p>`;
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
                    <button class="course-action" type="button" data-upload-course="${code}">PDF yukle</button>
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
    holder.innerHTML = `<p class="empty-state">Bu filtrede gosterilecek PDF notu yok.</p>`;
    updateAdminCounts();
    updateAdminFilterButtons();
    return;
  }

  holder.innerHTML = visibleItems
    .map(
      (item) => `
        <article class="admin-item" data-admin-id="${item.id}" data-status="${item.status}">
          <div>
            <span class="course-code">${item.code}</span>
            <h3>${item.title}</h3>
            <div class="admin-meta">
              <span class="term-tag">${item.term}</span>
              <span class="status-pill ${item.status}">${statusLabel(item.status)}</span>
              <span class="ai-tag">AI on kontrol</span>
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
      `,
    )
    .join("");
  updateAdminCounts();
  updateAdminFilterButtons();
  refreshIcons();
}

function statusLabel(status) {
  if (status === "approved") return "Onaylandi";
  if (status === "rejected") return "Reddedildi";
  return "Admin onayi bekliyor";
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

  filterBar.addEventListener("click", async (event) => {
    const filterButton = event.target.closest("[data-admin-filter]");
    const resetButton = event.target.closest("#resetQueue");

    if (filterButton) {
      state.adminFilter = filterButton.dataset.adminFilter;
      renderAdminQueue();
      return;
    }

    if (resetButton) {
      resetButton.disabled = true;
      try {
        await resetAdminItems();
        state.adminFilter = "all";
        renderAdminQueue();
        showToast("Admin demo kuyrugu sifirlandi.");
      } catch (error) {
        showToast(error.message);
      } finally {
        resetButton.disabled = false;
      }
    }
  });

  updateAdminFilterButtons();
}

function setupAdminActions() {
  const holder = $("#adminQueue");
  if (!holder) return;

  holder.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    const item = event.target.closest("[data-admin-id]");
    if (!button || !item) return;

    button.disabled = true;
    try {
      const payload = await apiRequest(`/api/admin/queue/${item.dataset.adminId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: button.dataset.action }),
      });
      adminItems = adminItems.map((entry) => (entry.id === payload.item.id ? payload.item : entry));
      renderAdminQueue();
      showToast(`${payload.item.code} durumu: ${statusLabel(payload.item.status)}`);
    } catch (error) {
      showToast(error.message);
      button.disabled = false;
    }
  });
}

function updateUploadPreview(status = "Hazir", detail = "Ders secip PDF dosyasi eklediginde burada yukleme ozeti gorunecek.") {
  const preview = $("#uploadPreview");
  const courseSelect = $("#mockCourse");
  const fileInput = $("#mockPdf");
  if (!preview || !courseSelect || !fileInput) return;

  const course = findCourseByCode(courseSelect.value);
  const fileName = fileInput.files?.[0]?.name;
  const title = fileName ? fileName : "Henuz PDF secilmedi";
  const courseLine = course ? `${course.code} - ${course.title} (${course.term})` : "Ders secilmedi";

  preview.innerHTML = `
    <span class="status-pill pending">${status}</span>
    <h3>${title}</h3>
    <p>${courseLine}</p>
    <small>${detail}</small>
  `;
}

async function createUploadedNote() {
  const courseSelect = $("#mockCourse");
  const fileInput = $("#mockPdf");
  const course = findCourseByCode(courseSelect.value);
  const file = fileInput.files?.[0];
  if (!course || !file) return null;

  const formData = new FormData();
  formData.append("code", course.code);
  formData.append("title", course.title);
  formData.append("term", course.term);
  formData.append("pdf", file);

  const payload = await apiRequest("/api/uploads", {
    method: "POST",
    body: formData,
  });

  return payload.item;
}

function setupUploadInputs() {
  const courseSelect = $("#mockCourse");
  const fileInput = $("#mockPdf");
  if (!courseSelect || !fileInput) return;

  courseSelect.addEventListener("change", () => updateUploadPreview("Hazir", "Secilen ders PDF yukleme akisina hazir."));
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    updateUploadPreview(file ? "PDF secildi" : "Hazir", file ? "Sureci baslattiginda backend admin kuyruguna eklenecek." : undefined);
  });
}

function setupUploadFlow() {
  const form = $("#uploadForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    uploadTimers.forEach((timer) => window.clearTimeout(timer));
    uploadTimers = [];

    if (!currentUser) {
      showToast("PDF yuklemek icin kullanici girisi yap.");
      window.setTimeout(() => {
        window.location.href = "giris.html";
      }, 700);
      return;
    }

    const steps = $$(".process-step");
    const submitButton = form.querySelector("button[type='submit']");
    steps.forEach((step) => step.classList.remove("done", "active"));
    if (submitButton) submitButton.disabled = true;
    updateUploadPreview("Kontrol ediliyor", "PDF backend'e yukleniyor ve admin kuyrugu hazirlaniyor.");

    steps.forEach((step, index) => {
      const timer = window.setTimeout(async () => {
        step.classList.add(index === steps.length - 1 ? "active" : "done");
        if (index !== steps.length - 1) return;

        try {
          const uploadedNote = await createUploadedNote();
          uploadedNotes = uploadedNote ? [uploadedNote, ...uploadedNotes] : uploadedNotes;
          updateUploadPreview("Kuyruga eklendi", "Bu not artik backend admin kuyrugunda gorunur.");
          showToast(`${uploadedNote?.code || "PDF"} notu admin kuyruguna eklendi.`);
        } catch (error) {
          updateUploadPreview("Yukleme hatasi", error.message);
          showToast(error.message);
        } finally {
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
    info.innerHTML = `<span class="empty-state compact">Analiz icin not bulunamadi.</span>`;
    return;
  }

  const status = note.status ? statusLabel(note.status) : "Ornek not";
  info.innerHTML = `
    <span class="course-code">${note.code}</span>
    <strong>${note.title}</strong>
    <span>${note.term} - ${status}${note.fileName ? ` - ${note.fileName}` : ""}</span>
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
    if (!note) return;

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
      showToast(`${note.code} icin ${action === "summary" ? "ozet" : "soru seti"} hazirlandi.`);
      refreshIcons();
    }, 520);
  });
}

function renderSummary(note) {
  const output = $("#summaryOutput");
  if (!output) return;

  const fileText = note.fileName ? ` "${note.fileName}" dosyasi uzerinden` : "";
  output.textContent =
    `${note.code} - ${note.title} (${note.term}) notu icin${fileText} ornek ozet: dersin temel kavramlari, onemli basliklari ve sinavda dikkat edilmesi gereken ana noktalar kisa maddeler halinde toparlanir.`;
}

function renderQuestions(note) {
  const output = $("#questionOutput");
  if (!output) return;

  const questions = [
    `${note.title} dersinde temel kavramlar hangi amacla kullanilir?`,
    `${note.code} notunda gecen onemli surecleri kisa sekilde aciklayiniz.`,
    `${note.term} kapsaminda bu dersin diger derslerle baglantisi nedir?`,
    `${note.fileName ? note.fileName + " dosyasinda" : "Bu dersten hazirlanacak bir PDF notunda"} en onemli 3 baslik ne olur?`,
  ];

  output.innerHTML = questions.map((question) => `<li>${question}</li>`).join("");
}

function setButtonLoading(button, loading) {
  if (!button) return;
  button.disabled = loading;
  button.dataset.originalHtml ||= button.innerHTML;
  if (loading) button.textContent = "Isleniyor...";
  if (!loading) button.innerHTML = button.dataset.originalHtml;
  refreshIcons();
}

function setupAuthForms() {
  const loginForm = $("#authForm");
  const adminForm = $("#adminAuthForm");
  const quickAdminButton = $("#quickAdminLogin");
  const registerForm = $("#registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = loginForm.querySelector("button[type='submit']");
      setButtonLoading(button, true);
      try {
        const payload = await apiRequest("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email: $("#loginEmail").value,
            password: $("#loginPassword").value,
          }),
        });
        currentUser = payload.user;
        showToast("Kullanici oturumu acildi.");
        window.location.href = payload.user.role === "admin" ? "admin.html" : nextTarget();
      } catch (error) {
        showToast(error.message);
      } finally {
        setButtonLoading(button, false);
      }
    });
  }

  if (adminForm) {
    adminForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = adminForm.querySelector("button[type='submit']");
      setButtonLoading(button, true);
      try {
        const payload = await apiRequest("/api/auth/admin-login", {
          method: "POST",
          body: JSON.stringify({
            email: $("#adminEmail").value,
            password: $("#adminPassword").value,
          }),
        });
        currentUser = payload.user;
        showToast("Admin oturumu acildi.");
        window.location.href = "admin.html";
      } catch (error) {
        showToast(error.message);
      } finally {
        setButtonLoading(button, false);
      }
    });
  }

  if (quickAdminButton) {
    quickAdminButton.addEventListener("click", async () => {
      setButtonLoading(quickAdminButton, true);
      try {
        const payload = await apiRequest("/api/auth/admin-quick-login", { method: "POST" });
        currentUser = payload.user;
        showToast("Admin oturumu acildi.");
        window.location.href = "admin.html";
      } catch (error) {
        showToast(error.message);
      } finally {
        setButtonLoading(quickAdminButton, false);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = registerForm.querySelector("button[type='submit']");
      setButtonLoading(button, true);
      try {
        const payload = await apiRequest("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({
            name: $("#registerName").value,
            email: $("#registerEmail").value,
            password: $("#registerPassword").value,
          }),
        });
        currentUser = payload.user;
        showToast("Kayit tamamlandi ve oturum acildi.");
        window.location.href = "index.html";
      } catch (error) {
        showToast(error.message);
      } finally {
        setButtonLoading(button, false);
      }
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
    window.location.href = currentUser ? "yukle.html" : "giris.html";
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

async function init() {
  await loadSession();
  renderFeaturedNotes();
  renderFilters();
  renderCourses();
  fillCourseSelect();
  await loadUploadedNotes();
  fillAnalysisSelect();
  await loadAdminItems();
  renderAdminQueue();
  setupAdminFilters();
  setupAdminActions();
  setupUploadInputs();
  setupUploadFlow();
  setupAnalysisTools();
  setupAuthForms();
  setupSearch();
  setupCourseActions();
  refreshIcons();
}

document.addEventListener("DOMContentLoaded", init);
