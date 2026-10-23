import { detailRoute } from "../../lib/detail-route";

const route = detailRoute("products");

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
