import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import FormView from "../views/FormView.vue";
import PreviewView from "../views/PreviewView.vue";
import StudentView from "../views/StudentView.vue";
import EditStudent from "@/components/EditForm.vue";
import BooksComp from "@/components/BooksComp.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/form",
    name: "form",
    component: FormView,
  },
  {
    path: "/preview",
    name: "preview",
    component: PreviewView,
  },
  {
    path: "/student/:id",
    name: "student",
    component: StudentView,
    props: (route) => ({ studentId: route.params.id }),
  },
  {
    path: "/students/:id/edit",
    name: "edit-student",
    component: EditStudent,
    props: (route) => ({ id: route.params.id }),
  },
  {
    path: "/books",
    name: "book-list",
    component: BooksComp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
