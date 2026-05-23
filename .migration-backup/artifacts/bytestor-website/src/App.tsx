import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import KnowUs from "@/pages/KnowUs";
import Services from "@/pages/Services";
import ITServices from "@/pages/ITServices";
import Consulting from "@/pages/Consulting";
import Training from "@/pages/Training";
import Clients from "@/pages/Clients";
import News from "@/pages/News";
import Contact from "@/pages/Contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/know-us" component={KnowUs} />
      <Route path="/services" component={Services} />
      <Route path="/services/it-services" component={ITServices} />
      <Route path="/services/consulting" component={Consulting} />
      <Route path="/services/training" component={Training} />
      <Route path="/clients" component={Clients} />
      <Route path="/news" component={News} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
