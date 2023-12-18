import { lazy } from "react";

function importView(...args) {
  const path = args
    .map((arg) => {
      if (Array.isArray(arg)) {
        const nestPath = new Array(arg[1])
          .fill(0)
          .map(() => arg[0])
          .join("/");
        arg = nestPath;
      }
      return arg;
    })
    .join("/");
  return import(`../views/${path}.js`);
}

export const mainRoutes = [
  {
    path: `/GC`,
    component: lazy(() => importView(["GC", 2])),
  },
  {
    path: `/Invoice`,
    component: lazy(() => importView("Invoice", "routes")),
    routes: [
      {
        path: `/Invoice/all`,
        component: lazy(() => importView("Invoice", "Invoice")),
      },
      {
        path: `/Invoice/Invoiceadd`,
        component: lazy(() => importView("Invoice", "Invoiceadd")),
      },
    ],
  },
  {
    path: `/GCADD`,
    component: lazy(() => importView(["GCADD", 2])),
  },
];
