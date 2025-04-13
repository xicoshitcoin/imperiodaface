// Smooth scrolling para os links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Mensagem enviada com sucesso!');
        contactForm.reset();
    });
}

// Função para mostrar notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Adicionar estilos para notificações
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2c3e50;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Adicionar classe ativa ao menu quando a seção estiver visível
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Funcionalidade do FAQ
document.querySelectorAll('.faq-pergunta').forEach(pergunta => {
    pergunta.addEventListener('click', () => {
        const faqItem = pergunta.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Fecha todas as outras perguntas
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abre a pergunta clicada se não estiver ativa
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Funcionalidade do Calendário
const diasMes = document.getElementById('dias-mes');
const mesAtual = document.getElementById('mes-atual');
const prevMonth = document.getElementById('prev-month');
const nextMonth = document.getElementById('next-month');
const horariosGrid = document.getElementById('horarios-grid');

let dataAtual = new Date();
let diaSelecionado = null;

function atualizarCalendario() {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();
    
    mesAtual.textContent = dataAtual.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    
    const diasNoMes = ultimoDia.getDate();
    const primeiroDiaSemana = primeiroDia.getDay();
    
    diasMes.innerHTML = '';
    
    // Adiciona dias vazios no início
    for (let i = 0; i < primeiroDiaSemana; i++) {
        const diaVazio = document.createElement('div');
        diaVazio.className = 'dia inativo';
        diasMes.appendChild(diaVazio);
    }
    
    // Adiciona os dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const diaElemento = document.createElement('div');
        diaElemento.className = 'dia';
        diaElemento.textContent = dia;
        
        const data = new Date(ano, mes, dia);
        if (data < new Date()) {
            diaElemento.classList.add('inativo');
        } else {
            diaElemento.addEventListener('click', () => selecionarDia(diaElemento, data));
        }
        
        diasMes.appendChild(diaElemento);
    }
}

function selecionarDia(elemento, data) {
    if (diaSelecionado) {
        diaSelecionado.classList.remove('selecionado');
    }
    
    elemento.classList.add('selecionado');
    diaSelecionado = elemento;
    
    // Atualiza os horários disponíveis
    atualizarHorarios(data);
}

function atualizarHorarios(data) {
    // Horários de exemplo (substitua por horários reais do seu sistema)
    const horarios = [
        '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
    ];
    
    horariosGrid.innerHTML = '';
    
    horarios.forEach(horario => {
        const horarioElemento = document.createElement('div');
        horarioElemento.className = 'horario';
        horarioElemento.textContent = horario;
        
        horarioElemento.addEventListener('click', () => {
            document.querySelectorAll('.horario').forEach(h => h.classList.remove('selecionado'));
            horarioElemento.classList.add('selecionado');
            
            // Aqui você pode adicionar a lógica para confirmar o agendamento
            alert(`Agendamento confirmado para ${data.toLocaleDateString()} às ${horario}`);
        });
        
        horariosGrid.appendChild(horarioElemento);
    });
}

prevMonth.addEventListener('click', () => {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    atualizarCalendario();
});

nextMonth.addEventListener('click', () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    atualizarCalendario();
});

// Inicializa o calendário
atualizarCalendario(); 