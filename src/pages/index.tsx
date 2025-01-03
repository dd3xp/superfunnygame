import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    window.location.href = '/api/download';
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content="0;url=/api/download" />
      </Head>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <p>
          如果下载没有自动开始，
          <a href="/api/download" style={{ color: '#0070f3', textDecoration: 'underline' }}>
            点击这里
          </a>
        </p>
      </div>
    </>
  );
}