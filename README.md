# Ders Notu Takas Sitesi

Backend ile calisan ders notu takas sitesi.

## Canli deploy

### Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Anilefeserce/not-web-sitesi)

Render repo icindeki `render.yaml` dosyasini okuyarak backend'i otomatik kurar ve `npm start` ile baslatir.

Deploy bittikten sonra site adresi su formatta olur:

```text
https://not-web-sitesi.onrender.com
```

Admin girisi:

```text
https://SENIN-RENDER-ADRESIN/giris.html?next=admin
```

### Railway

Railway'de:

1. New Project secin.
2. Deploy from GitHub repo secin.
3. `Anilefeserce/not-web-sitesi` reposunu baglayin.
4. Environment Variables alanina sunlari ekleyin:

```text
SESSION_SECRET=uzun-rastgele-bir-deger
ADMIN_QUICK_LOGIN_ENABLED=true
```

Railway repo icindeki `railway.json` dosyasindan `npm start` komutunu ve `/api/health` kontrolunu okur.

Deploy bittikten sonra admin girisi:

```text
https://SENIN-RAILWAY-ADRESIN/giris.html?next=admin
```

## Windows'ta tek tikla baslatma

`baslat.bat` dosyasina cift tiklayin.

Bu dosya:

- Gerekirse `npm install` calistirir.
- Backend'i `http://127.0.0.1:3000` adresinde baslatir.
- Admin giris sayfasini otomatik acar.

Admin tek tus girisi:

`http://127.0.0.1:3000/giris.html?next=admin`

## Komutla baslatma

```bash
npm install
npm start
```

Demo admin hesabi:

```text
admin@notweb.local / Admin123!
```

Demo ogrenci hesabi:

```text
ogrenci@notweb.local / User123!
```

Not: Bu proje dosya tabanli demo veri deposu kullanir. Ucretsiz hostinglerde uygulama yeniden basladiginda yuklenen demo PDF kuyrugu sifirlanabilir. Kalici veri icin Postgres gibi bir veritabani eklenmelidir.
