import type { Metadata } from "next";
import { getAllSuppliers } from "@/lib/suppliers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuppliersClient from "./SuppliersClient";

export const metadata: Metadata = {
  title: "Verified Supplier Directory — PearlGate",
  description: "Browse 30+ personally-vetted factories across Guangdong. Hardware, industrial parts, workwear. Filter by city, category, MOQ, and certification.",
};

export default async function SuppliersPage() {
  const suppliers = await getAllSuppliers();

  return (
    <>
      <Navbar />
      <SuppliersClient suppliers={suppliers} />
      <Footer />
    </>
  );
}
