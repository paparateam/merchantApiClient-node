import { PaparaError } from "./paparaError";
import { PaparaSuccess } from "./paparaSuccess";

/**
 * Papara Single Result type. Handles object data types sending to and returning from API.
 * @template T Generic Entity. E.g Account Service
 */
export interface PaparaSingleResult<T> {
  /**
   * Gets or sets result succeed status
   **/
  succeeded: boolean;

  /**
   * Gets or sets single result data.
   */
  data: T;

  /**
   * Gets or sets a value indicating whether operation failed or not.
   */
  error?: PaparaError;

  /**
   * Gets or sets success result
   */
  result?: PaparaSuccess;
}
