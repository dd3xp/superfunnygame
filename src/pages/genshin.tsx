import { useEffect } from 'react';
import Head from 'next/head';

export default function GenshinDownload() {
  useEffect(() => {
    window.location.href = '/api/genshin-download';
  }, []);

  return (
    <>
      <Head>
        <title>下载原神</title>
      </Head>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ marginBottom: '20px' }}>原神下载页面</h1>
        <p>
          如果下载没有自动开始，
          <a href="/api/genshin-download" style={{ 
            color: '#0070f3', 
            textDecoration: 'underline',
            marginLeft: '5px'
          }}>
            点击这里
          </a>
        </p>
      </div>
    </>
  );
}