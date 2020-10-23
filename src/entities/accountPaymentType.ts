/**
 * AccountPaymentType interface is used by account service to match returning payment types from API.
 */
export interface AccountPaymentType {
  /**
   * Gets or sets Payment method 
   * 0- PaparaAccount - Papara Account Balance. 
   * 1- Card	- Registered Credit Card. 
   * 2- Mobile	- Mobile Payment.
   */
  paymentMethod: number;
}
