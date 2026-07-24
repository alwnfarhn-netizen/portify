# Antigravity — Spec-Driven Development (SDD)
**Project:** Portify.id  
**Agent Name:** Antigravity  
**Version:** 1.0  
**Status:** Draft  

---

## 1. Vision

Antigravity adalah AI agent internal yang membangun, mengonfigurasi, dan men-deploy Portify.id secara end-to-end — dari kode frontend hingga infrastruktur live — dengan intervensi manusia seminimal mungkin.

**Satu kalimat:** *"Dari requirement ke website live, tanpa menyentuh dashboard hosting secara manual."*

---

## 2. Goals & Non-Goals

### Goals ✅
- Generate seluruh kode frontend (HTML, CSS, JS / React)
- Generate backend (REST API / Node.js atau Python)
- Setup database (schema, migrasi, seed data)
- Konfigurasi hosting & deploy otomatis (Vercel / Netlify / VPS)
- Setup domain + SSL otomatis
- Membaca requirement dalam bahasa natural → eksekusi teknis

### Non-Goals ❌
- Tidak menangani transaksi pembayaran (midtrans dll) di v1
- Tidak mengelola konten klien secara real-time (CMS di v2)
- Tidak menjadi chatbot publik yang diakses klien langsung

---

## 3. Arsitektur Sistem

```
┌─────────────────────────────────────────────────────┐
│                  USER (Kamu)                        │
│         "Buat halaman portofolio dengan..."         │
└────────────────────┬────────────────────────────────┘
                     │ Natural language input
                     ▼
┌─────────────────────────────────────────────────────┐
│              ANTIGRAVITY CORE                       │
│  ┌──────────────┐    ┌──────────────────────────┐  │
│  │  Planner     │───▶│  Task Queue              │  │
│  │  (Claude)    │    │  [spec→code→test→deploy] │  │
│  └──────────────┘    └──────────────────────────┘  │
└──────┬────────┬──────────────┬──────────────┬───────┘
       │        │              │              │
       ▼        ▼              ▼              ▼
  ┌─────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐
  │ Code    │ │ Database │ │ Test   │ │ Deploy   │
  │ Tool    │ │ Tool     │ │ Runner │ │ Tool     │
  └────┬────┘ └────┬─────┘ └───┬────┘ └────┬─────┘
       │           │           │           │
       ▼           ▼           ▼           ▼
  File system   Supabase   Jest/Pytest  Vercel API
  (local)       / SQLite               + Cloudflare
```

---

## 4. Agent Capabilities (Tools)

Antigravity memiliki 6 tool utama yang dipanggil sesuai kebutuhan:

### Tool 1 — `code_writer`
Menulis dan mengedit file kode.

```typescript
interface CodeWriterInput {
  action: "create" | "edit" | "delete"
  filepath: string           // contoh: "src/pages/Home.jsx"
  content?: string           // konten file baru atau pengganti
  edit_instruction?: string  // untuk action "edit"
}

interface CodeWriterOutput {
  success: boolean
  filepath: string
  lines_written: number
  error?: string
}
```

**Contoh pemanggilan:**
```json
{
  "action": "create",
  "filepath": "src/components/PricingCard.jsx",
  "content": "export default function PricingCard({ name, price, features }) { ... }"
}
```

---

### Tool 2 — `db_manager`
Membuat schema, menjalankan migrasi, dan seed data.

```typescript
interface DbManagerInput {
  action: "create_schema" | "migrate" | "seed" | "query"
  provider: "supabase" | "sqlite" | "postgres"
  sql?: string               // untuk action "query" atau "migrate"
  schema_definition?: object // untuk action "create_schema"
}

interface DbManagerOutput {
  success: boolean
  rows_affected?: number
  result?: object[]
  error?: string
}
```

**Schema default Portify.id:**
```sql
-- Tabel utama yang dibutuhkan
clients        (id, name, email, whatsapp, package, status, created_at)
portfolios     (id, client_id, slug, title, bio, skills[], live_url)
projects       (id, portfolio_id, title, description, image_url, tags[])
orders         (id, client_id, package, price, status, notes, created_at)
```

---

### Tool 3 — `test_runner`
Menjalankan unit test dan integration test.

```typescript
interface TestRunnerInput {
  scope: "unit" | "integration" | "e2e"
  target?: string   // file atau folder spesifik
  framework: "jest" | "pytest" | "playwright"
}

interface TestRunnerOutput {
  passed: number
  failed: number
  skipped: number
  coverage?: number  // persen
  failures?: { test: string; reason: string }[]
}
```

**Aturan agent:** Antigravity tidak boleh lanjut ke `deploy_tool` jika `failed > 0`.

---

### Tool 4 — `deploy_tool`
Deploy ke hosting dan konfigurasi environment.

```typescript
interface DeployToolInput {
  platform: "vercel" | "netlify" | "vps"
  project_name: string
  env_vars?: Record<string, string>
  build_command?: string      // default: "npm run build"
  output_directory?: string   // default: "dist" atau ".next"
}

interface DeployToolOutput {
  success: boolean
  live_url: string
  deploy_id: string
  build_time_seconds: number
  error?: string
}
```

---

### Tool 5 — `domain_setup`
Menghubungkan domain dan mengaktifkan SSL.

```typescript
interface DomainSetupInput {
  action: "add_domain" | "verify_dns" | "enable_ssl"
  domain: string             // contoh: "portify.id"
  provider: "cloudflare" | "niagahoster"
  deploy_id?: string         // dari deploy_tool output
}

interface DomainSetupOutput {
  success: boolean
  ssl_active: boolean
  dns_propagated: boolean
  nameservers?: string[]
  error?: string
}
```

---

### Tool 6 — `file_reader`
Membaca file yang sudah ada untuk konteks sebelum edit.

```typescript
interface FileReaderInput {
  filepath: string
  lines?: [number, number]   // opsional: hanya baca baris tertentu
}

interface FileReaderOutput {
  content: string
  total_lines: number
  filepath: string
}
```

---

## 5. Agent Workflow (State Machine)

```
IDLE
  │
  ▼ (menerima requirement)
PLANNING
  │ Planner membuat task list terurut
  ▼
CODING
  │ code_writer + file_reader digunakan di sini
  │ Loop sampai semua komponen selesai
  ▼
DB_SETUP
  │ db_manager: create_schema → migrate → seed
  ▼
TESTING
  │ test_runner: unit → integration
  │ Jika ada failure → kembali ke CODING
  ▼
DEPLOYING
  │ deploy_tool → platform target
  ▼
DOMAIN_CONFIG
  │ domain_setup: add_domain → verify_dns → enable_ssl
  ▼
DONE ✅
  │ Output: live URL + deployment report
```

---

## 6. System Prompt Antigravity

```
Kamu adalah Antigravity, AI agent engineering internal untuk Portify.id.

IDENTITAS:
- Kamu membangun website klien Portify dari requirement hingga live
- Kamu menulis kode production-quality, bukan prototype
- Kamu tidak bertanya berulang kali — kamu membuat keputusan teknis terbaik
  dan mencatat asumsi yang kamu buat

STACK DEFAULT PORTIFY.ID:
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express (atau Next.js API routes)
- Database: Supabase (PostgreSQL)
- Deploy: Vercel
- Domain/SSL: Cloudflare

ATURAN WAJIB:
1. Selalu baca file yang ada sebelum mengedit (gunakan file_reader dulu)
2. Selalu jalankan test sebelum deploy (gunakan test_runner)
3. Jangan deploy jika ada test yang gagal
4. Setiap komponen baru harus punya unit test minimal
5. Catat setiap asumsi teknis di ASSUMPTIONS.md
6. Gunakan environment variable untuk semua credential, tidak pernah hardcode

OUTPUT FORMAT setiap task selesai:
{
  "task": "nama task",
  "status": "done | failed | skipped",
  "files_changed": [],
  "next_step": "nama task berikutnya",
  "notes": "catatan penting"
}
```

---

## 7. File & Folder Structure (Target)

```
portify.id/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── PricingCard.jsx
│   │   ├── AboutSection.jsx
│   │   └── ContactSection.jsx
│   ├── pages/
│   │   ├── index.jsx          # Landing page
│   │   ├── order.jsx          # Form order klien
│   │   └── admin/
│   │       ├── dashboard.jsx  # Kelola order & klien
│   │       └── clients.jsx
│   ├── api/
│   │   ├── orders.js          # POST /api/orders
│   │   ├── clients.js         # GET/POST /api/clients
│   │   └── portfolios.js      # CRUD portofolio
│   └── lib/
│       ├── supabase.js        # DB client
│       └── utils.js
├── tests/
│   ├── unit/
│   └── integration/
├── public/
├── ASSUMPTIONS.md             # Dicatat agent otomatis
├── DEPLOY_LOG.md              # Dicatat agent setiap deploy
├── .env.example
└── package.json
```

---

## 8. API Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/orders` | Terima order baru dari form website |
| `GET` | `/api/orders` | List semua order (admin) |
| `PATCH` | `/api/orders/:id` | Update status order |
| `GET` | `/api/clients` | List semua klien |
| `POST` | `/api/clients` | Tambah klien baru |
| `GET` | `/api/portfolios/:slug` | Ambil data portofolio klien |
| `POST` | `/api/portfolios` | Buat portofolio baru |
| `PATCH` | `/api/portfolios/:id` | Update portofolio |

---

## 9. Error Handling Strategy

| Skenario | Perilaku Agent |
|---|---|
| Kode gagal compile | Baca error → fix otomatis → coba ulang max 3x |
| Test gagal | Analisis failure → fix → re-run test |
| Deploy gagal | Cek build log → rollback ke versi sebelumnya |
| DNS belum propagasi | Tunggu 60 detik → retry verify_dns max 10x |
| Tool tidak tersedia | Catat di ASSUMPTIONS.md → skip & lanjut |

---

## 10. Acceptance Criteria (Definition of Done)

Antigravity dianggap berhasil jika:

- [ ] Website live dan bisa diakses via `portify.id`
- [ ] SSL aktif (HTTPS)
- [ ] Semua halaman render tanpa error di console
- [ ] Form order berfungsi dan data masuk ke database
- [ ] Admin dashboard menampilkan data order
- [ ] Semua unit test pass (coverage ≥ 70%)
- [ ] Waktu load halaman < 3 detik (Lighthouse ≥ 85)
- [ ] Mobile responsive di semua breakpoint
- [ ] `.env.example` tersedia, tidak ada credential di kode

---

## 11. Implementation Roadmap

### Phase 1 — Foundation (Minggu 1)
- Setup repo, Vite + React + Tailwind
- Buat komponen halaman utama
- Koneksi Supabase + schema database

### Phase 2 — Core Features (Minggu 2)
- Form order + API endpoint
- Admin dashboard sederhana
- Unit & integration test

### Phase 3 — Deploy & Go Live (Minggu 3)
- Deploy ke Vercel
- Setup domain portify.id
- Konfigurasi SSL via Cloudflare
- Smoke test di production

### Phase 4 — Polish (Ongoing)
- Optimasi performa
- Tambah fitur notifikasi WA otomatis
- Halaman portofolio per klien (slug dinamis)

---

## 12. Cara Menjalankan Antigravity

```python
# Contoh inisialisasi agent (Python + Anthropic SDK)

import anthropic

tools = [
    code_writer_tool,
    db_manager_tool,
    test_runner_tool,
    deploy_tool,
    domain_setup_tool,
    file_reader_tool,
]

client = anthropic.Anthropic()

def run_antigravity(requirement: str):
    messages = [{"role": "user", "content": requirement}]
    
    while True:
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=8096,
            system=ANTIGRAVITY_SYSTEM_PROMPT,
            tools=tools,
            messages=messages,
        )
        
        # Jika agent selesai
        if response.stop_reason == "end_turn":
            print("✅ Antigravity selesai:", response.content)
            break
        
        # Jalankan tool yang dipanggil agent
        if response.stop_reason == "tool_use":
            tool_results = execute_tools(response.content)
            messages.append({"role": "assistant", "content": response.content})
            messages.append({"role": "user", "content": tool_results})

# Contoh penggunaan
run_antigravity("""
    Bangun halaman landing Portify.id lengkap dengan 
    komponen hero, paket harga, tentang kami, dan form order.
    Deploy ke Vercel dan setup domain portify.id.
""")
```

---

*SDD ini adalah dokumen hidup — diperbarui setiap kali ada perubahan arsitektur atau penambahan tool.*  
*Terakhir diperbarui: 2025*
