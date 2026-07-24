# Antigravity — Requirements-Driven Prompting (RDP)
**Project:** Portify.id  
**Agent:** Antigravity  
**Version:** 1.0  

---

## Apa itu RDP?

Requirements-Driven Prompting adalah sistem di mana **setiap prompt yang dikirim ke Antigravity diturunkan langsung dari requirement terstruktur** — bukan dari instruksi bebas. Requirement → Parser → Prompt → Agent → Output.

Ini mencegah:
- Prompt ambigu yang bikin agent salah arah
- Agent "ngarang" fitur yang tidak diminta
- Output yang tidak bisa diverifikasi

---

## 1. Struktur Requirement (RDF — Requirement Definition Format)

Setiap requirement ditulis dalam format ini sebelum dikirim ke agent:

```yaml
# requirement.yaml

id: REQ-001
title: Halaman Landing Portify.id
priority: critical          # critical | high | medium | low
phase: 1                    # sesuai roadmap SDD
type: feature               # feature | bugfix | refactor | config | deploy

context: |
  Portify.id adalah jasa pembuatan portofolio website.
  Target pengguna: freelancer, mahasiswa, profesional muda.
  Tone: modern, bersih, profesional tapi akrab.

acceptance_criteria:
  - Hero section tampil dengan headline dan CTA
  - Paket harga tampil dalam 3 kolom (Starter, Pro, Premium)
  - Halaman responsive di mobile (min-width 375px)
  - Tidak ada console error saat dibuka di browser
  - Lighthouse performance score >= 85

constraints:
  stack:
    frontend: React + Vite + Tailwind CSS
    deploy: Vercel
  must_not:
    - Hardcode warna di luar Tailwind config
    - Gunakan library UI eksternal (shadcn boleh, Bootstrap tidak)
  file_output:
    - src/pages/index.jsx
    - src/components/HeroSection.jsx
    - src/components/PricingCard.jsx

dependencies: []            # ID requirement lain yang harus selesai dulu

test_required: true
test_scope: unit            # unit | integration | e2e
```

---

## 2. Prompt Template per Tipe Requirement

### 2a. Template: `feature`

```
[REQUIREMENT ID: {id}]
[PHASE: {phase}] [PRIORITY: {priority}]

CONTEXT:
{context}

TASK:
Bangun fitur berikut untuk Portify.id:
"{title}"

ACCEPTANCE CRITERIA (semua harus terpenuhi):
{acceptance_criteria sebagai numbered list}

CONSTRAINTS:
Stack: {stack}
Larangan: {must_not}
File yang harus dihasilkan: {file_output}

DEPENDENCIES:
{dependencies atau "Tidak ada"}

INSTRUKSI EKSEKUSI:
1. Gunakan file_reader untuk baca file yang sudah ada sebelum edit
2. Gunakan code_writer untuk setiap file output
3. Tulis unit test untuk setiap komponen baru
4. Jalankan test_runner sebelum melaporkan selesai
5. Catat semua asumsi teknis yang kamu buat

OUTPUT FORMAT:
Setelah selesai, laporkan dalam format:
{
  "req_id": "{id}",
  "status": "done | failed | partial",
  "files_created": [],
  "files_modified": [],
  "test_result": { "passed": N, "failed": N },
  "assumptions": [],
  "next_req": "REQ-XXX atau null"
}
```

---

### 2b. Template: `config`

```
[REQUIREMENT ID: {id}]
[TYPE: config] [PRIORITY: {priority}]

TASK:
Konfigurasi infrastruktur berikut:
"{title}"

DETAIL KONFIGURASI:
{context}

LANGKAH YANG HARUS DILAKUKAN:
{acceptance_criteria}

CREDENTIAL SOURCE:
Ambil dari environment variable. Jangan hardcode.
Variabel yang tersedia: {env_vars_list}

TOOL YANG DIGUNAKAN:
- deploy_tool untuk deploy ke {platform}
- domain_setup untuk konfigurasi {domain}

VALIDASI:
Konfirmasi berhasil jika:
{acceptance_criteria}

OUTPUT FORMAT:
{
  "req_id": "{id}",
  "status": "done | failed",
  "live_url": "",
  "ssl_active": true/false,
  "deploy_id": "",
  "error": null
}
```

---

### 2c. Template: `bugfix`

```
[REQUIREMENT ID: {id}]
[TYPE: bugfix] [PRIORITY: {priority}]

BUG DESCRIPTION:
{context}

REPRODUCTION STEPS:
{acceptance_criteria bisa diisi langkah reproduksi}

ROOT CAUSE HYPOTHESIS:
{isi jika sudah diketahui, atau tulis "Belum diketahui"}

INSTRUKSI:
1. Gunakan file_reader untuk baca file terkait
2. Identifikasi root cause
3. Fix dengan perubahan seminimal mungkin
4. Jalankan test_runner untuk pastikan fix tidak break hal lain
5. Laporkan root cause yang ditemukan

OUTPUT FORMAT:
{
  "req_id": "{id}",
  "status": "fixed | cannot_reproduce | escalate",
  "root_cause": "",
  "files_modified": [],
  "test_result": { "passed": N, "failed": N }
}
```

---

## 3. Requirement Registry — Portify.id

Ini semua requirement Portify.id yang sudah didefinisikan, urut berdasarkan dependency:

```
REQ-001  [critical]  Setup repo & struktur folder
REQ-002  [critical]  Konfigurasi Tailwind + design tokens
REQ-003  [critical]  Komponen Navbar
REQ-004  [critical]  HeroSection
REQ-005  [critical]  PricingCard (3 paket)
REQ-006  [high]      AboutSection
REQ-007  [high]      ContactSection (WA, IG, Email)
REQ-008  [critical]  Halaman index.jsx (rakit semua komponen)
       ↓
REQ-009  [critical]  Setup Supabase + schema DB
REQ-010  [critical]  API endpoint POST /api/orders
REQ-011  [high]      Halaman form order (/order)
REQ-012  [high]      API endpoint GET /api/clients (admin)
REQ-013  [medium]    Admin dashboard halaman utama
       ↓
REQ-014  [critical]  Unit test semua komponen
REQ-015  [critical]  Integration test API endpoints
       ↓
REQ-016  [critical]  Deploy ke Vercel
REQ-017  [critical]  Setup domain portify.id
REQ-018  [critical]  Aktifkan SSL via Cloudflare
       ↓
REQ-019  [high]      Smoke test di production
REQ-020  [medium]    Optimasi Lighthouse score
```

---

## 4. Prompt yang Sudah Dirender (Siap Pakai)

### REQ-001 — Setup Repo & Struktur Folder

```
[REQUIREMENT ID: REQ-001]
[PHASE: 1] [PRIORITY: critical] [TYPE: config]

CONTEXT:
Portify.id adalah project website jasa portofolio berbasis React + Vite.
Ini adalah langkah pertama sebelum semua development dimulai.

TASK:
Setup repository dan struktur folder lengkap untuk Portify.id.

ACCEPTANCE CRITERIA:
1. Folder src/ terbentuk dengan subfolder: components/, pages/, api/, lib/
2. File package.json ada dengan dependencies: react, vite, tailwindcss
3. File .env.example ada dengan semua variabel yang dibutuhkan
4. File ASSUMPTIONS.md dan DEPLOY_LOG.md dibuat kosong
5. Tailwind CSS terkonfigurasi di tailwind.config.js
6. Vite terkonfigurasi di vite.config.js

CONSTRAINTS:
- Gunakan Vite (bukan CRA)
- Tailwind v3
- Node.js 18+
- Tidak ada dependency yang tidak perlu

FILE OUTPUT:
package.json, vite.config.js, tailwind.config.js,
postcss.config.js, index.html, .env.example,
ASSUMPTIONS.md, DEPLOY_LOG.md,
src/main.jsx, src/App.jsx, src/index.css

INSTRUKSI EKSEKUSI:
1. Buat semua file dengan code_writer
2. Pastikan import di main.jsx benar
3. Tidak perlu test untuk REQ ini
4. Catat versi semua dependency di ASSUMPTIONS.md

OUTPUT FORMAT:
{
  "req_id": "REQ-001",
  "status": "done | failed",
  "files_created": [],
  "assumptions": [],
  "next_req": "REQ-002"
}
```

---

### REQ-004 — HeroSection Component

```
[REQUIREMENT ID: REQ-004]
[PHASE: 1] [PRIORITY: critical] [TYPE: feature]
[DEPENDS ON: REQ-001, REQ-002, REQ-003]

CONTEXT:
HeroSection adalah bagian pertama yang dilihat calon klien Portify.id.
Tone: percaya diri, modern, friendly. Bukan korporat.
Target audience: freelancer dan profesional muda Indonesia.

TASK:
Bangun komponen HeroSection untuk landing page Portify.id.

ACCEPTANCE CRITERIA:
1. Headline utama: "Tampil profesional di dunia digital"
2. Subheadline: 1-2 kalimat yang menjelaskan value proposition Portify
3. Dua CTA button: "Lihat paket harga" (primary) dan "Hubungi kami" (ghost)
4. Visual kanan: mockup card website klien contoh (bisa SVG atau div styled)
5. Badge floating: "Selesai dalam 3-5 hari kerja"
6. Fully responsive: di mobile, visual pindah ke bawah teks
7. Tidak ada gambar eksternal — semua aset inline atau SVG

CONSTRAINTS:
- Gunakan Tailwind utility classes saja
- Komponen harus menerima props: { headline, subheadline, ctaPrimary, ctaSecondary }
  dengan default values yang masuk akal
- Export sebagai default export

FILE OUTPUT:
- src/components/HeroSection.jsx
- src/components/HeroSection.test.jsx

INSTRUKSI EKSEKUSI:
1. Baca src/App.jsx dulu dengan file_reader
2. Tulis komponen dengan code_writer
3. Tulis minimal 3 unit test:
   - Renders without crashing
   - Headline tampil sesuai prop
   - CTA buttons ada dan punya href yang benar
4. Jalankan test_runner (framework: jest)

OUTPUT FORMAT:
{
  "req_id": "REQ-004",
  "status": "done | failed | partial",
  "files_created": ["src/components/HeroSection.jsx", "src/components/HeroSection.test.jsx"],
  "files_modified": [],
  "test_result": { "passed": N, "failed": N },
  "assumptions": [],
  "next_req": "REQ-005"
}
```

---

### REQ-009 — Setup Supabase & Schema Database

```
[REQUIREMENT ID: REQ-009]
[PHASE: 2] [PRIORITY: critical] [TYPE: config]
[DEPENDS ON: REQ-001]

CONTEXT:
Portify.id butuh database untuk menyimpan data klien dan order masuk.
Menggunakan Supabase (PostgreSQL hosted).

TASK:
Setup koneksi Supabase dan buat schema database lengkap.

ACCEPTANCE CRITERIA:
1. File src/lib/supabase.js terbuat dengan Supabase client
2. Tabel clients terbuat dengan kolom: id, name, email, whatsapp, package, status, created_at
3. Tabel orders terbuat dengan kolom: id, client_id, package, price, status, notes, created_at
4. Tabel portfolios terbuat dengan kolom: id, client_id, slug, title, bio, skills, live_url
5. Tabel projects terbuat dengan kolom: id, portfolio_id, title, description, image_url, tags
6. Row Level Security (RLS) diaktifkan di semua tabel
7. Seed data: 1 klien contoh + 1 order contoh untuk testing

CONSTRAINTS:
- SUPABASE_URL dan SUPABASE_ANON_KEY harus diambil dari env variable
- Jangan expose service_role key di frontend
- Gunakan UUID untuk semua primary key

ENV VARIABLES YANG DIBUTUHKAN:
SUPABASE_URL=
SUPABASE_ANON_KEY=

FILE OUTPUT:
- src/lib/supabase.js
- src/lib/supabase.js akan di-import oleh semua API route

INSTRUKSI EKSEKUSI:
1. Gunakan code_writer untuk buat src/lib/supabase.js
2. Gunakan db_manager (provider: supabase) untuk:
   a. create_schema → 4 tabel di atas
   b. migrate → aktifkan RLS
   c. seed → data contoh
3. Verifikasi dengan db_manager query: SELECT count(*) FROM clients

OUTPUT FORMAT:
{
  "req_id": "REQ-009",
  "status": "done | failed",
  "tables_created": ["clients", "orders", "portfolios", "projects"],
  "seed_inserted": true,
  "files_created": ["src/lib/supabase.js"],
  "assumptions": [],
  "next_req": "REQ-010"
}
```

---

### REQ-016 — Deploy ke Vercel

```
[REQUIREMENT ID: REQ-016]
[PHASE: 3] [PRIORITY: critical] [TYPE: deploy]
[DEPENDS ON: REQ-014, REQ-015]
[GATE: Semua test harus pass sebelum requirement ini dijalankan]

CONTEXT:
Portify.id siap di-deploy setelah semua test hijau.
Target platform: Vercel (free tier cukup untuk v1).

TASK:
Deploy Portify.id ke Vercel dan dapatkan preview URL.

ACCEPTANCE CRITERIA:
1. Build berhasil tanpa error (npm run build)
2. Deploy ke Vercel berhasil dan menghasilkan live URL
3. Semua env variable tersedia di Vercel dashboard
4. Halaman index dapat diakses via URL yang diberikan Vercel
5. Tidak ada error 500 di semua endpoint API

ENV VARIABLES YANG HARUS DI-SET DI VERCEL:
SUPABASE_URL, SUPABASE_ANON_KEY

INSTRUKSI EKSEKUSI:
1. Jalankan test_runner terlebih dahulu — STOP jika ada failed
2. Gunakan deploy_tool:
   - platform: vercel
   - project_name: portify-id
   - build_command: npm run build
   - output_directory: dist
3. Set env_vars dari .env.example
4. Catat deploy_id dan live_url di DEPLOY_LOG.md
5. Lakukan smoke test: GET live_url → harus return 200

OUTPUT FORMAT:
{
  "req_id": "REQ-016",
  "status": "done | failed | rollback",
  "live_url": "",
  "deploy_id": "",
  "build_time_seconds": 0,
  "test_before_deploy": { "passed": N, "failed": 0 },
  "next_req": "REQ-017"
}
```

---

## 5. Cara Menjalankan RDP secara Programatik

```python
import yaml
from anthropic import Anthropic

client = Anthropic()

def load_requirement(req_id: str) -> dict:
    """Load requirement dari registry."""
    with open(f"requirements/{req_id}.yaml") as f:
        return yaml.safe_load(f)

def render_prompt(req: dict) -> str:
    """Render requirement menjadi prompt siap pakai."""
    template = TEMPLATES[req["type"]]  # pilih template sesuai type
    return template.format(**req)

def run_requirement(req_id: str):
    """Jalankan satu requirement dengan Antigravity."""
    req = load_requirement(req_id)
    
    # Cek dependency selesai dulu
    for dep in req.get("dependencies", []):
        assert is_done(dep), f"Dependency {dep} belum selesai"
    
    prompt = render_prompt(req)
    
    messages = [{"role": "user", "content": prompt}]
    
    # Agentic loop
    while True:
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=8096,
            system=ANTIGRAVITY_SYSTEM_PROMPT,
            tools=ALL_TOOLS,
            messages=messages,
        )
        
        if response.stop_reason == "end_turn":
            result = parse_output(response.content[-1].text)
            log_result(req_id, result)
            
            # Auto-chain ke requirement berikutnya
            if result.get("next_req"):
                run_requirement(result["next_req"])
            break
        
        if response.stop_reason == "tool_use":
            tool_results = execute_tools(response.content)
            messages += [
                {"role": "assistant", "content": response.content},
                {"role": "user", "content": tool_results},
            ]

# Jalankan dari awal
run_requirement("REQ-001")
```

---

## 6. Aturan Chaining (Auto-next)

```
REQ-001 → REQ-002 → REQ-003 → REQ-004 → REQ-005
                                         ↓
REQ-008 ← REQ-007 ← REQ-006 ← ──────────┘
   ↓
REQ-009 → REQ-010 → REQ-011
                  → REQ-012 → REQ-013
                        ↓
               REQ-014 → REQ-015
                              ↓
                    REQ-016 → REQ-017 → REQ-018
                                             ↓
                                   REQ-019 → REQ-020
```

Setiap requirement melaporkan `next_req` di outputnya.  
Agent tidak boleh skip requirement yang ada di dependency chain.

---

## 7. Validasi Prompt Sebelum Dikirim (Pre-flight Check)

Sebelum prompt dikirim ke agent, sistem wajib verifikasi:

```python
def preflight_check(req: dict) -> bool:
    checks = [
        bool(req.get("id")),                          # ID ada
        bool(req.get("acceptance_criteria")),         # Kriteria ada
        bool(req.get("file_output")),                 # Output jelas
        all(is_done(d) for d in req["dependencies"]), # Dep selesai
        req["priority"] in ["critical","high","medium","low"],
        req["type"] in ["feature","bugfix","config","deploy","refactor"],
    ]
    return all(checks)
```

Jika preflight gagal → requirement dikembalikan ke penulis untuk diperbaiki, tidak dikirim ke agent.

---

*Requirements-Driven Prompting memastikan Antigravity selalu tahu persis apa yang harus dikerjakan, bagaimana mengukur keberhasilan, dan apa yang tidak boleh dilakukan.*
