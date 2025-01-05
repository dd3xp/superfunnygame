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

    const filePath = path.join(process.cwd(), 'src', 'public', 'super funny game.zip');
    console.log('2. 尝试访问文件路径:', filePath);

    const fileExists = fs.existsSync(filePath);
    console.log('3. 文件是否存在:', fileExists);

    if (!fileExists) {
      console.log('4. 文件不存在，返回404');
      return res.status(404).json({ 
        error: '文件不存在',
        path: filePath,
        cwd: process.cwd()
      });
    }

    const fileStats = fs.statSync(filePath);
    console.log('5. 文件大小:', fileStats.size, '字节');

    const fileBuffer = fs.readFileSync(filePath);
    console.log('6. 文件已读取到内存');

    res.setHeader('Content-Disposition', 'attachment; filename=super funny game.zip');
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', fileStats.size);
    
    res.send(fileBuffer);
    console.log('7. 文件发送完成');

  } catch (error) {
    console.error('服务器错误详情:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      cwd: process.cwd(),
      attemptedPath: path.join(process.cwd(), 'src', 'public', 'super funny game.zip')
    });

    return res.status(500).json({ 
      error: '文件下载失败',
      details: (error as Error).message
    });
  }
}