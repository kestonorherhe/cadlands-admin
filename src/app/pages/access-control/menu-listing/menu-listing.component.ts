import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AccessControlService } from '../access-control.service';

@Component({
  selector: 'app-menu-listing',
  templateUrl: './menu-listing.component.html',
  styleUrls: ['./menu-listing.component.scss'],
})
export class MenuListingComponent implements OnInit {
  data = [];
  obj: any = {
    id: null,
    label: null,
    icon: null,
    link: null,
    parentMenu1: null,
    parentMenu2: null,
    parentMenu3: null,
    parentMenu1Id: null,
    parentMenu1OrderBy: null,
    parentMenu1Title: null,
    parentMenu2Id: null,
    parentMenu2OrderBy: null,
    parentMenu2Title: null,
    parentMenu3Id: null,
    parentMenu3OrderBy: null,
    parentMenu3Title: null,
    featureId: null,
    statusId: null,
    orderBy: null,
    parentMenuId: null,
  };
  menuList$: Observable<any>;
  menuItems: any = [];
  MenuList: any = [];
  MenuList2: any = [];
  MenuList3: any = [];
  MenuList4: any = [];
  menuSuffix: any;

  featureList$: Observable<any>;

  showParentMenu1: boolean = false;
  showParentMenu2 = false;
  showParentMenu3 = false;
  isLoading = false;

  @ViewChild('editItemModal')
  editItemModalRef: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private readonly accessControlService: AccessControlService
  ) {}

  getMenuTitle(id: number): String {
    return this.menuItems.find((i: any) => i.id == id).label;
  }

  toggleParentMenu1(): void {
    this.showParentMenu1 = !this.showParentMenu1;
    if (!this.showParentMenu1) {
      this.showParentMenu2 = false;
      this.showParentMenu3 = false;
      /* reset childMenu1 childMenu2 childMenu3 */
      this.obj.parentMenu1Id = null;
      this.obj.parentMenu2Id = null;
      this.obj.parentMenu3Id = null;
    }
  }

  toggleParentMenu2(): void {
    this.showParentMenu2 = !this.showParentMenu2;
    if (!this.showParentMenu2) {
      this.showParentMenu3 = false;
      /* reset childMenu2 childMenu3 */
      this.obj.parentMenu2Id = null;
      this.obj.parentMenu3Id = null;
    }
  }

  toggleParentMenu3(): void {
    this.showParentMenu3 = !this.showParentMenu3;
    /* reset childMenu3 */
    this.obj.parentMenu3 = null;
  }

  filterMenuList2(evt: any) {
    console.log('this.obj.parentMenu1 :: ', this.obj.parentMenu1);
    this.obj.parentMenu1Id = this.obj.parentMenu1;
    this.MenuList2 = this.filterParentMenu(this.obj.parentMenu1);

    this.obj.parentMenu1OrderBy = this.getOrderBy(this.MenuList2);
  }

  filterMenuList3(evt: any) {
    this.obj.parentMenu2Id = this.obj.parentMenu2Id;
    this.MenuList3 = this.filterParentMenu(this.obj.parentMenu2Id);
    const orderByMenuArr = this.filterMenu(this.obj.parentMenu2Id);
    this.obj.parentMenu2OrderBy = this.getOrderBy(orderByMenuArr);
  }

  filterParentMenu(id: any) {
    console.log('these are the menu items ::', this.menuItems);
    return this.menuItems.filter((i: any) => i.parentMenu?.id == id && i.link == '#');
  }

  filterMenu(id: any) {
    return this.menuItems.filter(
      (i: any) => i.parentMenu?.id == id && i.link == '#'
    );
  }

  showEditItemModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {
        centered: false,
        size: 'lg',
        animation: true,
        backdrop: 'static',
        keyboard: false,
      })
      .result.then((result) => {
        console.log('Modal closed' + result);
      })
      .catch((res) => {});
  }

  edit(data: any) {
    console.log('we are editing ::', data);
    this.obj = data;
    this.showEditItemModal(this.editItemModalRef);
  }

  closeModal() {
    Swal.fire({
      icon: 'warning',
      text: 'Are you sure you would like to cancel?',
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Yes, cancel it!',
      confirmButtonColor: '#1B84FF',
      denyButtonText: `No, return`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.showParentMenu1 = false;
        this.showParentMenu2 = false;
        this.showParentMenu3 = false;
        this.resetForm();
        this.modalService.dismissAll();
      }
    });
  }

  ngOnInit(): void {
    this.getMenuList();
    this.getFeatureList();
  }

  getFeatureList() {
    this.featureList$ = this.accessControlService.getAllFeature();
  }

  getMenuList() {
    this.menuList$ = this.accessControlService.getAllMenu();
    this.accessControlService.getAllMenu().subscribe((response: any) => {
      this.menuItems = response?.data;
      this.MenuList = response?.data.filter((item: any) => item?.parentMenu == null);
    });
  }

  createRecordModal(content: any) {
    this.modalService.open(content, { backdrop: 'static', centered: true, size: 'lg' });
  }

  resetForm() {
    this.obj = {
      id: null,
      label: null,
      icon: null,
      link: null,
      parentMenu1: null,
      parentMenu2: null,
      parentMenu3: null,
      parentMenu1Id: null,
      parentMenu1OrderBy: null,
      parentMenu1Title: null,
      parentMenu2Id: null,
      parentMenu2OrderBy: null,
      parentMenu2Title: null,
      parentMenu3Id: null,
      parentMenu3OrderBy: null,
      parentMenu3Title: null,
      featureId: null,
      statusId: null,
      orderBy: null,
      parentMenuId: null,
    };
  }

  getOrderBy(menuArr: any): number {
    console.log('🚀 ~ getOrderBy ~ menuArr:', menuArr);
    console.log('selected feature ::', this.obj.featureId);
    if (menuArr.length > 0) {
      /* sort array by id */
      menuArr
        .filter((menu: any) => menu.featureId == this.obj.featureId)
        .sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
      return Number(menuArr[menuArr.length - 1].orderBy) + 1;
    } else {
      return 1;
    }
  }

  onSubmit() {
    this.isLoading = true;

    console.log(this.obj.parentMenu1);
    const title = this.obj.label;
    const parentMenu1 = this.obj.parentMenu1;
    const parentMenu2 = this.obj.parentMenu2Id;
    const parentMenu3 = this.obj.parentMenu3;

    // this.obj.featureId = 1;
    this.obj.statusId = true;

    console.log(
      'parentMenu1 ::',
      parentMenu1,
      'parentMenu2 ::',
      parentMenu2,
      'parentMenu3',
      parentMenu3
    );
    if (parentMenu1 == null && parentMenu2 == null && parentMenu3 == null) {
      console.log('This is the menu 1');
      const orderByMenuArr = this.menuItems.filter(
        (i: any) => i.parentMenu?.id == null && i.link == '#'
      );
      this.obj.orderBy = this.getOrderBy(orderByMenuArr);
      this.obj.parentMenuId = null;
      this.obj.orderBy = this.getOrderBy(this.menuItems);
    } else if (
      parentMenu1 != null &&
      parentMenu2 == null &&
      parentMenu3 == null
    ) {
      console.log(
        'This is the menu 2',
        'this is the menu array ::',
        this.menuItems
      );
      this.obj.parentMenuId = parentMenu1;
      const orderByMenuArr = this.menuItems.filter(
        (i: any) => i.parentMenu?.id == parentMenu1 && i.link == '#'
      );
      this.obj.orderBy = this.getOrderBy(orderByMenuArr);
      // this.obj.icon = '/heroicons_outline:home';
    } else if (
      parentMenu1 != null &&
      parentMenu2 != null &&
      parentMenu3 == null
    ) {
      console.log('This is the menu 3');
      this.obj.parentMenuId = this.obj.parentMenu2Id;
      this.obj.orderBy = this.obj.parentMenu2OrderBy;
      // this.obj.icon = '/heroicons_outline:home';
    } else if (
      parentMenu1 != null &&
      parentMenu2 != null &&
      parentMenu3 != null
    ) {
      console.log('This is the menu 4');
      this.obj.parentMenuId = this.obj.parentMenu3Id;
      this.obj.orderBy = this.obj.parentMenu3OrderBy;
      this.obj.icon = 'heroicons_outline:home';
    }

    // const data: CreateMenuDTO = {
    const createMenuDTO = {
      label: this.obj.label,
      link: this.obj.link,
      parentMenuId: +this.obj.parentMenuId,
      featureId: +this.obj.featureId,
      icon: this.obj.icon,
      orderBy: this.obj.orderBy,
      statusId: this.obj.statusId,
    };

    console.log(createMenuDTO);

    this.accessControlService.createMenu(createMenuDTO).subscribe(
      (response: any) => {
        Swal.fire({
          text: "Menu item was created successfully!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.showParentMenu1 = false;
            this.showParentMenu2 = false;
            this.showParentMenu3 = false;
            this.modalService.dismissAll();
            this.resetForm();
            this.isLoading = false;
            this.getMenuList();
          }
        });
      },
      (error) => {
        Swal.fire({
          text: `Failed to create menu item! ${
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
            // this.getRoomTypes();
          }
        });
      }
    );
  }

  onUpdate() {
    this.isLoading = true;

    const updateRoomTypeDto: any = {
      id: this.obj.id,
      name: this.obj.name,
      description: this.obj.description,
    };

    this.accessControlService.updateMenu(updateRoomTypeDto).subscribe(
      (response: any) => {
        Swal.fire({
          text: "Menu item was updated successfully!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.modalService.dismissAll();
            this.resetForm();
            this.isLoading = false;
            this.getMenuList();
          }
        });
      },
      (error) => {
        Swal.fire({
          text: `Failed to update menu item! ${
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
            // this.getRoomTypes();
          }
        });
      }
    );
  }
}
