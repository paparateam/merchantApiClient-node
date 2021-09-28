# İçindekiler

<a href="#intro">Giriş</a>

<a href="#enums">Enumlar</a>

<a href="#account">Hesap Bilgileri</a>

<a href="#banking">Bankacılık</a>

<a href="#cash-deposit">Fiziksel Nokta Entegrasyonu</a>

<a href="#mass-payment">Ödeme Dağıtma</a>

<a href="#recurring-mass-payment">Düzenli Ödeme Dağıtma</a>

<a href="#payments">Ödeme Alma</a>

<a href="#validation">Doğrulama</a>

<a href="#response-types">Geri Dönüş Tipleri</a>

# <a name="intro">Giriş</a> 

Papara ile entegre olmak için aşağıdaki adımları takip edebilirsiniz;

1. API Anahtarınızı edinin. Böylece Papara doğrulama sistemi API isteklerinin kimliğini doğrulayabilir. API Anahtarınızı almak için https://merchant.test.papara.com/ URL adresine gidin. Başarıyla oturum açtıktan sonra, API Anahtarı https://merchant.test.papara.com/APIInfo adresinde görüntülenebilir.

2. Kütüphaneyi kurun. Böylece yazılımınız Papara API ile entegre olabilir. Kurulum işlemleri aşağıdaki gibidir.

# Konfigürasyon

Örnek kullanım:

```js
const client = new PaparaClient("API_ANAHTARINIZ");
const result = await client.accountService.getAccount();
```

## Yükleme

```bash
# npm ile yükleme
npm install --save @papara/papara
```
veya 

```bash
# yarn ile yükleme
yarn add @papara/papara
```

# <a name="enums">Enumlar</a>

# CashDepositProvisionStatus

Bir para yatırma talebi yapıldığında, aşağıdaki durumlar geri dönecek ve provizyon durumunu gösterecektir.

| Anahtar         | **Değer** | **Açıklama**         |
| --------------- | --------- | -------------------- |
| Pending         | 0         | Provizyon bekleniyor |
| Complete        | 1         | Tamamlandı           |
| Cancel          | 2         | İptal edildi         |
| ReadyToComplete | 3         | Tamamlanmaya hazır   |

 

# Currency

API'da bulunan bütün para birimleri aşağıdaki gibidir.

| **Anahtar** | **Değer** | **Açıklama**    |
| ----------- | --------- | --------------- |
| TRY         | 0         | Türk Lirası     |
| USD         | 1         | Amerikan Doları |
| EUR         | 2         | Euro            |

 

# EntryType

Giriş Türleri hesap defterlerinde ve para yatırma işlemlerinde parayı takip etmek için kullanılır. Olası giriş türleri aşağıdaki gibidir.

| **Anahtar**                   | **Değer** | **Açıklama**                                                 |
| ----------------------------- | --------- | ------------------------------------------------------------ |
| BankTransfer                  | 1         | Banka Transferi: Para Yatırma veya Çekme                     |
| CorporateCardTransaction      | 2         | Papara Kurumsal Kart İşlemi: Üye iş yerine tahsis edilen kurum kartı ile gerçekleştirilen işlemdir. |
| LoadingMoneyFromPhysicalPoint | 6         | Fiziki Noktadan Para Yükleme: Anlaşmalı yerden nakit para yatırma işlemi |
| MerchantPayment               | 8         | Üye iş yeri Ödemesi: Papara ile Ödeme                        |
| PaymentDistribution           | 9         | Ödeme Dağıtımı: Papara ile toplu ödeme                       |
| EduPos                        | 11        | Çevrimdışı ödeme. Papara üzerinden EDU POS                   |

 

# PaymentMethod

Kabul edilen üç ödeme yöntemi aşağıdaki gibidir.

| **Anahtar**   | **Değer** | **Açıklama**          |
| ------------- | --------- | --------------------- |
| PaparaAccount | 0         | Papara Hesap Bakiyesi |
| Card          | 1         | Tanımlı Kredi Kartı   |
| Mobile        | 2         | Mobil Ödeme           |

 

# PaymentStatus

Ödeme tamamlandıktan sonra API'dan aşağıdaki ödeme durumları dönecektir.

| **Anahtar** | **Değer** | **Açıklama**               |
| ----------- | --------- | -------------------------- |
| Pending     | 0         | Ödeme Bekliyor             |
| Completed   | 1         | User completed the payment |
| Refunded    | 2         | Order refunded             |

# <a name="account">Hesap Bilgileri</a>

Bu bölüm üye işyerine ait hesap ve bakiye bilgilerinin kullanımı için hazırlanan teknik entegrasyon bilgilerini içerir. Papara hesabındaki hesap ve bakiye bilgileri `Account` servisi ile alınabilir. Geliştiriciler ayrıca bakiyede değişiklik işlemlerin bir listesini içeren bakiye geçmişini de alabilirler.

## Hesap Bilgilerine Erişim

Üye iş yeri hesabı ve bakiye bilgilerini döndürür. Bakiye bilgileri cari bakiyeyi, kullanılabilir ve blokeli bakiyeyi içerirken, hesap bilgileri üye iş yerinin marka adını ve tam unvanını içerir. Bu işlemi gerçekleştirmek için `Account` servisinde bulunan `getAccount` methodunu kullanın.

### Account Model

`Account` sınıfı, `Account` servisi tarafından API'den dönen hesap bilgileri eşleştirmek için kullanılır ve hesap bilgilerini içerir.

| **Değişken Adı**    | **Tipi** | **Açıklama**                                                 |
| ------------------- | -------- | ------------------------------------------------------------ |
| LegalName           | string   | Üye iş yerinin şirket unvanını alır veya belirler.           |
| BrandName           | string   | Üye iş yerinin şirket marka adını alır veya belirler.        |
| AllowedPaymentTypes | any      | Üye iş yerinin şirket için kabul edilen ödeme tiplerini alır veya belirler. |
| Balances            | any      | Üye iş yerinin şirketin hesap bakiyesini alır veya belirler. |

### AllowedPaymentType Model

`AllowedPaymentType` sınıfı, `Account` servisi tarafından API'den dönen hesap bilgilerini eşleştirmek için kullanılır. `AllowPaymentType`, izin verilen ödeme türlerini gösterir.

| **Değişken Adı** | **Tipi** | **Açıklama**                                                 |
| ---------------- | -------- | ------------------------------------------------------------ |
| PaymentMethod    | number   | Ödeme tipini alır veya belirler.<br />0 – Papara Hesap Bakiyesi  <br />1 – Kredi/Banka kartı <br />2 – Mobil Ödeme. |

### AccountBalance Model

`AccountBalance` sınıf, `Account` servisi tarafından API'den dönen hesap bakiyesi değeriyle eşleştirmek için kullanılır. Hesap bakiyesi, cari bakiye rakamlarını gösterir ve üç tür bakiye ve genel para birimini listeler.

| **Değişken Adı** | **Tipi** | **Açıklama**                                |
| ---------------- | -------- | ------------------------------------------- |
| currency         | number   | Para birimini alır veya belirler.           |
| totalBalance     | number   | Toplam bakiyeyi alır veya belirler.         |
| lockedBalance    | number   | Blokeli bakiyeyi alır veya belirler.        |
| availableBalance | number   | Kullanılabilir bakiyeyi alır veya belirler. |

### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için hesap bilgilerini ve cari bakiyeyi getirir.

| **Method** | **Params** | **Return Type**             |
| ---------- | ---------- | --------------------------- |
| getAccount | None       | PaparaSingleResult<Account> |

#### Kullanım Şekli

``` typescript
function getAccount() {
    const result = await client.accountService.getAccount();
    return result;
}
```

## Hesap Hareketlerini Listeleme

Üye iş yeri hesap hareketlerini(işlem listesi) sayfalı biçimde döndürür. Bu method, her işlem için ortaya çıkan bakiye dahil olmak üzere bir üye iş yeri için yapılan tüm işlemleri listelemek için kullanılır. Bu işlemi gerçekleştirmek için `Account` hizmetinde `listLedgers` methodunu kullanın. `startDate` ve `endDate` bilgileri gönderilmelidir.

### AccountLedger

`AccountLedger` represents a transaction itself that returns from API.

| **Değişken Adı**    | **Tipi**     | **Açıklama**                                                 |
| ------------------- | ------------ | ------------------------------------------------------------ |
| id                  | number       | Merchant ID alır veya belirler.                              |
| createdAt           | Date         | Hesap hareketlerinin oluşma tarihinialır veya belirler.      |
| entryType           | EntryType    | Giriş türnü alır veya belirler.                              |
| entryTypeName       | string       | Giriş tür adını alır veya belirler.                          |
| amount              | number       | Tutarı alır veya belirler.                                   |
| fee                 | number       | Hizmet bedelini alır veya belirler.                          |
| currency            | number       | Para birimini alır veya belirler.                            |
| currencyInfo        | CurrencyInfo | Para birimi bilgisini alır veya belirler.                    |
| resultingBalance    | number       | Kalan bakiyeyi alır veya belirler.                           |
| description         | string       | Açıklamayı alır veya belirler.                               |
| massPaymentId       | string       | Toplu ödeme ID'sini alır veya belirler. Ödeme işlemlerinde mükerrer tekrarı önlemek için üye işyeri tarafından gönderilen benzersiz değerdir. Hesap hareketlerinde toplu ödeme türü işlem kayıtlarında işlemin kontrolünü sağlamak için görüntülenir. Diğer ödeme türlerinde boş olacaktır. |
| checkoutPaymentId   | string       | Ödeme ID'sini alır veya belirler. Ödeme kaydı işleminde veri nesnesinde bulunan kimlik alanıdır. Ödeme işleminin benzersiz tanımlayıcısıdır. Hesap hareketlerinde kasa tipi işlem kayıtlarında görüntülenir. Diğer ödeme türlerinde boş olacaktır. |
| checkoutReferenceID | string       | Checkout referans ID'ini alır veya belirler. Bu, ödeme işlemi kaydı oluşturulurken gönderilen referans kimliği alanıdır. Üye işyeri sisteminde ödeme işleminin referans bilgisidir. Hesap hareketlerinde kasa tipi işlem kayıtlarında görüntülenir. Diğer ödeme türlerinde boş olacaktır |

### CurrencyInfo 

`CurrencyInfo` sınıfı, `AccountLedger` modeli tarafından API'den dönen para birimi değerlerini almak veya ayarlamak için kullanılır. Hesap hareketlerinde bulunan para birimi bilgilerini temsil eder.

| **Değişken Adı**     | **Tipi** | **Açıklama**                                                 |
| -------------------- | -------- | ------------------------------------------------------------ |
| currencyEnum         | Currency | Para birimi tipini alır veya belirler                        |
| symbol               | string   | Para birimi sembolünü alır veya belirler                     |
| code                 | string   | Para birimi kodunu alır veya belirler                        |
| preferredDisplayCode | string   | Para biriminin tercih edilen gösterim kodunu alır veya belirler |
| name                 | string   | Para biriminin adını alır veya belirler                      |
| isCryptoCurrency     | boolean  | Para biriminin kripto para olup olmadığını alır veya belirler |
| precision            | number   | Para biriminin virgülden sonra kaç hane gösterileceğini alır veya belirler |
| iconUrl              | string   | Para birimi ikonu URL'ini alır veya belirler                 |

### LedgerListOptions Model

`LedgerListOptions` `Account` servisi tarafından hesap hareketleri listeleme işlemine istek parametreleri sağlamak için kullanılır

| **Değişken Adı** | **Tipi** | **Açıklama**                                                 |
| ---------------- | -------- | ------------------------------------------------------------ |
| startDate        | string   | İşlemlerin başlangıç tarihini alır veya belirler             |
| endDate          | string   | İşlemlerin bitiş tarihlerini alır veya belirler              |
| entryType        | number   | İşlemlerin hareket tiplerini alır veya belirler              |
| accountNumber    | number   | Üye iş yeri hesap numarasını alır veya belirler              |
| page             | number   | İstenen sayfa numarasını alır veya belirler. İstenen tarihte, istenen PageSize için 1'den fazla sonuç sayfası varsa, bunu sayfalar arasında dönmek için kullanın |
| pageSize         | number   | Bir sayfada getirilmesi istenen kalem sayısını alır veya belirler. Min=1, Max=50 |

### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için hesap hareketleri listesini döndürür.

| **Method**  | **Params**        | **Return Type**                 |
| ----------- | ----------------- | ------------------------------- |
| listLedgers | LedgerListOptions | PaparaListResult<AccountLedger> |

#### Kullanım Şekli

``` typescript
function listLedgers() {
	const result = await client.accountService.listLedgers({
    	startDate: new Date(2020, 1, 1).toISOString(),
    	endDate: new Date().toISOString(),
   		page: 1,
   	 	pageSize: 20
  	});
    return result;
}
```

## Mutabakat Bilgilerine Erişim

Verilen süre içindeki işlemlerin sayısını ve hacmini hesaplar. Bu işlemi gerçekleştirmek için ` Account`  servisinde bulunan ` getSettlement` methodunu kullanın. ` startDate` ve ` endDate` gönderilmelidir.

### Settlement Model

`Settlement` sınıfı, ` Account` servisi tarafından API'dan dönen mutabakat değerlerini eşleştirmek için kullanılır.

| **Değişken Adı** | **Tipi** | **Açıklama**                       |
| ---------------- | -------- | ---------------------------------- |
| count            | number   | İşlem sayısını alır veya belirler. |
| volume           | number   | İşlem hacmini alır veya belirler   |

### SettlementGetOptions Model

`SettlementGetOptions` sınıfı, ` Account` servisi tarafından API'dan dönen mutabakat değerlerini eşleştirmek için kullanılır.

| **Değişken Adı** | **Tipi**  | **Açıklama**                                      |
| ---------------- | --------- | ------------------------------------------------- |
| startDate        | string    | İşlemlerin başlangıç tarihini alır veya belirler. |
| endDate          | string    | İşlemlerin bitiş tarihini alır veya belirler.     |
| entryType        | EntryType | İşlemlerin giriş tipini alır veya belirler.       |

### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için mutabakat bilgilerini getirir.

| **Method**    | **Params**           | **Return Type**                |
| ------------- | -------------------- | ------------------------------ |
| getSettlement | SettlementGetOptions | PaparaSingleResult<Settlement> |

#### Kullanım Şekli

``` typescript
function listLedgers() {
	const result = await client.accountService.getSettlement({
    	startDate: new Date(2020, 1, 1).toISOString(),
    	endDate: new Date().toISOString()
 	});
	return result;
}
```



# <a name="banking">Bankacılık</a> 

Bu bölümde, banka hesaplarını Papara'da hızlı ve güvenli bir şekilde listelemek ve / veya banka hesaplarına para çekme talebi oluşturmak isteyen işyerleri için hazırlanmış teknik entegrasyon bilgileri yer almaktadır.

## Banka Hesap Bilgilerine Erişim

Üye iş yeri kurumun kayıtlı banka hesaplarını getirir. Bu işlemi gerçekleştirmek için `Banking` servisinde bulunan `GetBankAccounts` methodunu kullanın.

### BankAccount Model

`BankAccount` sınıfı, `Banking` servisi tarafından API'den dönen banka hesaplarını eşleştirmek için kullanılır

| **Değişken Adı** | **Tipi** | **Açıklama**                                          |
| ---------------- | -------- | ----------------------------------------------------- |
| bankAccountId    | number   | Üye iş yerinin banka hesap ID'sini alır veya belirler |
| bankName         | string   | Üye iş yerinin banka adını alır veya belirler         |
| branchCode       | string   | Üye iş yerinin şube kodunu alır veya belirler         |
| iban             | string   | IBAN numarasını alır veya belirler                    |
| accountCode      | string   | Üye iş yerinin hesap kodunu alır veya belirler        |
| description      | string   | Açıklamayı alır veya belirler                         |
| currency         | string   | Para birimini alır veya belirler                      |

### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için banka hesaplarını döndürür.

| **Method**      | **Params** | **Return Type**                |
| --------------- | ---------- | ------------------------------ |
| getBankAccounts |            | PaparaArrayResult<BankAccount> |

#### Kullanım Şekli

``` typescript 
function getBankAccounts() {
    var result = await client.bankingService.getBankAccounts();
    return result;
}
```

## Para Çekim İşlemi

Üye iş yerleri için para çekme talepleri oluşturur. Bu işlemi gerçekleştirmek için `Banking` hizmetinde `withdrawal` methodunu kullanın.

### BankingWithdrawalOptions 

`BankingWithdrawalOptions` `Banking` servisi tarafından istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı** | **Tipi** | **Açıklama**                                                 |
| ---------------- | -------- | ------------------------------------------------------------ |
| bankAccountId    | number   | Para çekme işlemi tamamlandığında hangi paranın aktarılacağı hedef banka hesap kimliğini alır veya belirler.Banka hesaplarını listeleme isteği sonucunda elde edilir. |
| amount           | number   | Çekilecek para tutarını alır veya belirler.                  |

### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için belirli bir banka hesabından para çekme talebi oluşturur.

| **Method** | **Params**               | **Return Type**         |
| ---------- | ------------------------ | ----------------------- |
| withdrawal | BankingWithdrawalOptions | PaparaSingleResult<any> |

#### Kullanım Şekli

``` typescript
function withdrawal() {
	var bankAccountResult = await client.bankingService.getBankAccounts();

	if (bankAccountResult.data.length > 0) {
    var bankAccount = bankAccountResult.data[0];

    var result = await client.bankingService.withdrawal({
      amount: 10,
      bankAccountId: bankAccount.bankAccountId
    });
  }
    return result;
}
```

## Olası Hatalar ve Hata Kodları

| **Hata Kodu** | **Hata Açıklaması**                         |
| ------------- | ------------------------------------------- |
| 105           | Yetersiz bakiye                             |
| 115           | Talep edilen miktar minimum limitin altında |
| 120           | Banka hesabı bulunamadı                     |
| 247           | Üye iş yeri hesabı aktif değil              |

# <a name="cash-deposit">Fiziksel Nokta Entegrasyonu</a> 

Papara fiziksel nokta entegrasyonu ile son kullanıcıların Papara hesaplarına bakiye yükleyebilecekleri para yükleme noktası olabilir ve kazanç sağlayabilirsiniz. Fiziksel nokta entegrasyon yöntemleri sadece kullanıcıların Papara hesaplarına nakit yükledikleri senaryolarda kullanılmalıdır.

## Para Yatırma Bilgilerine Erişim

Nakit para yükleme bilgilerini döndürür. Bu işlemi gerçekleştirmek için `CashDeposit`  servisinde bulunan `getCashDeposit `methodunu kullanın. `Id` gönderilmelidir.

### CashDeposit Model

`CashDeposit` sınıfı, `CashDeposit` servisi tarafından API'den dönen nakit para yükleme bilgilerini eşleştirmek için kullanılır.

| **Değişken Adı**  | **Tipi** | **Açıklama**                                                 |
| ----------------- | -------- | ------------------------------------------------------------ |
| merchantReference | string   | Üye iş yerinin referans numarasını alır veya belirler.       |
| id                | number   | Nakit para yükleme Id'sini alır veya belirler.               |
| createdAt         | Date     | Nakit para yükleme işleminin yapıldığı alır veya belirler.   |
| amount            | number   | Nakit para yükleme işleminin tutarını alır veya belirler.    |
| currency          | number   | Nakit para yükleme işleminin para birimini alır veya belirler. |
| fee               | number   | Nakit para yükleme işleminin hizmet bedelini alır veya belirler. |
| resultingBalance  | number   | Nakit para yükleme işleminden sonra kalan bakiyeyi alır veya belirler. |
| description       | string   | Nakit para yükleme işleminin açıklamasını alır veya belirler. |

### CashDepositGetOptions

`CashDepositGetOptions` `CashDeposit` servisine istek parametrelerini sağlamak için kullanılır

| **Değişken Adı** | **Tipi** | **Açıklama**                                   |
| ---------------- | -------- | ---------------------------------------------- |
| id               | number   | Nakit para yükleme Id'sini alır veya belirler. |

### Servis Methodu

#### Kullanım Amacı

Nakit para yükleme işlemi bilgilerini döner

| **Method**     | **Params**            | **Return Type**                 |
| -------------- | --------------------- | ------------------------------- |
| getCashDeposit | CashDepositGetOptions | PaparaSingleResult<CashDeposit> |

####   Kullanım Şekli

``` typescript
function getCashDeposit() {
    const result = await client.cashDepositService.getCashDeposit({
    	id: 123456789 // cash deposit ID
 	 });
    return result;
}
```

## Telefon Numarası ile Para Yükleme

Kullanıcının telefon numarasını kullanarak fiziksel noktadan kullanıcıya para yatırır. Bu işlemi gerçekleştirmek için `Cash Deposit` servisinde bulunan `createWithPhoneNumber` methodunu kullanın. `phoneNumber`, `amount` ve `merchantReference` gönderilmelidir.

### CashDepositToPhoneOptions

`CashDepositToPhoneOptions` `CashDeposit` servisine istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı**  | **Tipi** | **Açıklama**                                                 |
| ----------------- | -------- | ------------------------------------------------------------ |
| phoneNumber       | string   | Papara hesabına kayıtlı cep telefonu numarasını alır veya belirler. |
| amount            | number   | Yüklenecek para tutarını alır veya belirler. Bu tutar ödemeyi alan kullanıcının hesabına aktarılacaktır. Üye işyeri hesabından düşülecek tutar tam olarak bu sayı olacaktır. |
| merchantReference | string   | Üye iş yeri referans numarasını alır veya belirler. Nakit yükleme işlemlerinde yanlış tekrarları önlemek için üye işyeri tarafından gönderilen benzersiz değerdir. Kısasüre önce gönderilmiş ve başarılı bir merchantReference, yeni bir taleple yeniden gönderilirse, istek başarısız olur. Başarısız isteklerle gönderilen MerchantReference yeniden gönderilebilir. |

### Servis Methodu

#### Kullanım Amacı

Son kullanıcının telefon numarasını kullanarak nakit para yatırma isteği oluşturur

| **Method**            | **Params**                | **Return Type**                 |
| --------------------- | ------------------------- | ------------------------------- |
| createWithPhoneNumber | CashDepositToPhoneOptions | PaparaSingleResult<CashDeposit> |

#### Kullanım Şekli

``` typescript
function createWithPhoneNumber() {
    const result = await client.cashDepositService.createWithPhoneNumber({
    	phoneNumber: config.PersonalPhoneNumber,
    	amount: 10,
        merchantReference: uuidv4() //random number generator method, place actual merchant reference here
  	});
    return result;
}
```

## Referans Numarasına Göre Nakit Para Yükleme İşlemine Erişim

Üye iş yeri referans bilgileri ile birlikte fiziksel noktadan para yükleme işlemine ait bilgileri döndürür. Bu işlemi gerçekleştirmek için `CashDeposit` servisinde bulunan `getCashDepositByReference` methodunu kullanın. `reference` gönderillmelidir.

### CashDepositByReferenceOptions

`CashDepositByReferenceOptions` `CashDeposit` servisine istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı** | **Tipi** | **Açıklama**                                                 |
| ---------------- | -------- | ------------------------------------------------------------ |
| reference        | string   | Nakit para yükleme işleminin referans numarasını alır veya belirler. Zorunlu parametredir. |

### Servis Methodu

#### Kullanım Amacı

Üye iş yerinin benzersiz referans numarasını kullanarak bir nakit para yükleme nesnesi döndürür.

| **Method**                | **Params**                    | **Return Type**                 |
| ------------------------- | ----------------------------- | ------------------------------- |
| getCashDepositByReference | CashDepositByReferenceOptions | PaparaSingleResult<CashDeposit> |

#### Kullanım Şekli

``` typescript
function getCashDepositByReference() {
    var result = await client.cashDepositService.getCashDepositByReference({
    	reference: "78cadfb9-71d1-42dd-9793-84e90af53b07"
 	});
    return result;
}
```

## Papara Numarası ile Para Yükleme

Fiziksel noktadan Papara numarası ile kullanıcıya para yatırır. Bu işlemi yapmak için  `Cash Deposit` servisinde bulunan `createWithAccountNumber` methodunu kullanın. `accountNumber`, `amount` ve `merchantReference` gönderilmelidir.

### CashDepositToAccountNumberOptions

`CashDepositToAccountNumberOptions` `CashDeposit` servisine istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı**  | **Tipi** | **Açıklama**                                                 |
| ----------------- | -------- | ------------------------------------------------------------ |
| accountNumber     | number   | Hesap numarasını alır veya belirler. Nakit yükleme yapılacak kullanıcının Papara hesap numarasıdır. |
| amount            | number   | Yüklenecek para tutarını alır veya belirler. Bu tutar ödemeyi alan kullanıcının hesabına aktarılacaktır. Üye işyeri hesabından düşülecek tutar tam olarak bu sayı olacaktır. |
| merchantReference | string   | Üye iş yeri referans numarasını alır veya belirler. Nakit yükleme işlemlerinde yanlış tekrarları önlemek için üye işyeri tarafından gönderilen benzersiz değerdir. Kısasüre önce gönderilmiş ve başarılı bir merchantReference, yeni bir taleple yeniden gönderilirse, istek başarısız olur. Başarısız isteklerle gönderilen MerchantReference yeniden gönderilebilir. |

### Servis Methodu

#### Kullanım Amacı

Son kullanıcının hesap numarasını kullanarak nakit para yükleme talebi oluşturur.

| **Method**              | **Params**                        | **Return Type**                 |
| ----------------------- | --------------------------------- | ------------------------------- |
| createWithAccountNumber | CashDepositToAccountNumberOptions | PaparaSingleResult<CashDeposit> |

#### Kullanım Şekli


```typescript
function createWithAccountNumber() {
	const result = await client.cashDepositService.createWithAccountNumber({
    	accountNumber: config.PersonalAccountNumber,
   	 	amount: 10,
    	merchantReference: uuidv4() //Gerçek merhcant referansı buraya gelmeli
  	});
    return result;
}
```

## TC Kimlik Numarası ile Para Yükleme

Fiziksel noktadan TCKN ile kullanıcıya para yatırır. Bu işlemi yapmak için  `Cash Deposit` servisinde bulunan `createWithTckn` methodunu kullanın. `tckn`, `amount` ve `merchantReference` gönderilmelidir.

### CashDepositToTcknOptions

`CashDepositToTcknOptions` `CashDeposit` servisine istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı**  | **Tipi** | **Açıklama**                                                 |
| ----------------- | -------- | ------------------------------------------------------------ |
| tckn              | number   | Nakit yükleme yapılacak kullanıcının TC kimlik numarasını alır veya belirler. |
| amount            | number   | Yüklenecek para tutarını alır veya belirler. Bu tutar ödemeyi alan kullanıcının hesabına aktarılacaktır. Üye işyeri hesabından düşülecek tutar tam olarak bu sayı olacaktır. |
| merchantReference | string   | Üye iş yeri referans numarasını alır veya belirler. Nakit yükleme işlemlerinde yanlış tekrarları önlemek için üye işyeri tarafından gönderilen benzersiz değerdir. Kısasüre önce gönderilmiş ve başarılı bir merchantReference, yeni bir taleple yeniden gönderilirse, istek başarısız olur. Başarısız isteklerle gönderilen MerchantReference yeniden gönderilebilir. |

### Servis Methodu

#### Kullanım Amacı

Son kullanıcının TC kimlik numarasını kullanarak nakit para yükleme talebi oluşturur.

| **Method**     | **Params**               | **Return Type**                 |
| -------------- | ------------------------ | ------------------------------- |
| createWithTckn | CashDepositToTcknOptions | PaparaSingleResult<CashDeposit> |

#### Kullanım Şekli

```typescript
function createWithTckn() {
	const result = await client.cashDepositService.createWithTckn({
   		tckn: config.TCKN,
   		amount: 10,
   		merchantReference: uuidv4() //Gerçek merhcant referansı buraya gelmeli
  	});
    return result;
}
```

## TC Kimlik Numarasına Ön Ödemesiz Para Yükleme

Fiziksel noktadan TCKN ile kullanıcıya ön ödemesiz olarak para yatırır. Bu işlemi yapmak için  `Cash Deposit` servisinde bulunan `createProvisionWithTckn` methodunu kullanın. `tckn`, `amount` ve `merchantReference` gönderilmelidir.

### CashDepositProvision Model

`CashDepositProvision` sınıfı `CashDeposit` servisi tarafından API'den dönen ön ödemesiz para yükleme bilgilerini eşleştirmek için kullanılır

| **Değişken Adı**  | **Tipi** | **Açıklama**                                                 |
| ----------------- | -------- | ------------------------------------------------------------ |
| id                | number   | Ön ödemesiz para yükleme işleminin ID'sini alır veya belirler. |
| createdAt         | string   | Ön ödemesiz para yükleme işleminin oluşturulma tarihini alır veya belirler. |
| amount            | number   | Ön ödemesiz para yükleme işleminin tutarını alır veya belirler. |
| currency          | number   | Ön ödemesiz para yükleme işleminin para birimini alır veya belirler. |
| merchantReference | string   | Üye iş yeri referans numarasını alır veya belirler.          |
| userFullName      | string   | Kullanıcının tam adını alır veya belirler.                   |

### CashDepositToTcknOptions

`CashDepositTcknControlOptions` `CashDeposit` servisine istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı**  | **Tipi** | **Açıklama**                                                 |
| ----------------- | -------- | ------------------------------------------------------------ |
| tckn              | number   | Nakit yükleme yapılacak kullanıcının TC kimlik numarasını alır veya belirler. |
| amount            | number   | Yüklenecek para tutarını alır veya belirler. Bu tutar ödemeyi alan kullanıcının hesabına aktarılacaktır. Üye işyeri hesabından düşülecek tutar tam olarak bu sayı olacaktır. |
| merchantReference | string   | Üye iş yeri referans numarasını alır veya belirler. Nakit yükleme işlemlerinde yanlış tekrarları önlemek için üye işyeri tarafından gönderilen benzersiz değerdir. Kısasüre önce gönderilmiş ve başarılı bir merchantReference, yeni bir taleple yeniden gönderilirse, istek başarısız olur. Başarısız isteklerle gönderilen MerchantReference yeniden gönderilebilir. |

### Servis Methodu

#### Kullanım Amacı

Son kullanıcının TC kimlik numarasını kullanarak ön yüklemesiz nakit para yükleme talebi oluşturur.

| **Method**              | **Params**               | **Return Type**                          |
| ----------------------- | ------------------------ | ---------------------------------------- |
| createProvisionWithTckn | CashDepositToTcknOptions | PaparaSingleResult<CashDepositProvision> |

#### Kullanım Şekli

```typescript
function createProvisionWithTckn() {
    const result = await client.cashDepositService.createProvisionWithTckn({
    	amount: 10,
    	merchantReference: uuidv4(), //Gerçek merhcant referansı buraya gelmeli
   		tckn: config.TCKN
  	});
    return result;
}
```

## TCKN ile Ön Ödemesiz Para Yükleme Kontrolü 

Fiziksel noktadan Papara'ya kayıtlı ulusal kimlik numarası ile kullanıcıya para yatırır. Bu işlemi gerçekleştirmek için `Cash Deposit` servisinde bulunan `createProvisionWithTcknControl` methodunu kullanın. `phoneNumber`, `tckn`, `amount` ve `merchantReference` gönderilmelidir.

### CashDepositTcknControlOptions

`CashDepositTcknControlOptions` sınıfı `CashDeposit` servisi tarafından API'den dönen ön ödemesiz para yükleme bilgilerini eşleştirmek için kullanılır

| **Değişken Adı**  | **Tipi** | **Açıklama**                                                 |
| ----------------- | -------- | ------------------------------------------------------------ |
| id                | number   | Para yükleme işleminin ID'sini alır veya belirler            |
| createdAt         | string   | Para yükleme işleminin oluşturulma tarihini alır veya belirler |
| amount            | number   | Para yükleme işleminin tutarını alır veya belirler           |
| currency          | number   | Para yükleme işleminin para birimini alır veya belirler      |
| merchantReference | string   | Üye iş yeri referans numarasın alır veya belirler            |
| userFullName      | string   | Kullanıcının tam adını alır veya belirler                    |

### CashDepositTcknControlOptions

`CashDepositTcknControlOptions` `Cash Deposit` servisi tarafından istek parametresi olarak kullanılır

| **Değişken Adı**  | **Tipi** | **Açıklama**                                                 |
| ----------------- | -------- | ------------------------------------------------------------ |
| phoneNumber       | string   | Kullanıcının telefon numarasını alır veya belirler. Ödemeyi alacak kullanıcının Papara'da kayıtlı cep telefonu numarasıdır. Bir ülke kodu içermeli ve + ile başlamalıdır. |
| tckn              | number   | Nakit yükleme yapılacak kullanıcının TC kimlik numarasını alır veya belirler. |
| amount            | number   | Miktarı alır veya belirler. Ödeme işleminin tutarıdır. Bu tutar ödemeyi alan kullanıcının hesabına aktarılacaktır. Bu rakam artı işlem ücreti üye işyeri hesabından tahsil edilecektir |
| merchantReference | string   | Üye iş yeri referans numarasını alır veya belirler. Nakit yükleme işlemlerinde yanlış tekrarları önlemek için üye işyeri tarafından gönderilen benzersiz değerdir. Kısasüre önce gönderilmiş ve başarılı bir merchantReference, yeni bir taleple yeniden gönderilirse, istek başarısız olur. Başarısız isteklerle gönderilen MerchantReference yeniden gönderilebilir. |

### Servis Methodu

#### Kullanım Amacı

Son kullanıcının tc kimlik numarasını kullanarak ön ödeme yapmadan nakit para yükleme isteği kontrolü oluşturur.

| **Method**                     | **Params**                    | **Return Type**                          |
| ------------------------------ | ----------------------------- | ---------------------------------------- |
| createProvisionWithTcknControl | CashDepositTcknControlOptions | PaparaSingleResult<CashDepositProvision> |

#### Kullanım Şekli

```typescript
function createProvisionWithTcknControl() {
    const result = await client.cashDepositService.createProvisionWithTcknControl({
        amount: 10,
        merchantReference: uuidv4(), //random number generator method, place actual merchant reference here
        phoneNumber: config.PersonalPhoneNumber,
        tckn: config.TCKN
    });
    return result;
}
```



## Telefon Numarası ile Ön Ödemesiz Para Yükleme

Kullanıcının telefon numarasını kullanarak fiziksel noktadan kullanıcıya ön ödemesiz olark para yatırır. Bu işlemi gerçekleştirmek için `Cash Deposit` servisinde bulunan `createProvisionWithPhoneNumber` methodunu kullanın. `phoneNumber`, `amount` ve `merchantReference` gönderilmelidir.

### Servis Methodu

#### Kullanım Amacı

Son kullanıcının telefon numarasını kullanarak ön ödemesiz nakit para yatırma isteği oluşturur.

| **Method**                     | **Params**                | **Return Type**                          |
| ------------------------------ | ------------------------- | ---------------------------------------- |
| createProvisionWithPhoneNumber | CashDepositToPhoneOptions | PaparaSingleResult<CashDepositProvision> |

#### Kullanım Şekli

```typescript
function createProvisionWithPhoneNumber() {
  	const result = await client.cashDepositService.createProvisionWithPhoneNumber({
    	amount: 10,
        merchantReference: uuidv4(), //Gerçek merhcant referansı buraya gelmeli
        phoneNumber: config.PersonalPhoneNumber
    });
    return result;
}
```

## Papara Numarası ile Ön Ödemesiz Para Yükleme

Fiziksel noktadan Papara numarası ile kullanıcıya ön ödemesiz olarak para yatırır. Bu işlemi yapmak için  `Cash Deposit` servisinde bulunan `createProvisionWithAccountNumber` methodunu kullanın. `accountNumber`, `amount` ve `merchantReference` gönderilmelidir.

### Servis Methodu

#### Kullanım Amacı

Son kullanıcının hesap numarasını kullanarak ön ödemesiz nakit para yatırma isteği oluşturur.

| **Method**                       | **Params**                        | **Return Type**                          |
| -------------------------------- | --------------------------------- | ---------------------------------------- |
| createProvisionWithAccountNumber | CashDepositToAccountNumberOptions | PaparaSingleResult<CashDepositProvision> |

#### Kullanım Şekli

```typescript
function createProvisionWithAccountNumber() {
  	const result = await client.cashDepositService.createProvisionWithAccountNumber({
		amount: 10,
        merchantReference: uuidv4(), //Gerçek merhcant referansı buraya gelmeli
        accountNumber: config.PersonalAccountNumber
    });
    return result;
}
```



## Referans Numarasına Göre Nakit Yükleme Onaylama 

Kullanıcı tarafından oluşturulan referans kodu ile fiziki noktadan ön ödemesiz nakit para yükleme talebini kontrol ederek onaylanmaya hazır hale getirir. Bu işlemi gerçekleştirmek için,  `Cash Deposit` servisinde bulunan `provisionByReferenceControl` methodunu kullanın. `referenceCode` ve `amount` gönderilmelidir.

### Servis Methodu

#### Kullanım Amacı

Ön ödemesiz nakit para yükleme talebini tamamlanmaya hazır hale getirir.

| **Method**                  | **Params**                | **Return Type**                    |
| --------------------------- | ------------------------- | ---------------------------------- |
| provisionByReferenceControl | CashDepositControlOptions | PaparaResult<CashDepositProvision> |

#### Kullanım Şekli

```php
public function controlProvisionByReference()
  {
    var completionResult = await client.cashDepositService.provisionByReferenceControl(
    {
      amount: 10,
      referenceCode: result.data.merchantReference
    });
    return result;
  }
```

## Referans Numarasına Göre Nakit Yükleme İşlemini Tamamlama

Kullanıcı tarafından oluşturulan referans kodu ile fiziki noktadan ön ödemesiz nakit para yükleme talebini onaylar ve bakiyeyi kullanıcıya aktarır. Bu işlemi gerçekleştirmek için `CashDeposit` servisinde bulunan `provisionByReferenceComplete` methodunu kullanın. `referenceCode` ve `amount` gönderilmelidir.

### Servis Methodu

#### Kullanım Amacı

Ön ödemesiz nakit yükleme işlemini tamamlar

| **Method**                   | **Params**                | **Return Type**                    |
| ---------------------------- | ------------------------- | ---------------------------------- |
| provisionByReferenceComplete | CashDepositControlOptions | PaparaResult<CashDepositProvision> |

#### Kullanım Şekli

```php
public function completeProvisionByReference()
  {
    var completionResult = await client.cashDepositService.provisionByReferenceComplete(
    {
      amount: 10,
      referenceCode: result.data.merchantReference
    });
    return $result;
  }
```

## Nakit Yükleme İşlemini Tamamlama

Bekleyen para yükleme işlemlerini tamamlamak için kullanılır. Kullanıcının hesabına paranın geçmesi için işlemin tamamlanması gerekir. Bu işlemi gerçekleştirmek için `CashDeposit` servisinde bulunan `completeProvision` methodunu kullanın. `id` ve `transactionDate` gönderilmelidir.

### CashDepositCompleteOptions

`CashDepositCompleteOptions` `CashDeposit` servisine istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı** | **Tipi** | **Açıklama**                                                 |
| ---------------- | -------- | ------------------------------------------------------------ |
| id               | number   | Ön ödemesiz nakit yükleme işleminin ID'sini alır veya belirler |
| transactionDate  | string   | Ön ödemesiz nakit yükleme işleminin işlem tarihini alır veya belirler |

### Servis Methodu

#### Kullanım Amacı

Bekleyen ön ödemesiz para yükleme işlemlerini tamamlamak için kullanılır.

| **Method**        | **Params**                 | **Return Type**                 |
| ----------------- | -------------------------- | ------------------------------- |
| completeProvision | CashDepositCompleteOptions | PaparaSingleResult<CashDeposit> |

#### Kullanım Şekli

```typescript
function completeProvision() {
    var completionResult = await client.cashDepositService.completeProvision({
   		id: result.data.id,
    	transactionDate: result.data.createdAt
  	});
    return result;
}
```

## Tarihe Göre Nakit Para Yükleme Bilgilerine Erişim

Para yatırma bilgilerini tarihe göre getirir. Bu işlemi gerçekleştirmek için, `Cash Deposit` bulunan`getCashDepositByDate` methodunu kullanın. `startDate`, `endDate`, `pageIndex` ve `pageItemCount` gönderilmelidir.

### CashDepositByDateOptions

`CashDepositByDateOptions` `CashDeposit` servisine istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı** | **Tipi** | **Açıklama**                                                 |
| ---------------- | -------- | ------------------------------------------------------------ |
| startDate        | string   | Nakit para yükleme işlemlerinin başlangıç tarihini alır veya belirler. |
| endDate          | string   | Nakit para yükleme işlemlerinin bitiş tarihini alır veya belirler. |
| pageIndex        | number   | Sayfa dizinini alır veya belirler. Bir sayfada gösterilmek istenen kayıt sayısına (pageItemCount) göre hesaplanan sayfalardan gösterilmek istenen sayfanın indeks numarasıdır. Not: ilk sayfa her zaman 1'dir |
| pageItemCount    | number   | Sayfa öğesi sayısını alır veya belirler. Bir sayfada gösterilmesi istenen kayıtların sayısıdir. |

### Servis Methodu

#### Kullanım Amacı

Verilen tarihler aralığındaki nakit para yükleme işlemlerine erişim için kullanılır

| **Method**           | **Params**               | **Return Type**                |
| -------------------- | ------------------------ | ------------------------------ |
| getCashDepositByDate | CashDepositByDateOptions | PaparaArrayResult<CashDeposit> |

#### Kullanım Şekli

```typescript
function getCashDepositByDate() {
    var result = await client.cashDepositService.getCashDepositByDate({
        startDate: new Date(2020, 1, 1).toISOString(),
        endDate: new Date().toISOString(),
        pageIndex: 1,
		pageItemCount: 20
    });
    return result;
}
```

## Ön Ödemesiz İşlemler için Mutabakat

Verilen tarihlerde gerçekleştirilen ön ödemesiz para yükleme işlemlerin toplam sayısını ve hacmini döndürür. Hesaplamaya hem başlangıç hem de bitiş tarihleri dahil edilir. Bu işlemi gerçekleştirmek için, `Cash Deposit`  servisinde bulunan`ProvisionSettlements` methodunu kullanın. `startDate` ve `endDate` gönderilmelidir.

### CashDepositSettlementOptions

`CashDepositSettlementOptions` `CashDeposit` servisine istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı** | **Tipi**   | **Açıklama**                                      |
| ---------------- | ---------- | ------------------------------------------------- |
| startDate        | string     | Mutabakatın başlangıç tarihini alır veya belirler |
| endDate          | string     | Mutabakatın bitiş tarihini alır veya belirler     |
| entryType        | EntryType? | Mutabakatın giriş tipini alır veya belirler       |

### Servis Methodu

#### Kullanım Amacı

Verilen tarihler arasındaki toplam ön ödemesiz nakit para yükleme işlem hacmini ve sayımı döndürür. Başlangıç ve bitiş tarihleri dahildir.

| **Method**           | **Params**                   | **Return Type**                           |
| -------------------- | ---------------------------- | ----------------------------------------- |
| provisionSettlements | CashDepositSettlementOptions | PaparaSingleResult<CashDepositSettlement> |

#### Kullanım Şekli

```typescript
function provisionSettlements() {
    var result = await client.cashDepositService.provisionSettlements({
    	startDate: new Date(2020, 1, 1).toISOString(),
   		endDate: new Date().toISOString()
    });
    return result;
}
```



## Mutabakatlar

Verilen tarihlerde gerçekleştirilen para yükleme işlemlerinin toplam sayısını ve hacmini döndürür. Hesaplamaya hem başlangıç hem de bitiş tarihleri dahil edilir. Bu işlemi gerçekleştirmek için, `Cash Deposit`  servisinde bulunan`Settlements` methodunu kullanın. `startDate` ve `endDate` gönderilmelidir.

### CashDepositSettlementOptions

`CashDepositSettlementOptions` `CashDeposit` servisine istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı** | **Tipi**   | **Açıklama**                                         |
| ---------------- | ---------- | ---------------------------------------------------- |
| startDate        | string     | Mutabakatın başlangıç tarihini alır veya belirler    |
| endDate          | string     | Mutabakatın bitiş tarihini alır veya belirler        |
| entryType        | EntryType? | Mutabakatın giriş tipini tarihini alır veya belirler |

### Servis Methodu

#### Kullanım Amacı

Verilen tarihler arasındaki toplam nakit para yükleme işlem hacmini ve sayımı döndürür. Başlangıç ve bitiş tarihleri dahildir.

| **Method**  | **Params**                   | **Return Type**                           |
| ----------- | ---------------------------- | ----------------------------------------- |
| settlements | CashDepositSettlementOptions | PaparaSingleResult<CashDepositSettlement> |

#### Kullanım Şekli

```typescript
function settlements() {
    var result = await client.cashDepositService.settlements({
    	startDate: new Date(2020, 1, 1).toISOString(),
   		endDate: new Date().toISOString()
    });
    return result;
}
```



## Olası Hatalar ve Hata Kodları

| **Hata Kodu** | **Hata Açıklaması**                                          |
| ------------- | ------------------------------------------------------------ |
| 100           | Kullanıcı bulunamadı.                                        |
| 101           | Üye iş yeri bilgisi bulunamadı.                              |
| 105           | Yetersiz bakiye.                                             |
| 107           | Kullanıcı bu işlem ile toplam işlem limitini aşıyor.         |
| 111           | Kullanıcı bu işlem ile aylık toplam işlem limitini aşıyor.   |
| 112           | Gönderilen tutar minimum gönderim tutarının altında.         |
| 203           | Kullanıcı hesabı blokeli.                                    |
| 997           | Nakit para yatırma yetkisi, hesabınızda tanımlanmamıştır. Müşteri temsilcinizle iletişime geçmelisiniz. |
| 998           | Gönderdiğiniz parametreler beklenen formatta değil. Örnek: zorunlu alanlardan biri sağlanmamıştır. |
| 999           | Papara sisteminde hata meydana geldi.                        |

# <a name="mass-payment">Ödeme Dağıtma</a> 

Bu bölüm, ödemelerini kullanıcılarına hızlı, güvenli ve yaygın bir şekilde Papara üzerinden dağıtmak isteyen işyerleri için hazırlanmış teknik entegrasyon bilgilerini içerir.

## Ödeme Dağıtım Bilgilerine Erişim

Ödeme dağıtım işlemi hakkında bilgileri döner. Bu işlemi yamak için `MassPayment` servisinde bulunan `getMassPayment` methodunu kullanın. `id` gönderilmelidir.

### Mass Payment Model

`MassPayment` sınıfı, `MassPayment` servisi tarafından API'den dönen ödeme dağıtım bilgilerini eşleştirmek için kullanılır.

| **Değişken Adı** | **Tipi** | **Açıklama**                                                 |
| ---------------- | -------- | ------------------------------------------------------------ |
| massPaymentId    | string   | Ödeme ID'sini alır veya belirler.                            |
| id               | number   | Ödeme yapıldıktan sonra oluşan ID'yi alır veya belirler.     |
| createdAt        | Date     | Ödeme tarihini alır veya belirler.                           |
| amount           | number   | Ödeme tutarını alır veya belirler.                           |
| currency         | number   | Ödeme yapılan para birmini alır veya belirler. Değerler "1","2" veya "3" olabilir. |
| fee              | number   | Hizmet bedelini alır veya belirler.                          |
| resultingBalance | number   | Kalan bakiyeyi alır veya belirler.                           |
| description      | string   | Açıklamayı alır veya belirler.                               |

### MassPaymentGetOptions

`MassPaymentGetOptions` `MassPayment` servisine istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı** | **Tipi** | **Açıklama**                      |
| ---------------- | -------- | --------------------------------- |
| id               | number   | Ödeme ID'sini alır veya belirler. |

### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için ödeme dağıtım bilgisine erişmek için kullanılır

| **Method**     | **Params**            | **Return Type**                 |
| -------------- | --------------------- | ------------------------------- |
| getMassPayment | MassPaymentGetOptions | PaparaSingleResult<MassPayment> |

#### Kullanım Şekli

```typescript
function getMassPayment() {
    var result = await client.massPaymentService.getMassPayment({
   		id: 123456789
  	});
    return result;
}
```

## Referans Numarasına Göre Ödeme Dağıtım Bilgilerine Erişim

Referans numarası kullanarak ödeme dağıtım süreci hakkında bilgi verir. Bu işlemi gerçekleştirmek için `MassPayment` servisinde bulunan `getMassPaymentByReference` methodunu kullanın. `refernce` gönderilmelidir.

### MassPaymentByReferenceOptions

`MassPaymentByIdOptions` `MassPayment` servisine istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı** | **Tipi** | **Açıklama**                                           |
| ---------------- | -------- | ------------------------------------------------------ |
| reference        | number   | Ödeme işleminin referans numarasını alır veya belirler |

### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için ödeme bilgisine erişmek için kullanılır

| **Method**                | **Params**                    | **Return Type**                 |
| ------------------------- | ----------------------------- | ------------------------------- |
| getMassPaymentByReference | MassPaymentByReferenceOptions | PaparaSingleResult<MassPayment> |

#### Kullanım Şekli

```typescript
function getMassPaymentByReference() {
    var result = await client.massPaymentService.getMassPaymentByReference(
    {
      reference: "MASS_PAYMENT_ID"
    }
  );
    return result;
}
```



## Hesap Numarasına Ödeme Gönderme

Papara numarasına para gönderin. Bu işlemi gerçekleştirmek için `MassPayment` servisinde bulunan `createMassPaymentWithAccountNumber` methodunu kullanın. `accountNumber`, `amount` ve `massPaymentId` gönderilmelidir.

### MassPaymentToPaparaNumberOptions

`MassPaymentToPaparaNumberOptions` `MassPayment` servisine istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı**  | **Tipi** | **Açıklama**                                              |
| ------------------ | -------- | ------------------------------------------------------------ |
| accountNumber     | string   | Papara hesap numarasını alır veya belirler. Ödemeyi alacak kullanıcının 10 haneli Papara numarası. 1234567890 veya PL1234567890 biçiminde olabilir. Papara sürüm geçişinden önce Papara numarasına cüzdan numarası deniyordu, eski cüzdan numaraları Papara numarası olarak değiştirildi. Ödeme eski cüzdan numaralarına dağıtılabilir. |
| parseAccountNumber | number  | Ayrıştırma hesap numarasını alır veya belirler. Hesap numarasını long tip olarak ayrıştırır. Eski papara entegrasyonlarında PL ile başlanarak hesap / cüzdan numarası yapılıyordu. Hizmet, kullanıcılarından papara numarasını alan üye işyerlerine sorun yaşatmaması için PL ile başlayan numaraları kabul edecek şekilde yazılmıştır. |
| amount            | number | Miktarı alır veya belirler. Ödeme işleminin tutarıdır. Bu tutar ödemeyi alan kullanıcının hesabına aktarılacaktır. Bu rakam artı işlem ücreti üye işyeri hesabından tahsil edilecektir. |
| massPaymentId     | string   | Ödeme ID'sini alır veya belirler. Ödeme işlemlerinde hatalı tekrarları önlemek için üye işyeri tarafından gönderilen benzersiz değerdir. Kısa süre önce gönderilmiş ve başarılı olan bir massPaymentId yeni bir taleple tekrar gönderilirse, istek başarısız olur. |
| turkishNationalId | number   | TC kimlik numarasını alır veya belirler. Ödemeyi alacak kullanıcının gönderdiği kimlik bilgilerinin Papara sisteminde kontrolünü sağlar. Kimlik bilgilerinde bir çelişki olması durumunda işlem gerçekleşmeyecektir. |
| description       | string   | Açıklamayı alır veya ayarlar. Üye iş yeri tarafından sağlanan işlemin açıklamasıdır. Zorunlu bir alan değildir. Gönderilirse işlem açıklamalarında alıcı tarafından görülür. |
| currency| number| Ödeme yapılacak para birimini alır veya belirler. Değerler “0”,  “1”, “2” veya  “3” olabilir.|

### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için verilen hesap numarasına ödeme göndermek için kullanılır

| **Method**                         | **Params**                       | **Return Type**                 |
| ---------------------------------- | -------------------------------- | ------------------------------- |
| createMassPaymentWithAccountNumber | MassPaymentToPaparaNumberOptions | PaparaSingleResult<MassPayment> |

#### Kullanım Şekli

```typescript
function createMassPaymentWithAccountNumber() {
    var result = await client.massPaymentService.createMassPaymentWithAccountNumber({
      	accountNumber: config.PersonalAccountNumber.toString(),
      	amount: 1,
      	description: "Unit Test nodejs: MassPaymentToPaparaNumber",
      	massPaymentId: uuidv4(),//Gerçek merhcant referansı buraya gelmeli
     	parseAccountNumber: 1,
		turkishNationalId: config.TCKN
    });
    return result;
}
```

## E-Posta Adresine Ödeme Gönderme

Papara'da kayıtlı e-posta adresine para gönderin. Bu işlemi gerçekleştirmek için `MassPayment` servisinde bulunan `createMassPaymentWithEmail` methodunu kullanın. `email`, `amount` ve `massPaymentId` gönderilmelidir.

### MassPaymentToEmailOptions

`MassPaymentToEmailOptions` `MassPayment` servisine istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı**  | **Tipi** | **Açıklama**                                                 |
| ----------------- | -------- | ------------------------------------------------------------ |
| email             | string   | Hedef e-posta adresini alır veya belirler.                   |
| amount            | number   | Miktarı alır veya belirler. Ödeme işleminin tutarıdır. Bu tutar ödemeyi alan kullanıcının hesabına aktarılacaktır. Bu rakam artı işlem ücreti üye işyeri hesabından tahsil edilecektir |
| massPaymentId     | string   | Ödeme ID'sini alır veya belirler. Ödeme işlemlerinde hatalı tekrarları önlemek için üye işyeri tarafından gönderilen benzersiz değerdir. Kısa süre önce gönderilmiş ve başarılı olan bir massPaymentId yeni bir taleple tekrar gönderilirse, istek başarısız olur. |
| turkishNationalId | number   | TC kimlik numarasını alır veya belirler. Ödemeyi alacak kullanıcının gönderdiği kimlik bilgilerinin Papara sisteminde kontrolünü sağlar. Kimlik bilgilerinde bir çelişki olması durumunda işlem gerçekleşmeyecektir. |
| description       | string   | Açıklamayı alır veya ayarlar. Üye iş yeri tarafından sağlanan işlemin açıklamasıdır. Zorunlu bir alan değildir. Gönderilirse işlem açıklamalarında alıcı tarafından görülür. |
| currency| number| Ödeme yapılacak para birimini alır veya belirler. Değerler “0”,  “1”, “2” veya  “3” olabilir.|

### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için verilen e-posta adresine ödeme göndermek için kullanılır

| **Method**                 | **Params**                | **Return Type**                 |
| -------------------------- | ------------------------- | ------------------------------- |
| createMassPaymentWithEmail | MassPaymentToEmailOptions | PaparaSingleResult<MassPayment> |

#### Kullanım Şekli

```typescript
function createMassPaymentWithEmail() {
    var result = await client.massPaymentService.createMassPaymentWithEmail({
    	amount: 1,
    	description: "Unit Test nodejs: MassPaymentToEmail",
    	massPaymentId: uuidv4(), //Gerçek merhcant referansı buraya gelmeli
    	email: config.PersonalEmail,
    	turkishNationalId: config.TCKN
  	});
    return result;
}
```

## Telefon Numarasına Ödeme Gönderme

Papara'da kayıtlı telefon numarasına para gönderin. Bu işlemi gerçekleştirmek için `MassPayment` servisinde bulunan `createMassPaymentWithPhoneNumber` methodunu kullanın. `phoneNumber`, `amount` ve `massPaymentId` gönderilmelidir.

### MassPaymentToPhoneNumberOptions

`MassPaymentToPhoneNumberOptions` `MassPayment` servisine istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı**  | **Tipi** | **Açıklama**                                                 |
| ----------------- | -------- | ------------------------------------------------------------ |
| phoneNumber       | string   | Kullanıcının telefon numarasını alır veya belirler. Ödemeyi alacak kullanıcının Papara'da kayıtlı cep telefonu numarasıdır. Bir ülke kodu içermeli ve + ile başlamalıdır. |
| amount            | number   | Miktarı alır veya belirler. Ödeme işleminin tutarıdır. Bu tutar ödemeyi alan kullanıcının hesabına aktarılacaktır. Bu rakam artı işlem ücreti üye işyeri hesabından tahsil edilecektir |
| massPaymentId     | string   | Ödeme ID'sini alır veya belirler. Ödeme işlemlerinde hatalı tekrarları önlemek için üye işyeri tarafından gönderilen benzersiz değerdir. Kısa süre önce gönderilmiş ve başarılı olan bir massPaymentId yeni bir taleple tekrar gönderilirse, istek başarısız olur. |
| turkishNationalId | number   | TC kimlik numarasını alır veya belirler. Ödemeyi alacak kullanıcının gönderdiği kimlik bilgilerinin Papara sisteminde kontrolünü sağlar. Kimlik bilgilerinde bir çelişki olması durumunda işlem gerçekleşmeyecektir. |
| description       | string   | Açıklamayı alır veya ayarlar. Üye iş yeri tarafından sağlanan işlemin açıklamasıdır. Zorunlu bir alan değildir. Gönderilirse işlem açıklamalarında alıcı tarafından görülür. |
| currency| number| Ödeme yapılacak para birimini alır veya belirler. Değerler “0”,  “1”, “2” veya  “3” olabilir.|

### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için verilen telefon numarasına ödeme göndermek için kullanılır

| **Method**                       | **Params**                      | **Return Type**                 |
| -------------------------------- | ------------------------------- | ------------------------------- |
| createMassPaymentWithPhoneNumber | MassPaymentToPhoneNumberOptions | PaparaSingleResult<MassPayment> |

#### Kullanım Şekli

```typescript
function createMassPaymentWithPhoneNumber() {
    var result = await client.massPaymentService.createMassPaymentWithPhoneNumber({
      	amount: 1,
      	description: "Unit Test nodejs: MassPaymentToPhoneNumber",
      	massPaymentId: uuidv4(), //Gerçek merhcant referansı buraya gelmeli
      	phoneNumber: config.PersonalPhoneNumber,
		turkishNationalId: config.TCKN
    });
    return result;
}
```

## Olası Hatalar ve Hata Kodları

| **Hata Kodu** | **Hata Açıklaması**                                          |
| ------------- | ------------------------------------------------------------ |
| 100           | Kullanıcı bulunamadı                                         |
| 105           | Yetersiz bakiye                                              |
| 107           | Alıcı bakiye limitini aşıyor. Basit hesaplar için mümkün olan en yüksek bakiye 750 TL'dir. |
| 111           | Alıcı aylık işlem limitini aşıyor. Basit hesaplar tanımlı kaynaktan aylık toplam 2000 TL ödeme alabilir. |
| 133           | MassPaymentID yakın zamanda kullanıldı.                      |
| 398           | Döviz göndermek istediğin kullanıcı onaylı hesaba sahip olmadığı için işlemin gerçekleştirilemedi.|  
| 997           | Ödemeleri dağıtma yetkiniz yok. Müşteri temsilcinizle iletişime geçebilir ve üye iş yeri hesabınıza bir ödeme dağıtım tanımı talep edebilirsiniz. |
| 998           | Gönderdiğiniz parametreler beklenen formatta değil. Örnek: Müşteri numarası 10 haneden az. Bu durumda, hata mesajı format hatasının ayrıntılarını içerir. |
| 999           | Papara sisteminde bir hata oluştu.                           |

# <a name="recurring-mass-payment"> Düzenli Ödeme Dağıtma</a> 

Bu bölüm, ödemelerini kullanıcılarına hızlı, güvenli ve yaygın bir şekilde Papara üzerinden düzenli bir şekilde dağıtmak isteyen iş yerleri için hazırlanmış teknik entegrasyon bilgilerini içerir.

Düzenli dağıtım istekleri için, period ve çalışma günü bilgisini göndererek günlük, haftalık ve aylık düzenli dağıtım isteği tanımlayabilirsiniz.

Günlük gönderimler için çalışma günü bilgisi parametresi 0 olarak kabul edilmektedir.

### Recurring Mass Payment Model

`RecurringMassPayment` sınıfı, `MassPayment` servisi tarafından API'den dönen ödeme dağıtım bilgilerini eşleştirmek için kullanılır.

| **Değişken Adı** | **Tip**  | **Açıklama**                                                 |
| ---------------- | -------- | ------------------------------------------------------------ |
| MerchantId    | string   | Üye iş yeri ID'sini alır veya belirler.                         |
| UserId        | string     | Kullanıcı ID'sini alır veya belirler.                         |
| Period        | int | Düzenli ödeme talimatları için talimata ait periyot bilgisi.         |
| ExecutionDay  | int | Ödemenin periyot içindeki çalışma günü bilgisi. Günlük olarak verilen talimatlar için bu değer 0 olarak kabul edilir.                           |
| AccountNumber | int | Ödeme alacak kullanıcının 10 haneli Papara numarası. 1234567890 ya da PL1234567890 formatında olabilir. |
| Message       | string | Mesaj bilgisini alır veya belirler.                               |
| Amount | decimal | Ödeme işleminin tutarı. Ödemeyi alan kullanıcının hesabına tam olarak bu tutar transfer edilecektir. Üye işyeri hesabına bu rakam artı işlem ücreti yansıtılacaktır.                 |
| Currency      | Currency   | Ödeme yapılacak para birimi.                               |

## Papara Numarasına Düzenli Ödeme Gönderme

Papara numarasına düzenli para gönderin. Bu işlemi gerçekleştirmek için `MassPayment` servisinde bulunan `CreateRecurringMassPaymentWithAccountNumber` methodunu kullanın. `AccountNumber`, `Amount`, `ExecutionDay`, `Description`  ve `Period` gönderilmelidir.

### RecurringMassPaymentToAccountNumberOptions

| **Değişken Adı** | **Tip**  | **Açıklama**                                                 |
| ---------------- | -------- | ------------------------------------------------------------ |
| AccountNumber | string | Ödeme alacak kullanıcının 10 haneli Papara numarası. 1234567890 ya da PL1234567890 formatında olabilir. |
| Amount | decimal | Ödeme işleminin tutarı. Ödemeyi alan kullanıcının hesabına tam olarak bu tutar transfer edilecektir. Üye işyeri hesabına bu rakam artı işlem ücreti yansıtılacaktır.                 |
| TurkishNationalId    | long?   | Ödeme alacak kullanıcının kimlik numarası. Ödeme alacak kullanıcının, Papara sistemindeki kimlik bilgisi ile gönderilen kimlik bilgisinin kontrolünü sağlar. Kimlik bilgileri uyuşmazlığı durumunda işlem gerçekleşmez.                         |
| Currency      | Currency?   | Ödeme yapılacak para birimi.                               |
| Period        | int | Düzenli ödeme talimatları için talimata ait periyot bilgisi.         |
| ExecutionDay  | int | Ödemenin periyot içindeki çalışma günü bilgisi. Günlük olarak verilen talimatlar için bu değer 0 olarak kabul edilir.                           |
| Description   | string | Ödeme alacak kullanıcının göreceği açıklama.                              |

### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için verilen hesap numarasına düzenli ödeme göndermek için kullanılır.

| **Method**      | **Parametreler**                 | **Geri Dönüş Tipi**             |
| --------------- | -------------------------------- | ------------------------------- |
| CreateRecurringMassPaymentWithAccountNumber | RecurringMassPaymentToAccountNumberOptions | PaparaSingleResult |

#### Kullanım Şekli

```typescript
function createRecurringMassPaymentWithAccountNumber() {
    var result = await client.massPaymentService.createRecurringMassPaymentWithAccountNumber({
      	accountNumber: config.PersonalAccountNumber.toString(),
      	amount: 1,
        turkishNationalId: config.TCKN, //opsiyonel
        currency:1, //opsiyonel
        period:1,
        description: "Unit Test nodejs: RecurringMassPaymentToPaparaNumber",
        executionDay:1
    });
    return result;
}
```


## E-Posta Adresine Düzenli Ödeme Gönderme
Papara'da kayıtlı bir E-posta adresine düzenli para gönderin. Bu işlemi gerçekleştirmek için `MassPayment` servisinde bulunan `CreateRecurringMassPaymentWithEmail` methodunu kullanın. `Email`, `Amount`, `TurkishNationalId`, `Period`, `Currency`, `ExecutionDay` ve `Description` gönderilmelidir.

### RecurringMassPaymentToEmailOptions

| **Değişken Adı** | **Tip**  | **Açıklama**                                                 |
| ---------------- | -------- | ------------------------------------------------------------ |
| Email | string | Ödeme alacak kullanıcının Papara'ya kayıtlı olan e-posta adresi. |
| Amount | decimal | Ödeme işleminin tutarı. Ödemeyi alan kullanıcının hesabına tam olarak bu tutar transfer edilecektir. Üye işyeri hesabına bu rakam artı işlem ücreti yansıtılacaktır.                 |
| TurkishNationalId    | long?   | Ödeme alacak kullanıcının kimlik numarası. Ödeme alacak kullanıcının, Papara sistemindeki kimlik bilgisi ile gönderilen kimlik bilgisinin kontrolünü sağlar. Kimlik bilgileri uyuşmazlığı durumunda işlem gerçekleşmez.                         |
| Currency      | Currency?   | Ödeme yapılacak para birimi.                               |
| Period        | int | Düzenli ödeme talimatları için talimata ait periyot bilgisi.         |
| ExecutionDay  | int | Ödemenin periyot içindeki çalışma günü bilgisi. Günlük olarak verilen talimatlar için bu değer 0 olarak kabul edilir.                           |
| Description   | string | Ödeme alacak kullanıcının göreceği açıklama.                              |

### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için verilen e-posta adresine düzenli ödeme göndermek için kullanılır.

| **Method**      | **Parametreler**                 | **Geri Dönüş Tipi**             |
| --------------- | -------------------------------- | ------------------------------- |
| CreateRecurringMassPaymentWithEmail | RecurringMassPaymentToEmailOptions | PaparaSingleResult |

#### Kullanım Şekli

```typescript
function createRecurringMassPaymentWithEmail () {
    var result = await client.massPaymentService.createRecurringMassPaymentWithEmail ({
      	email: config.PersonalEmail,
      	amount: 1,
        turkishNationalId: config.TCKN, //opsiyonel
        currency:1, //opsiyonel
        period:1,
        description: "Unit Test nodejs: RecurringMassPaymentToEmail",
        executionDay:1
    });
    return result;
}
```

## Telefon Numarasına Düzenli Gönderme

Papara'da kayıtlı telefon numarasına düzenli para gönderin. Bu işlemi gerçekleştirmek için `MassPayment` servisinde bulunan `CreateRecurringMassPaymentWithPhoneNumber` methodunu kullanın. `PhoneNumber`, `Amount`, `ExecutionDay`, `Description`  ve `Period` gönderilmelidir.

### RecurringMassPaymentToPhoneNumberOptions

| **Değişken Adı** | **Tip**  | **Açıklama**                                                 |
| ---------------- | -------- | ------------------------------------------------------------ |
| PhoneNumber | string | Ödeme alacak kullanıcının Papara'ya kayıtlı olan cep telefonu numarası. Ülke kodu içermeli ve + ile başlamalıdır. |
| Amount | decimal | Ödeme işleminin tutarı. Ödemeyi alan kullanıcının hesabına tam olarak bu tutar transfer edilecektir. Üye işyeri hesabına bu rakam artı işlem ücreti yansıtılacaktır.                 |
| TurkishNationalId    | long?   | Ödeme alacak kullanıcının kimlik numarası. Ödeme alacak kullanıcının, Papara sistemindeki kimlik bilgisi ile gönderilen kimlik bilgisinin kontrolünü sağlar. Kimlik bilgileri uyuşmazlığı durumunda işlem gerçekleşmez.                         |
| Currency      | Currency?   | Ödeme yapılacak para birimi.                               |
| Period        | int | Düzenli ödeme talimatları için talimata ait periyot bilgisi.         |
| ExecutionDay  | int | Ödemenin periyot içindeki çalışma günü bilgisi. Günlük olarak verilen talimatlar için bu değer 0 olarak kabul edilir.                           |
| Description   | string | Ödeme alacak kullanıcının göreceği açıklama.                              |


### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için verilen telefon numarasına düzenli ödeme göndermek için kullanılır.

| **Method**      | **Parametreler**                 | **Geri Dönüş Tipi**             |
| --------------- | -------------------------------- | ------------------------------- |
| CreateRecurringMassPaymentWithPhoneNumber | RecurringMassPaymentToPhoneNumberOptions | PaparaSingleResult |

#### Kullanım Şekli

```typescript
function createRecurringMassPaymentWithPhoneNumber  () {
    var result = await client.massPaymentService.createRecurringMassPaymentWithPhoneNumber  ({
      	phoneNumber: config.PersonalPhoneNumber,
      	amount: 1,
        turkishNationalId: config.TCKN, //optional
        currency:1, //optional
        period:1,
        executionDay:1,
        description: "Unit Test nodejs: RecurringMassPaymentToPhoneNumber"
        
    });
    return result;
}
```

## Olası Hatalar ve Hata Kodları

| **Hata Kodu** | **Hata Açıklaması**                                          |
| ------------- | ------------------------------------------------------------ |
| 100           | Kullanıcı bulunamadı                                         |
| 105           | Yetersiz bakiye                                              |
| 107           | Alıcı bakiye limitini aşıyor. Basit hesaplar için mümkün olan en yüksek bakiye 750 TL'dir. |
| 111           | Alıcı aylık işlem limitini aşıyor. Basit hesaplar tanımlı kaynaktan aylık toplam 2000 TL ödeme alabilir. |
| 133           | MassPaymentID yakın zamanda kullanıldı.                      |
| 398           | Döviz göndermek istediğin kullanıcı onaylı hesaba sahip olmadığı için işlemin gerçekleştirilemedi.|  
| 997           | Ödemeleri dağıtma yetkiniz yok. Müşteri temsilcinizle iletişime geçebilir ve üye iş yeri hesabınıza bir ödeme dağıtım tanımı talep edebilirsiniz. |
| 998           | Gönderdiğiniz parametreler beklenen formatta değil. Örnek: Müşteri numarası 10 haneden az. Bu durumda, hata mesajı format hatasının ayrıntılarını içerir. |
| 999           | Papara sisteminde bir hata oluştu.                           |


# <a name="payments">Ödeme Alma</a> 

Ödeme alma, oluşturma veya listeleme ve geri ödeme için ödeme hizmeti kullanılacaktır. Ödeme butonunu kullanıcılara göstermeden önce üye işyeri Papara'da bir ödeme işlemi oluşturmalıdır. Ödeme kayıtları zamana bağlıdır. Son kullanıcı tarafından tamamlanmayan ve ödenmeyen işlem kayıtları 1 saat sonra Papara sisteminden silinir. Tamamlanan ödeme kayıtları asla silinmez ve her zaman API ile sorgulanabilir.

## Ödeme Bilgilerine Erişim

Ödeme bilgilerini döndürür. Bu işlemi gerçekleştirmek için `Payment` servisinde bulunan `getPayment` methodunu kullanın. `id` gönderilmelidir.

### Payment Model

`Payment` sınıfı, `Payment` servisi tarafından API'den dönen ödeme değerlerini eşleştirmek için kullanılır.

| **Değişken Adı**         | **Tipi** | **Açıklama**                                                 |
| ------------------------ | -------- | ------------------------------------------------------------ |
| merchant                 | Account  | Üye iş yerlerini alır veya belirler                          |
| id                       | string   | ID'yi alır veya belirler                                     |
| CreatedAt                | date     | Ödemenin oluşturulma tarihini alır veya belirler             |
| merchantId               | string   | Üye iş yeri ID'sini alır veya belirler                       |
| userId                   | string   | Kullanıcı ID'sini alır veya belirler                         |
| paymentMethod            | number   | Ödeme Yöntemini alır veya belirler. <br />0 - Kullanıcı, mevcut Papara bakiyesiyle işlemi tamamladı <br />1 - Kullanıcı, işlemi daha önce tanımlanmış bir banka / kredi kartı ile tamamladı. <br />2 - Kullanıcı, mobil ödeme yoluyla işlemi tamamladı. |
| paymentMethodDescription | string   | Ödeme yöntemi açıklamasını alır veya belirler.               |
| referenceId              | string   | Referans numarasını alır veya belirler.                      |
| orderDescription         | string   | Sipariş açıklamasını alır veya belirler.                     |
| status                   | number   | Ödeme durumunu alır veya belirler.<br /> 0 - Bekleniyor, ödeme henüz yapılmadı. <br />1 - Ödeme yapıldı, işlem tamamlandı. 2 - İşlemler üye işyeri tarafından iade edildi. |
| statusDescription        | string   | Ödeme durumu açıklamasını alır veya belirler                 |
| amount                   | number   | Ödeme tutarını alır veya belirler                            |
| fee                      | number   | Ödeme hizmet bedelini alır veya belirler                     |
| currency                 | number   | Ödeme yapılacak para birimini alır veya belirler. Değerler “0”,  “1”, “2” veya  “3” olabilir. |
| notificationUrl          | string   | Bildirim URL'ini alır veya belirler.                         |
| notificationDone         | boolean  | Bildirimin yapılıp yapılmadığını alır veya belirler.         |
| redirectUrl              | string   | Yönlendirme URL'ini alır veya belirler.                      |
| raymentUrl               | string   | Ödeme URL'ini alır veya belirler.                            |
| merchantSecretKey        | string   | Üye iş yeri gizli anahtarını alır veya belirler.             |
| returningRedirectUrl     | string   | Geri dönen yönlendirme URL'ini alır veya belirler.           |
| turkishNationalId        | number   | TC kimlik numarasını alır veya belirler.                     |

### PaymentGetOptions

`PaymentGetOptions` ödeme bilgilerine ulaşırken parametre olarak kullanılır

| **Değişken Adı** | **Tipi** | **Açıklama**                               |
| ---------------- | -------- | ------------------------------------------ |
| id               | string   | Benzersiz ödeme ID'sini alır veya belirler |

### Servis Methodu

#### Kullanım Amacı

Ödeme ve bakiye bilgilerine erişmek için kullanılır

| **Method** | **Params**        | **Return Type**             |
| ---------- | ----------------- | --------------------------- |
| getPayment | PaymentGetOptions | PaparaSingleResult<Payment> |

#### Kullanım Şekli

```typescript
function getPayment() {
    var paymentResult = await client.paymentService.getPayment({
		id: "PAYMENT_ID_HERE"
    });
    return result;
}
```

## Referans Numarasına Göre Ödeme Bilgilerine Erişim

Ödeme bilgilerini döndürür. Bu işlemi gerçekleştirmek için `Payment` servisinde bulunan `getByReference` methodunu kullanın. `referenceId` gönderilmelidir.

### PaymentGetByReferenceOptions

`PaymentGetOptions` ödeme bilgilerine ulaşırken parametre olarak kullanılır

| **Değişken Adı** | **Tipi** | **Açıklama**                                 |
| ---------------- | -------- | -------------------------------------------- |
| referenceId      | string   | Ödeme referans numarasını alır veya belirler |

### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için ödeme ve bakiye bilgilerine erişmek istenildiğinde kullanılır.

| **Method**     | **Params**                   | **Return Type**             |
| -------------- | ---------------------------- | --------------------------- |
| getByReference | PaymentGetByReferenceOptions | PaparaSingleResult<Payment> |

#### Kullanım Şekli

```typescript
function getByReference() {
    var payment = await client.paymentService.getByReference({
    	referenceId: 123456
  	});
    return result;
}
```



## Ödeme Oluşturma

Yeni bir ödeme kaydı oluşturur. Bu işlemi gerçekleştirmek için `Payment` servisinde bulunan `createPayment`  methodunu kullanın. `amount`, `referenceId`, `orderDescription`, `notificationUrl` ve `redirectUrl` sağlanmalıdır.

### PaymentCreateOptions

`PaymentCreateOptions` ödeme oluştururken parametre olarak kullanılır

| **Değişken Adı**  | **Tipi** | **Açıklama**                                                 |
| ----------------- | -------- | ------------------------------------------------------------ |
| amount            | number   | Ödeme yapılacak miktarı alır veya belirler. Ödeme işleminin tutarı. Tam olarak bu tutar ödemeyi yapan kullanıcının hesabından alınacak ve bu tutar ödeme ekranında kullanıcıya gösterilecektir. Miktar alanı minimum 1.00, maksimum 500000.00 olabilir |
| referenceId       | string   | Referans ID'sini alır veya belirler. Üye işyeri sistemindeki ödeme işleminin referans bilgileridir. İşlem, Papara'ya gönderildiği gibi sonuç bildirimlerinde değiştirilmeden üye işyerine iade edilecektir. 100 karakterden fazla olmamalıdır. Bu alanın benzersiz olması gerekmez ve Papara böyle bir kontrol yapmaz |
| orderDescription  | string   | Sipariş açıklamasını alır veya belirler. Ödeme işleminin açıklamasıdır. Gönderilen bilgi, Papara ödeme sayfasında kullanıcıya gösterilecektir. Kullanıcı tarafından başlatılan işlemi doğru bir şekilde bildiren bir tanıma sahip olmak, başarılı ödeme şansını artıracaktır. |
| notificationUrl   | string   | Bildirim URL'sini alır veya belirler. Ödeme bildirim isteklerinin (IPN) gönderileceği URL'dir.  "NotificationUrl" ile gönderilen URL'ye Papara, ödeme tamamlandıktan hemen sonra bir HTTP POST isteği ile ödemenin tüm bilgilerini içeren bir ödeme nesnesi gönderecektir. "NotificationURL" ile gelen ödeme bildiriminin (IPN) Papara'nın IP adreslerinden geldiğinden emin olunuz. Gönderilen JSON obje içerisindeki "id" alanı ile HTTP GET /payments API metoduna istek yaparak doğrulayabilirsiniz. Üye işyeri bu talebe 200 OK döndürürse tekrar bildirim yapılmayacaktır. Üye işyeri bu bildirime 200 OK dönmezse, Papara, üye işyeri 200 OK'e dönene kadar 24 saat boyunca ödeme bildirimi (IPN) talepleri yapmaya devam edecektir. |
| redirectUrl       | string   | Yönlendirme URL'sini alır veya belirler. İşlemin sonunda kullanıcının yönlendirileceği URL |
| turkishNationalId | number   | TC kimlik numarasını alır veya belirler. Ödemeyi alacak kullanıcının gönderdiği kimlik bilgilerinin Papara sisteminde kontrolünü sağlar. Kimlik bilgilerinde bir çelişki olması durumunda işlem gerçekleşmeyecektir. |
| currency| number| Ödeme yapılacak para birimini alır veya belirler. Değerler “0”,  “1”, “2” veya  “3” olabilir.|

### Önemli UYARI

"NotificationURL" ile gelen ödeme bildiriminin (IPN) Papara'nın IP adreslerinden geldiğinden emin olunuz. Gönderilen JSON obje içerisindeki "id" alanı ile HTTP GET /payments API metoduna istek yaparak doğrulayabilirsiniz.

### Servis Methodu

#### Kullanım Amacı

Ödeme oluşturmak için kullanılacaktır.

| **Method**    | **Params**           | **Return Type**             |
| ------------- | -------------------- | --------------------------- |
| createPayment | PaymentCreateOptions | PaparaSingleResult<Payment> |

#### Kullanım Şekli

```typescript
function createPayment() {
    var referenceId = uuidv4(); //Gerçek merhcant referansı buraya gelmeli

	var result = await client.paymentService.createPayment({
		amount: 1,
	    notificationUrl: "https://testmerchant.com/notification",
    	orderDescription: "Payment Unit Test",
	    redirectUrl: "https://testmerchant.com/userredirect",
    	referenceId: referenceId,
	    turkishNationalId: config.TCKN
  	});
    return result;
}
```

###  Ödeme Sonucunu Doğrulama 

Kullanıcının işlemi başarıyla tamamlamasını takiben, **kullanıcı üye işyerine yönlendirilmeden önce**, Papara, üye işyerinin ödeme isteği ile birlikte gönderdiği `notificationUrl`'e bir **HTTP POST** isteği yapar.

Yapılan isteğin `body` kısmında, ödeme isteği oluşturma dönen değerin `data` objesi ile aynı yapıda bir JSON objesi bulunacaktır. Örnek:

```json
{
    "merchantId": "123-4564-8484",
    "userId": "123-987-654",
    "paymentMethod": 1,
    "paymentMethodDescription": "Credit/Debit Card",
    "referenceId": "Üye işyeri referans bilgisi",
    "orderDescription": "Kullanıcının ödeme sayfasında göreceği açıklama",
    "status": 1,
    "statusDescription": "Completed",    
    "amount": 99.99,
    "fee": 1.98,
    "currency": "TRY",
    "notificationUrl": "https://www.papara.com/notification",
    "notificationDone": false,
    "redirectUrl": "https://www.papara.com/userredirect",
    "merchantSecretKey": "Üye işyeri panelinde bulunan secret key",
    "paymentUrl": "www.papara.com/pid?6666-5555-ABCD",
    "returningRedirectUrl": "",
    "id": "6666-5555-ABCD",
    "createdAt": "2017-06-09T06:26:15.100Z",
    "turkishNationalId": 12345678901,
}
```

## İade İşlemi 

Üye iş yerinin ödeme ID'siyle tamamlanmış bir ödemesini iade etmesini sağlar. Bu işlemi gerçekleştirmek için `Payment` servisinde bulunan `refund` yöntemini kullanın. `id` gönderilmelidir.

### PaymentRefundOptions

`PaymentRefundOptions` iade oluştururken parametre olarak kullanılır.

| **Değişken Adı** | **Tipi** | **Açıklama**                     |
| ---------------- | -------- | -------------------------------- |
| id               | string   | Ödeme ID'sini alır veya belirler |

### Servis Methodu

#### Kullanım Amacı

Üye iş yeri için bir ödemenin iade edileceği durumlarda kullanılır.

| **Method** | **Params**           | **Return Type**         |
| ---------- | -------------------- | ----------------------- |
| refund     | PaymentRefundOptions | PaparaSingleResult<any> |

#### Kullanım Şekli

```typescript
function refund() {
    var result = await client.paymentService.refund({
		id: "PAYMENT_ID_HERE"
    });
    return result;
}
```

## Ödemeleri Listeleme

Üye iş yerinin tamamlanan ödemelerini sıralı bir şekilde listeler. Bu işlemi gerçekleştirmek için `Payment` servisinde buluan `list` methodunu kullanın. `pageIndex`ve `pageItemCount ` gönderilmelidir.

### PaymentListItem

`PaymentListItem` is used by payment service to match returning completed payment list values list API.

| **Değişken Adı**         | **Tipi** | **Açıklama**                                                 |
| ------------------------ | -------- | ------------------------------------------------------------ |
| id                       | string   | Ödeme ID'sini alır veya belirler.                            |
| createdAt                | Date     | Ödemenin yapıldığı tarihi alır veya belirler.                |
| merchantId               | string   | Üye iş yeri ID'sini alır veya belirler                       |
| userId                   | string   | Kullanıcı ID'sini alır veya belirler.                        |
| paymentMethod            | number   | Ödeme Yöntemini alır veya belirler<br />0 - Kullanıcı, mevcut Papara bakiyesiyle işlemi tamamladı <br />1 - Kullanıcı, işlemi daha önce tanımlanmış bir banka / kredi kartı ile tamamladı. <br />2 - Kullanıcı, mobil ödeme yoluyla işlemi tamamladı. |
| paymentMethodDescription | string   | Ödeme açıklamasını alır veya belirler.                       |
| referenceId              | string   | Referans ID'yi alır veya belirler.                           |
| orderDescription         | string   | Sipariş açıklamasını alır veya belirler.                     |
| status                   | number   | Ödeme durumunu alır veya belirler. <br />0 - Bekleniyor, ödeme henüz yapılmadı. <br />1 - Ödeme yapıldı, işlem tamamlandı. <br />2 - İşlemler üye işyeri tarafından iade edilir. |
| statusDescription        | string   | Ödeme durum açıklamasını alır veya belirler.                 |
| amount                   | number   | Ödeme tutarını alır veya belirler.                           |
| fee                      | number   | Hizmet bedelini alır veya belirler.                          |
| currency                 | number   | Ödemenin yapıldığı para birimini alır veya belirler. Olabilecek değerler “0”,  “1”, “2” veya “3” |
| notificationUrl          | string   | Bildirim URL'ini alır veya belirler                          |
| notificationDone         | boolean  | Bildirimin yapılıp yapılmadığını alır veya belirler          |
| redirectUrl              | string   | Yönlendirme URL'ini alır veya belirler                       |
| paymentUrl               | string   | Ödeme URL'ini alır veya belirler                             |
| merchantSecretKey        | string   | Üye iş yeri gizli anahtarını alır veya belirler              |
| returningRedirectUrl     | string   | Geri dönüş URL'ini alır veya belirler                        |
| turkishNationalId        | number   | TC Kimlik numarasını alır veya belirler                      |

### PaymentListOptions

`PaymentListOptions` `Payment`  servisi tarafından istek parametrelerini sağlamak için kullanılır

| **Değişken Adı** | **Tipi** | **Açıklama**                                                 |
| ---------------- | -------- | ------------------------------------------------------------ |
| pageIndex        | number   | Sayfa dizinini alır veya belirler. Bir sayfada gösterilmek istenen kayıt sayısına (pageItemCount) göre hesaplanan sayfalardan gösterilmek istenen sayfanın indeks numarasıdır. Not: ilk sayfa her zaman 1'dir |
| pageItemCount    | number   | Sayfa öğesi sayısını alır veya belirler. Bir sayfada gösterilmesi istenen kayıtların sayısıdır. |

### Servis Methodu

#### Kullanım Amacı

Üye iş yerleri için tamamlanmış ödemeleri yeniden eskiye doğru sıralayacal bir şekilde görüntülemek için kullanılır

| **Method** | **Params**         | **Return Type**                   |
| ---------- | ------------------ | --------------------------------- |
| list       | PaymentListOptions | PaparaListResult<PaymentListItem> |

#### Kullanım Şekli

```typescript
function list() {
    var paymentListResult = await client.paymentService.list({
	    pageIndex: 1,
    	pageItemCount: 20
 	});
    return result;
}
```

## Olası Hatalar ve Hata Kodları

| **Hata Kodu** | **Hata Açıklaması**                                          |
| ------------- | ------------------------------------------------------------ |
| 997           | Ödemeleri kabul etme yetkiniz yok. Müşteri temsilcinizle iletişime geçmelisiniz. |
| 998           | Gönderdiğiniz parametreler beklenen formatta değil. Örnek: zorunlu alanlardan biri sağlanmamıştır. |
| 999           | Papara sisteminde bir hata oluştu.                           |

# <a name="validation">Doğrulama</a> 

Bir son kullanıcıyı doğrulamak için doğrulama servisi kullanılacaktır. Doğrulama, hesap numarası, e-posta adresi, telefon numarası, ulusal kimlik numarası ile yapılabilir.

## Kullanıcı ID'si ile Doğrulama

Papara kullanıcı ID'si ile kullanıcıları doğrulamak için kullanılır. Bu işlemi gerçekleştirmek için `Validation` servisinde bulunan `validateById`methodunu kullanın. `userId` gönderilmelidir.

### Validation Model           

`Validation` sınıfı, `Validation` servisi tarafından API'den dönen kullanıcı değerini eşleştirmek için kullanılır

| **Değişken Adı** | **Tipi** | **Açıklama**                                          |
| ---------------- | -------- | ----------------------------------------------------- |
| userId           | string   | Kullanıcı ID'sini alır veya belirler.                 |
| firstName        | string   | Kullanıcının ismini alır veya belirler.               |
| lastName         | string   | Kullanıcının soyismini alır veya belirler.            |
| email            | string   | Kullanıcının e-posta adresini alır veya belirler.     |
| phoneNumber      | string   | Kullanıcının telefon numarasını alır veya belirler.   |
| tckn             | number   | Kullanıcının TC kimlik numarasını alır veya belirler. |
| accountNumber    | number   | Kullanıcının hesap numarasını alır veya belirler.     |

### ValidationByIdOptions 

`ValidationByIdOptions` `Validation` servisi tarafından istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı** | **Tipi** | **Açıklama**                             |
| :--------------- | -------- | ---------------------------------------- |
| userId           | string   | Kullanıcının ID'sini alır veya belirler. |

### Servis Methodu

#### Kullanım Amacı

Kullanıcı ID'si ile doğrulama yapılmak istenildiğinde kullanılır

| **Method**   | **Params**            | **Return Type**                |
| ------------ | --------------------- | ------------------------------ |
| validateById | ValidationByIdOptions | PaparaSingleResult<Validation> |

#### Kullanım Şekli

```typescript
function validateById() {
    const result = await client.validationService.validateById({
    	userId: config.PersonalAccountId
  	});
    return result;
}
```

## Hesap Numarası ile Doğrulama

apara hesap numarası ile kullanıcıları doğrulamak için kullanılır. Bu işlemi gerçekleştirmek için `Validation` servisinde bulunan `validateByAccountNumber` methodunu kullanın. `accountNumber` gönderilmelidir.

### ValidationByAccountNumberOptions

`ValidationByAccountNumberOptions` `Validation ` servisi tarafından istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı** | **Tipi** | **Açıklama**                                |
| ---------------- | -------- | ------------------------------------------- |
| accountNumber    | number   | Papara hesap numarasını alır veya belirler. |

### Servis Methodu

#### Kullanım Amacı

Papara hesap numarası ile doğrulama yapılmak istenildiğinde kullanılır

| **Method**              | **Params**                       | **Return Type**                |
| ----------------------- | -------------------------------- | ------------------------------ |
| validateByAccountNumber | ValidationByAccountNumberOptions | PaparaSingleResult<Validation> |

#### Kullanım Şekli

```typescript
function validateByAccountNumber() {
    const result = await client.validationService.validateByAccountNumber({
    	accountNumber: config.PersonalAccountNumber
  	});
    return result;
}
```

## Telefon Numarası ile Doğrulama

Paparaya kayıtlı telefon numarası ile kullanıcıları doğrulamak için kullanılır. Bu işlemi gerçekleştirmek için `Validation` servisinde bulunan `validateByPhoneNumber`methodunu kullanın. `phoneNumber` gönderilmelidir.

### ValidationByPhoneNumberOptions

`ValidationByPhoneNumberOptions` `Validation` servisi tarafından istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı** | **Tipi** | **Açıklama**                                                |
| ---------------- | -------- | ----------------------------------------------------------- |
| phoneNumber      | string   | Paparaya kayıtlı olan telefon numarasını alır veya belirler |

### Servis Methodu

#### Kullanım Amacı

Paparaya kayıtlı telefon numarası ile doğrulama yapılmak istenildiğinde kullanılır

| **Method**            | **Params**                     | **Return Type**                |
| --------------------- | ------------------------------ | ------------------------------ |
| validateByPhoneNumber | ValidationByPhoneNumberOptions | PaparaSingleResult<Validation> |

#### Kullanım Şekli

```typescript
function validateByPhoneNumber() {
    const result = await client.validationService.validateByPhoneNumber({
    	phoneNumber: config.PersonalPhoneNumber
  	});
    return result;
}
```

## E-Posta Adresi ile Doğrulama

Paparaya kayıtlı e-posta adresi ile kullanıcıları doğrulamak için kullanılır. Bu işlemi gerçekleştirmek için `Validation` servisinde bulunan `validateByEmail`methodunu kullanın. `email` gönderilmelidir.

### ValidationByEmailOptions

`ValidationByEmailOptions` `Validation`servisi tarafından istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı** | **Tipi** | **Açıklama**                                              |
| ---------------- | -------- | --------------------------------------------------------- |
| email            | string   | Paparaya kayıtlı olan e-posta adresini alır veya belirler |

### Servis Methodu

#### Kullanım Amacı

Returns end user information for validation by given user e-mail address

| **Method**      | **Params**               | **Return Type**                |
| --------------- | ------------------------ | ------------------------------ |
| validateByEmail | ValidationByEmailOptions | PaparaSingleResult<Validation> |

#### Kullanım Şekli

```typescript
function validateByEmail() {
    const result = await client.validationService.validateByEmail({
    	email: config.PersonalEmail
  	});
    return result;
}
```

## TC Kimlik Numarası ile Doğrulama

Paparaya kayıtlı TC kimlik numarası ile kullanıcıları doğrulamak için kullanılır. Bu işlemi gerçekleştirmek için `Validation` servisinde bulunan `validateByTckn`methodunu kullanın. `tckn` gönderilmelidir.

### ValidationByTcknOptions

`ValidationByPhoneNumberOptions` `Validation`servisi tarafından istek parametrelerini sağlamak için kullanılır.

| **Değişken Adı** | **Tipi** | **Açıklama**                            |
| ---------------- | -------- | --------------------------------------- |
| tckn             | number   | TC Kimlik numarasını alır veya belirler |

### Servis Methodu

#### Kullanım Amacı

Paparaya kayıtlı TC kimlik numarası ile doğrulama yapılmak istenildiğinde kullanılır

| **Method**     | **Params**              | **Return Type**                |
| -------------- | ----------------------- | ------------------------------ |
| validateByTckn | ValidationByTcknOptions | PaparaSingleResult<Validation> |

#### Kullanım Şekli

```typescript
function validateByTckn() {
    const result = await client.validationService.validateByTckn({
    	tckn: config.TCKN
  	});
    return result;
}
```



# <a name="response-types">Geri Dönüş Tipleri</a>

Bu bölüm, API'den dönüş değerleri hakkında teknik bilgiler içerir.

## PaparaSingleResult

Papara Single Result tipi. API'ye gönderilen ve API'den dönen nesne veri tiplerini işler.

| **Değişken Adı** | **Tipi**      | **Açıklama**                                                 |
| ---------------- | ------------- | ------------------------------------------------------------ |
| data             | T             | Genel nesne dönüş tipi. Verilen nesne tipi değerini döndürür |
| succeeded        | boolean       | İşlemin başarıyla sonuçlanıp sonuçlanmadığını gösteren bir değer alır veya belirler |
| error            | PaparaError   | İşlemin başarısız olup olmadığını gösteren bir değer alır veya belirler |
| result           | PaparaSuccess | Başarılı olan işlem sonucunu alır veya belirler.             |

## PaparaArrayResult

Papara Array tipi. API'ye gönderilen ve API'den dönen dizi veri tiplerini işler.

| **Değişken Adı** | **Tipi**      | **Açıklama**                                                 |
| ---------------- | ------------- | ------------------------------------------------------------ |
| data             | T[]           | Genel dizi dönüş tipi. Verilen dizi tipini döndürür          |
| succeeded        | boolean       | İşlemin başarıyla sonuçlanıp sonuçlanmadığını gösteren bir değer alır veya belirler |
| error            | PaparaError   | İşlemin başarısız olup olmadığını gösteren bir değer alır veya belirler |
| result           | PaparaSuccess | Başarılı olan işlem sonucunu alır veya belirler.             |

## PaparaListResult

Papara List tipi. API'ye gönderilen ve API'den dönen liste veri tiplerini işler.

| **Değişken Adı** | **Tipi**        | **Açıklama**                                                 |
| ---------------- | --------------- | ------------------------------------------------------------ |
| data             | PaparaPaging<T> | Genel liste dönüş tipi. Verilen liste tipi değerini döndürür |
| succeeded        | boolean         | İşlemin başarıyla sonuçlanıp sonuçlanmadığını gösteren bir değer alır veya belirler |
| error            | PaparaError     | İşlemin başarısız olup olmadığını gösteren bir değer alır veya belirler |
| result           | PaparaSuccess   | Başarılı olan işlem sonucunu alır veya belirler.             |

## PaparaPaging

Papara paging type. Handles paginated data sending to and returning from API.

| **Değişken Adı** | **Tipi** | **Açıklama**                                                 |
| ---------------- | -------- | ------------------------------------------------------------ |
| items            | T[]      | API'den dönen öğeleri alır veya ayarlar. Verilen nesne tipinin listesini döndürür |
| page             | number   | Sayfa sayısını alır veya belirler                            |
| pageItemCount    | number   | Sayfadaki öge sayısını alır veya belirler                    |
| totalItemCount   | number   | Toplam öge sayısını alır veya belirler                       |
| totalPageCount   | number   | Toplam sayfa sayısını alır ve belirler                       |
| pageSkip         | number   | Kaç sayfanın atlanacağını alır veya belirler                 |

## PaparaSuccess

Papara Service Error Result type. Error responses returning from API.

| **Değişken Adı** | **Tipi** | **Açıklama**                                     |
| ---------------- | -------- | ------------------------------------------------ |
| message          | string   | Başarılı işlem sonuç mesajını alır veya belirler |
| code             | number   | Başarılı işlem sonuç kodunu alır veya belirler   |

## PaparaError

Papara Service Success Result type. Success responses returning from API.

| **Değişken Adı** | **Tipi** | **Açıklama**                      |
| ---------------- | -------- | --------------------------------- |
| message          | string   | Hata mesajını alır veya belirler  |
| code             | number   | Hata kodlarını alır veya belirler |

 
