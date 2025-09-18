import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Hero from '../components/Hero';
import ChatWithZu from '../components/ChatWithZu';
import OpenUniverse from '../components/OpenUniverse';
import LoreArchive from '../components/LoreArchive';
import Personas from '../components/Personas';
import CreativeEcosystem from '../components/CreativeEcosystem';
// import MythEngine from '../components/MythEngine';  //

export default function Home() {
  return (
    <Layout
      title="ZU × ORI Portal"
      description="The open-source reincarnation sequel to Romeo + Juliet | Chat with Zu, read LLM-authored research, and stream the ZU × ORI podcast."
    >
      <Head>

  <link rel="icon"
        type="image/png"
        href="/img/zuxori-logo.png"
        sizes="1024x1024" />

  <link rel="mask-icon"
        href="/img/favicon.svg"
        color="#ec3d9f" />
      </Head>
      <main>
        <Hero />
        <ChatWithZu />
        <OpenUniverse />
        {/* <MythEngine /> */}
        <LoreArchive />
        <Personas />
        <CreativeEcosystem />
      </main>
    </Layout>
  );
}