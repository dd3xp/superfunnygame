import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('1. API路由被调用');

    if (req.method !== 'GET') {
      return res.status(405).json({ message: '只允许GET请求' });
    }

    const filePath = path.join(process.cwd(), 'src', 'public', 'Genshin Impact.zip');
    console.log('2. 尝试访问文件路径:', filePath);

    if (!fs.existsSync(path.join(process.cwd(), 'src'))) {
      console.log('src 目录不存在');
      return res.status(404).json({ error: 'src 目录不存在' });
    }

    if (!fs.existsSync(path.join(process.cwd(), 'src', 'public'))) {
      console.log('src/public 目录不存在');
      return res.status(404).json({ error: 'src/public 目录不存在' });
    }

    const fileExists = fs.existsSync(filePath);
    console.log('3. 文件是否存在:', fileExists);

    if (!fileExists) {
      console.log('4. 文件不存在，返回404');
      const files = fs.readdirSync(path.join(process.cwd(), 'src', 'public'));
      return res.status(404).json({ 
        error: '文件不存在',
        path: filePath,
        availableFiles: files
      });
    }

    const fileStats = fs.statSync(filePath);
    console.log('5. 文件大小:', fileStats.size, '字节');
    const stream = fs.createReadStream(filePath);
    
    res.setHeader('Content-Disposition', `attachment; filename="Genshin Impact.zip"`);
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Length', fileStats.size);
    
    stream.pipe(res);
    stream.on('error', (error) => {
      console.error('流传输错误:', error);
      res.end();
    });

    stream.on('end', () => {
      console.log('7. 文件发送完成');
    });

  } catch (error) {
    console.error('服务器错误详情:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      cwd: process.cwd(),
      srcPath: path.join(process.cwd(), 'src'),
      publicPath: path.join(process.cwd(), 'src', 'public')
    });

    return res.status(500).json({ 
      error: '文件下载失败',
      details: (error as Error).message
    });
  }
}