import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Onboarding from "./pages/onboarding";
import Search from "./pages/search";
import Scrape from "./pages/scrape";
import SearchResults from "./pages/searchResults";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Onboarding />
    },
    {
        path: "/search",
        element: <Search />
    },
    {
        path: "/scrape",
        element: <Scrape />
    },
    {
        path: "/searchResults",
        element: <SearchResults />
    }
]);