import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    id: 2,
    label: "Dashboard",
    icon: "bx-home",
    link: "/dashboard",
  },
  {
    id: 3,
    label: "Application Requests",
    icon: "bx-book-open",
    subItems: [
      {
        id: 4,
        label: "All Requests",
        link: "/tractor-requests",
        parentId: 3,
      },
      {
        id: 5,
        label: "Pending Requests",
        link: "/tractor-requests/pending-requests",
        parentId: 3,
      },
      {
        id: 6,
        label: "Assigned Requests",
        link: "/tractor-requests/assigned-requests",
        parentId: 3,
      },
      {
        id: 7,
        label: "Paid Requests",
        link: "/tractor-requests/paid-requests",
        parentId: 3,
      },
      {
        id: 8,
        label: "Completed Requests",
        link: "/tractor-requests/completed-requests",
        parentId: 3,
      },
      {
        id: 9,
        label: "Cancelled Requests",
        link: "/tractor-requests/cancelled-requests",
        parentId: 3,
      },
    ],
  },
  {
    id: 36,
    label: "Estates",
    icon: "bx-user",
    link: "/staff/staff-listings",
  },

  {
    id: 36,
    label: "Properties",
    icon: "bx-user",
    link: "/tractor-owner/list",
  },

  {
    id: 36,
    label: "Staff",
    icon: "bx-user",
    link: "/staff/staff-listings",
  },

  {
    id: 36,
    label: "Affiliates",
    icon: "bx-user",
    link: "/staff/agents",
  },

  {
    id: 36,
    label: "Access Control",
    icon: "bx-cog",
    subItems: [
      {
        id: 37,
        label: "Gender",
        link: "/settings/categories",
        parentId: 36,
      },
    ],
  },
  {
    id: 36,
    label: "Settings",
    icon: "bx-cog",
    subItems: [
      {
        id: 37,
        label: "Gender",
        link: "/settings/gender",
        parentId: 36,
      },
      {
        id: 37,
        label: "Nationality",
        link: "/settings/nationality",
        parentId: 36,
      },
      {
        id: 37,
        label: "Negotiation Status",
        link: "/settings/negotiation-status",
        parentId: 36,
      },
      {
        id: 37,
        label: "payment Plan",
        link: "/settings/payment-plan",
        parentId: 36,
      },
      {
        id: 37,
        label: "Precautionary Tips",
        link: "/settings/precautionary-tips",
        parentId: 36,
      },
      {
        id: 37,
        label: "Property Facility",
        link: "/settings/property-facility",
        parentId: 36,
      },
      {
        id: 37,
        label: "Property Purpose",
        link: "/settings/property-purpose",
        parentId: 36,
      },
      {
        id: 37,
        label: "Property Type",
        link: "/settings/property-types",
        parentId: 36,
      },
      {
        id: 38,
        label: "Relationship",
        link: "/settings/locations",
        parentId: 36,
      },
    ],
  },

  {
    id: 36,
    label: "Support (coming soon)",
    icon: "bx-chat",
    link: "/dashboard",
  },
];
