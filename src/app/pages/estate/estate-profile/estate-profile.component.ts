import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdvancedService } from "../../tables/advancedtable/advanced.service";
import { DecimalPipe } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import { SettingsService } from "../../settings/settings.service";
import { PropertyService } from "../../property/property.service";

@Component({
  selector: "app-estate-profile",
  templateUrl: "./estate-profile.component.html",
  styleUrls: ["./estate-profile.component.scss"],
  providers: [AdvancedService, DecimalPipe],
})
export class EstateProfileComponent implements OnInit {
  isLoading = false;
  showPropertyTemplateInfo = false;
  estateId: string;
  estate: any = {
    name: null,
    imageUrl: null,
    description: null,
  };
  statusList = [
    { id: true, name: "Yes, make default" },
    { id: false, name: "No, not default" },
  ];
  data = [];

  propertyTemplate: any;
  prices$: Observable<any>;
  tabType = "prices";

  buildingStructures = [{ name: "Duplex" }];
  propertyTitles = [{ name: "C of O" }];

  estates$: Observable<any>;
  propertyTypes$: Observable<any>;
  propertyTypes: any[];
  propertySubTypeList = [];
  buildingStructures$: Observable<any>;
  negotiationStatus$: Observable<any>;
  facilities$: Observable<any>;
  propertyTitles$: Observable<any>;
  propertyTemplates$: Observable<any>;
  propertyLocations$: Observable<any>;
  propertyPurpose$: Observable<any>;
  properties$: Observable<any>;

  files: File[] = [];
  estateFiles: File[] = [];
  public Editor = ClassicEditor;
  public editorConfig = {
    // Your CKEditor configuration options
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
    ],
    placeholder: "Type your content here...",
  };

  //
  public editorData = "";
  public characterCount = 0;
  public characterLimit = 500;
  public isLimitReached = false;
  private editorInstance: any;
  private isPasting = false;
  private contentBeforePaste = "";

  obj = {
    estateId: null,
    propertyTypeId: null,
    propertySubTypeId: null,
    templateName: null,
    buildingStructure: null,
    mapUrl: null,
    size: null,
    propertyPrice: null,
    negotiationStatusId: null,
    description: null,
    images: null,
    facilities: [],
    titles: [],
    default: false,
  };

  propertyObj = {
    propertyTemplateId: null,
    properties: [
      { propertyName: null, propertyPurposeId: null, propertyLocationId: null },
    ],
  };

  updateProperty = {
    id: null,
    propertyTemplateId: null,
    propertyPurposeId: null,
    propertyName: null,
    propertyLocationId: null,
  };

  propertyTemplatePrice = {
    price: null,
  };

  addItem() {
    this.propertyObj.properties.push({
      propertyName: null,
      propertyPurposeId: null,
      propertyLocationId: null,
    });
  }

  removeItem(index: number) {
    this.propertyObj.properties.splice(index, 1);
  }

  constructor(
    private readonly route: ActivatedRoute,
    private modalService: NgbModal,
    private readonly propertyService: PropertyService,
    private readonly settingsService: SettingsService
  ) {
    this.route.params.subscribe((params) => {
      this.estateId = params["id"];
      this.getRecord();
    });
  }

  viewPropertyTemplateRecord(item: any) {
    this.getPropertyTemplateInfo(item.id);
    this.showPropertyTemplateInfo = true;
  }

  getPropertyTemplateInfo(propertyTemplateId: number) {
    this.propertyService
      .getAllPropertyTemplates({
        estateId: this.estateId,
        propertyTemplateId: propertyTemplateId.toString(),
      })
      .subscribe({
        next: async (response: any) => {
          console.log(
            "🚀 ~ EstateProfileComponent ~ next: ~ response:",
            response
          );
          this.propertyTemplate = response.data;
          this.propertyTemplate.propertyTypeId = response.data.type.name;
          this.propertyTemplate.propertySubTypeId = response.data.subType.id;
          this.propertyTemplate.negotiationStatusId =
            response.data.negotiationStatus.id;
          this.propertySubTypeList = response.data.type.propertySubTypes;
          this.propertyTemplate.facilities = response.data.facilityItems.map(
            (item: any) => {
              return item.propertyFacility.id;
            }
          );
          this.propertyTemplate.titles = response.data.titles.map(
            (item: any) => {
              return item.name;
            }
          );
          this.propertyService.setPropertyPrices(response.data?.prices);
          this.prices$ = this.propertyService.propertyPrices$;
        },
        error: (error) => {
          console.log("Error in getRecord:", error);
        },
      });
  }

  closeDetail() {
    this.showPropertyTemplateInfo = false;
    // this.propertyLocation = null;
    // this.cdr.detectChanges();
  }

  showUpdatePropertyTemplateModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  toggleTab(tabItem: string) {
    if (tabItem === "prices")
      this.prices$ = this.propertyService.propertyPrices$;
    // this.cdr.detectChanges();
    this.tabType = tabItem;
  }

  async showCreatePropertyTemplatePriceModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  updatePropertyModal(content: any, item: any) {
    this.updateProperty = item;
    this.updateProperty.propertyTemplateId = item.propertyTemplate.id;
    this.updateProperty.propertyLocationId = item.propertyLocation.id;
    this.updateProperty.propertyPurposeId = item.propertyPurpose.id;
    this.updateProperty.propertyName = item.name;
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  async viewEstateDetail(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
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

  async createPropertyTemplateModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  async createPropertyModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  ngOnInit() {
    this.estates$ = this.propertyService.getAllEstate({});
    this.propertyTypes$ = this.settingsService.getAllPropertyTypes({});
    this.settingsService.getAllPropertyTypes({}).subscribe(
      (response: any) => {
        this.propertyTypes = response?.data;
      },
      (error) => {
        console.log(
          "🚀 ~ EstateProfileComponent ~ this.settingsService.getAllPropertyTypes ~ error:",
          error
        );
      }
    );
    this.negotiationStatus$ = this.settingsService.getAllNegotiationStatus({});
    this.facilities$ = this.settingsService.getAllPropertyFacilities({});
    this.propertyTemplates$ = this.propertyService.getAllPropertyTemplates({
      estateId: this.estateId,
    });
    this.propertyLocations$ = this.settingsService.getAllPropertyLocations({});
    this.propertyPurpose$ = this.settingsService.getAllPropertyPurpose({});

    this.getAllProperties();
  }

  getAllProperties() {
    this.properties$ = this.propertyService.getAllProperties({
      estateId: this.estateId,
    });
  }

  getRecord() {
    this.propertyService.getAllEstate({ estateId: this.estateId }).subscribe({
      next: async (response: any) => {
        this.estate = response.data;
        // this.estateFiles.push(response.data?.imageUrl);
      },
      error: (error) => {
        console.log("Error in getRecord:", error);
      },
    });
  }

  onSelectPropertyType(evt: any) {
    this.propertySubTypeList = evt.propertySubTypes;
  }

  resetForm() {
    this.obj = {
      estateId: null,
      propertyTypeId: null,
      propertySubTypeId: null,
      templateName: null,
      buildingStructure: null,
      mapUrl: null,
      size: null,
      propertyPrice: null,
      negotiationStatusId: null,
      description: null,
      images: null,
      facilities: [],
      titles: [],
      default: false,
    };

    this.propertyObj = {
      propertyTemplateId: null,
      properties: [
        {
          propertyName: null,
          propertyPurposeId: null,
          propertyLocationId: null,
        },
      ],
    };
  }

  // dropzone methods
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSelectEstateImage(event: any) {
    console.log(event);
    // Clear existing files before adding new ones
    this.estateFiles = [];

    // Validate file type (optional, but recommended)
    const file = event.addedFiles[0];
    console.log(
      "🚀 ~ EstateProfileComponent ~ onSelectEstateImage ~ file:",
      file
    );
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      Swal.fire("", "Please upload a valid image file", "warning");
      return;
    }

    this.estateFiles.push(file);
  }

  removeImg(id: number, index: number) {
    this.obj.images.splice(index, 1);
    // this.cdr.detectChanges();
  }

  async onUpdateEstate() {
    try {
      this.isLoading = true;

      console.log("this.estateFiles ::", this.estateFiles);
      let imageUrl;
      if (this.estateFiles.length > 0) {
        let formData: FormData = new FormData();
        for (let i = 0; i < this.estateFiles.length; i++) {
          formData.append("file", this.estateFiles[i]);
        }

        imageUrl = await this.propertyService.uploadImage(formData);
      }

      const data = {
        id: this.estate.id,
        name: this.estate.name,
        imageUrl: this.estateFiles.length > 0 ? imageUrl : this.estate.imageUrl,
        description: this.estate.description,
      };
      this.propertyService.updateEstate(data).subscribe(
        (response: any) => {
          this.isLoading = false;
          Swal.fire(
            "Process Successful!",
            "Estate successfully updated!",
            "success"
          );
          this.getRecord();
          this.modalService.dismissAll();
          this.estateFiles = [];
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Process Failed!", "Failed to update estate", "error");
        }
      );
    } catch (err) {
      this.isLoading = false;
      Swal.fire("Process Failed!", "Failed to update estate", "error");
    }
  }

  getPropertyTypeId() {
    return this.propertyTypes.find(
      (item: any) =>
        item.name ==
        (this.obj.propertyTypeId ?? this.propertyTemplate.propertyTypeId)
    ).id;
  }

  async onSubmit() {
    this.isLoading = true;
    let formData: FormData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append("files", this.files[i]);
    }

    const images = await this.propertyService.uploadImages(formData);
    const data = {
      estateId: +this.estateId,
      propertyTypeId: this.getPropertyTypeId(),
      propertySubTypeId: this.obj.propertySubTypeId,
      templateName: this.obj.templateName,
      buildingStructure: this.obj.buildingStructure,
      mapUrl: this.obj.mapUrl,
      size: this.obj.size,
      price: this.obj.propertyPrice,
      negotiationStatusId: this.obj.negotiationStatusId,
      description: this.obj.description,
      images: images.map((image: any) => {
        return image.secure_url;
      }),
      facilities: this.obj.facilities,
      titles: this.obj.titles,
      default: this.obj.default,
    };
    this.propertyService.createPropertyTemplate(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Property template successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getRecord();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          "Process Failed!",
          "Failed to create property template",
          "error"
        );
      }
    );
  }

  async onUpdatePropertyTemplate() {
    this.isLoading = true;
    let images;
    if (this.files.length > 0) {
      let formData: FormData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        formData.append("files", this.files[i]);
      }

      images = await this.propertyService.uploadImages(formData);
    }
    const data = {
      id: this.propertyTemplate.id,
      estateId: +this.estateId,
      templateName: this.propertyTemplate.templateName,
      description: this.propertyTemplate.description,
      mapUrl: this.propertyTemplate.mapUrl,
      size: this.propertyTemplate.size,
      // propertyTypeId: this.propertyTemplate.propertyTypeId,
      propertyTypeId: this.getPropertyTypeId(),
      propertySubTypeId: this.propertyTemplate.propertySubTypeId,
      images:
        this.files.length > 0
          ? images.map((image: any) => {
              return image.secure_url;
            })
          : this.propertyTemplate.images.map((image: any) => {
              return image.imageUrl;
            }),
      facilities: this.propertyTemplate.facilities,
      titles: this.propertyTemplate.titles,
      negotiationStatusId: this.propertyTemplate.negotiationStatusId,
      buildingStructure: this.propertyTemplate.buildingStructure,
      default: this.propertyTemplate.default,
      // price: this.obj.propertyPrice,
    };
    this.propertyService.updatePropertyTemplate(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Property template successfully updated!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getRecord();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          "Process Failed!",
          "Failed to update property template",
          "error"
        );
      }
    );
  }

  async onSubmitProperty() {
    this.isLoading = true;

    this.propertyService.createProperty(this.propertyObj).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Property successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        // this.getRecord();
        this.getAllProperties();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to create property", "error");
      }
    );
  }
  async onUpdateProperty() {
    this.isLoading = true;

    const data = {
      id: this.updateProperty.id,
      propertyTemplateId: this.updateProperty.propertyTemplateId,
      propertyPurposeId: this.updateProperty.propertyPurposeId,
      propertyName: this.updateProperty.propertyName,
      propertyLocationId: this.updateProperty.propertyLocationId,
    };

    this.propertyService.updateProperty(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Property successfully updated!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        // this.getRecord();
        this.getAllProperties();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to update property", "error");
      }
    );
  }

  async onSubmitPropertyTemplatePrice() {
    this.isLoading = true;
    const data = {
      propertyTemplateId: this.propertyTemplate.id,
      price: this.propertyTemplatePrice.price,
    };
    this.propertyService.updatePropertyTemplatePrice(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Property price successfully updated!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getRecord();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          "Process Failed!",
          "Failed to update property price",
          "error"
        );
      }
    );
  }

  getAcivePrice(prices: any[]) {
    console.log(
      "🚀 ~ EstateProfileComponent ~ getAcivePrice ~ prices:",
      prices
    );
    if (!prices || !Array.isArray(prices) || prices.length === 0) {
      return 0;
    }
    return prices.find((item: any) => item.status === true).price;
  }

  getFacilityNames(items: any[]): string {
    // Check if facilityItems exists and is an array
    if (!items || !Array.isArray(items)) {
      return "";
    }

    // Filter out any items with missing propertyFacility or name
    const facilityNames = items
      .filter((item) => item?.propertyFacility?.name)
      .map((item) => item.propertyFacility.name);

    // Handle single item case (no comma) or join multiple items
    if (facilityNames.length === 0) {
      return "";
    } else if (facilityNames.length === 1) {
      return facilityNames[0];
    } else {
      return facilityNames.join(", ");
    }
  }

  // public onReady({ editor }: any) {
  //   this.editorInstance = editor;

  //   // Set up keydown event listener to prevent typing past the limit
  //   editor.editing.view.document.on("keydown", (evt: any, data: any) => {
  //     if (this.isLimitReached && !this.isDeletionKey(data.keyCode)) {
  //       // Prevent typing new characters when limit is reached
  //       data.preventDefault();
  //       return false;
  //     }
  //   });

  //   // Handle paste events
  //   editor.editing.view.document.on("clipboardInput", (evt: any, data: any) => {
  //     // Let the paste happen normally
  //     // We'll handle the trimming in the onChange event

  //     // Get the current content without the paste
  //     const currentContent = editor.getData();
  //     const currentTextLength = this.getTextLength(currentContent);

  //     // If we're already at or over the limit, prevent paste
  //     // if (currentTextLength >= this.characterLimit) {
  //     //   evt.stop();
  //     //   return;
  //     // }

  //     // Otherwise let the paste happen, and we'll trim it if needed in onChange
  //   });

  //   // Initialize character count
  //   this.updateCharacterCount(editor.getData());
  // }

  // public onChange({ editor }: ChangeEvent) {
  //   const currentData = editor.getData();
  //   const currentLength = this.getTextLength(currentData);

  //   if (currentLength <= this.characterLimit) {
  //     // Content is within limits, just update the count
  //     this.characterCount = currentLength;
  //     this.isLimitReached = currentLength === this.characterLimit;
  //   } else {
  //     // Content exceeds limit, we need to trim it
  //     const trimmedData = this.trimHtmlToCharacterLimit(
  //       currentData,
  //       this.characterLimit
  //     );
  //     editor.setData(trimmedData);
  //     this.characterCount = this.characterLimit;
  //     this.isLimitReached = true;
  //   }
  // }

  // private updateCharacterCount(html: string) {
  //   this.characterCount = this.getTextLength(html);
  //   this.isLimitReached = this.characterCount >= this.characterLimit;
  // }

  // private getTextLength(html: string): number {
  //   // Remove HTML tags to count only text characters
  //   return html.replace(/<[^>]*>/g, "").length;
  // }

  // private isDeletionKey(keyCode: number): boolean {
  //   // Key codes for keys that remove characters:
  //   // 8: Backspace, 46: Delete
  //   return [8, 46].includes(keyCode);
  // }

  // private trimHtmlToCharacterLimit(html: string, limit: number): string {
  //   // This is a simplified approach that might not work perfectly for all HTML structures
  //   // For a production app, consider using a proper HTML parser library

  //   const tempDiv = document.createElement("div");
  //   tempDiv.innerHTML = html;

  //   let textContent = "";
  //   let result = "";

  //   // Function to process nodes recursively
  //   const processNode = (node: Node): boolean => {
  //     if (textContent.length >= limit) {
  //       return false;
  //     }

  //     if (node.nodeType === Node.TEXT_NODE) {
  //       const remainingChars = limit - textContent.length;
  //       const nodeText = node.textContent || "";

  //       if (textContent.length + nodeText.length <= limit) {
  //         textContent += nodeText;
  //         return true;
  //       } else {
  //         // We need to trim this text node
  //         textContent += nodeText.substring(0, remainingChars);
  //         node.textContent = nodeText.substring(0, remainingChars);
  //         return false;
  //       }
  //     } else if (node.nodeType === Node.ELEMENT_NODE) {
  //       const childNodes = Array.from(node.childNodes);
  //       const nodeCopy: any = node.cloneNode(false);

  //       for (const childNode of childNodes) {
  //         const childCopy = childNode.cloneNode(true);
  //         if (processNode(childCopy)) {
  //           nodeCopy.appendChild(childCopy);
  //         } else {
  //           // We've reached the limit in this child
  //           if (childCopy.nodeType === Node.ELEMENT_NODE) {
  //             nodeCopy.appendChild(childCopy);
  //           }
  //           break;
  //         }
  //       }

  //       result += nodeCopy.outerHTML;
  //       return true;
  //     }

  //     return true;
  //   };

  //   Array.from(tempDiv.childNodes).forEach((node) => {
  //     processNode(node);
  //   });

  //   return result || tempDiv.innerHTML;
  // }

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
