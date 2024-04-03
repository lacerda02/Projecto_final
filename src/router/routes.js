import AnonimoLayout from "layouts/AnonimoLayout.vue";
import MainLayout from "layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    redirect: "/login", // Redirecionar para a rota de login
  },
  {
    name: "LoginIn",
    path: "/login",
    component: () => import("pages/Login.vue"),
  },
  {
    name: "RegisterIn",
    path: "/register",
    component: () => import("pages/Register.vue"),
  },
  {
    path: "/",
    component: AnonimoLayout,
    children: [
      {
        path: "index2",
        name: "Index2",
        component: () => import("pages/IndexPage2.vue"),
      },
      {
        path: "AnonymousForm",
        component: () => import("pages/AnonymousForm.vue"),
      },
      {
        path: "DenunciasPorCategoria",
        component: () => import("pages/DenunciasPorCategoria.vue"),
      },
      {
        path: "EmergencyReports2",
        component: () => import("pages/EmergencyReports2.vue"),
      },
      {
        path: "SupportResources2",
        component: () => import("pages/SupportResources2.vue"),
      },
      {
        path: "EducationESensitivity2",
        component: () => import("pages/EducationESensitivity2.vue"),
      },
      {
        path: "UserConfiguration2",
        component: () => import("pages/UserConfiguration2.vue"),
      },
      {
        path: "FeedbackImprovements2",
        component: () => import("pages/FeedbackImprovements2.vue"),
      },
      {
        path: "EmailConfirmation2",
        component: () => import("pages/EmailConfirmation2.vue"),
      },
    ],
  },
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("pages/IndexPage.vue"),
      },
      { path: "ReportForm", component: () => import("pages/ReportForm.vue") },
      { path: "MyReports", component: () => import("pages/MyReports.vue") },
      {
        path: "DenunciasPorCategoria",
        component: () => import("pages/DenunciasPorCategoria.vue"),
      },
      {
        path: "EmergencyReports",
        component: () => import("pages/EmergencyReports.vue"),
      },
      {
        path: "SupportResources",
        component: () => import("pages/SupportResources.vue"),
      },
      {
        path: "EducationESensitivity",
        component: () => import("pages/EducationESensitivity.vue"),
      },
      {
        path: "UserConfiguration",
        component: () => import("pages/UserConfiguration.vue"),
      },
      {
        path: "FeedbackImprovements",
        component: () => import("pages/FeedbackImprovements.vue"),
      },
      {
        path: "UploadImage",
        component: () => import("pages/UploadImage.vue"),
      },
      {
        path: "EmailConfirmation",
        component: () => import("pages/EmailConfirmation.vue"),
      },
    ],
  },
  {
    name: "AnonimoLayout",
    path: "/AnonimoLayout",
    component: () => import("layouts/AnonimoLayout.vue"),
  },
  {
    name: "Logout",
    path: "/logout",
    component: () => import("pages/Logout.vue"),
  },
  {
    path: "/ErrorPage404",
    name: "PagesError404",
    component: () => import("pages/ErrorPage404.vue"),
  },
  {
    path: "/reset-password/:resetToken",
    name: "ResetPassword",
    component: () => import("pages/ResetPassword.vue"),
  },
];

export default routes;
