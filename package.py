from pathlib import Path
import base64, json
root = Path(__file__).resolve().parent
dist = root / 'dist'
dist.mkdir(exist_ok=True)
assets = {str(i): 'data:image/jpeg;base64,' + base64.b64encode((root/f'assets/ref{i}.jpg').read_bytes()).decode()
          for i in [2,4,5,6,7,8,10,11,13]}
js = (root/'app.js').read_text().replace('href="assets/ref${ref}.jpg"', 'href="${ASSETS[ref]}"')
js = 'const ASSETS=' + json.dumps(assets) + ';\n' + js
js = js.replace('assets/brain-intro.png', 'data:image/png;base64,' + base64.b64encode((root/'assets/brain-intro.png').read_bytes()).decode())
html = ((root/'index.html').read_text()
        .replace('<link rel="stylesheet" href="style.css">', '<style>' + (root/'style.css').read_text() + '</style>')
        .replace('<script src="app.js"></script>', '<script>' + js + '</script>'))
out = dist / 'panda-sleep-prototype.html'
out.write_text(html)
print('single file:', out, round(out.stat().st_size/1024/1024,1), 'MB')
