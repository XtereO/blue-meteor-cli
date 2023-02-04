export const routesCode = (route) => `
export enum ViewRoute {
  ${route.view ? `${route.view}  = '${route.view}'` : ""}
}

export enum PanelRoute {
  ${route.panel ? `${route.panel} = '${route.panel}'` : ""}
}

export enum ModalRoute {
  ${route.modal ? `${route.modal}  = '${route.modal}'` : ""}
}

export enum PopoutRoute {
  ${route.popout ? `${route.popout}  = '${route.popout}'` : ""} 
}
`