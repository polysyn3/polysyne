import { cacheLife } from "next/cache";

export async function Copyright() {
  "use cache";
  cacheLife("hours");
  return <p>© {new Date().getFullYear()} Polysyne. All rights reserved.</p>;
}
