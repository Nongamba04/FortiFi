import Image from "next/image";
import { WalletConnect } from "@/components/WalletConnect";
import { WalletInfo } from "@/components/WalletInfo";
import { SendTransaction } from "@/components/send";
import { Navbar } from "@/components/navbar";
import { LearnHero } from "@/components/LearnHero";

export default function Home() {
  return (
    <>
      <Navbar/>
      <WalletConnect />
      {/* <WalletInfo /> */}
      <LearnHero/>
     <SendTransaction/>
    </>
  );
}
