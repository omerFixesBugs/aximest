import type { Metadata } from "next";
import AboutView from "./AboutView";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is an in-house software team building custom platforms, AI automation and operations software since 2016.`,
};

export default function AboutPage() {
  return <AboutView />;
}
