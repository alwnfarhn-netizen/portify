const { Client } = require('pg');

async function setupDatabase() {
  const client = new Client({
    user: 'postgres',
    password: 'wD?g?L7#Gdq3Sfx',
    host: 'db.tcalvjujuqagrxanngzi.supabase.co',
    port: 5432,
    database: 'postgres',
  });

  try {
    await client.connect();
    console.log('Terhubung ke database!');

    // Buat tabel comments jika belum ada
    const createCommentsTable = `
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        is_approved BOOLEAN DEFAULT true
      );
    `;
    await client.query(createCommentsTable);
    console.log('Tabel comments berhasil dibuat/diverifikasi.');

    // Izinkan akses anon public (RLS setup untuk table comments)
    // Supabase default RLS (Row Level Security) perlu dibuka agar anon bisa Insert & Select
    const setupRLS = `
      ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
      
      -- Kebijakan untuk melihat komentar (Semua orang)
      DO $$ BEGIN
        CREATE POLICY "Allow public read access" ON comments FOR SELECT USING (true);
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;

      -- Kebijakan untuk mengirim komentar (Semua orang)
      DO $$ BEGIN
        CREATE POLICY "Allow public insert access" ON comments FOR INSERT WITH CHECK (true);
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;
    
    await client.query(setupRLS);
    console.log('Row Level Security (RLS) berhasil diatur.');

  } catch (err) {
    console.error('Error saat setup database:', err);
  } finally {
    await client.end();
  }
}

setupDatabase();
