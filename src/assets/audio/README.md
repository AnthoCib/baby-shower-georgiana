# Música de fondo

La invitación importa el audio local `baby-shower-lullaby-girl.mp3` mediante Vite. Se inicia directamente con el clic en «Abrir invitación», continúa durante toda la página, repite en loop y sube el volumen suavemente hasta 0.22.

El elemento `<audio>` se mantiene montado desde `App`; la Splash no controla su ciclo de vida. No se reproduce sonido antes de la interacción.
