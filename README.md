# 🌙 DreamAI - AI-Powered Dream Interpretation App

Yapay zeka destekli, kullanıcı authentication'ı ve rüya kaydetme özelliklerine sahip modern rüya yorumlama uygulaması.

## ✨ Özellikler

- 🤖 **AI Destekli Yorumlama**: Pollinations AI API kullanılarak profesyonel rüya yorumları
- 🔐 **Kullanıcı Sistemi**: Supabase auth ile güvenli login/register
- 💾 **Rüya Kaydetme**: Yorumlanan rüyalarınızı saklayın
- 📚 **Rüya Geçmişi**: Tüm geçmiş rüyalarınızı görüntüleyin ve yönetin
- 🌍 **Çok Dilli Destek**: Türkçe ve İngilizce tam destek
- 🎨 **Modern UI/UX**: Vue 3 ve Tailwind CSS ile güzel responsive tasarım
- 🚀 **Hızlı ve Güvenli**: Nuxt 3 + Supabase ile optimize edilmiş performans
- 📱 **Fully Responsive**: Tüm cihazlarda mükemmel çalışır
- 🌈 **Smooth Animations**: Akıcı geçiş efektleri
- 🔄 **Real-time Updates**: Anlık dil değiştirme ve veri senkronizasyonu

## 🛠️ Teknolojiler

- **Framework**: Nuxt 3
- **UI Library**: Vue 3
- **Styling**: Tailwind CSS
- **Icons**: Nuxt Icon
- **i18n**: Custom Composable (Lightweight)
- **Auth & Database**: Supabase
- **AI API**: Pollinations Text Generation API
- **Deployment**: Vercel

## 📦 Kurulum

### Gereksinimler

- Node.js 18.x veya üzeri
- npm veya yarn
- Supabase hesabı

### Adımlar

1. **Repoyu klonlayın:**
```bash
git clone https://github.com/mustafacelenkx/DreamAI.git
cd DreamAI
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Environment variables oluşturun:**

Proje kök dizininde `.env` dosyası oluşturun:

```bash
SUPABASE_URL=https://vpvamvlcyzqmgspjrgwj.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
```

**ÖNEMLİ:** Gerçek Supabase anon key'inizi kullanın. Detaylı bilgi için [ENV_SETUP.md](./ENV_SETUP.md) dosyasına bakın.

4. **Supabase Database kurulumu:**

Database şemasını oluşturmak için [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) dosyasındaki adımları takip edin.

5. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

6. **Tarayıcınızda açın:**
```
http://localhost:3000
```

## 🗄️ Database Şeması

```sql
-- Dreams Table
CREATE TABLE dreams (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  dream_text TEXT NOT NULL,
  interpretation TEXT NOT NULL,
  language VARCHAR(10) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

Detaylı şema ve RLS policy'leri için [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) dosyasına bakın.

## 🚀 Deployment

### Vercel'de Yayınlama

1. **GitHub'a push edin:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Vercel'de proje oluşturun:**
   - [vercel.com](https://vercel.com) → New Project
   - GitHub reponuzu seçin: `mustafacelenkx/DreamAI`
   - Framework: Nuxt.js (otomatik algılanır)

3. **Environment Variables ekleyin:**
   - Settings → Environment Variables
   - `SUPABASE_URL` ve `SUPABASE_KEY` ekleyin

4. **Deploy edin!** 🎉

## 📝 Kullanım

### Yeni Kullanıcı

1. **Kayıt Ol**: `/register` sayfasından hesap oluşturun
2. **Giriş Yap**: Email ve şifrenizle giriş yapın
3. **Rüya Yorumlat**: Ana sayfada rüyanızı anlatın
4. **Kaydet**: Yorumu beğendiyseniz kaydedin
5. **Dashboard**: `/dashboard` sayfasından tüm rüyalarınızı görün

### Misafir Kullanıcı

- Giriş yapmadan da rüya yorumlayabilirsiniz
- Ancak rüyalarınızı kaydetmek için üye olmanız gerekir

### Desteklenen Diller

- 🇹🇷 **Türkçe**: Tam destek (arayüz ve AI yorumları)
- 🇬🇧 **English**: Full support (interface and AI interpretations)

## 🎨 Özelleştirme

### Yeni Dil Ekleme

1. `locales/` klasörüne yeni dil dosyası ekleyin (örn. `de.ts`)
2. `composables/useI18n.ts` dosyasını güncelleyin
3. Dil seçicide gösterin

### AI Prompt Özelleştirme

`pages/index.vue` dosyasındaki `interpretDream` fonksiyonunda prompt'u düzenleyin.

### Tema Değişiklikleri

`tailwind.config.js` ve `assets/css/main.css` dosyalarını düzenleyin.

## 📂 Proje Yapısı

```
DreamAI/
├── assets/
│   └── css/
│       └── main.css              # Global styles
├── composables/
│   ├── useAuth.ts                # Authentication logic
│   ├── useDreams.ts              # Dream CRUD operations
│   └── useI18n.ts                # Internationalization
├── layouts/
│   └── default.vue               # Main layout with navigation
├── locales/
│   ├── tr.ts                     # Turkish translations
│   └── en.ts                     # English translations
├── middleware/
│   ├── auth.ts                   # Auth guard
│   └── guest.ts                  # Guest guard
├── pages/
│   ├── index.vue                 # Home / Dream interpreter
│   ├── login.vue                 # Login page
│   ├── register.vue              # Register page
│   └── dashboard.vue             # User dreams dashboard
├── plugins/
│   └── supabase.client.ts        # Supabase client
├── public/
│   └── favicon.ico               # App icon
├── .env                          # Environment variables (not in git)
├── nuxt.config.ts                # Nuxt configuration
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
├── ENV_SETUP.md                  # Environment setup guide
├── SUPABASE_SETUP.md             # Database setup guide
└── README.md                     # This file
```

## 🔐 Güvenlik

- ✅ Supabase Row Level Security (RLS) aktif
- ✅ Her kullanıcı sadece kendi rüyalarını görebilir
- ✅ Environment variables GitHub'a yüklenmiyor
- ✅ Secure authentication with JWT
- ✅ HTTPS zorunlu (Vercel)

## 🐛 Sorun Giderme

### Build Hatası
```bash
rm -rf node_modules package-lock.json .nuxt
npm install
npm run build
```

### Supabase Connection Hatası
- `.env` dosyasını kontrol edin
- Supabase anon key'in doğru olduğundan emin olun
- Database şemasının oluşturulduğunu kontrol edin

### Authentication Hatası
- Supabase Dashboard → Authentication → Settings
- Email provider enabled mi kontrol edin
- Site URL'leri kontrol edin

## 📊 Performans

- Bundle Size: ~570KB (gzip)
- First Load: < 2 seconds
- Lighthouse Score: 95+
- Database: Supabase (PostgreSQL)

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Mustafa Çelenk - [GitHub](https://github.com/mustafacelenkx)

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız için GitHub Issues kullanabilirsiniz.

## 🙏 Teşekkürler

- [Nuxt 3](https://nuxt.com)
- [Supabase](https://supabase.com)
- [Pollinations AI](https://pollinations.ai)
- [Tailwind CSS](https://tailwindcss.com)

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!

## 🎯 Roadmap

- [ ] Dark mode
- [ ] PDF export
- [ ] Social sharing
- [ ] Dream statistics charts
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] More languages (DE, FR, ES)
- [ ] Dream tags and categories
