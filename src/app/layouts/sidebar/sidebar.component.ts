import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
} from "@angular/core";
import MetisMenu from "metismenujs/dist/metismenujs";
import { EventService } from "../../core/services/event.service";
import { Router, NavigationEnd } from "@angular/router";

import { HttpClient } from "@angular/common/http";

import { MENU } from "./menu";
import { MenuItem } from "./menu.model";
import { TranslateService } from "@ngx-translate/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})

/**
 * Sidebar component
 */
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild("componentRef") scrollRef;
  @Input() isCondensed = false;
  menu: any;
  data: any;

  menuItems = [];

  selectedAccounts = [];
  obj = {
    selectedAccounts: [],
  };

  requestedApis: any = [];
  accounts = [
    {
      id: 1,
      name: "All Face Features",
      age: 15,
      child: { state: "Face Capture" },
    },
    {
      id: 2,
      name: "Spoofing",
      age: 10,
      child: { state: "Face Capture" },
    },
    {
      id: 3,
      name: "Face Detection",
      age: 7,
      child: { state: "Face Capture" },
    },
    {
      id: 4,
      name: "Background Removal",
      age: 12,
      child: { state: "Face Capture" },
    },
    {
      id: 5,
      name: "Liveness Check",
      age: 47,
      child: { state: "Face Capture" },
    },
    {
      id: 6,
      name: "Face Object Detection",
      age: 30,
      child: { state: "Face Capture" },
    },
    {
      id: 7,
      name: "Hand Detection",
      age: 30,
      child: { state: "Finger Capture" },
    },
  ];

  totalAmount = 0;

  groupByFn = (item) => item.child.state;

  groupValueFn = (_: string, children: any[]) => ({
    name: children[0].child.state,
    total: children.length,
  });

  @ViewChild("sideMenu") sideMenu: ElementRef;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    public translate: TranslateService,
    private http: HttpClient,
    private modalService: NgbModal,
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
        this._scrollElement();
      }
    });
  }

  ngOnInit() {
    this.initialize();
    this.menuItems = MENU;
    // this.menuItems = JSON.parse(localStorage.getItem('menuList'));
    this._scrollElement();
  }

  ngAfterViewInit() {
    this.menu = new MetisMenu(this.sideMenu.nativeElement);
    this._activateMenuDropdown();
  }

  toggleMenu(event) {
    event.currentTarget.nextElementSibling.classList.toggle("mm-show");
  }

  ngOnChanges() {
    if ((!this.isCondensed && this.sideMenu) || this.isCondensed) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
      });
    } else if (this.menu) {
      this.menu.dispose();
    }
  }
  _scrollElement() {
    setTimeout(() => {
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition =
          document.getElementsByClassName("mm-active")[0]["offsetTop"];
        if (currentPosition > 500)
          if (this.scrollRef.SimpleBar !== null)
            this.scrollRef.SimpleBar.getScrollElement().scrollTop =
              currentPosition + 300;
      }
    }, 300);
  }

  /**
   * remove active and mm-active class
   */
  _removeAllClass(className) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  /**
   * Activate the parent dropdown
   */
  _activateMenuDropdown() {
    this._removeAllClass("mm-active");
    this._removeAllClass("mm-show");
    const links = document.getElementsByClassName("side-nav-link-ref");
    let menuItemEl = null;
    // tslint:disable-next-line: prefer-for-of
    const paths = [];
    for (let i = 0; i < links.length; i++) {
      paths.push(links[i]["pathname"]);
    }
    var itemIndex = paths.indexOf(window.location.pathname);
    if (itemIndex === -1) {
      const strIndex = window.location.pathname.lastIndexOf("/");
      const item = window.location.pathname.substr(0, strIndex).toString();
      menuItemEl = links[paths.indexOf(item)];
    } else {
      menuItemEl = links[itemIndex];
    }
    if (menuItemEl) {
      menuItemEl.classList.add("active");
      const parentEl = menuItemEl.parentElement;
      if (parentEl) {
        parentEl.classList.add("mm-active");
        const parent2El = parentEl.parentElement.closest("ul");
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.add("mm-show");
          const parent3El = parent2El.parentElement;
          if (parent3El && parent3El.id !== "side-menu") {
            parent3El.classList.add("mm-active");
            const childAnchor = parent3El.querySelector(".has-arrow");
            const childDropdown = parent3El.querySelector(".has-dropdown");
            if (childAnchor) {
              childAnchor.classList.add("mm-active");
            }
            if (childDropdown) {
              childDropdown.classList.add("mm-active");
            }
            const parent4El = parent3El.parentElement;
            if (parent4El && parent4El.id !== "side-menu") {
              parent4El.classList.add("mm-show");
              const parent5El = parent4El.parentElement;
              if (parent5El && parent5El.id !== "side-menu") {
                parent5El.classList.add("mm-active");
                const childanchor = parent5El.querySelector(".is-parent");
                if (childanchor && parent5El.id !== "side-menu") {
                  childanchor.classList.add("mm-active");
                }
              }
            }
          }
        }
      }
    }
  }

  /**
   * Initialize
   */
  initialize(): void {
    this.menuItems = MENU;
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    // console.log(
    //   "hasItems ::",
    //   item.subItems !== undefined ? item.subItems.length > 0 : false
    // );
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * Open modal
   * @param content modal content
   */
  assignApiModal(content: any) {
    this.modalService.open(content, {
      centered: true,
      size: "md",
      keyboard: true,
      backdrop: "static",
    });
  }

  onSelectChange(evt) {
    console.log("select__evt::", evt);
    evt.apiUnits = 0;
    this.requestedApis = [...this.requestedApis, evt];
  }

  onRemoveItem(evt) {
    // console.log("event::", evt.value);
    this.requestedApis = this.requestedApis.filter((i) => i.id != evt.value.id);
    this.requestedApis = [...[], ...this.requestedApis]

  }

  removeItem(evt) {
    // console.log("event::", evt);
    this.requestedApis = this.requestedApis.filter((i) => i.id != evt.id);
    const selectedAccounts = this.requestedApis.map(a => a.name);
    this.obj.selectedAccounts = selectedAccounts;

    this.calculateAmount()
  }

  calculateAmount() {
    this.totalAmount = this.requestedApis.reduce(
      (partialSum, a) => partialSum + Number(a.age) * Number(a.apiUnits),
      0
    );

    console.log("totalAmount ::", this.totalAmount);
  }

  logout() {
    this.authenticationService.logout();
  }
}
