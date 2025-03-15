import { Component, EventEmitter, Input, Output } from '@angular/core';

interface TreeNode {
  text: string;
  value: number;
  children?: TreeNode[];
  checked?: boolean;
  indeterminate?: boolean;
}

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss'],
})

export class MenuTreeComponent {
  @Input() treeData: TreeNode[] = [];
  @Output() nodeChecked = new EventEmitter();

  onCheckboxChange(node: TreeNode): void {
    // Update all children based on the current node's status
    this.updateChildrenCheckStatus(node);

    // Update the status of all parents in the tree
    this.updateParentCheckStatus(this.treeData, null);

    // Emit the event to notify that the node's checked status has changed
    this.nodeChecked.emit();
  }

  // Recursively updates the check status of all children of the node
  private updateChildrenCheckStatus(node: TreeNode): void {
    if (node.children) {
      node.children.forEach((child) => {
        child.checked = node.checked;
        this.updateChildrenCheckStatus(child); // propagate the change downwards
      });
    }
  }

  // Updates the parent status based on the children's status
  private updateParentCheckStatus(nodes: TreeNode[], parent?: TreeNode| null): void {
    nodes.forEach((node) => {
      if (node.children) {
        // Update children recursively
        this.updateParentCheckStatus(node.children, node);

        // Calculate the check status for the current node
        const allChecked = node.children.every((child) => child.checked);
        const someChecked = node.children.some(
          (child) => child.checked || child.indeterminate
        );

        // Set the current node's checked and indeterminate status
        node.checked = allChecked;
        node.indeterminate = !allChecked && someChecked;
      }
    });

    // If a parent is provided, update it based on its children's status
    if (parent && parent.children) {
      const allChildrenChecked = parent.children.every(
        (child) => child.checked
      );
      const someChildrenChecked = parent.children.some(
        (child) => child.checked || child.indeterminate
      );

      parent.checked = allChildrenChecked;
      parent.indeterminate = !allChildrenChecked && someChildrenChecked;
    }
  }
}

