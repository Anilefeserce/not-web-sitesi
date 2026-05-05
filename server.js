const fs = require("fs");
const path = require("path");
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const app = express();
const rootDir = __dirname;
const dataDir = path.join(rootDir, "data");
const dbPath = path.join(dataDir, "db.json");
const uploadDir = path.join(rootDir, "uploads");
const port = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === "production";
const quickAdminLoginEnabled = process.env.ADMIN_QUICK_LOGIN_ENABLED !== "false";

fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(uploadDir, { recursive: true });

const seedQueue = [
  { code: "YBS 107", title: "Algoritma ve Programlamaya Giris", term: "1. Yil Guz" },
  { code: "YBS 106", title: "Nesne Tabanli Programlama I", term: "1. Yil Bahar" },
  { code: "YBS 211", title: "Nesne Tabanli Programlama II", term: "2. Yil Guz" },
  { code: "YBS 208", title: "Veri Iletisimi ve Aglar", term: "2. Yil Bahar" },
  { code: "YBS 303", title: "Veri Madenciligi", term: "3. Yil Guz" },
  { code: "YBS 312", title: "Buyuk Veri ve Is Analitigi", term: "3. Yil Bahar" },
  { code: "YBS 201", title: "Finansal Yonetim I", term: "2. Yil Guz" },
  { code: "YBS 310", title: "Elektronik Ticaret ve Elektronik Isletme", term: "3. Yil Bahar" },
];

function createSeedItems() {
  return seedQueue.map((item, index) => ({
    id: `seed-${index + 1}`,
    ...item,
    status: "pending",
    source: "Ornek PDF",
    fileName: null,
    uploadedBy: null,
    uploadedAt: new Date().toISOString(),
  }));
}

function createInitialDb() {
  return {
    users: [
      {
        id: "admin-1",
        name: "Site Admin",
        email: "admin@notweb.local",
        passwordHash: bcrypt.hashSync("Admin123!", 10),
        role: "admin",
        createdAt: new Date().toISOString(),
      },
      {
        id: "user-1",
        name: "Demo Ogrenci",
        email: "ogrenci@notweb.local",
        passwordHash: bcrypt.hashSync("User123!", 10),
        role: "user",
        createdAt: new Date().toISOString(),
      },
    ],
    adminQueue: createSeedItems(),
  };
}

function readDb() {
  if (!fs.existsSync(dbPath)) {
    const initialDb = createInitialDb();
    writeDb(initialDb);
    return initialDb;
  }

  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function writeDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: "Oturum gerekli." });
  }

  req.user = req.session.user;
  return next();
}

function requireAdmin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: "Admin oturumu gerekli." });
  }

  if (req.session.user.role !== "admin") {
    return res.status(403).json({ error: "Bu islem icin admin yetkisi gerekli." });
  }

  req.user = req.session.user;
  return next();
}

function requireAdminPage(req, res, next) {
  if (req.session.user?.role !== "admin") {
    return res.redirect("/giris.html?next=admin");
  }

  return next();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (isProduction) {
  app.set("trust proxy", 1);
}
app.use(
  session({
    name: "not_web_sid",
    secret: process.env.SESSION_SECRET || "not-web-demo-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: isProduction,
      maxAge: 1000 * 60 * 60 * 8,
    },
  }),
);

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname || ".pdf").toLowerCase() || ".pdf";
      const unique = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      done(null, `${unique}${ext}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, done) => {
    const looksLikePdf = file.mimetype === "application/pdf" || /\.pdf$/i.test(file.originalname || "");
    if (!looksLikePdf) {
      return done(new Error("Sadece PDF dosyasi yuklenebilir."));
    }
    return done(null, true);
  },
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/auth/me", (req, res) => {
  res.json({ user: publicUser(req.session.user) });
});

app.post("/api/auth/register", (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || "");

  if (!name || !email || password.length < 6) {
    return res.status(400).json({ error: "Ad, e-posta ve en az 6 karakter sifre gerekli." });
  }

  const db = readDb();
  if (db.users.some((user) => user.email === email)) {
    return res.status(409).json({ error: "Bu e-posta ile kayit zaten var." });
  }

  const user = {
    id: `user-${Date.now()}`,
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    role: "user",
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  writeDb(db);
  req.session.user = publicUser(user);
  return res.status(201).json({ user: publicUser(user) });
});

app.post("/api/auth/login", (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || "");
  const db = readDb();
  const user = db.users.find((item) => item.email === email);

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: "E-posta veya sifre hatali." });
  }

  req.session.user = publicUser(user);
  return res.json({ user: publicUser(user) });
});

app.post("/api/auth/admin-login", (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || "");
  const db = readDb();
  const user = db.users.find((item) => item.email === email);

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: "Admin e-postasi veya sifresi hatali." });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ error: "Bu hesap admin degil." });
  }

  req.session.user = publicUser(user);
  return res.json({ user: publicUser(user) });
});

app.post("/api/auth/admin-quick-login", (req, res) => {
  if (!quickAdminLoginEnabled) {
    return res.status(403).json({ error: "Tek tus admin girisi kapali." });
  }

  const db = readDb();
  const user = db.users.find((item) => item.role === "admin");

  if (!user) {
    return res.status(404).json({ error: "Admin hesabi bulunamadi." });
  }

  req.session.user = publicUser(user);
  return res.json({ user: publicUser(user) });
});

app.post("/api/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("not_web_sid");
    res.json({ ok: true });
  });
});

app.get("/api/notes", requireAuth, (req, res) => {
  const db = readDb();
  const notes = db.adminQueue
    .filter((item) => req.user.role === "admin" || item.status === "approved" || item.uploadedBy === req.user.id)
    .map(({ storedFile, ...item }) => item);

  res.json({ notes });
});

app.post("/api/uploads", requireAuth, upload.single("pdf"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "PDF dosyasi gerekli." });
  }

  const code = String(req.body.code || "").trim();
  const title = String(req.body.title || "").trim();
  const term = String(req.body.term || "").trim();

  if (!code || !title || !term) {
    return res.status(400).json({ error: "Ders bilgisi eksik." });
  }

  const db = readDb();
  const item = {
    id: `upload-${Date.now()}`,
    code,
    title,
    term,
    status: "pending",
    source: "Yeni yukleme",
    fileName: req.file.originalname,
    storedFile: req.file.filename,
    uploadedBy: req.user.id,
    uploadedAt: new Date().toISOString(),
  };

  db.adminQueue.unshift(item);
  writeDb(db);

  const { storedFile, ...publicItem } = item;
  return res.status(201).json({ item: publicItem });
});

app.get("/api/admin/queue", requireAdmin, (req, res) => {
  const db = readDb();
  const items = db.adminQueue.map(({ storedFile, ...item }) => item);
  res.json({ items });
});

app.patch("/api/admin/queue/:id", requireAdmin, (req, res) => {
  const status = String(req.body.status || "");
  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Gecersiz durum." });
  }

  const db = readDb();
  const item = db.adminQueue.find((entry) => entry.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: "PDF notu bulunamadi." });
  }

  item.status = status;
  item.reviewedBy = req.user.id;
  item.reviewedAt = new Date().toISOString();
  writeDb(db);

  const { storedFile, ...publicItem } = item;
  return res.json({ item: publicItem });
});

app.post("/api/admin/queue/reset", requireAdmin, (req, res) => {
  const db = readDb();
  db.adminQueue = createSeedItems();
  writeDb(db);
  res.json({ items: db.adminQueue });
});

app.get(["/", "/index.html"], (req, res) => {
  res.sendFile(path.join(rootDir, "index.html"));
});

["dersler.html", "yukle.html", "analiz.html", "giris.html", "styles.css", "script.js"].forEach((fileName) => {
  app.get(`/${fileName}`, (req, res) => {
    res.sendFile(path.join(rootDir, fileName));
  });
});

app.get("/admin.html", requireAdminPage, (req, res) => {
  res.sendFile(path.join(rootDir, "admin.html"));
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ error: error.message });
  }

  if (error) {
    return res.status(400).json({ error: error.message || "Islem tamamlanamadi." });
  }

  return next();
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Ders notu sitesi backend hazir: http://localhost:${port}`);
  console.log("Demo admin: admin@notweb.local / Admin123!");
  console.log("Demo ogrenci: ogrenci@notweb.local / User123!");
});
