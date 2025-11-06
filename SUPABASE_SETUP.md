# 🗄️ Supabase Setup Guide

Bu doküman DreamAI uygulaması için Supabase veritabanı kurulumunu açıklar.

## 📋 Gereksinimler

- Supabase hesabı ([supabase.com](https://supabase.com))
- Proje oluşturulmuş olmalı

## 🔧 Kurulum Adımları

### 1. Environment Variables

Proje kök dizininde `.env` dosyası oluşturun:

```bash
SUPABASE_URL=https://vpvamvlcyzqmgspjrgwj.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
```

**ÖNEMLİ:** `.env` dosyası `.gitignore`'da olduğu için GitHub'a yüklenmeyecektir.

### 2. Supabase Dashboard'a Girin

1. [supabase.com](https://supabase.com) adresine gidin
2. Projenizi seçin: `vpvamvlcyzqmgspjrgwj`
3. SQL Editor'e gidin

### 3. Database Şeması Oluşturun

Aşağıdaki SQL komutlarını SQL Editor'de çalıştırın:

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

-- Indexes for better performance
CREATE INDEX dreams_user_id_idx ON dreams(user_id);
CREATE INDEX dreams_created_at_idx ON dreams(created_at DESC);
CREATE INDEX dreams_language_idx ON dreams(language);

-- Row Level Security (RLS) Policies
ALTER TABLE dreams ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own dreams
CREATE POLICY "Users can view own dreams" 
  ON dreams FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own dreams
CREATE POLICY "Users can insert own dreams" 
  ON dreams FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own dreams
CREATE POLICY "Users can update own dreams" 
  ON dreams FOR UPDATE 
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own dreams
CREATE POLICY "Users can delete own dreams" 
  ON dreams FOR DELETE 
  USING (auth.uid() = user_id);

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for automatic updated_at
CREATE TRIGGER update_dreams_updated_at
  BEFORE UPDATE ON dreams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 4. Authentication Ayarları

1. Supabase Dashboard → Authentication → Settings
2. **Email Auth** etkinleştirin
3. **Auto Confirm Users**: Development için açabilirsiniz (Production'da kapalı olmalı)
4. **Site URL**: Development: `http://localhost:3000`, Production: Vercel URL'nizi ekleyin

### 5. Vercel Environment Variables

Vercel'de deploy ederken:

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Aşağıdaki değişkenleri ekleyin:
   - `SUPABASE_URL`: https://vpvamvlcyzqmgspjrgwj.supabase.co
   - `SUPABASE_KEY`: Supabase anon key

## 📊 Database Şeması

### Dreams Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| user_id | UUID | Foreign key to auth.users |
| dream_text | TEXT | Kullanıcının anlattığı rüya |
| interpretation | TEXT | AI tarafından üretilen yorum |
| language | VARCHAR(10) | Rüyanın dili (tr/en) |
| created_at | TIMESTAMP | Oluşturulma zamanı |
| updated_at | TIMESTAMP | Güncellenme zamanı |

## 🔐 Güvenlik

- **Row Level Security (RLS)**: Aktif
- Her kullanıcı sadece kendi rüyalarını görebilir/düzenleyebilir/silebilir
- Cascade delete: Kullanıcı silindiğinde rüyaları da silinir

## ✅ Test

Kurulumu test etmek için:

1. Uygulamayı başlatın: `npm run dev`
2. Register olun
3. Bir rüya yorumlayın ve kaydedin
4. Dashboard'da rüyalarınızı görün

## 🐛 Sorun Giderme

### "Failed to fetch" hatası
- `.env` dosyasında SUPABASE_URL ve SUPABASE_KEY doğru mu kontrol edin
- Supabase projesinin aktif olduğundan emin olun

### "Row Level Security" hatası
- SQL Editor'de RLS policy'leri kontrol edin
- Policy'lerin doğru şekilde oluşturulduğundan emin olun

### Authentication hatası
- Supabase Dashboard → Authentication → Settings
- Email provider'ın enabled olduğundan emin olun
- Site URL'lerin doğru olduğunu kontrol edin

## 📞 Destek

Sorun yaşarsanız:
- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Issues](https://github.com/mustafacelenkx/DreamAI/issues)

