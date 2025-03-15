import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AccessControlService } from '../access-control.service';

interface TreeNode {
  id: number;
  text: string;
  value: number;
  children?: TreeNode[];
  checked?: boolean;
  indeterminate?: boolean;
}

@Component({
  selector: 'app-menu-authorization-listing',
  templateUrl: './menu-authorization-listing.component.html',
  styleUrls: ['./menu-authorization-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuAuthorizationListingComponent implements OnInit {
  data = [];
  obj: any = { privilegeId: null };
  privilegeList$: Observable<any>;
  menuAuthorizationList: any = [];
  menuItems: any = [];
  isLoading = false;

  books = [
    {
      text: 'Children',
      value: 1,
      children: [
        { text: 'The Cat in the Hat', value: 11 },
        { text: 'Harry Potter', value: 12 },
      ],
    },
    {
      text: 'Programming',
      value: 2,
      children: [
        {
          text: 'Frontend',
          value: 21,
          children: [
            { text: 'Angular', value: 211 },
            { text: 'React', value: 212 },
          ],
        },
        {
          text: 'Backend',
          value: 22,
          children: [
            { text: 'Node.js', value: 221 },
            { text: 'Django', value: 222 },
          ],
        },
      ],
    },
  ];
  books2 = [
    {
      text: 'Programming',
      value: 2,
      children: [
        {
          text: 'Frontend',
          value: 21,
          children: [
            { text: 'Angular', value: 211 },
            { text: 'React', value: 212, checked: true },
          ],
        },
        {
          text: 'Backend',
          value: 22,
          children: [
            { text: 'Node.js', value: 221 },
            { text: 'Django', value: 222, checked: true },
          ],
        },
      ],
    },
  ];

  selectedItems: { id: number; text: string; value: number }[] = [];

  @ViewChild('editItemModal')
  editItemModalRef: TemplateRef<any>;
  constructor(
    private readonly accessControlService: AccessControlService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.updateBooks(this.books, this.books2);
    // this.updateCheckStatus(this.books);
    this.getPrivilegeList();
  }

  getPrivilegeList() {
    this.privilegeList$ = this.accessControlService.getAllPrivileges();
    this.accessControlService.getAllMenu().subscribe(async ({ data }: any) => {
      console.log(
        '🚀 ~ MenuAuthorizationListingComponent ~ this.menuService.getAllMenu ~ data:',
        data
      );
      this.menuItems = await this.GenerateTree(data);
      console.log(
        '🚀 ~ MenuAuthorizationListingComponent ~ this.menuService.getAllMenu ~ this.menuItems:',
        this.menuItems
      );
      this.cdr.detectChanges();
    });
  }

  getMenuAuthorizationByPrivilegeId() {
    this.accessControlService
      .getMenuAuthorizationByPrivilegeId(this.obj.privilegeId)
      .subscribe(async (response) => {
        const menuAuthorizationList1 = await this.GenerateTree(response.data);
        const menuAuthorizationList2 = await this.addCheckedToAll(
          menuAuthorizationList1
        );

        this.menuItems = await this.updateBooks(
          this.menuItems,
          menuAuthorizationList2
        );
        this.menuItems = await this.updateCheckStatus(this.menuItems);
        this.cdr.detectChanges();
      });
  }

  resetForm() {
    this.obj = {
      privilegeId: 0,
    };
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

  onSubmit(): void {
    // this.selectedItems;
    this.isLoading = true;
    console.log(
      '🚀 ~ MenuAuthorizationListingComponent ~ onSubmit ~ this.selectedItems:',
      this.selectedItems,
      this.obj
    );

    const menuIItems = this.selectedItems.map((item) => {
      return { id: item.id, menuId: +item.value };
    });
    console.log(
      '🚀 ~ MenuAuthorizationListingComponent ~ menuIItems ~ menuIItems:',
      menuIItems
    );

    const createMenuAuthDto = {
      privilegeId: +this.obj.privilegeId,
      menuIItems: menuIItems,
    };
    console.log(
      '🚀 ~ MenuAuthorizationListingComponent ~ onSubmit ~ createMenuAuthDto:',
      createMenuAuthDto
    );

    this.accessControlService
      .createMenuAuthorization(createMenuAuthDto)
      .subscribe(
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
              this.getMenuAuthorizationByPrivilegeId();
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
      console.log(
        '🚀 ~ MenuAuthorizationListingComponent ~ returntree.map ~ item:',
        item
      );
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
