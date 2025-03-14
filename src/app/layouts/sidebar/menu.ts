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
        label: "All Applications",
        link: "/application-request/all-applications",
        parentId: 3,
      },
      {
        id: 5,
        label: "Pending Pending",
        link: "/application-request/pending-applications",
        parentId: 3,
      },
      {
        id: 5,
        label: "Approved Pending",
        link: "/application-request/approved-applications",
        parentId: 3,
      },
      {
        id: 7,
        label: "Paid Applications",
        link: "/application-request/paid-applications",
        parentId: 3,
      },
      {
        id: 7,
        label: "On-going Payment",
        link: "/application-request/on-going-applications",
        parentId: 3,
      },
      {
        id: 8,
        label: "Completed Applications",
        link: "/application-request/all-applications",
        parentId: 3,
      },
      {
        id: 9,
        label: "Cancelled Applications",
        link: "/application-request/all-applications",
        parentId: 3,
      },
    ],
  },
  {
    id: 36,
    label: "Estates",
    icon: "bx-user",
    link: "/estate/list",
  },

  // {
  //   id: 36,
  //   label: "Properties",
  //   icon: "bx-user",
  //   link: "/property/list",
  // },
  {
    id: 36,
    label: "Properties",
    icon: "bx-cog",
    subItems: [
      {
        id: 37,
        label: "All Properties",
        link: "/property/list",
        parentId: 36,
      },
      {
        id: 37,
        label: "Available Properties",
        link: "/property/available-property",
        parentId: 36,
      },
      {
        id: 37,
        label: "Sold Properties",
        link: "/property/sold-property",
        parentId: 36,
      },
      {
        id: 37,
        label: "On-going Payment",
        link: "/property/ongoing-property",
        parentId: 36,
      },
    ],
  },

  {
    id: 36,
    label: "Staff",
    icon: "bx-user",
    link: "/staff/staff-listings",
  },

  // {
  //   id: 36,
  //   label: "Affiliates",
  //   icon: "bx-user",
  //   link: "/staff/agents",
  // },

  {
    id: 36,
    label: "Affiliates",
    icon: "bx-cog",
    subItems: [
      {
        id: 37,
        label: "All Affiliates",
        link: "/affiliate",
        parentId: 36,
      },
      {
        id: 37,
        label: "Verified Affiliates",
        link: "/affiliate/verified-affiliates",
        parentId: 36,
      },
      {
        id: 37,
        label: "Pending Approvals",
        link: "/affiliate/pending-affiliates",
        parentId: 36,
      },
      {
        id: 37,
        label: "Deactivated Accounts",
        link: "/affiliate/deactivated-affiliates",
        parentId: 36,
      },
    ],
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
        link: "/settings/relationship",
        parentId: 36,
      },
    ],
  },

  // {
  //   id: 36,
  //   label: "Support (coming soon)",
  //   icon: "bx-chat",
  //   link: "/dashboard",
  // },
];
