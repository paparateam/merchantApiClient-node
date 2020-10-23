/**
 * Settlement interface is used by account service to match returning settlement values from API.
 */
export interface Settlement {
  /**
   * Gets or sets transaction count.
   */
  count: number;

  /**
   * Gets or sets transaction volume.
   */
  volume: number;
}
