/*
* RecurringMassPayment interface is used by mass payment service to match returning recurring mass payment values from API.
*/

export interface RecurringMassPayment
{
    /**
     * Gets or sets merchant id.
     */
    merchantId:string;
    
    /**
     * Gets or sets user id.
     */
    userId:string;

    /**
     * Gets or sets period. Values are "0" (Monthly), "1" (Weekly), "2" (Daily).
     */
    period:number;

    /**
    *Gets or sets ...th day of period. (Weeks start with Monday).
    */
    executionDay:number;

    /**
     * Gets or sets account number.
     */
    accountNumber:number;

    /**
     * Gets or sets message.
     */
    message:string;

    /**
     * Gets or sets amount.
     */
    amount:number;

    /**
     * Gets or sets currency.Values are “0” (TRY), “1” (USD), “2” (EUR), “3” (GBP).
     */
    currency:number;
}