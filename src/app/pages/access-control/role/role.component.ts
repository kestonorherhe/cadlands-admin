import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AccessControlService } from '../access-control.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  data = [];
  obj: any = { id: 0, name: '', description: '' };
  roleList$: Observable<any>;
  isLoading = false;

  @ViewChild('editItemModal')
  editItemModalRef: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private readonly accessControlService: AccessControlService,
  ) {}

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
      })
      .catch((res) => {});
  }

  edit(data: any) {
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
        this.resetForm();
        this.modalService.dismissAll();
      }
    });
  }

  ngOnInit(): void {
    this.getRoleTypes();
  }

  getRoleTypes() {
    this.roleList$ = this.accessControlService.getAllPrivilege();
  }

  createRecordModal(content: any) {
    this.modalService.open(content, { backdrop: 'static', centered: true, size: 'lg' });
  }

  resetForm() {
    this.obj = {
      id: 0,
      name: '',
      description: '',
    };
  }

  onSubmit() {
    this.isLoading = true;

    const createRoomTypeDto: any = {
      name: this.obj.name,
      description: this.obj.description,
    };

    this.accessControlService.createPrivilege(createRoomTypeDto).subscribe(
      (response: any) => {
        Swal.fire({
          text: "Role was created successfully!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.modalService.dismissAll();
            this.resetForm();
            this.isLoading = false;
            this.getRoleTypes();
          }
        });
      },
      (error) => {
        Swal.fire({
          text: `Failed to create role! ${
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

    this.accessControlService.updatePrivilege(updateRoomTypeDto).subscribe(
      (response: any) => {
        Swal.fire({
          text: "Role was updated successfully!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.modalService.dismissAll();
            this.resetForm();
            this.isLoading = false;
            this.getRoleTypes();
          }
        });
      },
      (error) => {
        Swal.fire({
          text: `Failed to update role! ${
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
