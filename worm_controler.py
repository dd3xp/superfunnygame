from flask import Flask, request
import requests
import threading
import os

app = Flask(__name__)

def download_file(url, path=None):
    """下载文件的函数"""
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # 如果没指定路径，从URL中获取文件名
        if not path:
            path = url.split('/')[-1]
            if not path:
                path = 'downloaded_file'
        
        # 保存文件
        with open(path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        print(f"下载完成: {path}")
        
    except Exception as e:
        print(f"下载失败: {str(e)}")

@app.route('/download', methods=['GET'])
def start_download():
    url = request.args.get('url')
    path = request.args.get('path')
    
    if not url:
        return '需要提供下载URL', 400
    
    # 在新线程中开始下载
    thread = threading.Thread(target=download_file, args=(url, path))
    thread.start()
    
    return '开始下载'

if __name__ == '__main__':
    # 在目标服务器上运行这个程序
    app.run(host='0.0.0.0', port=5000)