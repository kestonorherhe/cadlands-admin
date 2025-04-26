import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class ClipboardService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Copy text to clipboard
   * @param text The text to copy
   * @returns Promise that resolves to true if copying was successful, false otherwise
   */
  copyToClipboard(text: string): Promise<boolean> {
    return new Promise((resolve) => {
      // For modern browsers
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            resolve(true);
          })
          .catch((error) => {
            console.error("Failed to copy: ", error);
            resolve(false);
          });
      } else {
        // Fallback for older browsers
        const textArea = this.document.createElement("textarea");
        textArea.value = text;

        // Make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        this.document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        try {
          const successful = this.document.execCommand("copy");
          this.document.body.removeChild(textArea);
          resolve(successful);
        } catch (err) {
          console.error("Fallback: Copying failed", err);
          this.document.body.removeChild(textArea);
          resolve(false);
        }
      }
    });
  }
}
