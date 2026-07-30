/* =====================================================
   PUERPERIO · Interactividad
   ===================================================== */
(function () {
    'use strict';

    var body = document.body;
    var btnComenzar = document.getElementById('btnComenzar');
    var btnInicio = document.getElementById('btnInicio');
    var navMarca = document.getElementById('navMarca');
    var portada = document.getElementById('portada');
    var nav = document.getElementById('nav');
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');
    var contenido = document.getElementById('contenido');

    /* —— Botón "Comenzar": cierra la portada y abre el contenido —— */
    btnComenzar.addEventListener('click', function () {
        portada.classList.add('oculta');
        body.classList.remove('en-portada');
        nav.classList.add('visible');
        // Mini retardo para que la transición de la portada se note
        setTimeout(function () {
            contenido.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    });

    /* —— Volver a la carátula: botón "Inicio" o clic en la marca —— */
    function volverInicio() {
        // Cerrar menú móvil si está abierto
        navMenu.classList.remove('abierto');
        navToggle.classList.remove('abierto');
        navToggle.setAttribute('aria-expanded', 'false');
        // Ocultar nav fijo y mostrar la portada
        nav.classList.remove('visible');
        portada.classList.remove('oculta');
        body.classList.add('en-portada');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (btnInicio) btnInicio.addEventListener('click', volverInicio);
    if (navMarca) {
        navMarca.addEventListener('click', function (e) {
            // Evitar que el ancla #contenido haga scroll primero
            e.preventDefault();
            volverInicio();
        });
    }
    navMarca.style.cursor = 'pointer';
    navMarca.removeAttribute('href');

    /* —— Menú móvil —— */
    navToggle.addEventListener('click', function () {
        var abierto = navMenu.classList.toggle('abierto');
        navToggle.classList.toggle('abierto', abierto);
        navToggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });

    navMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            navMenu.classList.remove('abierto');
            navToggle.classList.remove('abierto');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    /* —— Resaltado de enlace activo según sección visible —— */
    var links = Array.prototype.slice.call(navMenu.querySelectorAll('a'));
    var secciones = links.map(function (l) {
        var id = l.getAttribute('href').slice(1);
        return document.getElementById(id);
    }).filter(Boolean);

    var observerActivo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                links.forEach(function (l) { l.classList.remove('activo'); });
                var link = navMenu.querySelector('a[href="#' + e.target.id + '"]');
                if (link) link.classList.add('activo');
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secciones.forEach(function (s) { observerActivo.observe(s); });

    /* —— Pestañas de etapas —— */
    var etapaBtns = document.querySelectorAll('.etapa-btn');
    var etapaPaneles = document.querySelectorAll('.etapa-panel');
    etapaBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var idx = btn.getAttribute('data-etapa');
            etapaBtns.forEach(function (b) { b.classList.remove('activo'); });
            etapaPaneles.forEach(function (p) { p.classList.remove('activo'); });
            btn.classList.add('activo');
            var panel = document.querySelector('.etapa-panel[data-panel="' + idx + '"]');
            if (panel) panel.classList.add('activo');
        });
    });

    /* —— Acordeón —— */
    var acordeones = document.querySelectorAll('.acordeon__item');
    acordeones.forEach(function (item) {
        var cab = item.querySelector('.acordeon__cabecera');
        cab.addEventListener('click', function () {
            var estabaAbierto = item.classList.contains('abierto');
            acordeones.forEach(function (it) { it.classList.remove('abierto'); });
            if (!estabaAbierto) item.classList.add('abierto');
        });
    });

    /* —— Animación de entrada de secciones —— */
    var observerAnim = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observerAnim.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-anim]').forEach(function (el) { observerAnim.observe(el); });

    /* —— Botón volver arriba —— */
    var volverTop = document.getElementById('volverTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 600) {
            volverTop.classList.add('visible');
        } else {
            volverTop.classList.remove('visible');
        }
    }, { passive: true });
    volverTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

})();