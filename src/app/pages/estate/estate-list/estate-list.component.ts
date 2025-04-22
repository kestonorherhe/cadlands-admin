import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { PropertyService } from "../../property/property.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";

@Component({
  selector: "app-estate-list",
  templateUrl: "./estate-list.component.html",
  styleUrls: ["./estate-list.component.scss"],
})
export class EstateListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data: any;
  propertyTitles = [
    { name: "C of O" },
    { name: "Irrevocable Power Of Attorney" },
    { name: "Registered Survey" },
    { name: "Deed Of Assignment" },
    { name: "Government Approval" },
  ];

  isLoading = false;

  obj = {
    estateName: null,
    imageUrl: null,
    description: null,
    otherListing: false,
    titles: [],
  };

  files: File[] = [];
  public Editor = ClassicEditor;
  //
  public editorData = "";
  public characterCount = 0;
  public characterLimit = 500;
  public isLimitReached = false;
  private editorInstance: any;
  private isPasting = false;
  private contentBeforePaste = "";

  constructor(
    private modalService: NgbModal,
    private readonly _router: Router,
    private readonly propertyService: PropertyService
  ) {}

  viewRecord(evt: any) {
    console.log("🚀 ~ EstateListComponent ~ viewRecord ~ evt:", evt);
    const id = evt.id;
    this._router.navigate(["estate/info", id]);
  }

  closeModal() {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you would like to cancel?",
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes, cancel it!",
      confirmButtonColor: "#1B84FF",
      denyButtonText: `No, return`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.resetForm();
        this.modalService.dismissAll();
      }
    });
  }

  async createRecordModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Contacts" },
      { label: "Profile", active: true },
    ];

    this.getAllEstate();
  }

  getAllEstate() {
    this.isLoading = true;
    this.propertyService.getAllEstate({}).subscribe(
      (response: any) => {
        this.data = response.data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  resetForm() {
    this.obj = {
      estateName: null,
      imageUrl: null,
      description: null,
      otherListing: false,
      titles: [],
    };
  }

  // processImage(evt: any) {
  //   this.obj.imageUrl = evt.target.files[0];
  // }

  // dropzone methods
  onSelect(event: any) {
    console.log(event);
    // Clear existing files before adding new ones
    this.files = [];

    // Validate file type (optional, but recommended)
    const file = event.addedFiles[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      Swal.fire("", "Please upload a valid image file", "warning");
      return;
    }

    this.files.push(file);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  async onSubmit() {
    
    try {
      this.isLoading = true;
      let formData: FormData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        formData.append("file", this.files[i]);
      }

      const imageUrl = await this.propertyService.uploadImage(formData);
      console.log("🚀 ~ EstateListComponent ~ onSubmit ~ imageUrl:", imageUrl);

      const data = {
        name: this.obj.estateName,
        imageUrl: imageUrl,
        description: this.obj.description,
        otherListing: false,
        titles: this.obj.titles,
      };
      this.propertyService.createEstate(data).subscribe(
        (response: any) => {
          this.isLoading = false;
          Swal.fire(
            "Process Successful!",
            "Estate successfully created!",
            "success"
          );
          this.modalService.dismissAll();
          this.resetForm();
          this.getAllEstate();
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Process Failed!", "Failed to create estate", "error");
        }
      );
    } catch (error) {
      this.isLoading = false;
      Swal.fire("Process Failed!", "Failed to create estate", "error");
    }
  }

  public onReady({ editor }: any) {
    this.editorInstance = editor;

    // Set up keydown event listener to prevent typing past the limit
    editor.editing.view.document.on("keydown", (evt: any, data: any) => {
      if (this.isLimitReached && !this.isDeletionKey(data.keyCode)) {
        // Prevent typing new characters when limit is reached
        data.preventDefault();
        return false;
      }
    });

    // Track content before paste operation
    editor.editing.view.document.on(
      "paste",
      (evt: any, data: any) => {
        this.isPasting = true;
        this.contentBeforePaste = editor.getData();
      },
      { priority: "high" }
    ); // Use high priority to run before the paste is processed

    // Initialize character count
    this.updateCharacterCount(editor.getData());
  }

  public onChange({ editor }: ChangeEvent) {
    const currentData = editor.getData();
    const textLength = this.getTextLength(currentData);

    // Update character count
    this.characterCount = textLength;
    this.isLimitReached = textLength >= this.characterLimit;

    if (this.isPasting) {
      this.isPasting = false; // Reset paste flag

      // Check if we've exceeded limit after paste
      if (textLength > this.characterLimit) {
        // We need to handle the paste trimming
        const textBeforePaste = this.contentBeforePaste.replace(/<[^>]*>/g, "");
        const availableChars = this.characterLimit - textBeforePaste.length;

        // If we have space for at least some paste content
        if (availableChars > 0) {
          // Extract the pasted content by comparing current with before paste
          // Note: This is simplistic and might not work perfectly in all cases
          // A better implementation would use the paste data from the event
          const selection = editor.model.document.selection;

          // Use the editor's model to insert text that fits
          editor.model.change((writer) => {
            // Restore the content to what it was before paste
            editor.setData(this.contentBeforePaste);

            // Get the text from data that was pasted
            const pastedHtml = currentData;
            const pastedText = pastedHtml.replace(/<[^>]*>/g, "");

            // Insert only what fits within our limit
            const textToInsert = pastedText.substring(0, availableChars);

            // Position the cursor at the end of the document
            const positions = Array.from(editor.model.document.getPositions());
            const lastPosition = positions[positions.length - 1];

            // Insert the trimmed text
            writer.insertText(textToInsert, lastPosition);
          });

          // Update the character count after our manual insertion
          this.characterCount = this.getTextLength(editor.getData());
          this.isLimitReached = this.characterCount >= this.characterLimit;
        } else {
          // No space for paste, revert to content before paste
          editor.setData(this.contentBeforePaste);
        }
      }
    } else if (textLength > this.characterLimit) {
      // Handle non-paste input that somehow exceeded the limit
      // This could happen with complex editor operations

      // Simple approach: truncate the text content
      const html = currentData;
      const text = html.replace(/<[^>]*>/g, "");
      const truncatedText = text.substring(0, this.characterLimit);

      // Replace the editor content with truncated text
      // Note: This loses HTML formatting but ensures the limit
      editor.setData(truncatedText);

      this.characterCount = this.characterLimit;
      this.isLimitReached = true;
    }
  }

  private updateCharacterCount(html: string) {
    this.characterCount = this.getTextLength(html);
    this.isLimitReached = this.characterCount >= this.characterLimit;
  }

  private getTextLength(html: string): number {
    // Remove HTML tags to count only text characters
    return html.replace(/<[^>]*>/g, "").length;
  }

  private isDeletionKey(keyCode: number): boolean {
    // Key codes for keys that remove characters:
    // 8: Backspace, 46: Delete
    return [8, 46].includes(keyCode);
  }
}
