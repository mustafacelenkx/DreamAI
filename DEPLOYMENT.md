# 🚀 Deployment Rehberi

Bu doküman, DreamAI uygulamasını Vercel'de nasıl yayınlayacağınızı adım adım açıklar.

## Vercel'de Deployment

### Yöntem 1: GitHub Entegrasyonu (Önerilen)

1. **GitHub'a Push Edin**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/mustafacelenkx/DreamAI.git
   git push -u origin main
   ```

2. **Vercel'e Giriş Yapın**:
   - [vercel.com](https://vercel.com) adresine gidin
   - GitHub hesabınızla giriş yapın

3. **Proje Oluşturun**:
   - "New Project" butonuna tıklayın
   - "Import Git Repository" seçeneğini seçin
   - `mustafacelenkx/DreamAI` reposunu seçin

4. **Ayarları Yapılandırın**:
   - **Framework Preset**: Nuxt.js (otomatik algılanır)
   - **Root Directory**: `./` (varsayılan)
   - **Build Command**: `npm run build` (otomatik)
   - **Output Directory**: `.output/public` (otomatik)
   - **Environment Variables**: Gerekli değil

5. **Deploy Edin**:
   - "Deploy" butonuna tıklayın
   - Birkaç dakika içinde uygulamanız yayında olacak!

### Yöntem 2: Vercel CLI

1. **Vercel CLI Yükleyin**:
   ```bash
   npm install -g vercel
   ```

2. **Giriş Yapın**:
   ```bash
   vercel login
   ```

3. **Deploy Edin**:
   ```bash
   vercel
   ```

4. **Production'a Deploy**:
   ```bash
   vercel --prod
   ```

## Otomatik Deploy

GitHub'a her push yaptığınızda, Vercel otomatik olarak:
- ✅ Uygulamanızı build edecek
- ✅ Test edecek
- ✅ Preview URL oluşturacak
- ✅ Main branch'e merge edilince production'a deploy edecek

## Domain Ayarları

1. Vercel Dashboard'da projenizi açın
2. "Settings" > "Domains" bölümüne gidin
3. Custom domain ekleyebilir veya Vercel subdomain'i kullanabilirsiniz

## Performans Optimizasyonu

Vercel otomatik olarak şunları sağlar:
- ⚡ Edge Network CDN
- 🗜️ Otomatik kompresyon
- 📦 Optimal caching
- 🔒 HTTPS sertifikası
- 🌍 Global deployment
- 🌐 Çok dilli içerik desteği

## Sorun Giderme

### Build Hatası
- Yerel ortamda `npm run build` komutunu çalıştırın
- Tüm dependencies'in `package.json` dosyasında olduğundan emin olun

### Runtime Hatası
- Vercel Dashboard'da logs sekmesini kontrol edin
- Browser console'u kontrol edin

### API Hatası
- Pollinations AI API erişilebilir durumda mı kontrol edin
- Network sekmesinde API çağrılarını inceleyin

## Monitoring

Vercel Dashboard'dan şunları izleyebilirsiniz:
- 📊 Analytics
- ⚡ Performance metrics
- 🐛 Error logs
- 📈 Usage statistics

## Güncelleme

Yeni özellikleri deploy etmek için:
```bash
git add .
git commit -m "Add new feature"
git push
```

Vercel otomatik olarak yeni versiyonu deploy edecektir.

---

🎉 Tebrikler! Uygulamanız artık canlıda!

