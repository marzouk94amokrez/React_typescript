import Layout from "@/components/layout";
import { routerType } from "@/utils/types/routerType";
import ErrorPage from "@/pages/errorPage";
import Index from "@/pages/index";
import Home from "@/pages/home";
import Login from "@/pages/login";
import About from "@/pages/about";
import Test from "@/pages/test";
import TestFields from "@/pages/test/fields";
import TestFilterFields from "@/pages/test/fields/filters";

// Generic pages
import ModelScreen from "@/pages/model/screen";
import ZoneTimeline from "@/components/header/zone-timeline";
import FormReferencing from "@/pages/test/referencing";
import CheckReferencingRequest from "@/pages/test/referencing/checkReferencingRequest";
import ProtectedRoutes from "@/components/layout/ProtectedRoutes";
import { ConsultLogsFiles } from "@/components/templates/surchargeConsultationLogsFiles";
import { ListLogs } from "@/components/templates/surchargeConsultationLogs";
import { ConsultLogsDisponibles } from "@/components/templates/surchargeConsultationLogsDisponibles";

/**
 * Liste des routes pour la navigation
 */
const pagesData: routerType[] = [
  {
    path: `/`,
    element: (
      <ProtectedRoutes>
        <Layout>
          <Index />
        </Layout>
      </ProtectedRoutes>
    ),
    errorElement: <ErrorPage />,
    title: "",
    children: [
      {
        path: "accueil",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "test",
        element: <Test />,
        children: [
          {
            path: "fields",
            element: <TestFields />,
            children: [
              {
                path: "filters",
                element: <TestFilterFields />,
              },
            ],
          },
          {
            path: "zoneTimeline",
            element: <ZoneTimeline />,
          },
          {
            path: `logs`,
            element: <ListLogs />,
            errorElement: <ErrorPage />,
          },
          {
            path: `consultLogs`,
            element: <ConsultLogsDisponibles />,
            errorElement: <ErrorPage />,
          },
          {
            path: `consultLogsFiles`,
            element: <ConsultLogsFiles />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: ":menuPath",
        element: <ModelScreen screen="list" />,
      },
      {
        path: ":menuPath/:screen",
        element: <ModelScreen />,
      },
      {
        path: ":modelName/new",
        element: <ModelScreen screen="edit" />,
      },
      {
        path: ":modelName/new/:idParent",
        element: <ModelScreen screen="edit" />,
      },
      {
        path: ":modelName/view/:id",
        element: <ModelScreen screen="consult" />,
      },
      {
        path: ":modelName/edit/:id",
        element: <ModelScreen screen="edit" />,
      },
      {
        path: ":modelName/:screen/:id",
        element: <ModelScreen />,
      },
      {
        path: "administrations/logs/",
        element: <ListLogs />,
        children: [
          {
            path: `consult`,
            element: <ConsultLogsDisponibles />,
            children: [
              {
                path: `files`,
                element: <ConsultLogsFiles />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "404.html",
    element: <>Not found.</>,
  },
  {
    path: "500.html",
    element: <>Internal server error.</>,
  },
  {
    path: "referencing/:id",
    element: <CheckReferencingRequest />,
  },
  {
    path: `/login`,
    element: (
      <ProtectedRoutes>
        <Login />
      </ProtectedRoutes>
    ),
    errorElement: <ErrorPage />,
    title: "login",
  },
  {
    path: "test/referencing",
    element: (
      <ProtectedRoutes>
        <FormReferencing />
      </ProtectedRoutes>
    ),
  },
  {
    path: `test/checkReferencing`,
    element: <CheckReferencingRequest />,
    errorElement: <ErrorPage />,
  },
];

export default pagesData;
