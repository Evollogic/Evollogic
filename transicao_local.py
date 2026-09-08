import glob

# Configurações de URL
url_producao = "https://evollogic-backend-production.up.railway.app"
url_local = "http://localhost:3000"

arquivos_modificados = 0
# Procura em arquivos HTML e JS
tipos_arquivos = ["*.html", "*.js"]

print(">>> Iniciando transição para ambiente LOCAL (Teste)...")

for tipo in tipos_arquivos:
    for arquivo in glob.glob(tipo):
        with open(arquivo, 'r', encoding='utf-8') as f:
            conteudo = f.read()
        
        if url_producao in conteudo:
            novo_conteudo = conteudo.replace(url_producao, url_local)
            with open(arquivo, 'w', encoding='utf-8') as f:
                f.write(novo_conteudo)
            print(f"  [+] Atualizado: {arquivo}")
            arquivos_modificados += 1

print(f"\n✅ Sucesso! {arquivos_modificados} arquivo(s) apontando para o seu celular (localhost).")
