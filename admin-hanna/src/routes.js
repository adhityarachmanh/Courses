import DashboardPage from "./views/DashboardPage/DashboardPage";
import ManageCourse from "./views/ManageCourse";
import ManageCourseClass from "./views/ManageCourse/manage";
import ManageCourseCreate from "./views/ManageCourse/manage/create";
import ManageCourseEdit from "./views/ManageCourse/manage/edit";
import ManageResults from "./views/ManageResults";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/courses-class",
    name: "Courses",
    component: ManageCourse,
    layout: "/admin"
  },
  {
    path: "/manage-courses/:class/class",
    name: "Courses Class",
    component: ManageCourseClass,
    layout: "/admin"
  },
  {
    path: "/manage-courses/:class/results",
    name: "Courses Class",
    component: ManageResults,
    layout: "/admin"
  },
  {
    path: "/manage-courses/:class/create",
    name: "Courses Create",
    component: ManageCourseCreate,
    layout: "/admin"
  },
  {
    path: "/manage-courses/:class/edit/:course",
    name: "Courses Edit",
    component: ManageCourseEdit,
    layout: "/admin"
  }
];

export default dashboardRoutes;
