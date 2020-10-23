/**
 * Validation interface is used by validation service to match returning user value from API.
 */
export interface Validation {
  /**
   * Gets or sets unique User ID.
   */
  userId: string;

  /**
   * Gets or sets user first name.
   */
  firstName: string;

  /**
   * Gets or sets user last name.
   */
  lastName: string;

  /**
   * Gets or sets user e-mail address.
   */
  email: string;

  /**
   * Gets or sets user phone number.
   */
  phoneNumber: string;

  /**
   * Gets or sets user national identity number.
   */
  tckn: string;

  /**
   * Gets or sets user account number.
   */
  accountNumber: number;
}
