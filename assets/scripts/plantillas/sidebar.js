document.getElementById("sidebar").innerHTML = `
<div class="app-header__logo">
            <div class="logo-src"></div>
            <div class="header__pane ml-auto">
              <div>
                <button
                  type="button"
                  class="hamburger close-sidebar-btn hamburger--elastic"
                  data-class="closed-sidebar"
                >
                  <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div class="app-header__mobile-menu">
            <div>
              <button
                type="button"
                class="hamburger hamburger--elastic mobile-toggle-nav"
              >
                <span class="hamburger-box">
                  <span class="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
          <div class="app-header__menu">
            <span>
              <button
                type="button"
                class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
              >
                <span class="btn-icon-wrapper">
                  <i class="fa fa-ellipsis-v fa-w-6"></i>
                </span>
              </button>
            </span>
          </div>
          <div class="scrollbar-sidebar">
            <div class="app-sidebar__inner">
              <ul class="vertical-nav-menu">
                <li class="app-sidebar__heading" id="home_email"></li>
                <li>
                  <a href="index.html" class="mm-active">
                    <i class="metismenu-icon pe-7s-home"></i>
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="enfermeras.html">
                    <i class="metismenu-icon pe-7s-eyedropper"></i>
                    Enfermeras
                  </a>
                </li>
                <li>
                  <a href="pacientes.html">
                    <i class="metismenu-icon pe-7s-users"></i>
                    Pacientes
                  </a>
                </li>
                <li>
                  <a href="dispositivos.html">
                    <i class="metismenu-icon pe-7s-box2"></i>
                    Dispositivos
                  </a>
                </li>
                <li>
                  <a href="farmacias.html">
                    <i class="metismenu-icon icon-anim-pulse pe-7s-bell"></i>
                    Notificaciones
                  </a>
                  
                </li>
              </ul>
            </div>
          </div>
`;
