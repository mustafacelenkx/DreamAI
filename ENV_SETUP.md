# 🔐 Environment Variables Setup

## Local Development

Proje kök dizininde `.env` dosyası oluşturun:

```bash
SUPABASE_URL=https://vpvamvlcyzqmgspjrgwj.supabase.co
SUPABASE_KEY=your_actual_supabase_anon_key_here
```

### Supabase Anon Key Nasıl Bulunur?

1. [supabase.com](https://supabase.com) adresine gidin
2. Projenizi seçin
3. Settings → API
4. "Project API keys" bölümünde `anon` `public` key'i kopyalayın
5. `.env` dosyasına yapıştırın

## Vercel Deployment

### Environment Variables Ekleme

1. Vercel Dashboard'a gidin
2. Projenizi seçin
3. Settings → Environment Variables
4. Aşağıdaki değişkenleri ekleyin:

```
SUPABASE_URL=https://vpvamvlcyzqmgspjrgwj.supabase.co
SUPABASE_KEY=your_actual_supabase_anon_key_here
```

### Önemli Notlar

- **Environment**: Production, Preview, Development için aynı değerleri kullanabilirsiniz
- **Sensitive**: SUPABASE_KEY hassas bir bilgidir, kimseyle paylaşmayın
- **Git**: `.env` dosyası `.gitignore`'da olduğu için GitHub'a yüklenmez

## Security Checklist

✅ `.env` dosyası `.gitignore`'da  
✅ Supabase Row Level Security (RLS) aktif  
✅ Anon key public olabilir (RLS ile korunuyor)  
✅ Service role key asla client-side kullanılmamalı  
✅ Vercel environment variables production'da set edilmeli  

## Example `.env` File

```bash
# Supabase Configuration
SUPABASE_URL=https://vpvamvlcyzqmgspjrgwj.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwdmFtdmxjeXpxbWdzcGpyZ3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5NDE5MjEsImV4cCI6MjAwNDUxNzkyMX0.EXAMPLE_KEY_REPLACE_WITH_ACTUAL_KEY

# Optional: Add other environment variables here
# NODE_ENV=development
```

## Troubleshooting

### "SUPABASE_KEY is not defined" Hatası

1. `.env` dosyasının proje kök dizininde olduğundan emin olun
2. Dosya adının tam olarak `.env` olduğundan emin olun (`.env.local` değil)
3. Dev server'ı yeniden başlatın: `npm run dev`

### Vercel'de "Environment variable not found" Hatası

1. Vercel Dashboard → Project Settings → Environment Variables
2. Tüm değişkenlerin eklendiğini kontrol edin
3. Değişkenleri ekledikten sonra yeniden deploy edin

## Next Steps

1. `.env` dosyasını oluşturun
2. Supabase key'lerinizi ekleyin  
3. `npm run dev` ile test edin
4. Vercel'de environment variables'ı set edin
5. Deploy edin! 🚀

