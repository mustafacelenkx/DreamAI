# ⚡ Quick Start Guide

DreamAI uygulamasını 5 dakikada çalıştırın!

## 🚀 Hızlı Başlangıç

### 1. Kodu İndirin

```bash
git clone https://github.com/mustafacelenkx/DreamAI.git
cd DreamAI
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Environment Variables

Proje kök dizininde `.env` dosyası oluşturun:

```bash
SUPABASE_URL=https://vpvamvlcyzqmgspjrgwj.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
```

**Supabase Key Nerede?**
1. [supabase.com](https://supabase.com) → Projeniz
2. Settings → API
3. "anon public" key'i kopyalayın

### 4. Database Oluşturun

Supabase Dashboard → SQL Editor'de aşağıdaki komutu çalıştırın:

```sql
-- Dreams Table
CREATE TABLE dreams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  dream_text TEXT NOT NULL,
  interpretation TEXT NOT NULL,
  language VARCHAR(10) NOT NULL DEFAULT 'tr',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX dreams_user_id_idx ON dreams(user_id);
CREATE INDEX dreams_created_at_idx ON dreams(created_at DESC);

-- RLS
ALTER TABLE dreams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own dreams" 
  ON dreams FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own dreams" 
  ON dreams FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own dreams" 
  ON dreams FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own dreams" 
  ON dreams FOR DELETE 
  USING (auth.uid() = user_id);
```

### 5. Çalıştırın!

```bash
npm run dev
```

Tarayıcıda açın: http://localhost:3000

## ✅ İlk Kullanım

1. **Register** sayfasından hesap oluşturun
2. Ana sayfada bir rüya anlatın
3. AI yorumlasın
4. Kaydedin!
5. Dashboard'dan rüyalarınızı görün

## 🌐 Deploy (Vercel)

```bash
# 1. GitHub'a push
git add .
git commit -m "Initial commit"
git push origin main

# 2. Vercel'de
# - New Project
# - GitHub repo seçin
# - Environment Variables ekleyin:
#   SUPABASE_URL ve SUPABASE_KEY
# - Deploy!
```

## 🐛 Sorun mu var?

### "SUPABASE_KEY not found"
→ `.env` dosyasını oluşturdunuz mu? Dev server'ı restart edin.

### "Failed to fetch"
→ Supabase key'iniz doğru mu? Supabase projesi aktif mi?

### "Row Level Security"
→ SQL komutlarını tamamen çalıştırdınız mı?

## 📚 Daha Fazla Bilgi

- [README.md](./README.md) - Tam dokümantasyon
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Detaylı database kurulumu
- [ENV_SETUP.md](./ENV_SETUP.md) - Environment variables rehberi

## 🎉 Başarılar!

Artık DreamAI'yi kullanmaya hazırsınız! 🌙✨

