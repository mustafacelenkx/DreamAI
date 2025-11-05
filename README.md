# 🌙 DreamAI - Rüya Yorumu Uygulaması

Yapay zeka destekli, modern ve kullanıcı dostu rüya yorumlama uygulaması.

## ✨ Özellikler

- 🤖 **AI Destekli Yorumlama**: Pollinations AI API kullanılarak gelişmiş rüya yorumları
- 🌍 **Çok Dilli Destek**: Türkçe ve İngilizce arayüz ve yorumlama desteği
- 🎨 **Modern UI/UX**: Vue 3 ve Tailwind CSS ile oluşturulmuş güzel ve responsive tasarım
- 🚀 **Hızlı ve Güvenli**: Nuxt 3 framework'ü ile optimize edilmiş performans
- 📱 **Responsive**: Mobil, tablet ve masaüstü cihazlarda mükemmel çalışır
- 🌈 **Animasyonlar**: Akıcı geçiş efektleri ve modern animasyonlar
- 🔄 **Dinamik Dil Değiştirme**: Anında dil değiştirme özelliği

## 🛠️ Teknolojiler

- **Framework**: Nuxt 3
- **UI Library**: Vue 3
- **Styling**: Tailwind CSS
- **Icons**: Nuxt Icon
- **i18n**: Nuxt I18n (Çok dilli destek)
- **AI API**: Pollinations Text Generation API
- **Deployment**: Vercel

## 📦 Kurulum

### Gereksinimler

- Node.js 18.x veya üzeri
- npm veya yarn

### Adımlar

1. Repoyu klonlayın:
```bash
git clone https://github.com/mustafacelenkx/DreamAI.git
cd DreamAI
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda açın:
```
http://localhost:3000
```

## 🚀 Deployment

### Vercel'de Yayınlama

1. Vercel hesabınıza giriş yapın: [vercel.com](https://vercel.com)

2. "New Project" butonuna tıklayın

3. GitHub reponuzu seçin: `mustafacelenkx/DreamAI`

4. Framework olarak **Nuxt.js** otomatik algılanacaktır

5. "Deploy" butonuna tıklayın

### Alternatif: Vercel CLI ile

```bash
npm install -g vercel
vercel login
vercel
```

## 📝 Kullanım

1. Sağ üst köşeden dilinizi seçin (Türkçe/English)
2. Ana sayfada rüyanızı metin kutusuna yazın
3. "Rüyamı Yorumla" butonuna tıklayın
4. AI, rüyanızı seçili dilde analiz edip profesyonel bir yorum sunacaktır
5. Yeni bir rüya yorumlamak için "Yeni Rüya Yorumla" butonuna tıklayın

### Desteklenen Diller

- 🇹🇷 **Türkçe**: Tam destek (arayüz ve AI yorumları)
- 🇬🇧 **English**: Full support (interface and AI interpretations)

## 🎨 Özelleştirme

### Renk Şeması

`tailwind.config.js` dosyasını düzenleyerek renk paletini özelleştirebilirsiniz.

### Yeni Dil Ekleme

1. `locales/` klasörüne yeni dil dosyası ekleyin (örn. `de.ts`)
2. `nuxt.config.ts` içindeki `i18n.locales` dizisine yeni dili ekleyin
3. Dil dosyasında tüm çeviri anahtarlarını tanımlayın

### AI Prompt

`pages/index.vue` dosyasındaki `interpretDream` fonksiyonunda AI prompt'unu özelleştirebilirsiniz.

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Mustafa Çelenk - [GitHub](https://github.com/mustafacelenkx)

## 🤝 Katkıda Bulunma

1. Bu repoyu fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız veya önerileriniz için GitHub Issues kullanabilirsiniz.

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!

