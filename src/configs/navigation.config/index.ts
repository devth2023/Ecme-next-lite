import { NAV_ITEM_TYPE_ITEM } from "@/constants/navigation.constant"

import type { NavigationTree } from "@/@types/navigation"

const navigationConfig: NavigationTree[] = [
  {
    key: "home",
    path: "/home",
    title: "Home",
    translateKey: "nav.home",
    icon: "home",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "projects",
    path: "/projects",
    title: "Projects",
    translateKey: "nav.projects",
    icon: "singleMenu",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "tasks",
    path: "/tasks",
    title: "Tasks",
    translateKey: "nav.tasks",
    icon: "collapseMenu",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "team",
    path: "/team",
    title: "Team",
    translateKey: "nav.team",
    icon: "groupMenu",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
]

export default navigationConfig
