import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdvancedService } from "../../tables/advancedtable/advanced.service";
import { DecimalPipe } from "@angular/common";
import { StaffService } from "../staff.service";
import { AccessControlService } from "../../access-control/access-control.service";
import { StorageService } from "src/app/core/services/storage.service";
import { catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import Swal from "sweetalert2";

interface TreeNode {
  id: number;
  text: string;
  value: number;
  children?: TreeNode[];
  checked?: boolean;
  indeterminate?: boolean;
}

@Component({
  selector: "app-staff-profile",
  templateUrl: "./staff-profile.component.html",
  styleUrls: ["./staff-profile.component.scss"],
  providers: [AdvancedService, DecimalPipe],
})

/**
 * Contacts-profile component
 */
export class StaffProfileComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  staffId: string;
  staff: any;
  data: any = [];
  isLoading = false;

  menuItems: any = [];
  selectedItems: { id: number; text: string; value: number }[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly staffService: StaffService,
    private storageService: StorageService,
    private readonly accessControlService: AccessControlService,
    private cdr: ChangeDetectorRef
  ) {
    this.route.params.subscribe((params) => {
      this.staffId = params["id"];
      this.getUser();
    });

    // this.viewRecord = this.viewRecord.bind(this);
  }

  viewRecord(evt: any) {
    const id = evt.row.data.id;
  }

  async ngOnInit() {
    this.breadCrumbItems = [
      { label: "Staff" },
      { label: "Profile", active: true },
    ];
    this.loadMenuItems();
  }
  private loadMenuItems(): void {
    this.accessControlService
      .getCoreMenuItems()
      .pipe(
        tap(async ({ data }: any) => {
          this.menuItems = await this.GenerateTree(data);
          this.cdr.detectChanges();
        }),
        switchMap(() =>
          this.accessControlService.getMenuAuthorizationsByAdmin(+this.staffId)
        ),
        catchError((error) => {
          console.error("Error fetching core menu items:", error);
          return of({ data: [] });
        })
      )
      .subscribe({
        next: async ({ data }: any) => {

          // Process the data synchronously
          const menuAuthorizationList1 = await this.GenerateTree(data);
          const menuAuthorizationList2 = await this.addCheckedToAll(
            menuAuthorizationList1
          );

          this.menuItems = await this.updateBooks(
            this.menuItems,
            menuAuthorizationList2
          );
          this.menuItems = await this.updateCheckStatus(this.menuItems);
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error("Error fetching menu authorizations:", error);
        },
      });
  }

  getUser() {
    this.staffService.getRecords({ staffId: this.staffId }).subscribe(
      (response: any) => {
        this.staff = response;
      },
      (error) => {
      }
    );
  }

  updateSelectedItems(): void {
    this.selectedItems = this.getSelectedItems(this.menuItems);
    this.cdr.detectChanges();
  }

  private getSelectedItems(
    nodes: TreeNode[],
    parentSelected: boolean = false
  ): { id: number; text: string; value: number }[] {
    let selected: { id: number; text: string; value: number }[] = [];
    for (const node of nodes) {
      if (node.checked || node.indeterminate || parentSelected) {
        selected.push({ id: node.id, text: node.text, value: node.value });
      }
      if (node.children) {
        selected = selected.concat(
          this.getSelectedItems(node.children, node.checked || parentSelected)
        );
      }
    }
    return selected;
  }

  assignMenuAccessFn() {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to grant access to these menu items?",
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes, grant access!",
      confirmButtonColor: "#1B84FF",
      denyButtonText: `No, return`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.onSubmit();
      }
    });
  }

  onSubmit(): void {
    this.isLoading = true;

    const menuIItems = this.selectedItems.map((item) => {
      return { id: item.id, menuId: +item.value };
    });

    const createMenuAuthDto = {
      adminId: +this.staffId,
      menuIItems: menuIItems,
    };

    this.accessControlService.assignMenuAccess(createMenuAuthDto).subscribe(
      (response: any) => {
        Swal.fire({
          text: "Menu items was successfully assigned to role!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            // this.resetForm();
            this.isLoading = false;
            this.selectedItems = [];
            this.loadMenuItems();
            this.cdr.detectChanges();
          }
        });
      },
      (error) => {
        Swal.fire({
          text: `Failed to assign menu items! ${
            error.error.statusCode === 401
              ? "User not authorized!"
              : error.error.message
          }`,
          icon: "error",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      }
    );
  }

  private async GenerateTree(data: any[]) {
    // Preprocess each item and initialize necessary properties
    data.forEach((item) => {
      item.children = [];
      item.id = item.id;
      item.text = item.label;
      item.value = item.id;
    });

    // Build the tree structure
    const tree = await this.buildTree(data);

    // Sort the tree based on `orderBy` or `order_by`
    tree.sort(
      (a: any, b: any) => (a.orderBy ?? a.order_by) - (b.orderBy ?? b.order_by)
    );

    // Format the final tree structure
    return this.formatTree(tree);
  }

  private async buildTree(data: any[]) {
    const map = new Map(); // Store nodes by their ID for easy lookup
    const roots: any = [];

    // First pass: Create a map of all nodes by their ID
    data.forEach((item) => {
      map.set(item.id, item);
    });

    // Second pass: Link children to their parents
    data.forEach((item) => {
      const parentId = item.parentMenu?.id ?? item.parent_menu;

      if (parentId && map.has(parentId)) {
        const parent = map.get(parentId);
        parent.children.push(item); // Add this item as a child of its parent
      } else {
        roots.push(item); // If no valid parent, this is a root node
      }
    });

    return roots; // Return the root nodes of the tree
  }

  private formatTree(tree: any[]): any[] {
    return tree.map((item) => {
      const formattedItem: any = {
        id: item.menu_auth_id,
        text: item.label,
        value: item.id,
      };

      const formattedChildren = this.formatTree(item.children);
      if (formattedChildren.length > 0) {
        formattedItem.children = formattedChildren;
      }

      return formattedItem;
    });
  }

  private async updateCheckStatus(books: any[]) {
    books.forEach((book) => {
      if (book.children) {
        // Recursively call the function for each child node
        this.updateCheckStatus(book.children);

        // Check if all children are checked or some are checked
        const allChecked = book.children.every((child: any) => child.checked);
        const someChecked = book.children.some(
          (child: any) => child.checked || child.indeterminate
        );

        if (allChecked) {
          book.checked = true;
          delete book.indeterminate; // Remove indeterminate if fully checked
        } else if (someChecked) {
          book.indeterminate = true;
          delete book.checked; // Remove checked if partially checked
        } else {
          delete book.checked; // Remove checked if none are checked
          delete book.indeterminate; // Remove indeterminate if none checked
        }
      }
    });

    return books;
  }

  private updateBooks(books: any[], books2: any[]): any[] {
    // Create an updated array to store the result
    return books.map((book) => {
      const matchingBook = books2.find((b2) => b2.value === book.value);

      if (matchingBook) {
        // Update the current book if there's a matching book in books2
        const updatedBook = { ...book, ...matchingBook };

        // If both books have children, recursively update their children
        if (book.children && matchingBook.children) {
          updatedBook.children = this.updateBooks(
            book.children,
            matchingBook.children
          );
        }

        return updatedBook;
      } else if (book.children) {
        // If no match is found but the book has children, update the children
        return { ...book, children: this.updateBooks(book.children, []) };
      }

      // Return the original book if no match is found
      return book;
    });
  }

  private addCheckedToAll(items: any[]): any[] {
    for (const item of items) {
      item.checked = true; // Add checked = true to the current item

      // If the item has children, recursively call this function for each child
      if (item.children && item.children.length > 0) {
        this.addCheckedToAll(item.children);
      }
    }

    return items; // Return the updated items array
  }
}
