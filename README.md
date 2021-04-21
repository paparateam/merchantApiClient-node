# Table of Contents

<a href="#intro">Intro</a>

<a href="#enums">Enums</a>

<a href="#account">Account</a>

<a href="#banking">Banking</a>

<a href="#cash-deposit">Cash Deposit</a>

<a href="#mass-payment">Mass Payment</a>

<a href="#payments">Payments</a>

<a href="#validation">Validation</a>

<a href="#response-types">Response Types</a>

# <a name="intro">Intro</a> 

Integrating Papara into your software requires following;

1. Obtain your API Key. So Papara can authenticate integration’s API requests. To obtain your API Key, follow https://merchant.test.papara.com/ URL. After sucessfully logged in, API Key can be viewed on https://merchant.test.papara.com/APIInfo 

2. Install client library. So your integration can interact with the Papara API. Install operations are like following.

# Configuration

Sample usage:

```js
const client = new PaparaClient("YOUR_API_KEY");
const result = await client.accountService.getAccount();
```

## Installation

```bash
# Install via npm
npm install --save @papara/papara
```
or 

```bash
# Or install via yarn
yarn add @papara/papara
```

# <a name="enums">Enums</a>

# CashDepositProvisionStatus

When a cash deposit request was made, following statuses will return and display the status of provision.

| **Key**         | **Value** | **Description**                      |
| --------------- | --------- | ------------------------------------ |
| Pending         | 0         | Cash deposit is pending provision.   |
| Complete        | 1         | Cash Deposit is completed            |
| Cancel          | 2         | Cash Deposit is cancelled            |
| ReadyToComplete | 3         | Cash Deposit is ready for completion |

 

# Currency

All currencies on the API are listed below.

| **Key** | **Value** | **Description** |
| ------- | --------- | --------------- |
| TRY     | 0         | Turkish Lira    |
| USD     | 1         | U.S Dollar      |
| EUR     | 2         | Euro            |

 

# EntryType

Entry types are used in ledgers and cash deposits in order to track the money in the operation. Possible entry types are listed below.

| **Key**                       | **Value** | **Description**                                              |
| ----------------------------- | --------- | ------------------------------------------------------------ |
| BankTransfer                  | 1         | Bank Transfer: Cash deposit or withdrawal                    |
| CorporateCardTransaction      | 2         | Papara Corporate Card Transaction:  Transaction which was operated by corporation card assigned to merchant |
| LoadingMoneyFromPhysicalPoint | 6         | Loading Money From Physical Point: Cash  deposit operation from contracted location |
| MerchantPayment               | 8         | Merchant Payment: Checkout via Papara                        |
| PaymentDistribution           | 9         | Payment Distribution: Masspayment via  papara                |
| EduPos                        | 11        | Offline payment. EDU POS via Papara                          |

 

# PaymentMethod

Three types of payment is accepted in the system. Possible payment methods are listed below. 

| **Key**       | **Value** | **Description**        |
| ------------- | --------- | ---------------------- |
| PaparaAccount | 0         | Papara Account Balance |
| Card          | 1         | Registered Credit Card |
| Mobile        | 2         | Mobile Payment         |

 

# PaymentStatus

After a payment was done, API returns the payment status which are shown below.

| **Key**   | **Value** | **Description**            |
| --------- | --------- | -------------------------- |
| Pending   | 0         | Payment waiting            |
| Completed | 1         | User completed the payment |
| Refunded  | 2         | Order refunded             |

# <a name="account">Account</a>

This part contains the technical integration information prepared for the use of the account and balance information of the merchant. Account and balance information on Papara account can be retrieved by Account service. Developers can also retrieve the balance history, which contains a list of transactions that contributed to the balance.

## Get Account Information

Returns the merchant account and balance information. Balance information contains current balance, available funds and unavailable funds, whilst account information contains brand name and full title of the merchant. To perform this operation use `getAccount` method on `Account` service. 

### Account Model

`Account` contains account information that returns from API.

| **Variable Name**   | **Type** | **Description**                        |
| ------------------- | -------- | -------------------------------------- |
| LegalName           | string   | Gets or sets merchant’s company title. |
| BrandName           | string   | Gets or sets brand name.               |
| AllowedPaymentTypes | any      | Gets or sets allowed payment types.    |
| Balances            | any      | Gets or sets account balances          |

### AllowedPaymentType

 `AllowedPaymentType` displays allowed payment types.

| **Variable Name** | **Type** | **Description**                                              |
| ----------------- | -------- | ------------------------------------------------------------ |
| PaymentMethod     | number   | Returns payment method.<br />0 - Papara Account Balance  <br />1 - Credit/Debit Card <br />2 - Mobile - Mobile Payment. |

### AccountBalance

`AccountBalance` shows current balance figures and lists three types of balances and general currency.

| **Variable Name** | **Type** | **Description**                |
| ----------------- | -------- | ------------------------------ |
| currency          | number   | Gets or sets currency          |
| totalBalance      | number   | Gets or sets total balance     |
| lockedBalance     | number   | Gets or sets locked balance    |
| availableBalance  | number   | Gets or sets available balance |

### Service Method

#### Purpose

Return account information and current balance for authorized merchant.

| **Method** | **Params** | **Return Type**             |
| ---------- | ---------- | --------------------------- |
| getAccount | None       | PaparaSingleResult<Account> |

#### Usage

``` typescript
function getAccount() {
    const result = await client.accountService.getAccount();
    return result;
}
```



## List Ledgers

Returns the merchant account history (list of transactions) in paged format. This method is used for listing all transactions made for a merchant including resulting balance for each transaction.  To perform this operation use `listLedgers` method on `Account` service. `startDate` and `endDate` should be provided.

### AccountLedger

`AccountLedger` represents a transaction itself that returns from API.

| **Variable Name**   | **Type**     | **Description**                                              |
| ------------------- | ------------ | ------------------------------------------------------------ |
| id                  | number       | Gets or sets merchant ID                                     |
| createdAt           | Date         | Gets or sets created date of a ledger                        |
| entryType           | EntryType    | Gets or sets entry type                                      |
| entryTypeName       | string       | Gets or sets entry type name                                 |
| amount              | number       | Gets or sets amount                                          |
| fee                 | number       | Gets or sets fee                                             |
| currency            | number       | Gets or sets currency                                        |
| currencyInfo        | CurrencyInfo | Gets or sets currency information                            |
| resultingBalance    | number       | Gets or sets resulting balance                               |
| description         | string       | Gets or sets description                                     |
| massPaymentId       | string       | Gets or sets mass payment Id. It is the  unique value sent by the merchant to prevent duplicate repetition in payment  transactions. It is displayed in transaction records of masspayment type in  account transactions to ensure control of the transaction. It will be null in  other payment types. |
| checkoutPaymentId   | string       | Gets or sets checkout payment ID. It is  the ID field in the data object in the payment record transaction. It is the  unique identifier of the payment transaction. It is displayed in transaction  records of checkout type in account transactions. It will be null in other  payment types. |
| checkoutReferenceID | string       | Gets or sets checkout reference ID. This  is the referenceId field sent when creating the payment transaction record.  It is the reference information of the payment transaction in the merchant  system. It is displayed in transaction records of checkout type in account  transactions. It will be null in other payment types |

### CurrencyInfo

`CurrencyInfo` represents the currency information available in a ledger that returns from API.

| **Variable Name**    | **Type** | **Description**                                |
| -------------------- | -------- | ---------------------------------------------- |
| currencyEnum         | Currency | Gets or sets currency type.                    |
| symbol               | string   | Gets or sets currency symbol                   |
| code                 | string   | Gets or sets currency code                     |
| preferredDisplayCode | string   | Gets or sets currency's preferred display code |
| name                 | string   | Gets or sets currency name                     |
| isCryptoCurrency     | boolean  | Gets or sets if it is a cryptocurrency or not  |
| precision            | number   | Gets or sets currency precision                |
| iconUrl              | string   | Gets or sets currency icon URL                 |

### LedgerListOptions Model

`LedgerListOptions` is used by account service for providing request parameters for ledger listing operation. 

| **Variable Name** | **Type** | **Description**                                              |
| ----------------- | -------- | ------------------------------------------------------------ |
| startDate         | string   | Gets or sets start date for transactions                     |
| endDate           | string   | Gets or sets end date for transactions                       |
| entryType         | number   | Gets or sets entry types                                     |
| accountNumber     | number   | Gets or sets merchant account number                         |
| page              | number   | Gets or sets the requested page number. If  the requested date has more than 1 page of results for the requested  pageSize, use this to iterate through pages |
| pageSize          | number   | Gets or sets number of elements you want  to receive per request page. Min=1, Max=50 |

### Service Method

#### Purpose

Returns list of ledgers for authorized merchant.

| **Method**  | **Params**        | **Return Type**                 |
| ----------- | ----------------- | ------------------------------- |
| listLedgers | LedgerListOptions | PaparaListResult<AccountLedger> |

#### Usage

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

## Get Settlement

Calculates the count and volume of transactions within the given time period. To perform this operation use `GetSettlement` method on `Account` service. `startDate` and `endDate` should be provided.

### Settlement Model

`Settlement` is used by account service to match returning settlement values API.

| **Variable Name** | **Type** | **Description**                 |
| ----------------- | -------- | ------------------------------- |
| count             | number   | Gets or sets transaction count  |
| volume            | number   | Gets or sets transaction volume |

### SettlementGetOptions Model

`SettlementGetOptions` is used by account service for providing settlement request parameters.

| **Variable Name** | **Type**  | **Description**                          |
| ----------------- | --------- | ---------------------------------------- |
| startDate         | string    | Gets or sets start date for transactions |
| endDate           | string    | Gets or sets end date for transactions   |
| entryType         | EntryType | Gets or sets entry types                 |

### Service Method

#### Purpose

Returns settlement for authorized merchant.

| **Method**    | **Params**           | **Return Type**                |
| ------------- | -------------------- | ------------------------------ |
| getSettlement | SettlementGetOptions | PaparaSingleResult<Settlement> |

#### Usage

``` typescript
function listLedgers() {
	const result = await client.accountService.getSettlement({
    	startDate: new Date(2020, 1, 1).toISOString(),
    	endDate: new Date().toISOString()
 	});
	return result;
}
```



# <a name="banking">Banking</a> 

This part contains technical integration information prepared for merchants those who want to quickly and securely list their bank accounts with Papara and/or create a withdrawal request to their bank accounts.

## Get Bank Accounts

Retrieves registered bank accounts of the merchant. To perform this operation use `getBankAccounts` method on `Banking` service.

### BankAccount Model

`BankAccount` contains bank account information.

| **Variable Name** | **Type** | **Description**                         |
| ----------------- | -------- | --------------------------------------- |
| bankAccountId     | number   | Gets or sets merchant's bank account ID |
| bankName          | string   | Gets or sets merchant bank name         |
| branchCode        | string   | Gets or sets merchant branch code       |
| iban              | string   | Gets or sets IBAN Number                |
| accountCode       | string   | Gets or sets merchant account code      |
| description       | string   | Gets or sets description                |
| currency          | string   | Gets or sets currency                   |

### Service Method

#### Purpose

Returns bank accounts for authorized merchant.

| **Method**      | **Params** | **Return Type**                |
| --------------- | ---------- | ------------------------------ |
| getBankAccounts |            | PaparaArrayResult<BankAccount> |

#### Usage

``` typescript 
function getBankAccounts() {
    var result = await client.bankingService.getBankAccounts();
    return result;
}
```

## Withdrawal

Generates withdrawal requests for merchants. To perform this operation use `withdrawal` method on `Banking` service.

### BankingWithdrawalOptions 

`BankingWithdrawalOptions` is used by banking service for providing request parameters.

| **Variable Name** | **Type** | **Description**                                              |
| ----------------- | -------- | ------------------------------------------------------------ |
| bankAccountId     | number   | Gets or sets target bank account id which  money will be transferred to when withdrawal is completed.It will be obtained  as a result of the request to list bank accounts. |
| amount            | number   | Gets or sets withdrawal amount                               |

### Service Method

#### Purpose

Creates a withdrawal request from given bank account for authorized merchant.

| **Method** | **Params**               | **Return Type**         |
| ---------- | ------------------------ | ----------------------- |
| withdrawal | BankingWithdrawalOptions | PaparaSingleResult<any> |

#### Usage

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

## Possible Errors and Error Codes

| **Error Code** | **Error Description**                          |
| -------------- | ---------------------------------------------- |
| 105            | Insufficient funds.                            |
| 115            | Requested amount is lower then  minimum limit. |
| 120            | Bank account not found.                        |
| 247            | Merchant's account is not active.              |



# <a name="cash-deposit">Cash Deposit</a> 

With the integration of Papara physical point, you can become a money loading point and earn money from which end users can load balance to their Papara accounts. Physical point integration methods should only be used in scenarios where users load cash to Papara accounts.

## Get Cash Deposit Information

Returns cash deposit information. To perform this operation use `getCashDeposit` method on `Cash Deposit` service. `id` should be provided.

### CashDeposit Model

`CashDeposit` is used by cash deposit service to match returning cash deposit values from API

| **Variable Name** | **Type** | **Description**                                       |
| ----------------- | -------- | ----------------------------------------------------- |
| merchantReference | string   | Gets or sets merchant reference code                  |
| id                | number   | Gets or sets cash deposit ID                          |
| createdAt         | Date     | Gets or sets created date of cash deposit             |
| amount            | number   | Gets or sets amount of cash deposit                   |
| currency          | number   | Gets or sets currency of cash deposit                 |
| fee               | number   | Gets or sets fee of cash deposit                      |
| resultingBalance  | number   | Gets or sets resulting balance in  merchant's account |
| description       | string   | Gets or sets description                              |

### CashDepositGetOptions

`CashDepositGetOptions` is used by cash deposit service for providing request parameters

| **Variable Name** | **Type** | **Description**              |
| ----------------- | -------- | ---------------------------- |
| id                | number   | Gets or sets cash deposit ID |

### Service Method

#### Purpose

Returns a cash deposit information

| **Method**     | **Params**            | **Return Type**                 |
| -------------- | --------------------- | ------------------------------- |
| getCashDeposit | CashDepositGetOptions | PaparaSingleResult<CashDeposit> |

####   Usage

``` typescript
function getCashDeposit() {
    const result = await client.cashDepositService.getCashDeposit({
    	id: 123456789 // cash deposit ID
 	 });
    return result;
}
```

## Create Cash Deposit With Phone Number

It deposits money to the user from the physical point. using user’s phone number. To perform this operation use `createWithPhoneNumber` method on `Cash Deposit` service. `phoneNumber`, `amount` and `merchantReference` should be provided.

### CashDepositToPhoneOptions

`CashDepositToPhoneOptions` is used by cash deposit service for providing request parameters.

| **Variable Name** | **Type** | **Description**                                              |
| ----------------- | -------- | ------------------------------------------------------------ |
| phoneNumber       | string   | Gets or sets phone number. The mobile  phone number registered in the Papara account of the user to be loaded with  cash. |
| amount            | number   | Gets or sets amount. The amount of the  cash deposit. This amount will be transferred to the account of the user who  received the payment. The amount to be deducted from the merchant account  will be exactly this number. |
| merchantReference | string   | Gets or sets merchant reference. The  unique value sent by the merchant to prevent false repetitions in cash  loading transactions. If a previously submitted and successful  merchantReference is resubmitted with a new request, the request will fail.  MerchantReference sent with failed requests can be resubmitted. |

### Service Method

#### Purpose

Creates a cash deposit request using end users's phone number.

| **Method**            | **Params**                | **Return Type**                 |
| --------------------- | ------------------------- | ------------------------------- |
| createWithPhoneNumber | CashDepositToPhoneOptions | PaparaSingleResult<CashDeposit> |

#### Usage

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

## Get Cash Deposit By Reference

Returns the information of the money loading process from the physical point with the merchant reference information. To perform this operation use `getCashDepositByReference` method on `Cash Deposit` service. `reference` should be provided.

### CashDepositByReferenceOptions

`CashDepositByReferenceOptions` is used by cash deposit service for providing request parameters.

| **Variable Name** | **Type** | **Description**                                              |
| ----------------- | -------- | ------------------------------------------------------------ |
| reference         | string   | Gets or sets cash deposit reference no.  Reference no is required. |

### Service Method

#### Purpose

Returns a cash deposit object using merchant's unique reference number.

| **Method**                | **Params**                    | **Return Type**                 |
| ------------------------- | ----------------------------- | ------------------------------- |
| getCashDepositByReference | CashDepositByReferenceOptions | PaparaSingleResult<CashDeposit> |

#### Usage

``` typescript
function getCashDepositByReference() {
    var result = await client.cashDepositService.getCashDepositByReference({
    	reference: "78cadfb9-71d1-42dd-9793-84e90af53b07"
 	});
    return result;
}
```

## Create Cash Deposit With Account Number

Deposits money to the user with Papara number from the physical point. To perform this operation use `createWithAccountNumber` on `Cash Deposit` service. `accountNumber`, `amount` and `merchantReference` should be provided.

### CashDepositToAccountNumberOptions

`CashDepositToAccountNumberOptions` is used by cash deposit service for providing request parameters.

| **Variable Name** | **Type** | **Description**                                              |
| ----------------- | -------- | ------------------------------------------------------------ |
| accountNumber     | number   | Gets or sets account number. Papara  account number of the user who will be loaded with cash. |
| amount            | number   | Gets or sets amount. The amount of the  cash deposit. This amount will be transferred to the account of the user who  received the payment. The amount to be deducted from the merchant account  will be exactly this number. |
| merchantReference | string   | Gets or sets merchant reference. The  unique value sent by the merchant to prevent false repetitions in cash  loading transactions. If a previously submitted and successful  merchantReference is resubmitted with a new request, the request will fail.  MerchantReference sent with failed requests can be resubmitted. |

### Service Method

#### Purpose

Creates a cash deposit request using end user's account number.

| **Method**              | **Params**                        | **Return Type**                 |
| ----------------------- | --------------------------------- | ------------------------------- |
| createWithAccountNumber | CashDepositToAccountNumberOptions | PaparaSingleResult<CashDeposit> |

#### Usage


```typescript
function createWithAccountNumber() {
	const result = await client.cashDepositService.createWithAccountNumber({
    	accountNumber: config.PersonalAccountNumber,
   	 	amount: 10,
    	merchantReference: uuidv4() //random number generator method, place actual merchant reference here
  	});
    return result;
}
```

## Create Cash Deposit With National Identity Number

Deposits money to the user with national identity number registered in Papara from the physical point. To perform this operation use `createWithTckn` on `Cash Deposit` service.  `tckn`, `amount` and `merchantReference` should be provided.

### CashDepositToTcknOptions

`CashDepositToTcknOptions` is used by cash deposit service for providing request parameters.

| **Variable Name** | **Type** | **Description**                                              |
| ----------------- | -------- | ------------------------------------------------------------ |
| tckn              | number   | Gets or sets national identity number  which is linked to user's Papara account |
| amount            | number   | Gets or sets amount. The amount of the  cash deposit. This amount will be transferred to the account of the user who  received the payment. The amount to be deducted from the merchant account  will be exactly this number |
| merchantReference | string   | Gets or sets merchant reference. The  unique value sent by the merchant to prevent false repetitions in cash  loading transactions. If a previously submitted and successful  merchantReference is resubmitted with a new request, the request will fail.  MerchantReference sent with failed requests can be resubmitted |

### Service Method

#### Purpose

Creates a cash deposit request using end users's national identity number.

| **Method**     | **Params**               | **Return Type**                 |
| -------------- | ------------------------ | ------------------------------- |
| createWithTckn | CashDepositToTcknOptions | PaparaSingleResult<CashDeposit> |

#### Usage

```typescript
function createWithTckn() {
	const result = await client.cashDepositService.createWithTckn({
   		tckn: config.TCKN,
   		amount: 10,
   		merchantReference: uuidv4() //random number generator method, place actual merchant reference here
  	});
    return result;
}
```

## Create Cash Deposit Provision With National Identity Number

Creates a request to deposit money from the physical point using national identity number registered in Papara without provision. To perform this operation use `createProvisionWithTckn` on `Cash Deposit` service. `phoneNumber`, `tckn`, `amount` and `merchantReference` should be provided.

### CashDepositProvision Model

`CashDepositProvision` is used by cash deposit service to match returning cash deposit provision values from API.

| **Variable Name** | **Type** | **Description**                          |
| ----------------- | -------- | ---------------------------------------- |
| id                | number   | Gets or sets cash deposit ID             |
| createdAt         | string   | Gets or setscreated date of cash deposit |
| amount            | number   | Gets or sets amount of cash deposit      |
| currency          | number   | Gets or sets currency of cash deposit    |
| merchantReference | string   | Returns merchant reference code          |
| userFullName      | string   | Returns end user's full name             |

### CashDepositTcknControlOptions

`CashDepositTcknControlOptions` is used by cash deposit service for providing request parameters. 

| **Variable Name** | **Type** | **Description**                                              |
| ----------------- | -------- | ------------------------------------------------------------ |
| phoneNumber       | string   | Gets or sets user's phone number. The  phone number of the user to be sent money, including the country code and  "+". |
| tckn              | number   | Gets or sets national identity number  which is linked to user's Papara account |
| amount            | number   | Gets or sets amount. The amount of the  cash deposit. This amount will be transferred to the account of the user who  received the payment. The amount to be deducted from the merchant account  will be exactly this number. |
| merchantReference | string   | Gets or sets merchant reference. The  unique value sent by the merchant to prevent false repetitions in cash loading  transactions. If a previously submitted and successful merchantReference is  resubmitted with a new request, the request will fail. MerchantReference sent  with failed requests can be resubmitted. |

### Service Method

#### Purpose

Creates a cash deposit request without upfront payment using end user's national identity number.

| **Method**              | **Params**                    | **Return Type**                          |
| ----------------------- | ----------------------------- | ---------------------------------------- |
| createProvisionWithTckn | CashDepositTcknControlOptions | PaparaSingleResult<CashDepositProvision> |

#### Usage

```typescript
function createProvisionWithTckn() {
    const result = await client.cashDepositService.createProvisionWithTckn({
        amount: 10,
        merchantReference: uuidv4(), //random number generator method, place actual merchant reference here
        phoneNumber: config.PersonalPhoneNumber,
        tckn: config.TCKN
    });
    return result;
}
```

## Create Cash Deposit Provision With Phone Number

Creates a request to deposit money from the physical point using phone number registered in Papara without provision. To perform this operation use `createProvisionWithPhoneNumber` on `Cash Deposit` service. `phoneNumber`, `amount` and `merchantReference` should be provided.

### Service Method

#### Purpose

Creates a cash deposit request without upfront payment using end users's phone number.

| **Method**                     | **Params**                | **Return Type**                          |
| ------------------------------ | ------------------------- | ---------------------------------------- |
| createProvisionWithPhoneNumber | CashDepositToPhoneOptions | PaparaSingleResult<CashDepositProvision> |

#### Usage

```typescript
function createProvisionWithPhoneNumber() {
  	const result = await client.cashDepositService.createProvisionWithPhoneNumber({
    	amount: 10,
        merchantReference: uuidv4(), //random number generator method, place actual merchant reference here
        phoneNumber: config.PersonalPhoneNumber
    });
    return result;
}
```

## Create Cash Deposit Provision With Account Number

Creates a request to deposit money from the physical point using Papara number without provision. To perform this operation use `createProvisionWithAccountNumber` on `Cash Deposit` service. `accountNumber`, `amount` and `merchantReference` should be provided.

### Service Method

#### Purpose

Creates a cash deposit request without upfront payment using end users's phone number.

| **Method**                       | **Params**                        | **Return Type**                          |
| -------------------------------- | --------------------------------- | ---------------------------------------- |
| createProvisionWithAccountNumber | CashDepositToAccountNumberOptions | PaparaSingleResult<CashDepositProvision> |

#### Usage

```typescript
function createProvisionWithAccountNumber() {
  	const result = await client.cashDepositService.createProvisionWithAccountNumber({
		amount: 10,
        merchantReference: uuidv4(), //random number generator method, place actual merchant reference here
        accountNumber: config.PersonalAccountNumber
    });
    return result;
}
```

## Cash Deposit Approval

With the reference code created by the user, it checks the request for deposit without a prepayment from the physical point and makes it ready for approval.  To perform this operation, use `createProvisionByReferenceControl` on `Cash Deposit` service. `referenceCode` and `amount` should be provided.

### CashDepositControlOptions

`CashDepositControlOptions` is used by cash deposit service for providing request parameters.

| **Variable Name** | **Type** | **Description**                                        |
| ----------------- | -------- | ------------------------------------------------------ |
| referenceCode     | number   | Gets or sets reference number of cash  deposit request |
| amount            | string   | Gets or sets cash deposit amount                       |

### Service Method

#### Purpose

Makes a cash deposit ready to be completed.

| **Method**                        | **Params**                | **Return Type**         |
| --------------------------------- | ------------------------- | ----------------------- |
| createProvisionByReferenceControl | CashDepositControlOptions | PaparaSingleResult<any> |

#### Usage

```typescript
function createProvisionByReferenceControl() {
  	const result = await client.cashDepositService.createProvisionWithAccountNumber({
		amount: 10,
        merchantReference: uuidv4(), //random number generator method, place actual merchant reference here
        accountNumber: config.PersonalAccountNumber
    });
    return result;
}
```

## Cash Deposit Completion

Confirms the deposit request created from the physical point to the user without prepayment. To perform this operation, use `completeProvision` on `Cash Deposit` service. `id` and `transactionDate` should be provided.

### CashDepositCompleteOptions

`CashDepositCompleteOptions` is used by cash deposit service for providing request parameters.

| **Variable Name** | **Type** | **Description**                                |
| ----------------- | -------- | ---------------------------------------------- |
| id                | number   | Gets or sets ID of cash deposit request        |
| transactionDate   | string   | Gets or sets date of cash deposit  transaction |

### Service Method

#### Purpose

Completes a cash deposit request without upfront payment.

| **Method**        | **Params**                 | **Return Type**                 |
| ----------------- | -------------------------- | ------------------------------- |
| completeProvision | CashDepositCompleteOptions | PaparaSingleResult<CashDeposit> |

#### Usage

```typescript
function completeProvision() {
    // create provision
	const result = await client.cashDepositService.createProvisionWithAccountNumber({
		amount: 10,
      	merchantReference: uuidv4(), //random number generator method, place actual merchant reference here
     	accountNumber: config.PersonalAccountNumber
    });
    
  // complete provision
    var completionResult = await client.cashDepositService.completeProvision({
        id: result.data.id,
        transactionDate: result.data.createdAt
    });
    return result;
}
```

## Get Cash Deposit By Date

Retrieves information of money deposits from the physical point. To perform this operation, use `getCashDepositByDate` on `Cash Deposit` service. `startDate`, `endDate`, `pageIndex` and `pageItemCount` should be provided.

### CashDepositByDateOptions

`CashDepositByDateOptions` is used by cash deposit service for providing request parameters.

| **Variable Name** | **Type** | **Description**                                              |
| ----------------- | -------- | ------------------------------------------------------------ |
| startDate         | string   | Gets or sets start date of cash deposit                      |
| endDate           | string   | Gets or sets end date of cash deposit                        |
| pageIndex         | number   | Gets or sets page index. It is the index  number of the page that is wanted to display from the pages calculated on the  basis of the number of records (pageItemCount) desired to be displayed on a  page. Note: the first page is always 1 |
| pageItemCount     | number   | Gets or sets page item count. The number  of records that are desired to be displayed on a page |

### Service Method

#### Purpose

Returns a cash deposit information by given date.

| **Method**           | **Params**               | **Return Type**                |
| -------------------- | ------------------------ | ------------------------------ |
| getCashDepositByDate | CashDepositByDateOptions | PaparaArrayResult<CashDeposit> |

#### Usage

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

## Settlements

Returns the total number and volume of transactions performed within the given dates. Both start and end dates are included in the calculation. To perform this operation, use `provisionSettlements` on `Cash Deposit` service. `startDate` and `endDate` should be provided.

### CashDepositSettlementOptions

`CashDepositSettlementOptions` is used by cash deposit service for providing request parameters.

| **Variable Name** | **Type**   | **Description**                        |
| ----------------- | ---------- | -------------------------------------- |
| startDate         | string     | Gets or sets start date for settlement |
| endDate           | string     | Gets or sets end date for settlement   |
| entryType         | EntryType? | Gets or sets entry type for settlement |

### Service Method

#### Purpose

Returns total transaction volume and count between given dates. Start and end dates are included.

| **Method**           | **Params**                   | **Return Type**                           |
| -------------------- | ---------------------------- | ----------------------------------------- |
| provisionSettlements | CashDepositSettlementOptions | PaparaSingleResult<CashDepositSettlement> |

#### Usage

```typescript
function provisionSettlements() {
    var result = await client.cashDepositService.provisionSettlements({
    	startDate: new Date(2020, 1, 1).toISOString(),
   		endDate: new Date().toISOString()
    });
    return result;
}
```

## Possible Errors and Error Codes

| **Error Code** | **Error Description**                                        |
| -------------- | ------------------------------------------------------------ |
| 100            | User not found.                                              |
| 101            | Merchant  information could not found.                       |
| 105            | Insufficient  funds.                                         |
| 107            | The user exceeds the balance limit with this transaction.    |
| 111            | The user exceeds the monthly transaction limit with this transaction |
| 112            | An amount has been sent below the minimum deposit limit.     |
| 203            | The user account is blocked.                                 |
| 997            | The authorization to make a cash deposit is not defined in your account. You  should contact your customer representative. |
| 998            | The parameters you submitted are not in the expected format. Example: one of the  mandatory fields is not provided. |
| 999            | An error occurred in the Papara system.                      |



# <a name="mass-payment">Mass Payment</a> 

This part is the technical integration statement prepared for merchants those want to distribute payments to their users quickly, safely and widely through Papara.

## Get Mass Payment

Returns information about the payment distribution process. To perform this operation use `getMassPayment` method on `MassPayment` service. `id` should be provided.

### Mass Payment Model

`MassPayment` is used by mass payment service to match returning mass payment values from API.

| **Variable Name** | **Type** | **Description**                                         |
| ----------------- | -------- | ------------------------------------------------------- |
| massPaymentId     | string   | Gets or sets mass payment ID                            |
| id                | number   | Gets or sets ID which is created after  payment is done |
| createdAt         | Date     | Gets or sets created date                               |
| amount            | number   | Gets or sets amount of payment                          |
| currency          | number   | Gets or sets currency. Values are “0”,  “1”, “2”, “3”   |
| fee               | number   | Gets or sets fee                                        |
| resultingBalance  | number   | Gets or sets resulting balance                          |
| description       | string   | Gets or sets description                                |

### MassPaymentGetOptions

`MassPaymentGetOptions` is used by mass payment service for providing request parameters.

| **Variable Name** | **Type** | **Description**              |
| ----------------- | -------- | ---------------------------- |
| id                | number   | Gets or sets mass payment ID |

### Service Method

#### Purpose

Returns mass payment information for authorized merchant.

| **Method**     | **Params**            | **Return Type**                 |
| -------------- | --------------------- | ------------------------------- |
| getMassPayment | MassPaymentGetOptions | PaparaSingleResult<MassPayment> |

#### Usage

```typescript
function getMassPayment() {
    var result = await client.massPaymentService.getMassPayment({
   		id: 123456789
  	});
    return result;
}
```

## Create Mass Payment To Account Number

Send money to Papara number. To perform this operation use `createMassPaymentWithAccountNumber` method on `MassPayment` service. `accountNumber`, `amount` and `massPaymentId` should be provided.

### MassPaymentToPaparaNumberOptions

`MassPaymentToPaparaNumberOptions` is used by mass payment service for providing request parameters.

| **Variable Name**  | **Type** | **Description**                                              |
| ------------------ | -------- | ------------------------------------------------------------ |
| accountNumber     | string   | Gets or sets Papara account number. The  10-digit Papara number of the user who will receive the payment. It can be in  the format 1234567890 or PL1234567890. Before the Papara version transition,  the Papara number was called the wallet number.Old wallet numbers have been  changed to Papara number. Payment can be distributed to old wallet numbers. |
| parseAccountNumber | number  | Gets or sets parse account number. Parses  the account number to number type. In old papara integrations, account / wallet  number was made by starting with PL. The service was written in such a way  that it accepts numbers starting with PL, in order not to cause problems to  the member merchants that receive the papara number from their users. |
| amount            | number | Gets or sets amount. The amount of the  payment transaction. This amount will be transferred to the account of the  user who received the payment. This figure plus transaction fee will be  charged to the merchant account. |
| massPaymentId     | string   | Gets or sets mass payment ID. Unique value  sent by merchant to prevent erroneous repetition in payment transactions. If  a massPaymentId that was sent previously and succeeded is sent again with a new  request, the request will fail. |
| turkishNationalId | number   | Gets or sets national identity number.It  provides the control of the identity information sent by the user who will  receive the payment, in the Papara system. In case of a conflict of  credentials, the transaction will not take place. |
| description       | string   | Gets or sets description. Description of  the transaction provided by the merchant. It is not a required field. If  sent, the customer sees in the transaction descriptions. |
| currency                 | number   | Gets or sets currency. Values are “0”,  “1”, “2”, “3”        |

### Service Method

#### Purpose

Creates a mass payment to given account number for authorized merchant.

| **Method**                         | **Params**                       | **Return Type**                 |
| ---------------------------------- | -------------------------------- | ------------------------------- |
| createMassPaymentWithAccountNumber | MassPaymentToPaparaNumberOptions | PaparaSingleResult<MassPayment> |

#### Usage

```typescript
function createMassPaymentWithAccountNumber() {
    var result = await client.massPaymentService.createMassPaymentWithAccountNumber({
      	accountNumber: config.PersonalAccountNumber.toString(),
      	amount: 1,
      	description: "Unit Test nodejs: MassPaymentToPaparaNumber",
      	massPaymentId: uuidv4(),//random number generator method, place actual mass payment id here
     	parseAccountNumber: 1,
		turkishNationalId: config.TCKN
    });
    return result;
}
```

## Create Mass Payment To E-Mail Address

Send money to e-mail address registered in Papara. To perform this operation use `createMassPaymentWithEmail` method on `MassPayment` service. `email`, `amount` and `massPaymentId` should be provided.

### MassPaymentToEmailOptions

`MassPaymentToEmailOptions` is used by mass payment service for providing request parameters.

| **Variable Name** | **Type** | **Description**                                              |
| ----------------- | -------- | ------------------------------------------------------------ |
| email             | string   | Gets or sets e-mail address. Registered  email address of the user receiving the payment. |
| amount            | number   | Gets or sets amount. The amount of the  payment transaction. This amount will be transferred to the account of the  user who received the payment. This figure plus transaction fee will be  charged to the merchant account. |
| massPaymentId     | string   | Gets or setsmass payment ID. Unique value  sent by merchant to prevent erroneous repetition in payment transactions. If  a massPaymentId that was sent previously and succeeded is sent again with a  new request, the request will fail. |
| turkishNationalId | number   | Gets or setsnational identity number.It  provides the control of the identity information sent by the user who will  receive the payment, in the Papara system. In case of a conflict of  credentials, the transaction will not take place. |
| description       | string   | Gets or sets description. Description of  the transaction provided by the merchant. It is not a required field. If  sent, the customer sees in the transaction descriptions. |
| currency                 | number   | Gets or sets currency. Values are “0”,  “1”, “2”, “3”        |

### Service Method

#### Purpose

Creates a mass payment to given e-mail address for authorized merchant.

| **Method**                 | **Params**                | **Return Type**                 |
| -------------------------- | ------------------------- | ------------------------------- |
| createMassPaymentWithEmail | MassPaymentToEmailOptions | PaparaSingleResult<MassPayment> |

#### Usage

```typescript
function createMassPaymentWithEmail() {
    var result = await client.massPaymentService.createMassPaymentWithEmail({
    	amount: 1,
    	description: "Unit Test nodejs: MassPaymentToEmail",
    	massPaymentId: uuidv4(), //random number generator method, place actual mass payment id here
    	email: config.PersonalEmail,
    	turkishNationalId: config.TCKN
  	});
    return result;
}
```

## Create Mass Payment To Phone Number

Send money to phone number registered in Papara. To perform this operation use `createMassPaymentWithPhoneNumber` method on `MassPayment` service. `phoneNumber`, `amount` and `massPaymentId` should be provided.

### MassPaymentToPhoneNumberOptions

`MassPaymentToPhoneNumberOptions` is used by mass payment service for providing request parameters.

| **Variable Name** | **Type** | **Description**                                              |
| ----------------- | -------- | ------------------------------------------------------------ |
| phoneNumber       | string   | Gets or sets user's phone number. The  mobile number of the user who will receive the payment, registered in Papara.  It should contain a country code and start with + |
| amount            | number   | Gets or sets amount. The amount of the  payment transaction. This amount will be transferred to the account of the  user who received the payment. This figure plus transaction fee will be  charged to the merchant account |
| massPaymentId     | string   | Gets or sets mass payment ID. Unique value  sent by merchant to prevent erroneous repetition in payment transactions. If  a MassPaymentId that was sent previously and succeeded is sent again with a new  request, the request will fail |
| turkishNationalId | number   | Gets or sets national identity number.It  provides the control of the identity information sent by the user who will  receive the payment, in the Papara system. In case of a conflict of  credentials, the transaction will not take place |
| description       | string   | Gets or sets description. Description of  the transaction provided by the merchant. It is not a required field. If  sent, the customer sees in the transaction descriptions |
| currency                 | number   | Gets or sets currency. Values are “0”,  “1”, “2”, “3”        |

### Service Method

#### Purpose

Creates a mass payment to given phone number for authorized merchant.

| **Method**                       | **Params**                      | **Return Type**                 |
| -------------------------------- | ------------------------------- | ------------------------------- |
| createMassPaymentWithPhoneNumber | MassPaymentToPhoneNumberOptions | PaparaSingleResult<MassPayment> |

#### Usage

```typescript
function createMassPaymentWithPhoneNumber() {
    var result = await client.massPaymentService.createMassPaymentWithPhoneNumber({
      	amount: 1,
      	description: "Unit Test nodejs: MassPaymentToPhoneNumber",
      	massPaymentId: uuidv4(), //random number generator method, place actual mass payment id here
      	phoneNumber: config.PersonalPhoneNumber,
		turkishNationalId: config.TCKN
    });
    return result;
}
```

## Possible Errors and Error Codes

| **Error Code** | **Error Description**                                        |
| -------------- | ------------------------------------------------------------ |
| 100            | User not found.                                              |
| 105            | Insufficient funds                                           |
| 107            | Receiver exceeds balance limit. The highest possible balance for simple accounts is  750 TL. |
| 111            | Receiver exceeds monthly transaction limit. Simple accounts can receive payments from a total of 2000 TL of defined resources per month. |
| 133            | MassPaymentID was used recently.                             |
| 997            | You  are not authorized to distribute payments. You can contact your customer representative and request a payment distribution definition to your merchant  account. |
| 998            | The  parameters you submitted are not in the expected format. Example: Customer number less than 10 digits. In this case, the error message contains details of the format error. |
| 999            | An error  occurred in the Papara system.                     |



# <a name="payments">Payments</a> 

Payment service will be used for getting, creating or listing payments and refunding. Before showing the payment button to users, the merchant must create a payment transaction on Papara. Payment records are time dependent. Transaction records that are not completed and paid by the end user are deleted from Papara system after 1 hour. Completed payment records are never deleted and can always be queried with the API.

## Get Payment

Returns payment information. To perform this operation use `getPayment` method on `Payment` service. `id` should be provided.

### Payment Model

`Payment` is used by payment service to match returning payment values from API.

| **Variable Name**        | **Type** | **Description**                                              |
| ------------------------ | -------- | ------------------------------------------------------------ |
| merchant                 | Account  | Gets or sets merhcant                                        |
| id                       | string   | Gets or sets ID                                              |
| CreatedAt                | date     | Gets or sets created date                                    |
| merchantId               | string   | Gets or sets merchant ID                                     |
| userId                   | string   | Gets or sets user ID                                         |
| paymentMethod            | number   | Gets or sets payment Method. <br/>0 -  User completed transaction with existing Papara balance<br/>1 -  User completed the transaction with a debit / credit card that was previously  defined.  <br/>2 -  User completed transaction via mobile payment. |
| paymentMethodDescription | string   | Gets or sets payment method description                      |
| referenceId              | string   | Gets or sets referance ID                                    |
| orderDescription         | string   | Gets or sets order description                               |
| status                   | number   | Gets or sets status.  0 -  Awaiting, payment is not done yet.  1 -  Payment is done, transaction is completed.  2 -  Transactions is refunded by merchant. |
| statusDescription        | string   | Gets or sets status description                              |
| amount                   | number   | Gets or sets amount                                          |
| fee                      | number   | Gets or sets fee                                             |
| currency                 | number   | Gets or sets currency. Values are “0”,  “1”, “2”, “3”        |
| notificationUrl          | string   | Gets or sets notification URL                                |
| notificationDone         | boolean  | Gets or sets if notification was made                        |
| redirectUrl              | string   | Gets or sets redirect URL                                    |
| raymentUrl               | string   | Gets or sets payment URL                                     |
| merchantSecretKey        | string   | Gets or sets merchant secret key                             |
| returningRedirectUrl     | string   | Gets or sets returning Redirect URL                          |
| turkishNationalId        | number   | Gets or sets national identity number                        |

### PaymentGetOptions

`PaymentGetOptions` will be used as parameter while acquiring payment information.

| **Variable Name** | **Type** | **Description**                |
| ----------------- | -------- | ------------------------------ |
| id                | string   | Gets or sets unique payment ID |

### Service Method

#### Purpose

Returns payment and balance information for authorized merchant.

| **Method** | **Params**        | **Return Type**             |
| ---------- | ----------------- | --------------------------- |
| getPayment | PaymentGetOptions | PaparaSingleResult<Payment> |

#### Usage

```typescript
function getPayment() {
    var paymentResult = await client.paymentService.getPayment({
		id: "PAYMENT_ID_HERE"
    });
    return result;
}
```

## Create Payment

Creates a new payment record. To perform this operation use `createPayment` method on `Payment` service. `amount`, `referenceId`, `orderDescription`, `notificationUrl` and `redirectUrl` should be provided.

### PaymentCreateOptions

`PaymentCreateOptions` is used by payment service for providing request parameters.

| **Variable Name** | **Type** | **Description**                                              |
| ----------------- | -------- | ------------------------------------------------------------ |
| amount            | number   | Gets or sets amount. The amount of the  payment transaction. Exactly this amount will be taken from the account of  the user who made the payment, and this amount will be displayed to the user  on the payment screen. Amount field can be minimum 1.00 and maximum 500000.00 |
| referenceId       | string   | Gets or sets reference ID. Reference  information of the payment transaction in the merchant system. The  transaction will be returned to the merchant without being changed in the  result notifications as it was sent to Papara. Must be no more than 100  characters. This area does not have to be unique and Papara does not make  such a check |
| orderDescription  | string   | Gets or sets order description.  Description of the payment transaction. The sent value will be displayed to  the user on the Papara checkout page. Having a description that accurately  identifies the transaction initiated by the user, will increase the chance of  successful payment |
| notificationUrl   | string   | Gets or sets notification URL. The URL to  which payment notification requests (IPN) will be sent. With this field, the  URL where the POST will be sent to the payment merchant must be sent. To the  URL sent with "notificationUrl", Papara will send a payment object  containing all information of the payment with an HTTP POST request  immediately after the payment is completed. Make sure that the payment notification (IPN) coming to "NotificationURL" comes from Papara's IP addresses. You can check the payment by calling HTTP GET /payments API method with the "id" field in the submitted JSON. If the merchant returns 200 OK to  this request, no notification will be made again. If the merchant does not  return 200 OK to this notification, Papara will continue to make payment  notification (IPN) requests for 24 hours until the merchant returns to 200 OK |
| redirectUrl       | string   | Gets or sets redirect URL. URL to which  the user will be redirected at the end of the process |
| turkishNationalId | number   | Gets or sets national identity number.It  provides the control of the identity information sent by the user who will  receive the payment, in the Papara system. In case of a conflict of  credentials, the transaction will not take place |
| currency                 | number   | Gets or sets currency. Values are “0”,  “1”, “2”, “3”        |

### Important Warning

Make sure that the payment notification (IPN) coming to "NotificationURL" comes from Papara's IP addresses. You can check the payment by calling HTTP GET /payments API method with the "id" field in the submitted JSON.

### Service Method

#### Purpose

Creates a payment for authorized merchant.

| **Method**    | **Params**           | **Return Type**             |
| ------------- | -------------------- | --------------------------- |
| createPayment | PaymentCreateOptions | PaparaSingleResult<Payment> |

#### Usage

```typescript
function createPayment() {
    var referenceId = uuidv4(); //random number generator method, place actual payment reference id here

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

###  Validating Payment Result 

Following the user's successful completion of the transaction **before the user is directed to the merchant**, Papara makes a  **HTTP POST** request to the `notificationUrl` sent by the merchant with the payment request.

In the `body` part of the request, there will be a JSON object with the same structure as the `data` object of the return value creating a payment request. Sample:

```json
{
    "merchantId": "123-4564-8484",
    "userId": "123-987-654",
    "paymentMethod": 1,
    "paymentMethodDescription": "Credit/Debit Card",
    "referenceId": "Merchant Reference",
    "orderDescription": "Description that will be displayed to user on payment page",
    "status": 1,
    "statusDescription": "Completed",    
    "amount": 99.99,
    "fee": 1.98,
    "currency": "TRY",
    "notificationUrl": "https://www.papara.com/notification",
    "notificationDone": false,
    "redirectUrl": "https://www.papara.com/userredirect",
    "merchantSecretKey": "Secret key on the merchant panel",
    "paymentUrl": "www.papara.com/pid?6666-5555-ABCD",
    "returningRedirectUrl": "",
    "id": "6666-5555-ABCD",
    "createdAt": "2017-06-09T06:26:15.100Z",
    "turkishNationalId": 12345678901,
}
```

## Refund 

Refunds a completed payment of the merchant with the provided payment ID .To perform this operation use `refund` method on `Payment` service. `id` should be provided.

### PaymentRefundOptions

`PaymentRefundOptions` is used by payment service for providing request parameters.

| **Variable Name** | **Type** | **Description**         |
| ----------------- | -------- | ----------------------- |
| id                | string   | Gets or sets payment ID |

### Service Method

#### Purpose

Creates a refund for a completed payment for authorized merchant.

| **Method** | **Params**           | **Return Type**         |
| ---------- | -------------------- | ----------------------- |
| refund     | PaymentRefundOptions | PaparaSingleResult<any> |

#### Usage

```typescript
function refund() {
    var result = await client.paymentService.refund({
		id: "PAYMENT_ID_HERE"
    });
    return result;
}
```

## List Payments

Lists the completed payments of the merchant in a sequential order. To perform this operation use `list` method on `Payment` service. `pageIndex` and `pageItemCount` should be provided.

### PaymentListOptions

`PaymentListOptions` is used by payment service for providing request parameters

| **Variable Name** | **Type** | **Description**                                              |
| ----------------- | -------- | ------------------------------------------------------------ |
| pageIndex         | number   | Gets or sets page index. It is the index  number of the page that is wanted to display from the pages calculated on the  basis of the number of records (pageItemCount) desired to be displayed on a  page. Note: the first page is always 1 |
| pageItemCount     | number   | Gets or sets page item count. The number  of records that are desired to be displayed on a page |

### PaymentListItem

`PaymentListItem` is used by payment service to match returning completed payment list values list API.

| **Variable Name**        | **Type** | **Description**                                              |
| ------------------------ | -------- | ------------------------------------------------------------ |
| id                       | string   | Returns payment ID                                           |
| createdAt                | Date     | Returns created date                                         |
| merchantId               | string   | Returns merchant ID                                          |
| userId                   | string   | Returns user ID                                              |
| paymentMethod            | number   | Returns payment Method.  0 -  User completed transaction with existing Papara balance  1 -  User completed the transaction with a debit / credit card that was previously  defined.  2 -  User completed transaction via mobile payment. |
| paymentMethodDescription | string   | Returns payment method description                           |
| referenceId              | string   | Returns reference ID                                         |
| orderDescription         | string   | Returns order description                                    |
| status                   | number   | Returns status.  0 -  Awaiting, payment is not done yet.  1 -  Payment is done, transaction is completed.  2 -  Transactions is refunded by merchant. |
| statusDescription        | string   | Returns status description                                   |
| amount                   | number   | Returns amount                                               |
| fee                      | number   | Returns fee                                                  |
| currency                 | number   | Returns currency. Values are “0”,  “1”, “2”, “3”             |
| notificationUrl          | string   | Returns notification URL                                     |
| notificationDone         | boolean  | Returns if notification was made                             |
| redirectUrl              | string   | Returns redirect URL                                         |
| paymentUrl               | string   | Returns payment URL                                          |
| merchantSecretKey        | string   | Returns merchant secret key                                  |
| returningRedirectUrl     | string   | Returns returning Redirect URL                               |
| turkishNationalId        | number   | Returns national identity number                             |

### Service Method

#### Purpose

Returns a list of completed payments sorted by newest to oldest for authorized merchant.

| **Method** | **Params**         | **Return Type**                   |
| ---------- | ------------------ | --------------------------------- |
| list       | PaymentListOptions | PaparaListResult<PaymentListItem> |

#### Usage

```typescript
function list() {
    var paymentListResult = await client.paymentService.list({
	    pageIndex: 1,
    	pageItemCount: 20
 	});
    return result;
}
```

## Possible Errors and Error Codes

| **Error Code** | **Error Description**                                        |
| -------------- | ------------------------------------------------------------ |
| 997            | You are not authorized to accept payments. You should contact your customer  representative. |
| 998            | The parameters you submitted are not in the expected format. Example: one of the  mandatory fields is not provided. |
| 999            | An error occurred in the Papara system.                      |



# <a name="validation">Validation</a> 

Validation service will be used for validating an end user. Validation can be performed by account number, e-mail address, phone number, national identity number.

## Validate By Id

It is used to validate users with Papara UserId. To perform this operation use `validateById` method on `Validation` service. `userId` should be provided.

### Validation Model           

`Validation` is used by validation service to match returning user value from API

| **Variable Name** | **Type** | **Description**                            |
| ----------------- | -------- | ------------------------------------------ |
| userId            | string   | Gets or sets unique User ID                |
| firstName         | string   | Gets or sets user first name               |
| lastName          | string   | Gets or sets user last name                |
| email             | string   | Gets or sets user e-mail address           |
| phoneNumber       | string   | Gets or sets user phone number             |
| tckn              | number   | Gets or sets user national identity number |
| accountNumber     | number   | Gets or sets user account number           |

### ValidationByIdOptions 

`ValidationByIdOptions` is used by validation service for providing request parameters.

| **Variable Name** | **Type** | **Description**             |
| :---------------- | -------- | --------------------------- |
| userId            | string   | Gets or sets Papara User ID |

### Service Method

#### Purpose

Returns end user information for validation by given user ID.

| **Method**   | **Params**            | **Return Type**                |
| ------------ | --------------------- | ------------------------------ |
| validateById | ValidationByIdOptions | PaparaSingleResult<Validation> |

#### Usage

```typescript
function validateById() {
    const result = await client.validationService.validateById({
    	userId: config.PersonalAccountId
  	});
    return result;
}
```

## Validate By Account Number

It is used to validate users with Papara account number. To perform this operation use `validateByAccountNumber` method on `Validation` service. `accountNumber` should be provided.

### ValidationByAccountNumberOptions

`ValidationByAccountNumberOptions` is used by validation service for providing request parameters

| **Variable Name** | **Type** | **Description**                    |
| ----------------- | -------- | ---------------------------------- |
| accountNumber     | number   | Gets or sets Papara account number |

### Service Method

#### Purpose

Returns end user information for validation by given user account number.

| **Method**              | **Params**                       | **Return Type**                |
| ----------------------- | -------------------------------- | ------------------------------ |
| validateByAccountNumber | ValidationByAccountNumberOptions | PaparaSingleResult<Validation> |

#### Usage

```typescript
function validateByAccountNumber() {
    const result = await client.validationService.validateByAccountNumber({
    	accountNumber: config.PersonalAccountNumber
  	});
    return result;
}
```

## Validate By Phone Number

It is used to validate users with phone number registered in Papara. To perform this operation use `validateByPhoneNumber` method on `Validation` service. `phoneNumber` should be provided.

### ValidationByPhoneNumberOptions

`ValidationByPhoneNumberOptions` is used by validation service for providing request parameters

| **Variable Name** | **Type** | **Description**                                |
| ----------------- | -------- | ---------------------------------------------- |
| phoneNumber       | string   | Gets or sets phone number registered to Papara |

### Service Method

#### Purpose

Returns end user information for validation by given user phone number.

| **Method**            | **Params**                     | **Return Type**                |
| --------------------- | ------------------------------ | ------------------------------ |
| validateByPhoneNumber | ValidationByPhoneNumberOptions | PaparaSingleResult<Validation> |

#### Usage

```typescript
function validateByPhoneNumber() {
    const result = await client.validationService.validateByPhoneNumber({
    	phoneNumber: config.PersonalPhoneNumber
  	});
    return result;
}
```

## Validate By E-Mail Address

It is used to validate users with e-mail address registered in Papara. To perform this operation use `validateByEmail` method on `Validation` service. `email` should be provided.

### ValidationByEmailOptions

`ValidationByEmailOptions` is used by validation service for providing request parameters

| **Variable Name** | **Type** | **Description**                                  |
| ----------------- | -------- | ------------------------------------------------ |
| email             | string   | Gets or sets e-mail address registered to Papara |

### Service Method

#### Purpose

Returns end user information for validation by given user e-mail address

| **Method**      | **Params**               | **Return Type**                |
| --------------- | ------------------------ | ------------------------------ |
| validateByEmail | ValidationByEmailOptions | PaparaSingleResult<Validation> |

#### Usage

```typescript
function validateByEmail() {
    const result = await client.validationService.validateByEmail({
    	email: config.PersonalEmail
  	});
    return result;
}
```

## Validate By National Identity Number

It is used to validate users with national identity number registered in Papara. To perform this operation use `validateByTckn` method on `Validation` service. `tckn` should be provided.

### ValidationByTcknOptions

`ValidationByPhoneNumberOptions` is used by validation service for providing request parameters.

| **Variable Name** | **Type** | **Description**                  |
| ----------------- | -------- | -------------------------------- |
| tckn              | number   | Returns national identity number |

### Service Method

#### Purpose

Returns end user information for validation by given user national identity number

| **Method**     | **Params**              | **Return Type**                |
| -------------- | ----------------------- | ------------------------------ |
| validateByTckn | ValidationByTcknOptions | PaparaSingleResult<Validation> |

#### Usage

```typescript
function validateByTckn() {
    const result = await client.validationService.validateByTckn({
    	tckn: config.TCKN
  	});
    return result;
}
```



# <a name="response-types">Response Types</a>

This part contains technical information about return values from API.

## PaparaSingleResult

Papara Single Result type. Handles object data types sending to and returning from API.

| **Variable Name** | **Type**      | **Description**                                              |
| ----------------- | ------------- | ------------------------------------------------------------ |
| data              | T             | Gets or sets generic single result data.                     |
| succeeded         | boolean       | Gets or sets a value indicating whether operation resulted successfully or not |
| error             | PaparaError   | Gets or sets a value indicating whether operation failed or not |
| result            | PaparaSuccess | Gets or sets success result                                  |

## PaparaArrayResult

Papara Array Result type. Handles array data types sending to and returning from API.

| **Variable Name** | **Type**      | **Description**                                              |
| ----------------- | ------------- | ------------------------------------------------------------ |
| data              | T[]           | Gets or sets generic array result data.                      |
| succeeded         | boolean       | Gets or sets a value indicating whether operation resulted successfully or not |
| error             | PaparaError   | Gets or sets a value indicating whether operation failed or not |
| result            | PaparaSuccess | Gets or sets success result                                  |

## PaparaListResult

Papara List Result type. Handles list data types sending to and returning from API.

| **Variable Name** | **Type**        | **Description**                                              |
| ----------------- | --------------- | ------------------------------------------------------------ |
| data              | PaparaPaging<T> | Gets or sets generic paginated result data.                  |
| succeeded         | boolean         | Gets or sets a value indicating whether operation resulted successfully or not |
| error             | PaparaError     | Gets or sets a value indicating whether operation failed or not |
| result            | PaparaSuccess   | Gets or sets success result                                  |

## PaparaPaging

Papara paging type. Handles paginated data sending to and returning from API.

| **Variable Name** | **Type** | **Description**                                     |
| ----------------- | -------- | --------------------------------------------------- |
| items             | T[]      | Gets or sets page items                             |
| page              | number   | Gets or sets page number                            |
| pageItemCount     | number   | Gets or sets page item count                        |
| totalItemCount    | number   | Gets or sets total item count                       |
| totalPageCount    | number   | Gets or sets total page count                       |
| pageSkip          | number   | Gets or sets how many pages are going to be skipped |

## PaparaSuccess

Papara Service Error Result type. Error responses returning from API.

| **Variable Name** | **Type** | **Description**              |
| ----------------- | -------- | ---------------------------- |
| message           | string   | Gets or sets success message |
| code              | number   | Gets or sets success code    |

## PaparaError

Papara Service Success Result type. Success responses returning from API.

| **Variable Name** | **Type** | **Description**            |
| ----------------- | -------- | -------------------------- |
| message           | string   | Gets or sets error message |
| code              | number   | Gets or sets error code    |

 
