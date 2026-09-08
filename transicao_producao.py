import glob

# Configurações de URL
url_local = "http://localhost:3000"
url_producao = "https://evollogic-backend-production.up.railway.app"

arquivos_modificados = 0
# Procura em arquivos HTML e JS
tipos_arquivos = ["*.html", "*.js"]

print(">>> Iniciando transição para ambiente de PRODUÇÃO (Railway)...")

for tipo in tipos_arquivos:
    for arquivo in glob.glob(tipo):
        with open(arquivo, 'r', encoding='utf-8') as f:
            conteudo = f.read()
        
        if url_local in conteudo:
            novo_conteudo = conteudo.replace(url_local, url_producao)
            with open(arquivo, 'w', encoding='utf-8') as f:
                f.write(novo_conteudo)
            print(f"  [+] Atualizado: {arquivo}")
            arquivos_modificados += 1

print(f"\n✅ Sucesso! {arquivos_modificados} arquivo(s) apontando para o servidor oficial (Railway).")
