const legalDocuments = {
    PT: {
        termsTitle: "Termos de Serviço da Evollogic",
        privacyTitle: "Política de Privacidade da Evollogic",
        terms: `
            <h3>1. Aceitação dos Termos</h3>
            <p>Ao acessar, criar uma conta e utilizar o ecossistema Evollogic, você concorda expressamente com estes Termos de Serviço. Se você não concorda com qualquer parte destes termos, está expressamente proibido de utilizar nossos serviços.</p>
            
            <h3>2. Descrição e Evolução dos Serviços</h3>
            <p>A Evollogic fornece soluções avançadas de automação, gerenciamento de vendas digitais, bots para Discord, scripts e integração com serviços de telefonia em nuvem. Nossos serviços estão em constante desenvolvimento e podemos adicionar, alterar, suspender ou remover recursos a qualquer momento, sem aviso prévio.</p>
            
            <h3>3. Segurança e Responsabilidade da Conta</h3>
            <p>Você é o único responsável por manter a confidencialidade de suas credenciais, senhas e tokens de acesso. Você concorda em nos notificar imediatamente sobre qualquer uso não autorizado de sua conta. A Evollogic não assumirá qualquer responsabilidade por perdas ou danos causados por negligência na proteção de seus dados de login.</p>
            
            <h3>4. Regras Estritas de Conduta</h3>
            <p>Você concorda em não utilizar nossa infraestrutura para: (a) conduzir ou promover atividades ilegais; (b) distribuir malwares, ataques DDoS, spam ou códigos destrutivos; (c) tentar burlar, sobrecarregar ou interferir nos sistemas de segurança da Evollogic; (d) realizar engenharia reversa em nossos softwares, bots ou scripts.</p>
            
            <h3>5. Propriedade Intelectual e Licenciamento</h3>
            <p>Todo o código-fonte, design, interfaces, documentação e infraestrutura da Evollogic são de nossa propriedade intelectual exclusiva. A utilização dos nossos serviços lhe concede apenas uma licença limitada e intransferível de uso, não lhe garantindo quaisquer direitos de revenda, cópia ou distribuição de nosso código.</p>
            
            <h3>6. Transações, Assinaturas e Reembolsos</h3>
            <p>Certos módulos dentro do ecossistema exigem pagamento. As regras de renovação e reembolso são estipuladas na página de cada produto. Tentativas de fraude, estornos maliciosos (chargebacks) ou evasão de taxas resultarão no banimento permanente da conta e de todos os serviços atrelados.</p>
            
            <h3>7. Encerramento de Conta e Retenção</h3>
            <p>Reservamo-nos o direito absoluto de suspender, limitar ou encerrar o seu acesso à Evollogic a nosso critério, especialmente caso seja detectada qualquer violação destes termos, comportamentos abusivos contra a equipe ou atividades suspeitas na rede.</p>
            
            <h3>8. Isenção de Garantias e Limitação de Responsabilidade</h3>
            <p>A plataforma é fornecida "no estado em que se encontra" (as is). A Evollogic não garante que os serviços serão 100% ininterruptos, totalmente seguros ou livres de falhas. Em nenhuma hipótese a Evollogic será responsabilizada por perda de lucros, interrupção de negócios, perda de dados ou danos indiretos resultantes do uso das nossas ferramentas.</p>
        `,
        privacy: `
            <h3>1. Natureza das Informações que Coletamos</h3>
            <p>Para fornecer o ecossistema Evollogic, coletamos dados de identificação essenciais: endereço de e-mail, nome de usuário, senhas (armazenadas em formato de hash irreversível), IDs numéricos de integração social (Discord/Google), além de dados de telemetria e logs de conexão (IP e horário) para fins exclusivos de segurança.</p>
            
            <h3>2. Finalidade do Uso dos Dados</h3>
            <p>Suas informações são processadas estritamente para: (a) garantir a autenticação e segurança da sua conta; (b) permitir a comunicação oficial sobre atualizações, instabilidades ou suporte técnico; (c) processar transações financeiras; (d) bloquear acessos não autorizados e prevenir fraudes sistêmicas.</p>
            
            <h3>3. Compartilhamento e Terceiros</h3>
            <p>A Evollogic repudia a venda ou comercialização de dados pessoais. Suas informações só transitam em serviços de terceiros quando estritamente necessário para a operação (ex: provedores de nuvem, gateways de pagamento e autenticação via OAuth2). Exigimos de nossos parceiros as mesmas garantias de confidencialidade.</p>
            
            <h3>4. Segurança, Criptografia e Armazenamento</h3>
            <p>Nossos bancos de dados são protegidos com protocolos modernos de criptografia de ponta a ponta e conexões seguras (HTTPS/WSS). No entanto, o usuário compreende que nenhum ambiente na internet é completamente invulnerável, assumindo o risco inerente à transmissão online.</p>
            
            <h3>5. Retenção e Ciclo de Vida dos Dados</h3>
            <p>Seus dados permanecerão em nossa infraestrutura enquanto sua conta estiver operando. Ao solicitar o encerramento da conta, iniciaremos um processo de exclusão (purge) que removerá seus dados pessoais em até 30 dias. Manteremos apenas registros anônimos de transações e logs necessários por determinações legais.</p>
            
            <h3>6. Política de Cookies e Rastreamento</h3>
            <p>Utilizamos cookies puramente técnicos, necessários para manter sua sessão (login) e salvar configurações de interface (como o idioma preferido). Não implementamos cookies de rastreamento de publicidade (ads tracking) de terceiros em nossa tela de registro ou painel principal.</p>
            
            <h3>7. Seus Direitos Sobre os Próprios Dados</h3>
            <p>Conforme as leis de proteção de dados aplicáveis, você possui o direito inalienável de solicitar a exportação de todos os seus dados armazenados, exigir a correção de informações incorretas ou invocar o direito ao esquecimento, solicitando a exclusão total da sua conta via painel de configurações.</p>
            
            <h3>8. Atualizações desta Política</h3>
            <p>Esta política é dinâmica e pode ser aprimorada. Em caso de mudanças que afetem significativamente o tratamento dos seus dados, você será notificado por e-mail ou por um aviso compulsório no seu próximo login.</p>
        `
    },
    EN: {
        termsTitle: "Evollogic Terms of Service",
        privacyTitle: "Evollogic Privacy Policy",
        terms: `
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing, creating an account, and using the Evollogic ecosystem, you expressly agree to these Terms of Service. If you do not agree with any part of these terms, you are strictly prohibited from using our services.</p>
            
            <h3>2. Service Description and Evolution</h3>
            <p>Evollogic provides advanced automation solutions, digital sales management, Discord bots, scripts, and cloud phone integrations. Our services are in constant development, and we may add, change, suspend, or remove features at any time without prior notice.</p>
            
            <h3>3. Account Security and Responsibility</h3>
            <p>You are solely responsible for maintaining the confidentiality of your credentials, passwords, and access tokens. You agree to notify us immediately of any unauthorized use of your account. Evollogic assumes no liability for losses or damages caused by your negligence in protecting your login data.</p>
            
            <h3>4. Strict Rules of Conduct</h3>
            <p>You agree not to use our infrastructure to: (a) conduct or promote illegal activities; (b) distribute malware, DDoS attacks, spam, or destructive code; (c) attempt to bypass, overload, or interfere with Evollogic's security systems; (d) reverse engineer our software, bots, or scripts.</p>
            
            <h3>5. Intellectual Property and Licensing</h3>
            <p>All source code, design, interfaces, documentation, and infrastructure of Evollogic are our exclusive intellectual property. Using our services grants you only a limited, non-transferable license, and does not grant you any rights to resell, copy, or distribute our code.</p>
            
            <h3>6. Transactions, Subscriptions, and Refunds</h3>
            <p>Certain modules within the ecosystem require payment. Renewal and refund rules are stipulated on each product's page. Fraud attempts, malicious chargebacks, or fee evasion will result in permanent bans of your account and all associated services.</p>
            
            <h3>7. Account Termination and Retention</h3>
            <p>We reserve the absolute right to suspend, limit, or terminate your access to Evollogic at our discretion, especially if any violation of these terms, abusive behavior toward our team, or suspicious network activity is detected.</p>
            
            <h3>8. Disclaimer of Warranties and Limitation of Liability</h3>
            <p>The platform is provided "as is". Evollogic does not guarantee that the services will be 100% uninterrupted, entirely secure, or error-free. Under no circumstances will Evollogic be liable for lost profits, business interruption, loss of data, or indirect damages resulting from the use of our tools.</p>
        `,
        privacy: `
            <h3>1. Nature of the Information We Collect</h3>
            <p>To provide the Evollogic ecosystem, we collect essential identification data: email address, username, passwords (stored in irreversible hash format), social integration numeric IDs (Discord/Google), as well as telemetry data and connection logs (IP and time) exclusively for security purposes.</p>
            
            <h3>2. Purpose of Data Use</h3>
            <p>Your information is processed strictly to: (a) ensure authentication and security of your account; (b) enable official communication regarding updates, instabilities, or technical support; (c) process financial transactions; (d) block unauthorized access and prevent systemic fraud.</p>
            
            <h3>3. Sharing and Third Parties</h3>
            <p>Evollogic strictly rejects selling or trading personal data. Your information only passes through third-party services when strictly necessary for operation (e.g., cloud providers, payment gateways, and OAuth2 authentication). We demand the same confidentiality guarantees from our partners.</p>
            
            <h3>4. Security, Encryption, and Storage</h3>
            <p>Our databases are protected with modern end-to-end encryption protocols and secure connections (HTTPS/WSS). However, you understand that no internet environment is completely invulnerable, assuming the inherent risk of online transmission.</p>
            
            <h3>5. Retention and Data Life Cycle</h3>
            <p>Your data will remain in our infrastructure as long as your account is active. Upon requesting account termination, we will initiate a purge process that removes your personal data within 30 days. We will only retain anonymous transaction records and logs required by legal obligations.</p>
            
            <h3>6. Cookie and Tracking Policy</h3>
            <p>We use purely technical cookies, necessary to maintain your session (login) and save interface settings (such as preferred language). We do not implement third-party advertising tracking cookies on our registration screen or main dashboard.</p>
            
            <h3>7. Your Rights Over Your Data</h3>
            <p>According to applicable data protection laws, you have the inalienable right to request an export of all your stored data, demand the correction of incorrect information, or invoke the right to be forgotten by requesting the total deletion of your account via the settings panel.</p>
            
            <h3>8. Updates to this Policy</h3>
            <p>This policy is dynamic and may be improved. In the event of changes that significantly affect the processing of your data, you will be notified by email or via a mandatory notice upon your next login.</p>
        `
    },
    ES: {
        termsTitle: "Términos de Servicio de Evollogic",
        privacyTitle: "Política de Privacidad de Evollogic",
        terms: `
            <h3>1. Aceptación de los Términos</h3>
            <p>Al acceder, crear una cuenta y utilizar el ecosistema Evollogic, aceptas expresamente estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, tienes estrictamente prohibido utilizar nuestros servicios.</p>
            
            <h3>2. Descripción y Evolución de los Servicios</h3>
            <p>Evollogic proporciona soluciones avanzadas de automatización, gestión de ventas digitales, bots para Discord, scripts e integración con teléfonos en la nube. Nuestros servicios están en constante desarrollo y podemos agregar, cambiar, suspender o eliminar características en cualquier momento sin previo aviso.</p>
            
            <h3>3. Seguridad y Responsabilidad de la Cuenta</h3>
            <p>Eres el único responsable de mantener la confidencialidad de tus credenciales, contraseñas y tokens de acceso. Aceptas notificarnos de inmediato sobre cualquier uso no autorizado de tu cuenta. Evollogic no asume ninguna responsabilidad por pérdidas o daños causados por negligencia en la protección de tus datos.</p>
            
            <h3>4. Reglas Estrictas de Conducta</h3>
            <p>Aceptas no utilizar nuestra infraestructura para: (a) realizar o promover actividades ilegales; (b) distribuir malware, ataques DDoS, spam o código destructivo; (c) intentar eludir, sobrecargar o interferir con los sistemas de seguridad de Evollogic; (d) aplicar ingeniería inversa a nuestro software, bots o scripts.</p>
            
            <h3>5. Propiedad Intelectual y Licencias</h3>
            <p>Todo el código fuente, diseño, interfaces, documentación e infraestructura de Evollogic son de nuestra exclusiva propiedad intelectual. El uso de nuestros servicios te otorga solo una licencia limitada e intransferible, y no te concede ningún derecho para revender, copiar o distribuir nuestro código.</p>
            
            <h3>6. Transacciones, Suscripciones y Reembolsos</h3>
            <p>Ciertos módulos dentro del ecosistema requieren pago. Las reglas de renovación y reembolso se estipulan en la página de cada producto. Los intentos de fraude, devoluciones de cargo maliciosas (chargebacks) o evasión de tarifas resultarán en el baneo permanente de tu cuenta.</p>
            
            <h3>7. Terminación de Cuenta y Retención</h3>
            <p>Nos reservamos el derecho absoluto de suspender, limitar o terminar tu acceso a Evollogic a nuestra discreción, especialmente si se detecta cualquier violación de estos términos, comportamiento abusivo o actividad sospechosa en la red.</p>
            
            <h3>8. Exención de Garantías y Limitación de Responsabilidad</h3>
            <p>La plataforma se proporciona "tal cual" (as is). Evollogic no garantiza que los servicios sean 100% ininterrumpidos, totalmente seguros o libres de errores. En ningún caso Evollogic será responsable por pérdida de ganancias, interrupción del negocio o daños indirectos resultantes del uso de nuestras herramientas.</p>
        `,
        privacy: `
            <h3>1. Naturaleza de la Información que Recopilamos</h3>
            <p>Para proporcionar el ecosistema Evollogic, recopilamos datos de identificación esenciales: dirección de correo electrónico, nombre de usuario, contraseñas (almacenadas en formato hash irreversible), ID numéricos de integración social (Discord/Google), así como datos de telemetría y registros de conexión (IP y hora) exclusivamente por seguridad.</p>
            
            <h3>2. Propósito del Uso de Datos</h3>
            <p>Tu información se procesa estrictamente para: (a) garantizar la autenticación y seguridad de tu cuenta; (b) permitir la comunicación oficial sobre actualizaciones o soporte técnico; (c) procesar transacciones financieras; (d) bloquear el acceso no autorizado y prevenir el fraude sistémico.</p>
            
            <h3>3. Uso Compartido y Terceros</h3>
            <p>Evollogic repudia estrictamente la venta de datos personales. Tu información solo pasa por servicios de terceros cuando es estrictamente necesario para la operación (ej. proveedores de la nube, pasarelas de pago y autenticación OAuth2). Exigimos las mismas garantías de confidencialidad a nuestros socios.</p>
            
            <h3>4. Seguridad, Encriptación y Almacenamiento</h3>
            <p>Nuestras bases de datos están protegidas con modernos protocolos de encriptación de extremo a extremo y conexiones seguras (HTTPS/WSS). Sin embargo, comprendes que ningún entorno de Internet es completamente invulnerable, asumiendo el riesgo inherente de la transmisión en línea.</p>
            
            <h3>5. Retención y Ciclo de Vida de los Datos</h3>
            <p>Tus datos permanecerán en nuestra infraestructura mientras tu cuenta esté activa. Al solicitar la cancelación de la cuenta, iniciaremos un proceso de eliminación que borrará tus datos personales dentro de 30 días. Solo conservaremos registros anónimos por obligaciones legales.</p>
            
            <h3>6. Política de Cookies y Rastreo</h3>
            <p>Utilizamos cookies puramente técnicas, necesarias para mantener tu sesión (login) y guardar la configuración de la interfaz. No implementamos cookies de rastreo publicitario de terceros en nuestra pantalla de registro o panel principal.</p>
            
            <h3>7. Tus Derechos Sobre Tus Datos</h3>
            <p>Según las leyes de protección de datos aplicables, tienes el derecho inalienable de solicitar una exportación de todos tus datos, exigir la corrección de información incorrecta o invocar el derecho al olvido solicitando la eliminación total de tu cuenta.</p>
            
            <h3>8. Actualizaciones a esta Política</h3>
            <p>Esta política es dinámica. En caso de cambios que afecten significativamente el procesamiento de tus datos, se te notificará por correo electrónico o mediante un aviso obligatorio en tu próximo inicio de sesión.</p>
        `
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const linkTerms = document.getElementById('link-terms');
    const linkPrivacy = document.getElementById('link-privacy');
    const infoModal = document.getElementById('infoModal');

    if (linkTerms) {
        linkTerms.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('terms');
        });
    }

    if (linkPrivacy) {
        linkPrivacy.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('privacy');
        });
    }

    if (infoModal) {
        infoModal.addEventListener('click', (e) => {
            // Fecha se clicar fora da caixa do modal
            if (e.target === infoModal) {
                closeModal();
            }
        });
    }
});

function openModal(type) {
    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close-btn');
    
    // Identifica o idioma atual (puxando da variável global ou fallback para EN)
    const lang = window.currentLang || 'EN';
    const docData = legalDocuments[lang];
    const uiData = window.translations ? window.translations[lang] : { modal_close: "Close" };

    // Injeta os títulos e os textos ricos (HTML) baseados no tipo escolhido
    if(type === 'terms') {
        titleEl.innerText = docData.termsTitle;
        bodyEl.innerHTML = docData.terms; // Usando innerHTML para formatar títulos e parágrafos
    } else {
        titleEl.innerText = docData.privacyTitle;
        bodyEl.innerHTML = docData.privacy; // Usando innerHTML para formatar títulos e parágrafos
    }
    
    closeBtn.innerText = uiData.modal_close;
    
    // Abre o modal
    const modal = document.getElementById('infoModal');
    modal.style.display = 'flex';
    // O timeout cria o efeito suave de entrada
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeModal() {
    const modal = document.getElementById('infoModal');
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
}
