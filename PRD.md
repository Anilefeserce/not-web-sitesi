# PRD - Ders Notu Takas Sitesi

## 1. Proje Bilgileri

- Proje adı: Ders Notu Takas Sitesi
- Hazırlayan: Anıl Efe Serçe
- Belge türü: Product Requirements Document (PRD)
- Durum: Statik prototip uygulandı

## 2. Görselden Gelen İlk Notlar

- Üst bölümde kırmızı arka planlı, iki parçaya ayrılmış bir başlık alanı var.
- Sol tarafta kişi/isim bilgisi yer alıyor: Anıl Efe Serçe.
- Sağ tarafta proje adı yer alıyor: Ders Notu Takas Sitesi.
- Tasarım şu an basit bir başlık şeridi gibi görünüyor.
- Sol tarafta yer alan yapım takibi kutucukları son düzenlemede kaldırılmıştır.
- Arayüz artık doğrudan ders notu takas sitesi bölümlerine odaklanacak şekilde düzenlenecektir.

## 3. Ürün Fikri

Ders Notu Takas Sitesi, üniversite öğrencilerinin ders notu takası yapabileceği bir web sitesi fikrini görsel olarak sunan statik bir tasarım/prototip olacaktır.

Bu projede gerçek veri tabanı, gerçek kullanıcı kaydı veya gerçek dosya yükleme sistemi olmayacaktır. Sayfalar ve bölümler HTML, CSS ve JavaScript kullanılarak tasarımsal olarak hazırlanacaktır.

Sitede notlar PDF olarak yükleniyormuş gibi gösterilecektir. PDF yükleme, kontrol süreci, admin onayı ve yayına alınma adımları gerçek backend olmadan arayüz üzerinde maket/prototip olarak temsil edilecektir.

## 4. Hedef

Bu PRD dosyasında sitenin amacı, sayfa yapısı, görsel düzeni ve tasarım gereksinimleri aşama aşama belirlenecektir.

Projenin temel hedefi çalışan bir veri tabanlı sistem kurmak değil, ders notu takas sitesi fikrini başarılı ve anlaşılır bir web tasarımı olarak sunmaktır.

## 5. Cevaplanan Kararlar

- Hedef kitle: Üniversite öğrencileri
- Not formatı: PDF
- Veri tabanı: Kullanılmayacak
- Backend: Kullanılmayacak
- Proje türü: Tasarımsal web sunumu/prototip
- Teknolojiler: HTML, CSS ve JavaScript
- Not yükleme: Gerçek yükleme değil, tasarımsal PDF yükleme maketi
- Kontrol süreci: PDF yüklendikten sonra kontrol ediliyormuş gibi gösterilecek
- Admin onayı: Notlar admin onayına geliyormuş gibi tasarlanacak
- Demo veri akışı: PDF yükleme, admin kuyruğu ve özet/soru bölümü tarayıcı içinde geçici demo veriyle birbirine bağlı görünecek
- Yapay zeka: Gelecek aşamalar için destek fikri olarak belirtilebilir, fakat doğrudan çalışan yapay zeka entegrasyonu yapılmayacak
- Renkler: Kırmızı, beyaz ve siyah ana renkler; yeşil tamamlandı/onaylandı durumları için yardımcı renk olarak kullanılabilir
- Tasarım tarzı: Sade, minimalist, yaratıcı ve kontrollü animasyonlarla canlı hissettiren bir arayüz
- Öncelik: Backend olmayacağı için tasarım kısmı özellikle güçlü ve detaylı hazırlanacak
- Ana sayfada gösterilecek örnek ders notu kartı sayısı: 5
- Admin bölümünde gösterilecek onay bekleyen PDF sayısı: 8
- Ders/not kartlarında gösterilecek bilgiler: Ders kodu, ders adı ve dönem bilgisi
- Yüklenen ders notları için ayrı bir özet ve soru hazırlama bölümü olacak
- Özet çıkarma ve soru hazırlama gerçek yapay zeka entegrasyonu olmadan JavaScript ile tasarımsal olarak gösterilecek
- Arayüz yoğunluğunu azaltmak için tek sayfa yerine çok sayfalı/link yönetimli yapı kullanılacak
- Kategorilere ayrı Ders Listesi sayfasından erişilecek

## 6. Tasarım Önceliği

Bu projede tasarım kısmı çok önemlidir. Site, veri tabanına bağlı gerçek bir sistem gibi çalışmak zorunda değildir; asıl amaç düzenli, anlaşılır ve görsel olarak dikkat çeken bir web arayüzü hazırlamaktır.

Tasarım hazırlanırken şu noktalar öncelikli olacaktır:

- Sayfanın ilk bakışta ne işe yaradığının anlaşılması
- Başlık alanının güçlü ve belirgin görünmesi
- İçerik alanının sol takip paneli olmadan daha ferah ve doğrudan kullanılabilir görünmesi
- Renklerin birbiriyle uyumlu olması
- Yazıların okunabilir olması
- Sayfa düzeninin karışık görünmemesi
- Öğrenci odaklı, sade ama dikkat çekici bir görünüm oluşturulması
- Sunum/prototip olduğu halde gerçek bir site hissi vermesi
- Backend olmadığı için arayüzdeki görsel kalite, hareketlilik ve kullanıcı akışları güçlü tutulması
- Buton, kart, sekme, filtre ve durum etiketlerinin aktif/interaktif hissettirmesi

## 7. Görsel Tasarım Notları

- Ana renk olarak kırmızı kullanılacak.
- Beyaz arka plan ve siyah yazılarla güçlü kontrast sağlanacak.
- Yeşil renk tamamlandı, onaylandı veya başarılı durumlarını göstermek için kullanılabilir.
- Bölümler arasında kırmızı, siyah veya yeşil vurgularla net ayrım yapılabilir.
- Yapım takibi kutucukları kaldırıldığı için ana alan site bölümlerine ve kullanıcı akışlarına ayrılacaktır.
- Sayfa genelinde basit, temiz ve öğrencilerin kolay kullanabileceği bir görünüm hedeflenecek.
- Tasarımda gereksiz kalabalıktan kaçınılacak; boşluk, tipografi ve ince çizgiler daha fazla kullanılacak.
- Hover, aktif seçim, sahte yükleme durumu, onay rozeti, filtre seçimi ve sayfa/kart girişleri küçük animasyonlarla desteklenebilir.
- Sayfa düzeni bozulmadan görsel baskıyı azaltmak için kalın siyah çizgiler, sert gölgeler ve yoğun kırmızı yüzeyler yumuşatılacaktır.
- Kırmızı renk ana kimlik rengi olarak korunacak, fakat daha çok vurgu ve durum göstergesi olarak kullanılacaktır.
- Sayfada her şey aynı anda gösterilmeyecek; ana sayfa diğer bölümlere yönlendiren sakin bir merkez ekran gibi çalışacaktır.

## 8. İlk Tasarım Bileşenleri

- Üst başlık alanı
- Proje adı alanı
- Ana içerik alanı
- Ders listesi alanı
- 5 adet örnek ders notu kartı
- Not yükleme alanı maketi
- Ders veya kategori filtreleme alanı
- Kullanıcı giriş/kayıt alanı maketi
- PDF kontrol süreci alanı
- Özet çıkarma ve soru hazırlama alanı
- Ayrı admin onay bölümü maketi
- Yapay zeka destekli kontrol/öneri alanı etiketi
- İnteraktif durum kartları
- Sayfa/link yönetimi

## 9. Teknik Kapsam

- Proje HTML, CSS ve JavaScript ile hazırlanabilir.
- Veri tabanı kullanılmayacak.
- Backend veya sunucu taraflı kayıt sistemi olmayacak.
- Kullanıcı kayıt/giriş alanları varsa sadece tasarımsal maket olarak bulunacak.
- Not yükleme alanı varsa gerçek dosya kaydetmeyecek; sadece arayüz görünümü olarak tasarlanacak.
- JavaScript, küçük etkileşimler için kullanılabilir.
- Yapım takibi kutucukları kaldırıldığı için JavaScript bu bölüm için kullanılmayacaktır.
- PDF yükleme, kontrol ve admin onayı gerçek işlem olarak değil, ekranda durum değişimi olarak gösterilecek.
- Yapay zeka desteği gerçek entegrasyon olarak kullanılmayacak; sadece arayüzde gelecek özellik veya destek fikri olarak belirtilecek.
- Özet çıkarma ve soru hazırlama gerçek işlem olarak değil, seçilen derse göre örnek çıktı üreten arayüz simülasyonu olarak çalışacak.
- Proje bir web tasarım sunumu/prototipi olarak değerlendirilecek.

## 10. Örnek Kullanıcı Akışı

1. Üniversite öğrencisi siteye girer.
2. Ders veya kategori seçer.
3. Ana sayfadaki 5 örnek ders notu kartını inceler.
4. PDF not yükleme alanına gelir.
5. PDF seçilmiş gibi bir yükleme durumu görür.
6. Sistem kontrol ediliyor durumunu gösterir.
7. Not admin onayı bekliyor durumuna geçer.
8. Onaylandı durumunda yeşil tik veya başarı etiketi görünür.
9. Öğrenci yüklenen notlardan birini özet ve soru hazırlama bölümünde seçer.
10. Öğrenci özet çıkar veya soru hazırla butonunu kullanır.
11. Arayüz seçilen derse göre örnek özet veya örnek sorular gösterir.

Bu akış gerçek veri tabanına bağlı olmayacak; sadece tasarım ve JavaScript etkileşimiyle sunulacaktır.

## 11. Ders Notu Kartları

Ana sayfada 5 adet örnek ders notu kartı gösterilecektir. Kartlar sade tutulacak ve yalnızca gerekli ders bilgilerini içerecektir.

Her ders notu kartında bulunacak bilgiler:

- Ders kodu
- Ders adı
- Dönem bilgisi

Kartlarda gereksiz ek bilgiler kullanılmayacaktır. Böylece tasarım daha temiz, okunabilir ve hızlı anlaşılır olacaktır.

Ana sayfada gösterilecek örnek ders notu kartları:

- YBS 205 - Web Tabanlı Uygulama Geliştirme - 2. Yıl Güz
- YBS 304 - Web Tasarım Teknikleri - 3. Yıl Bahar
- YBS 108 - Veri Tabanına Giriş - 1. Yıl Bahar
- YBS 301 - Sistem Analizi ve Tasarımı - 3. Yıl Güz
- İKT 101 - Mikro İktisat - 1. Yıl Güz

## 12. Yapım Takibi Durumu

İlk tasarımda sol tarafta yapım aşamalarını gösteren kutucuklar planlanmıştır. Son düzenlemede bu bölüm arayüzden kaldırılmıştır.

Bu kararın amacı:

- Sayfanın daha sade görünmesi
- Kullanıcının doğrudan ders notu takas bölümlerine odaklanması
- Ana içerik alanının daha geniş ve ferah kullanılması
- Prototipin gerçek bir site hissine daha yakın görünmesi

## 13. Ders Listesi

Ders listesi sitede ayrı bir bölüm olarak yer alacaktır. Bu bölümde dersler yıl ve dönem bilgisine göre kategorize edilecektir.

### 1. Yıl Güz

- İKT 101 - Mikro İktisat
- TRD 109 - Türk Dili I
- YBS 103 - İşletme Yönetimi
- YBS 105 - Bilişim Sistemleri ve Teknolojilerine Giriş
- YBS 107 - Algoritma ve Programlamaya Giriş
- YBS 109 - İşletme Matematiği I
- YBS 111 - Muhasebe I
- YDİ 107 - İngilizce I

### 1. Yıl Bahar

- İKT 102 - Makro İktisat
- TRD 110 - Türk Dili II
- YBS 104 - Yönetim ve Organizasyon
- YBS 106 - Nesne Tabanlı Programlama I
- YBS 108 - Veri Tabanına Giriş
- YBS 110 - İşletme Matematiği II
- YBS 112 - Muhasebe II
- YDİ 108 - İngilizce II

### 2. Yıl Güz

- AİT 209 - Atatürk İlkeleri ve İnkılap Tarihi I
- YBS 201 - Finansal Yönetim I
- YBS 203 - İstatistik
- YBS 205 - Web Tabanlı Uygulama Geliştirme
- YBS 207 - Bilgisayar Donanımı ve Sistem Yazılımı
- YBS 209 - Pazarlama İlkeleri
- YBS 211 - Nesne Tabanlı Programlama II

### 2. Yıl Bahar

- AİT 210 - Atatürk İlkeleri ve İnkılap Tarihi II
- YBS 202 - Finansal Yönetim II
- YBS 204 - Araştırma Yöntemleri
- YBS 206 - Yönetimsel İletişim
- YBS 208 - Veri İletişimi ve Ağlar
- YBS 210 - Bilişim İngilizcesi
- YBS 212 - Üretim Yönetimi

### 3. Yıl Güz

- YBS 301 - Sistem Analizi ve Tasarımı
- YBS 303 - Veri Madenciliği
- YBS 305 - Veritabanı Sistemleri
- YBS 307 - Bilişim Hukuku
- YBS 309 - Yöneylem Araştırması
- YBS 311 - Proje Yönetimi
- YBS 313 - Mesleki Uygulama I

### 3. Yıl Bahar

- YBS 302 - Kurumsal Bilgi Sistemleri
- YBS 304 - Web Tasarım Teknikleri
- YBS 306 - İş Uygulamaları Geliştirme
- YBS 308 - Karar Vermede Sayısal Analiz
- YBS 310 - Elektronik Ticaret ve Elektronik İşletme
- YBS 312 - Büyük Veri ve İş Analitiği

## 14. Ders Kategorileri

Ders listesi kullanıcı tarafından gönderildikten sonra dersler kategorilere ayrılacaktır.

Olası kategori mantıkları:

- Bölüme göre kategoriler
- Ders türüne göre kategoriler
- Sınıf seviyesine göre kategoriler
- Ortak zorunlu dersler
- Seçmeli dersler

Bu proje için ilk kategori yapısı yıl ve dönem bazlı olacaktır. Ders listesi bölümünde 1. Yıl Güz, 1. Yıl Bahar, 2. Yıl Güz, 2. Yıl Bahar, 3. Yıl Güz ve 3. Yıl Bahar başlıkları kullanılacaktır.

## 15. Admin Bölümü

Admin bölümü ders listesinden ayrı bir bölüm olarak tasarlanacaktır. Bu bölüm gerçek veri tabanına bağlı olmayacak; PDF notların admin onayına geliyormuş gibi görünmesini sağlayan bir arayüz maketi olacaktır.

Admin bölümünde bulunabilecek alanlar:

- 8 adet onay bekleyen PDF not
- Ders adı ve ders kodu bilgisi
- Dönem bilgisi
- Dosya durumu: Kontrol ediliyor, admin onayı bekliyor, onaylandı, reddedildi
- Yapay zeka destekli ön kontrol etiketi
- Onayla ve reddet butonları
- Yeşil onay durumu ve kırmızı uyarı durumu

Admin bölümü, sitenin profesyonel ve gerçekçi görünmesini sağlayacak önemli tasarım alanlarından biri olacaktır.

Admin bölümünde gösterilecek örnek onay bekleyen PDF notları:

- YBS 107 - Algoritma ve Programlamaya Giriş - 1. Yıl Güz
- YBS 106 - Nesne Tabanlı Programlama I - 1. Yıl Bahar
- YBS 211 - Nesne Tabanlı Programlama II - 2. Yıl Güz
- YBS 208 - Veri İletişimi ve Ağlar - 2. Yıl Bahar
- YBS 303 - Veri Madenciliği - 3. Yıl Güz
- YBS 312 - Büyük Veri ve İş Analitiği - 3. Yıl Bahar
- YBS 201 - Finansal Yönetim I - 2. Yıl Güz
- YBS 310 - Elektronik Ticaret ve Elektronik İşletme - 3. Yıl Bahar

## 16. Açık Sorular

- Şu an ders dağılımı rastgele ve tekrarsız olarak belirlenmiştir.
- Tasarım uygulanırken kartların görsel yerleşimi netleştirilecektir.

## 17. Arayüz Gereksinimleri

- Yapım takibi kutucukları arayüzden kaldırılacak.
- Sayfa düzeni sol panel olmadan tek ana içerik alanı üzerinden ilerleyecek.
- Kullanıcı ilk bakışta ders listesi, PDF yükleme, özet/soru ve admin bölümlerine odaklanabilecek.
- Butonlar, kartlar ve filtreler hover/aktif durumlara sahip olacak.
- Tıklanabilir alanlar yeterince büyük ve rahat kullanılabilir olacak.
- Renkler sadece süs için değil, durum belirtmek için de kullanılacak.
- Yeşil renk kullanıldığında yanında tik veya "Onaylandı" yazısı da bulunacak.
- Hareketler kısa ve hızlı olacak; arayüz yavaş hissettirmeyecek.
- Mobil görünümde içerikler alt alta düzenli şekilde dizilecek.
- Özet çıkarma ve soru hazırlama alanı ayrı bir bölüm olarak gösterilecek.
- Bu bölümde ders seçme, özet çıkarma ve soru hazırlama butonları bulunacak.
- Üretilen özet ve sorular ayrı sonuç kutularında gösterilecek.
- Ders listesi ayrı bir bölüm olarak düzenli ve okunabilir şekilde gösterilecek.
- Admin bölümü ders listesinden ayrı görünecek.
- Ana sayfada 5 adet ders notu kartı gösterilecek.
- Admin bölümünde 8 adet onay bekleyen PDF kartı/listesi gösterilecek.
- Ders kartlarında yalnızca ders kodu, ders adı ve dönem bilgisi yer alacak.

## 18. Sonraki Adım

Adım adım ilerleme sırası:

1. Genel sayfa düzeni belirlenecek.
2. Renk paleti ve yazı tipi seçilecek.
3. Üst başlık alanı tasarlanacak.
4. Ders listesi kategorize edilecek.
5. Ders listesi bölümü tasarlanacak.
6. Admin bölümü tasarlanacak.
7. Ana içerik alanı tasarlanacak.
8. Ders notu kartları hazırlanacak.
9. PDF yükleme ve admin onayı maketi hazırlanacak.
10. İnteraktif durumlar eklenecek.
11. Son görsel düzenleme yapılacak.

## 19. Uygulama Durumu

Statik prototip uygulaması oluşturulmuştur.

Oluşturulan dosyalar:

- index.html
- dersler.html
- yukle.html
- analiz.html
- admin.html
- giris.html
- styles.css
- script.js

Tamamlanan uygulama adımları:

- Üst başlık alanı oluşturuldu.
- Sol yapım takip paneli son düzenlemede kaldırıldı.
- Ana sayfa düzeni hazırlandı.
- 5 adet örnek ders notu kartı eklendi.
- Ders listesi yıl ve dönemlere göre gösterildi.
- Ders arama ve dönem filtreleme etkileşimi eklendi.
- PDF yükleme süreci maketi oluşturuldu.
- PDF yükleme ekranına seçilen ders ve dosya özetini gösteren canlı durum kartı eklendi.
- Ders listesinden seçilen dersin PDF yükleme sayfasına taşınması sağlandı.
- Yüklenen PDF notlarının demo admin kuyruğuna eklenmesi sağlandı.
- PDF kontrol aşamaları JavaScript ile etkileşimli hale getirildi.
- Admin onay bölümü ayrı olarak oluşturuldu.
- Admin bölümüne 8 adet onay bekleyen PDF notu eklendi.
- Admin bölümüne durum filtreleri ve demo veri sıfırlama eklendi.
- Yapay zeka destekli ön kontrol etiketi eklendi.
- Özet çıkarma ve soru hazırlama bölümü eklendi.
- Özet ve soru hazırlama bölümünün yeni yüklenen demo PDF notlarını okuyabilmesi sağlandı.
- Seçilen derse göre örnek özet ve örnek soru çıktısı üretildi.
- Giriş/kayıt alanı tasarlandı.
- Kırmızı, beyaz, siyah ve yeşil renk paleti uygulandı.
- Mobil uyumlu düzen eklendi.
- Sayfa düzeni sade minimalist stile yaklaştırıldı.
- Kart, bölüm ve işlem alanlarına kontrollü mikro animasyonlar eklendi.
- Sol takip paneli kaldırılarak sayfa düzeni daha sade hale getirildi.
- Tek sayfadaki yoğunluk azaltılarak bölümler ayrı HTML sayfalarına ayrıldı.
- Ana sayfaya sayfa/link yönetimi kartları eklendi.
- Ders kategorilerine dersler.html sayfasından erişilecek şekilde düzenleme yapıldı.
