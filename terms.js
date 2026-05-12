<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evollogic - Termos e Privacidade</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        body {
            background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
            color: #f8fafc;
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 40px 20px;
            min-height: 100vh;
            display: flex;
            justify-content: center;
        }

        .container {
            background: rgba(30, 41, 59, 0.6);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            padding: 40px;
            width: 100%;
            max-width: 800px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            box-sizing: border-box;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header img {
            width: 60px;
            margin-bottom: 10px;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
        }

        .header h1 {
            color: #f8fafc;
            font-size: 1.8rem;
            margin: 0;
        }

        /* Menu de Abas */
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            background: rgba(15, 23, 42, 0.6);
            padding: 8px;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            flex-wrap: wrap; /* Para telas menores */
        }

        .tab-btn {
            flex: 1;
            background: transparent;
            color: #94a3b8;
            border: none;
            padding: 12px;
            border-radius: 12px;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 150px;
        }

        /* Estilo da aba ativa */
        .tab-btn.active {
            background: #38bdf8;
            color: #020617;
            box-shadow: 0 4px 15px rgba(56, 189, 248, 0.2);
        }

        /* Oculta os textos inativos */
        .content-section {
            display: none;
            animation: fadeIn 0.4s ease;
        }

        /* Mostra o texto ativo */
        .content-section.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Estilos do Texto */
        .content-section h2 {
            color: #38bdf8;
            font-size: 1.4rem;
            margin-top: 30px;
            margin-bottom: 10px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 8px;
        }

        .content-section p, .content-section li {
            color: #cbd5e1;
            line-height: 1.7;
            font-size: 0.95rem;
            margin-bottom: 15px;
        }

        .back-btn {
            display: inline-block;
            margin-top: 30px;
            color: #38bdf8;
            text-decoration: none;
            font-weight: 500;
            transition: 0.3s;
        }

        .back-btn:hover {
            color: #7dd3fc;
            text-decoration: underline;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
            <img src="https://i.imgur.com/31WnC6D.png" alt="Evollogic">
            <h1>Documentação Legal</h1>
        </div>

        <!-- Botões de Troca -->
        <div class="tabs">
            <button class="tab-btn active" id="btn-termos" onclick="switchTab('termos')">Termos de Uso</button>
            <button class="tab-btn" id="btn-privacidade" onclick="switchTab('privacidade')">Política de Privacidade</button>
        </div>

        <!-- CONTEÚDO 1: TERMOS DE USO -->
        <div id="termos" class="content-section active">
            <h2>1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar a plataforma, softwares e bots da <strong>Evollogic</strong>, você concorda em cumprir e ser vinculado por estes Termos de Serviço. Se você não concorda com qualquer parte destes termos, não deve utilizar nossos serviços.</p>

            <h2>2. Descrição dos Serviços</h2>
            <p>A Evollogic fornece soluções de automação, scripts, bots para Discord e ferramentas de gerenciamento para plataformas em nuvem. Nossos serviços são desenvolvidos para otimização e produtividade.</p>

            <h2>3. Uso Aceitável e Responsabilidade</h2>
            <ul>
                <li>Você concorda em usar nossas ferramentas apenas para fins lícitos.</li>
                <li><strong>A Evollogic não se responsabiliza</strong> por punições, banimentos ou bloqueios de contas em plataformas de terceiros (como jogos ou serviços de nuvem) decorrentes do uso de nossos scripts ou automações. O uso é por sua própria conta e risco.</li>
                <li>É estritamente proibido tentar aplicar engenharia reversa, copiar ou revender os códigos e sistemas da Evollogic sem autorização prévia.</li>
            </ul>

            <h2>4. Propriedade Intelectual</h2>
            <p>Todos os códigos, designs, logotipos e sistemas presentes na plataforma são de propriedade exclusiva da Evollogic. O acesso aos nossos serviços não lhe concede direitos de propriedade intelectual sobre eles.</p>

            <h2>5. Cancelamento e Interrupção</h2>
            <p>A Evollogic reserva-se o direito de suspender ou encerrar contas que violem estes termos, tentem fraudar o sistema ou prejudicar a integridade dos nossos servidores, sem aviso prévio.</p>
        </div>

        <!-- CONTEÚDO 2: PRIVACIDADE -->
        <div id="privacidade" class="content-section">
            <h2>1. Coleta de Dados</h2>
            <p>Para garantir o funcionamento seguro do nosso ecossistema, a <strong>Evollogic</strong> coleta as seguintes informações quando você utiliza nossa plataforma:</p>
            <ul>
                <li><strong>Dados de Registro:</strong> Endereço de e-mail, nome de usuário e senhas (armazenadas de forma criptografada).</li>
                <li><strong>Dados de Uso:</strong> Logs de acesso, atividades de bots e integrações para garantir que os serviços estejam rodando sem erros.</li>
            </ul>

            <h2>2. Como Usamos Seus Dados</h2>
            <p>Nós utilizamos seus dados exclusivamente para:</p>
            <ul>
                <li>Autenticar seu acesso ao painel (Hub Central).</li>
                <li>Garantir a entrega e o funcionamento dos serviços contratados.</li>
                <li>Melhorar a segurança do sistema contra acessos não autorizados.</li>
            </ul>

            <h2>3. Compartilhamento de Dados</h2>
            <p><strong>A Evollogic respeita sua privacidade.</strong> Nós não vendemos, alugamos ou compartilhamos seus dados pessoais com empresas de terceiros para fins publicitários. Seus dados só são compartilhados se exigido por lei.</p>

            <h2>4. Padrões de Segurança Evollogic</h2>
            <p>Adotamos medidas rigorosas de segurança, incluindo conexões seguras (HTTPS) e bancos de dados em nuvem protegidos, para garantir que suas informações não sejam acessadas ou alteradas por pessoas não autorizadas.</p>

            <h2>5. Seus Direitos</h2>
            <p>Você tem o direito de solicitar a exclusão da sua conta e de todos os dados associados a ela a qualquer momento. Para isso, basta entrar em contato com o suporte da Evollogic.</p>
        </div>

        <!-- O link de voltar deve apontar para a sua página principal de login/registro -->
        <a href="index.html" class="back-btn">← Voltar para o Início</a>
    </div>

    <!-- Script de lógica de abas embutido -->
    <script>
        function switchTab(tabName) {
            // 1. Pega todos os botões e todos os conteúdos
            const buttons = document.querySelectorAll('.tab-btn');
            const sections = document.querySelectorAll('.content-section');

            // 2. Remove a classe 'active' de todos (desmarca tudo)
            buttons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));

            // 3. Adiciona a classe 'active' apenas na aba e no conteúdo que foi clicado
            document.getElementById(tabName).classList.add('active');
            document.getElementById('btn-' + tabName).classList.add('active');

            // 4. Rola a página suavemente para o topo do conteúdo
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    </script>

</body>
</html>
