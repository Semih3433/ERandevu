# 🏥 ERandevu | Yeni Nesil Hastane Randevu Sistemi

<div align="center">

![.NET Core](https://img.shields.io/badge/.NET%20Core-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)
![ASP.NET MVC](https://img.shields.io/badge/ASP.NET%20MVC-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![EF Core](https://img.shields.io/badge/Entity%20Framework%20Core-512BD4?style=for-the-badge&logo=nuget&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

</div>

<p align="center">
  <strong>Clean Architecture prensipleriyle geliştirilmiş, ölçeklenebilir ve modüler randevu yönetim sistemi.</strong>
</p>

<p align="center">
  <a href="#-proje-hakkında">Proje Hakkında</a> •
  <a href="#-mimari-yapı">Mimari</a> •
  <a href="#-özellikler">Özellikler</a> •
  <a href="#-kurulum">Kurulum</a>
</p>

---

## 📖 Proje Hakkında

**ERandevu**, klasik hastane randevu sistemlerinin aksine, kurumsal yazılım standartları gözetilerek tasarlanmış kapsamlı bir otomasyon çözümüdür. Hastalar, doktorlar ve yönetim birimi arasındaki tüm operasyonel süreci dijitalleştirir.

Bu projenin temel amacı sadece çalışan bir kod üretmek değil; **sürdürülebilir (maintainable)**, **geliştirilebilir (extensible)** ve **test edilebilir (testable)** bir backend altyapısı kurmaktır.

---

## 🏗️ Mimari Yapı ve Teknik Detaylar

Proje, endüstri standardı olan **N-Tier Architecture (Katmanlı Mimari)** üzerine inşa edilmiştir. Bu sayede "Separation of Concerns" (İlgi Alanlarının Ayrımı) prensibi tam olarak uygulanmıştır.

### 🧩 Kullanılan Tasarım Desenleri (Design Patterns)
* **Generic Repository Pattern:** Veri erişim katmanında kod tekrarını önlemek ve CRUD işlemlerini standartlaştırmak için kullanıldı.
* **Unit of Work Pattern:** Tüm veritabanı işlemlerinin (transaction) tek bir merkezden yönetilmesini sağlayarak veri bütünlüğü (Data Integrity) garanti altına alındı.
* **Dependency Injection (DI):** Bileşenler arasındaki bağımlılıkları azaltmak (Loose Coupling) için modern DI teknikleri uygulandı.
* **Fluent Validation:** İş kuralları ve doğrulama süreçleri entity sınıflarından ayrılarak yönetilebilir hale getirildi.

### 📂 Katman Yapısı
1.  **Entity Layer:** Veritabanı tabloları ve ilişkiler.
2.  **Data Access Layer (DAL):** Veritabanı konfigürasyonları, Repository ve Unit of Work implementasyonları.
3.  **Business Layer (BL):** İş mantığı, servisler ve validasyon kuralları.
4.  **UI (Web) Layer:** ASP.NET Core MVC arayüzü.

---

## 🚀 Özellikler

### 👤 Hasta Paneli
* 🔐 **Güvenli Üyelik:** Kayıt ol, giriş yap ve şifre işlemlerini yönet.
* 📅 **Randevu Planlama:** Hastane, klinik ve doktor seçerek uygun saatlere randevu al.
* ❌ **Randevu Yönetimi:** Aktif randevuları görüntüle veya iptal et.
* 🕒 **Geçmiş:** Eski randevu detaylarına erişim.

### 👨‍⚕️ Doktor Paneli
* 🗓️ **Akıllı Takvim:** Doktora atanan randevuların günlük/haftalık takibi.
* 📋 **Hasta Detay:** Randevu alan hastaların geçmişini görüntüleme.

### ⚙️ Admin (Yönetim) Paneli
* 🏥 **Hastane Yönetimi:** Poliklinik ve bölüm tanımlamaları.
* 👨‍⚕️ **Personel Yönetimi:** Doktor ekleme, uzmanlık atama ve düzenleme.
* 📊 **Dashboard:** Sistem genelindeki randevu istatistikleri ve doluluk oranları.

---

## 🛠️ Teknoloji Yığını

| Kategori | Teknoloji |
| :--- | :--- |
| **Dil** | C# 12 |
| **Framework** | .NET Core 8.0 |
| **Web** | ASP.NET Core MVC |
| **Veritabanı** | MS SQL Server |
| **ORM** | Entity Framework Core (Code First) |
| **Frontend** | HTML5, CSS3, Bootstrap 5, JavaScript |
| **Versiyon Kontrol** | Git & GitHub |

---


## ⚙️ Kurulum Adımları

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1.  **Projeyi Klonlayın:**
    ```bash
    git clone [https://github.com/Semih3433/ERandevu.git](https://github.com/Semih3433/ERandevu.git)
    cd ERandevu
    ```

2.  **Bağlantı Ayarları:**
    `ERandevu.Web` klasörü altındaki `appsettings.json` dosyasını açın ve `DefaultConnection` alanını kendi SQL Server bilgilerinize göre güncelleyin.
    ```json
    "ConnectionStrings": {
      "DefaultConnection": "Server=Server=(localdb)\\mssqllocaldb;Database=ERandevuDb;Trusted_Connection=True;TrustServerCertificate=True;"
    }
    ```

3.  **Veritabanı Oluşturma (Migration):**
    Terminali proje dizininde açın ve aşağıdaki komutu çalıştırarak veritabanını oluşturun:
    ```bash
    dotnet ef database update --project ERandevu.DataAccess --startup-project ERandevu.Web
    ```

4.  **Çalıştırma:**
    ```bash
    dotnet run --project ERandevu.Web
    ```

---

## 🤝 Katkıda Bulunma

1.  Bu depoyu Fork'layın.
2.  Yeni bir özellik dalı (branch) oluşturun (`git checkout -b feature/YeniOzellik`).
3.  Değişikliklerinizi Commit'leyin (`git commit -m 'Yeni özellik eklendi'`).
4.  Dalınızı Push'layın (`git push origin feature/YeniOzellik`).
5.  Bir Pull Request oluşturun.

---

## 🙏 Teşekkürler

Bu projenin geliştirilme sürecindeki değerli fikirleri, teknik rehberliği ve desteği için **Sayın Fayik Veznedaroğlu**'na özel olarak teşekkür ederim.

---
## 📄 Lisans

Bu proje [MIT License](LICENSE) altında lisanslanmıştır.

---

---

<div align="center">
  
  ### 👨‍💻 Developer

  **Semih** 

  <a href="https://www.linkedin.com/in/semih-alk%C4%B1%C5%9F-73256b352?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Hesabım" />
  </a>

  <br />

  <a href="https://github.com/Semih3433" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Hesabım" />
  </a>

  <br /><br />

  📧 **İletişim:** semi2112-@hotmail.com

</div>
