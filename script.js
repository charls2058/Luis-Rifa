const container = document.getElementById('boletos-container');

// Recuperar boletos ocupados desde localStorage
const ocupados = JSON.parse(localStorage.getItem('boletosOcupados')) || {};

for (let i = 1; i <= 100; i++) {
  const btn = document.createElement('div');
  btn.classList.add('boleto');
  btn.textContent = i;

  if (ocupados[i]) {
    btn.classList.add('ocupado');
  } else {
    btn.addEventListener('click', () => {
      const confirmar = confirm(`¿Deseas apartar el boleto ${i}? Serás redirigido al formulario.`);
      if (confirmar) {
        ocupados[i] = true;
        localStorage.setItem('boletosOcupados', JSON.stringify(ocupados));
        btn.classList.add('ocupado');

        // Reemplaza por tu URL real y el entry del campo del número de boleto
        const googleFormBase = "https://docs.google.com/forms/d/e/1FAIpQLSc_awmsPh7QkWo9SAhijezbjOU8JvR_MHTL1G_5epXida5eFw/viewform?usp=preview";
        const entryBoleto = "entry.1234567890"; // ← CAMBIA este valor

        const url = `${googleFormBase}?${entryBoleto}=${i}`;
        window.open(url, '_blank');
      }
    });
  }

  container.appendChild(btn);
}
