import Head from "next/head";

interface NextHeadProps {
  title: string;
}

const NextHead = ({ title }: NextHeadProps) => (
  <Head>
    <title>{title}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
);

export default NextHead;
