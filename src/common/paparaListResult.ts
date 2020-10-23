import { PaparaError } from "./paparaError";
import { PaparaPaging } from "./paparaPaging";
import { PaparaSuccess } from "./paparaSuccess";

/**
 * Papara List type. Handles list data types sending to and returning from API.
 * @template T Generic Entity. E.g Account Service
 */
export interface PaparaListResult<T> {
  /**
   * Gets or sets result succeed status
   */
  succeeded: boolean;

  /**
   * Gets or sets array result data.
   */
  data: PaparaPaging<T>;

  /**
   * Gets or sets a value indicating whether operation failed or not.
   */
  error?: PaparaError;

  /**
   * Gets or sets success result
   */
  result?: PaparaSuccess;
}
