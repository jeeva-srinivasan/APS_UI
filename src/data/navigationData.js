import {
  Dashboard,
  PeopleAlt,
  MenuBook,
  ImportContacts,
  PostAdd,
} from "@material-ui/icons";

export const mainNavigation = [
  {
    name: "GC",
    icon: Dashboard,
    url: `/GC`,
    navigationData:[
      {
        name: "All GCs",
        icon: ImportContacts,
        url: `/GC`,
      },
      {
        name: "GC entry",
        icon: PostAdd,
        url: `/GCADD`,
      },
    ]
  },
  {
    name: "Invoice",
    icon: ImportContacts,
    url: `/Invoice`,
    navigationData: [
      {
        name: "All Invoice",
        icon: MenuBook,
        url: `/Invoice/all`,
      },
      {
        name: "Add Invoice",
        icon: PostAdd,
        url: `/Invoice/Invoiceadd`,
      },
    ],
  },
  
];
