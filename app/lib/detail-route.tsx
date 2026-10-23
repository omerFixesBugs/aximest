import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailView from "../components/DetailView";
import { cardGrids } from "./site";

type Params = { slug: string };
type Props = { params: Promise<Params> };

/**
 * Everything a card grid's detail route exports, so /industries, /products
 * and /work each stay a three-line page file.
 */
export function detailRoute(gridId: string) {
  const grid = cardGrids.find((g) => g.id === gridId)!;
  const find = (slug: string) => grid.items.findIndex((item) => item.slug === slug);

  return {
    generateStaticParams: (): Params[] => grid.items.map((item) => ({ slug: item.slug })),

    async generateMetadata({ params }: Props): Promise<Metadata> {
      const index = find((await params).slug);
      if (index < 0) return {};
      const item = grid.items[index];
      return { title: `${item.title} — ${grid.label}`, description: item.intro };
    },

    async Page({ params }: Props) {
      const index = find((await params).slug);
      if (index < 0) notFound();
      return <DetailView gridId={gridId} index={index} />;
    },
  };
}
