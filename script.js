// JavaScript для учебника по Bootstrap

document.addEventListener('DOMContentLoaded', function() {
    console.log('Учебник по Bootstrap загружен!');

    // ===== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Обновляем иконку в зависимости от темы
    updateThemeIcon(savedTheme);
    
    // Обработчик переключения темы
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Анимация переключения
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeIcon.style.color = '#FFD700';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeIcon.style.color = '';
        }
    }

    // ===== АКТИВНЫЙ ПУНКТ НАВИГАЦИИ =====
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Функция для обновления активной ссылки
    function updateActiveLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Слушаем событие прокрутки
    window.addEventListener('scroll', updateActiveLink);
    
    // ===== ДЕМОНСТРАЦИЯ СЕТКИ =====
    const gridResponsiveBtn = document.getElementById('gridResponsiveBtn');
    const columnsSlider = document.getElementById('columnsSlider');
    const columnsValue = document.getElementById('columnsValue');
    const gapSlider = document.getElementById('gapSlider');
    const gapValue = document.getElementById('gapValue');
    const demoRow = document.getElementById('demoRow');
    const gridDemoCode = document.getElementById('gridDemoCode');
    
    // Инициализация слайдеров
    if (columnsSlider && columnsValue) {
        columnsValue.textContent = columnsSlider.value;
        columnsSlider.addEventListener('input', function() {
            const columns = columnsSlider.value;
            columnsValue.textContent = columns;
            updateGridDemo();
        });
    }
    
    if (gapSlider && gapValue) {
        gapValue.textContent = `${gapSlider.value}px`;
        gapSlider.addEventListener('input', function() {
            const gap = gapSlider.value;
            gapValue.textContent = `${gap}px`;
            updateGridDemo();
        });
    }
    
    // Кнопка адаптивного режима
    let isResponsive = false;
    if (gridResponsiveBtn && demoRow) {
        gridResponsiveBtn.addEventListener('click', function() {
            isResponsive = !isResponsive;
            
            if (isResponsive) {
                // Включаем адаптивный режим
                demoRow.innerHTML = `
                    <div class="col-12 col-md-6 col-lg-4"><div class="grid-cell">.col-12 .col-md-6 .col-lg-4</div></div>
                    <div class="col-12 col-md-6 col-lg-4"><div class="grid-cell">.col-12 .col-md-6 .col-lg-4</div></div>
                    <div class="col-12 col-md-6 col-lg-4"><div class="grid-cell">.col-12 .col-md-6 .col-lg-4</div></div>
                    <div class="col-12 col-md-8"><div class="grid-cell">.col-12 .col-md-8</div></div>
                    <div class="col-12 col-md-4"><div class="grid-cell">.col-12 .col-md-4</div></div>
                `;
                gridResponsiveBtn.textContent = 'Обычный режим';
                gridResponsiveBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
            } else {
                // Возвращаем обычный режим
                demoRow.innerHTML = `
                    <div class="col-3"><div class="grid-cell">.col-3</div></div>
                    <div class="col-3"><div class="grid-cell">.col-3</div></div>
                    <div class="col-3"><div class="grid-cell">.col-3</div></div>
                    <div class="col-3"><div class="grid-cell">.col-3</div></div>
                    <div class="col-6"><div class="grid-cell">.col-6</div></div>
                    <div class="col-6"><div class="grid-cell">.col-6</div></div>
                    <div class="col-4"><div class="grid-cell">.col-4</div></div>
                    <div class="col-4"><div class="grid-cell">.col-4</div></div>
                    <div class="col-4"><div class="grid-cell">.col-4</div></div>
                    <div class="col-12"><div class="grid-cell">.col-12</div></div>
                `;
                gridResponsiveBtn.textContent = 'Адаптивный режим';
                gridResponsiveBtn.style.background = 'linear-gradient(135deg, #2563eb, #7c3aed)';
            }
            
            updateGridDemo();
        });
    }
    
    // Функция обновления демонстрации сетки
    function updateGridDemo() {
        if (!demoRow) return;
        
        const gap = gapSlider ? gapSlider.value : 8;
        demoRow.style.gap = `${gap}px`;
        
        if (gridDemoCode) {
            gridDemoCode.textContent = `<!-- Сетка Bootstrap -->
<div class="container">
  <div class="row g-${Math.floor(gap/8)}">
    <div class="col-md-4">
      <div class="card">Карточка 1</div>
    </div>
    <div class="col-md-4">
      <div class="card">Карточка 2</div>
    </div>
    <div class="col-md-4">
      <div class="card">Карточка 3</div>
    </div>
  </div>
</div>`;
        }
    }
    
    // Инициализируем демонстрацию сетки
    updateGridDemo();

    // ===== ДЕМОНСТРАЦИЯ КОМПОНЕНТОВ =====
    const timingFunctions = document.querySelectorAll('.timing-function');
    
    timingFunctions.forEach(timing => {
        timing.addEventListener('click', function() {
            const timingType = this.getAttribute('data-timing');
            const ball = this.querySelector('.timing-ball');
            
            // Сбрасываем анимацию
            ball.style.animation = 'none';
            void ball.offsetWidth; // Триггер рефлоу для перезапуска анимации
            
            // Запускаем анимацию с выбранным типом
            if (timingType === 'modal') {
                ball.style.animation = 'modalMove 2s infinite ease';
            } else if (timingType === 'dropdown') {
                ball.style.animation = 'dropdownMove 2s infinite ease-in-out';
            } else if (timingType === 'collapse') {
                ball.style.animation = 'collapseMove 2s infinite ease-in';
            } else if (timingType === 'carousel') {
                ball.style.animation = 'carouselMove 2s infinite ease-out';
            }
        });
    });
    
    // Кнопки для показа кода компонентов
    const timingButtons = document.querySelectorAll('.timing-btn');
    
    timingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const codeType = this.getAttribute('data-code');
            const title = this.closest('.timing-info').querySelector('h4').textContent;
            
            if (componentCodes[codeType]) {
                showCodeModal(title, componentCodes[codeType]);
            }
        });
    });
    
    // ===== ДЕМО КОМПОНЕНТОВ =====
    const componentDemoBtn = document.getElementById('componentDemoBtn');
    
    if (componentDemoBtn) {
        componentDemoBtn.addEventListener('click', function() {
            // Создаем модальное окно для демонстрации
            const modalHTML = `
                <div class="modal fade show" style="display: block; background: rgba(0,0,0,0.5)" id="demoModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Демо модального окна</h5>
                                <button type="button" class="btn-close" onclick="document.getElementById('demoModal').remove()"></button>
                            </div>
                            <div class="modal-body">
                                <p>Это демонстрация модального окна Bootstrap!</p>
                                <div class="dropdown mb-3">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                        Выпадающий список
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">Пункт 1</a></li>
                                        <li><a class="dropdown-item" href="#">Пункт 2</a></li>
                                        <li><a class="dropdown-item" href="#">Пункт 3</a></li>
                                    </ul>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Пример чекбокса
                                    </label>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" onclick="document.getElementById('demoModal').remove()">Закрыть</button>
                                <button type="button" class="btn btn-primary">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            const modalContainer = document.createElement('div');
            modalContainer.innerHTML = modalHTML;
            document.body.appendChild(modalContainer.firstChild);
            
            // Инициализируем dropdown
            const dropdownElement = document.querySelector('[data-bs-toggle="dropdown"]');
            if (dropdownElement) {
                new bootstrap.Dropdown(dropdownElement);
            }
        });
    }
    
    // ===== ДЕМОНСТРАЦИЯ УТИЛИТ =====
    const utilitiesChange = document.getElementById('utilitiesChange');
    const utilitiesReset = document.getElementById('utilitiesReset');
    const paddingSlider = document.getElementById('paddingSlider');
    const paddingValue = document.getElementById('paddingValue');
    const utilitiesObject = document.getElementById('utilitiesObject');
    const utilitiesCode = document.getElementById('utilitiesCode');
    
    // Слайдер отступов
    if (paddingSlider && paddingValue) {
        paddingValue.textContent = paddingSlider.value;
        paddingSlider.addEventListener('input', function() {
            const padding = paddingSlider.value;
            paddingValue.textContent = padding;
            updateUtilitiesDemo();
        });
    }
    
    // Кнопка изменения стилей
    if (utilitiesChange && utilitiesObject) {
        let styleIndex = 0;
        const styles = [
            { bg: 'primary', text: 'white', border: 'primary' },
            { bg: 'success', text: 'white', border: 'success' },
            { bg: 'warning', text: 'dark', border: 'warning' },
            { bg: 'secondary', text: 'white', border: 'secondary' },
            { bg: 'light', text: 'dark', border: 'secondary' }
        ];
        
        utilitiesChange.addEventListener('click', function() {
            styleIndex = (styleIndex + 1) % styles.length;
            const style = styles[styleIndex];
            
            const demoElements = utilitiesObject.querySelectorAll('.utility-demo > div');
            if (demoElements.length >= 3) {
                // Первый элемент (flex)
                demoElements[0].className = `d-flex justify-content-between align-items-center p-3 bg-${style.bg} text-${style.text} rounded mb-3`;
                
                // Второй элемент (текст)
                demoElements[1].className = `p-3 border border-${style.border} rounded bg-light mb-3`;
                demoElements[1].querySelector('p').className = `text-center text-${style.bg} fw-bold mb-0`;
                
                // Третий элемент (прогресс)
                demoElements[2].className = `p-3 shadow rounded bg-white`;
                demoElements[2].querySelector('.progress-bar').className = `progress-bar bg-${style.bg}`;
            }
            
            updateUtilitiesDemo();
            showNotification(`Стиль изменен на: ${style.bg}`, 'success');
        });
    }
    
    // Кнопка сброса
    if (utilitiesReset && utilitiesObject) {
        utilitiesReset.addEventListener('click', function() {
            if (paddingSlider) {
                paddingSlider.value = 3;
                paddingValue.textContent = '3';
            }
            
            const demoElements = utilitiesObject.querySelectorAll('.utility-demo > div');
            if (demoElements.length >= 3) {
                demoElements[0].className = 'd-flex justify-content-between align-items-center p-3 bg-primary text-white rounded mb-3';
                demoElements[1].className = 'p-3 border rounded bg-light mb-3';
                demoElements[1].querySelector('p').className = 'text-center text-success fw-bold mb-0';
                demoElements[2].className = 'p-3 shadow rounded bg-white';
                demoElements[2].querySelector('.progress-bar').className = 'progress-bar bg-success';
            }
            
            updateUtilitiesDemo();
            showNotification('Стили сброшены', 'success');
        });
    }
    
    // Функция обновления демонстрации утилит
    function updateUtilitiesDemo() {
        if (!utilitiesCode) return;
        
        const padding = paddingSlider ? paddingSlider.value : 3;
        
        utilitiesCode.textContent = `<!-- Пример использования утилит -->
<div class="card shadow border-0">
  <div class="card-body p-${padding}">
    <h5 class="card-title text-primary mb-3">
      <i class="fas fa-star me-2"></i>
      Заголовок карточки
    </h5>
    <p class="card-text text-muted">
      Текст карточки с использованием утилит Bootstrap
    </p>
    <div class="d-flex justify-content-between align-items-center mt-4">
      <small class="text-muted">Вчера</small>
      <button class="btn btn-sm btn-outline-primary">
        Подробнее
      </button>
    </div>
  </div>
</div>`;
    }
    
    // Инициализируем демонстрацию утилит
    updateUtilitiesDemo();
    
    // ===== ДЕМО МАКЕТОВ =====
    const layoutMobile = document.getElementById('layoutMobile');
    const layoutTablet = document.getElementById('layoutTablet');
    const layoutDesktop = document.getElementById('layoutDesktop');
    const layoutDemo = document.getElementById('layoutDemo');
    
    if (layoutDemo && layoutMobile && layoutTablet && layoutDesktop) {
        layoutMobile.addEventListener('click', function() {
            const demo = layoutDemo.querySelector('.responsive-demo');
            if (demo) {
                demo.innerHTML = `
                    <div class="d-block p-2 bg-danger text-white rounded mb-2">
                        Видно только на мобильных
                    </div>
                    <div class="d-none p-2 bg-success text-white rounded mb-2">
                        Видно только на планшетах и выше
                    </div>
                    <div class="d-none p-2 bg-primary text-white rounded">
                        Видно только на десктопах
                    </div>
                `;
            }
            showNotification('Мобильный вид активирован', 'info');
        });
        
        layoutTablet.addEventListener('click', function() {
            const demo = layoutDemo.querySelector('.responsive-demo');
            if (demo) {
                demo.innerHTML = `
                    <div class="d-none p-2 bg-danger text-white rounded mb-2">
                        Видно только на мобильных
                    </div>
                    <div class="d-block p-2 bg-success text-white rounded mb-2">
                        Видно только на планшетах
                    </div>
                    <div class="d-none p-2 bg-primary text-white rounded">
                        Видно только на десктопах
                    </div>
                `;
            }
            showNotification('Планшетный вид активирован', 'info');
        });
        
        layoutDesktop.addEventListener('click', function() {
            const demo = layoutDemo.querySelector('.responsive-demo');
            if (demo) {
                demo.innerHTML = `
                    <div class="d-none p-2 bg-danger text-white rounded mb-2">
                        Видно только на мобильных
                    </div>
                    <div class="d-none p-2 bg-success text-white rounded mb-2">
                        Видно только на планшетах и выше
                    </div>
                    <div class="d-block p-2 bg-primary text-white rounded">
                        Видно только на десктопах
                    </div>
                `;
            }
            showNotification('Десктопный вид активирован', 'info');
        });
    }
    
    // Кнопки для показа кода макетов
    const fillmodeButtons = document.querySelectorAll('.fillmode-btn');
    
    fillmodeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const codeType = this.getAttribute('data-code');
            const title = this.closest('.fillmode-info').querySelector('h4').textContent;
            
            if (componentCodes[codeType]) {
                showCodeModal(title, componentCodes[codeType]);
            }
        });
    });
    
    // ===== ПРИМЕРЫ КОМПОНЕНТОВ =====
    const exampleButtons = document.querySelectorAll('.example-btn');
    const exampleCodeButtons = document.querySelectorAll('.example-code-btn');
    
    // Коды компонентов для модального окна
    const componentCodes = {
        navbar: `<!-- Навигационная панель Bootstrap -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Brand</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`,
        
        cards: `<!-- Карточка товара Bootstrap -->
<div class="card" style="width: 18rem;">
  <img src="product.jpg" class="card-img-top" alt="Product">
  <div class="card-body">
    <h5 class="card-title">Название товара</h5>
    <p class="card-text">Описание товара. Отличный продукт по хорошей цене.</p>
    <div class="d-flex justify-content-between align-items-center">
      <span class="h5 mb-0">2 499 ₽</span>
      <button class="btn btn-primary">
        <i class="fas fa-shopping-cart"></i> В корзину
      </button>
    </div>
  </div>
</div>`,
        
        form: `<!-- Форма входа Bootstrap -->
<form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email адрес</label>
    <input type="email" class="form-control" id="exampleInputEmail1">
    <div class="form-text">Мы никогда никому не передадим вашу электронную почту.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Пароль</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Запомнить меня</label>
  </div>
  <button type="submit" class="btn btn-primary">Войти</button>
</form>`,
        
        table: `<!-- Таблица Bootstrap -->
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Имя</th>
      <th scope="col">Email</th>
      <th scope="col">Статус</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Анна Иванова</td>
      <td>anna@example.com</td>
      <td><span class="badge bg-success">Активен</span></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Иван Петров</td>
      <td>ivan@example.com</td>
      <td><span class="badge bg-danger">Неактивен</span></td>
    </tr>
  </tbody>
</table>`,
        
        modal: `<!-- Модальное окно Bootstrap -->
<!-- Кнопка для открытия модального окна -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Открыть модальное окно
</button>

<!-- Модальное окно -->
<div class="modal fade" id="exampleModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Заголовок модального окна</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p>Содержимое модального окна...</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
        <button type="button" class="btn btn-primary">Сохранить</button>
      </div>
    </div>
  </div>
</div>`,
        
        dropdown: `<!-- Выпадающий список Bootstrap -->
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Выпадающий список
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Действие 1</a></li>
    <li><a class="dropdown-item" href="#">Действие 2</a></li>
    <li><a class="dropdown-item" href="#">Действие 3</a></li>
  </ul>
</div>`,
        
        collapse: `<!-- Сворачиваемый элемент Bootstrap -->
<p>
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample">
    Показать/скрыть
  </button>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
    Содержимое сворачиваемого элемента. Можно показать или скрыть по нажатию кнопки.
  </div>
</div>`,
        
        carousel: `<!-- Карусель Bootstrap -->
<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="slide1.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="slide2.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="slide3.jpg" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Предыдущий</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Следующий</span>
  </button>
</div>`,
        
        grid: `<!-- Адаптивная сетка Bootstrap -->
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Карточка 1</h5>
          <p class="card-text">Содержимое карточки.</p>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Карточка 2</h5>
          <p class="card-text">Содержимое карточки.</p>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Карточка 3</h5>
          <p class="card-text">Содержимое карточки.</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
        
        sidebar: `<!-- Макет с сайдбаром -->
<div class="container-fluid">
  <div class="row">
    <!-- Сайдбар -->
    <div class="col-lg-3 col-md-4 d-none d-md-block">
      <div class="sidebar bg-light p-3 rounded">
        <h5>Навигация</h5>
        <ul class="nav flex-column">
          <li class="nav-item"><a href="#" class="nav-link">Пункт 1</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Пункт 2</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Пункт 3</a></li>
        </ul>
      </div>
    </div>
    
    <!-- Основной контент -->
    <div class="col-lg-9 col-md-8">
      <div class="content p-3">
        <h1>Основной контент</h1>
        <p>На мобильных сайдбар скрывается, на планшетах и десктопах отображается слева.</p>
      </div>
    </div>
  </div>
</div>`,
        
        cards: `<!-- Сетка карточек -->
<div class="container">
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Карточка 1</h5>
          <p class="card-text">На мобильных: 1 колонка, на планшетах: 2 колонки, на десктопах: 4 колонки.</p>
        </div>
      </div>
    </div>
    <!-- Повторить необходимое количество карточек -->
  </div>
</div>`,
        
        navbar: `<!-- Адаптивная навигация -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Логотип</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link active" href="#">Главная</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">О нас</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Контакты</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`,
        
        columns: `<!-- Многоколоночный макет -->
<div class="container">
  <div class="row">
    <div class="col-12 col-lg-8">
      <div class="main-content p-3">
        <h1>Основной контент</h1>
        <p>На мобильных и планшетах занимает всю ширину, на десктопах - 8 колонок.</p>
      </div>
    </div>
    <div class="col-12 col-lg-4">
      <div class="sidebar p-3 bg-light rounded">
        <h5>Сайдбар</h5>
        <p>На мобильных и планшетах под основным контентом, на десктопах справа.</p>
      </div>
    </div>
  </div>
</div>`,
        
        admin: `<!-- Админ-панель с Bootstrap -->
<div class="container-fluid">
  <div class="row">
    <!-- Сайдбар -->
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <i class="fas fa-tachometer-alt me-2"></i>
              Dashboard
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-users me-2"></i>
              Пользователи
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-chart-bar me-2"></i>
              Статистика
            </a>
          </li>
        </ul>
      </div>
    </nav>
    
    <!-- Основной контент -->
    <main class="col-md-10 ms-sm-auto px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
      </div>
      
      <!-- Карточки статистики -->
      <div class="row">
        <div class="col-md-3 mb-3">
          <div class="card text-white bg-primary">
            <div class="card-body">
              <h5 class="card-title">Пользователи</h5>
              <h2 class="card-text">1,234</h2>
            </div>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card text-white bg-success">
            <div class="card-body">
              <h5 class="card-title">Заказы</h5>
              <h2 class="card-text">567</h2>
            </div>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card text-white bg-warning">
            <div class="card-body">
              <h5 class="card-title">Доход</h5>
              <h2 class="card-text">$12,345</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>`,
        
        ecommerce: `<!-- Интернет-магазин с Bootstrap -->
<div class="container">
  <!-- Навигация -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Магазин</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-shopping-cart"></i>
              Корзина
              <span class="badge bg-primary">3</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  <!-- Сетка товаров -->
  <div class="row">
    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div class="card h-100">
        <img src="product1.jpg" class="card-img-top" alt="Товар">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">Название товара</h5>
          <p class="card-text flex-grow-1">Описание товара.</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="h5 mb-0">2 499 ₽</span>
            <button class="btn btn-primary btn-sm">В корзину</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Другие товары -->
  </div>
</div>`,
        
        blog: `<!-- Макет блога -->
<div class="container">
  <!-- Шапка блога -->
  <header class="py-5 text-center">
    <h1 class="display-4">Мой блог</h1>
    <p class="lead">Делимся интересными статьями и новостями</p>
  </header>
  
  <div class="row">
    <!-- Основной контент -->
    <div class="col-lg-8">
      <article class="mb-5">
        <h2>Заголовок статьи</h2>
        <p class="text-muted">Опубликовано 15 марта 2023</p>
        <p>Содержимое статьи...</p>
        <a href="#" class="btn btn-primary">Читать далее</a>
      </article>
    </div>
    
    <!-- Сайдбар -->
    <div class="col-lg-4">
      <div class="sidebar bg-light p-4 rounded">
        <h5>Категории</h5>
        <ul class="list-unstyled">
          <li><a href="#">Веб-разработка</a></li>
          <li><a href="#">Дизайн</a></li>
          <li><a href="#">Маркетинг</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>`
    };
    
    // Обработчики для кнопок примеров (удалены, так как кнопок "Запустить" больше нет)
    
    // Кнопки для показа кода
    exampleCodeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeType = this.getAttribute('data-code');
            let title = '';
            
            if (this.closest('.example-content')) {
                title = this.closest('.example-content').querySelector('h3').textContent;
            } else if (this.closest('.advanced-example')) {
                title = this.closest('.advanced-example').querySelector('h4').textContent;
            }
            
            if (componentCodes[codeType]) {
                showCodeModal(title, componentCodes[codeType]);
            }
        });
    });
    
    // ===== ПРАКТИЧЕСКОЕ ЗАДАНИЕ =====
    const practiceToggle = document.getElementById('practiceToggle');
    const runPractice = document.getElementById('runPractice');
    const practiceCode = document.getElementById('practiceCode');
    const practiceResult = document.getElementById('practiceResult');
    
    // Предустановленный CSS для карточки
    if (practiceCode) {
        practiceCode.value = `<div class="card h-100 shadow">
  <img src="https://via.placeholder.com/300x200/6b7280/ffffff?text=Product+Image" 
       class="card-img-top" 
       alt="Товар">
  <div class="card-body d-flex flex-column">
    <div class="d-flex justify-content-between align-items-start mb-2">
      <span class="badge bg-success">В наличии</span>
      <span class="text-muted"><small>Арт. 12345</small></span>
    </div>
    <h5 class="card-title">Название товара</h5>
    <p class="card-text flex-grow-1">
      Краткое описание товара. Отличный продукт по хорошей цене.
    </p>
    <div class="d-flex justify-content-between align-items-center mt-auto">
      <div>
        <span class="h4 mb-0 text-primary">2 499 ₽</span>
        <del class="text-muted ms-2"><small>3 199 ₽</small></del>
      </div>
      <button class="btn btn-primary">
        <i class="fas fa-shopping-cart me-1"></i>
        В корзину
      </button>
    </div>
  </div>
</div>`;
    }
    
    let currentPracticeView = 'desktop';
    
    // Запуск пользовательского кода
    if (runPractice && practiceCode && practiceResult) {
        runPractice.addEventListener('click', function() {
            const code = practiceCode.value;
            
            try {
                // Очищаем результат
                practiceResult.innerHTML = '';
                
                // Создаем контейнер для предпросмотра
                const previewContainer = document.createElement('div');
                previewContainer.className = `container ${currentPracticeView === 'mobile' ? 'mobile-preview' : ''}`;
                
                // Добавляем код
                previewContainer.innerHTML = code;
                
                practiceResult.appendChild(previewContainer);
                
                showNotification('Карточка создана успешно!', 'success');
            } catch (error) {
                showNotification('Ошибка в коде HTML', 'error');
                console.error('HTML Error:', error);
            }
        });
    }
    
    // Переключатель адаптивности
    if (practiceToggle && practiceResult) {
        practiceToggle.addEventListener('click', function() {
            currentPracticeView = currentPracticeView === 'desktop' ? 'mobile' : 'desktop';
            
            if (currentPracticeView === 'mobile') {
                practiceResult.classList.add('mobile-preview');
                practiceToggle.textContent = 'Десктопный вид';
                practiceResult.style.maxWidth = '375px';
                practiceResult.style.margin = '0 auto';
                showNotification('Мобильный вид активирован', 'info');
            } else {
                practiceResult.classList.remove('mobile-preview');
                practiceToggle.textContent = 'Мобильный вид';
                practiceResult.style.maxWidth = '100%';
                practiceResult.style.margin = '0';
                showNotification('Десктопный вид активирован', 'info');
            }
        });
    }
    
    // ===== ПОДПИСКА НА РАССЫЛКУ =====
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Имитация отправки
            setTimeout(() => {
                showNotification(`Спасибо за подписку! На ${email} отправлено подтверждение.`, 'success');
                this.reset();
            }, 500);
        });
    }
    
    // ===== МОДАЛЬНОЕ ОКНО =====
    const modal = document.getElementById('codeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalCode = document.getElementById('modalCode');
    const modalClose = document.getElementById('modalClose');
    const copyCodeBtn = document.getElementById('copyCode');
    const tryCodeBtn = document.getElementById('tryCode');
    
    // Функция показа модального окна
    function showCodeModal(title, code) {
        if (!modal || !modalTitle || !modalCode) return;
        
        modalTitle.textContent = `Код компонента: ${title}`;
        
        // Очищаем и устанавливаем чистый код
        modalCode.innerHTML = '';
        const codeText = document.createTextNode(code);
        modalCode.appendChild(codeText);
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Подсветка синтаксиса
        highlightSyntax(modalCode);
    }
    
    // Закрытие модального окна
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Закрытие модального окна при клике вне его
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Копирование кода
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', function() {
            if (!modalCode) return;
            
            const codeToCopy = modalCode.textContent;
            navigator.clipboard.writeText(codeToCopy).then(() => {
                showNotification('Код скопирован в буфер обмена!', 'success');
            }).catch(err => {
                console.error('Ошибка копирования: ', err);
                showNotification('Не удалось скопировать код', 'error');
            });
        });
    }
    
    // Кнопка "Попробовать в редакторе"
    if (tryCodeBtn && practiceCode) {
        tryCodeBtn.addEventListener('click', function() {
            if (!modalCode) return;
            
            const code = modalCode.textContent;
            practiceCode.value = code;
            
            // Прокручиваем к редактору
            document.querySelector('.practice-section').scrollIntoView({
                behavior: 'smooth'
            });
            
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
            
            showNotification('Код добавлен в редактор!', 'success');
        });
    }
    
    // ===== УВЕДОМЛЕНИЯ =====
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    function showNotification(message, type = 'success') {
        if (!notification || !notificationText) return;
        
        notificationText.textContent = message;
        
        // Устанавливаем цвет в зависимости от типа
        if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #db2777, #f59e0b)';
        } else if (type === 'warning') {
            notification.style.background = 'linear-gradient(135deg, #d97706, #f59e0b)';
        } else if (type === 'info') {
            notification.style.background = 'linear-gradient(135deg, #2563eb, #7c3aed)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #2563eb, #7c3aed)';
        }
        
        notification.classList.add('show');
        
        // Удаляем предыдущие таймеры
        if (window.notificationTimer) {
            clearTimeout(window.notificationTimer);
        }
        
        // Автоматическое скрытие через 3 секунды
        window.notificationTimer = setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Добавляем обработчик для закрытия уведомлений по клику
    if (notification) {
        notification.addEventListener('click', function() {
            this.classList.remove('show');
            if (window.notificationTimer) {
                clearTimeout(window.notificationTimer);
            }
        });
    }
    
    // ===== ПОДСВЕТКА СИНТАКСИСА =====
    function highlightSyntax(element) {
        if (!element) return;
        
        let code = element.textContent;
        
        // Простая подсветка HTML тегов
        code = code.replace(/&lt;(!--|\/?)([a-zA-Z][a-zA-Z0-9-]*)/g, '&lt;<span class="html-tag">$1$2</span>');
        code = code.replace(/&lt;\/[a-zA-Z][a-zA-Z0-9-]*&gt;/g, '<span class="html-tag">$&</span>');
        
        // Подсветка атрибутов
        code = code.replace(/([a-zA-Z-]+)=/g, '<span class="html-attr">$1</span>=');
        
        // Подсветка классов Bootstrap
        const bootstrapClasses = [
            'container', 'row', 'col', 'btn', 'card', 'navbar', 'modal',
            'form', 'table', 'alert', 'badge', 'progress', 'd-flex',
            'justify-content', 'align-items', 'text-', 'bg-', 'm-', 'p-',
            'border', 'rounded', 'shadow'
        ];
        
        bootstrapClasses.forEach(cls => {
            const regex = new RegExp(`(${cls}[a-zA-Z0-9-]*)`, 'g');
            code = code.replace(regex, '<span class="bootstrap-class">$1</span>');
        });
        
        // Подсветка значений
        code = code.replace(/"[^"]*"/g, '<span class="html-value">$&</span>');
        
        element.innerHTML = code;
    }
    
    // Добавляем стили для подсветки синтаксиса
    const syntaxStyles = `
        .html-tag { color: #e06c75; }
        .html-attr { color: #d19a66; }
        .html-value { color: #98c379; }
        .bootstrap-class { color: #61afef; font-weight: bold; }
        .comment { color: #6b7280; font-style: italic; }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = syntaxStyles;
    document.head.appendChild(styleSheet);
    
    // ===== ПЛАВНАЯ ПРОКРУТКА =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
    // Обновляем активную ссылку при загрузке
    updateActiveLink();
    
    // Показываем приветственное сообщение
    setTimeout(() => {
        showNotification('Добро пожаловать в учебник по Bootstrap 5! Начните изучение с раздела "Сетка".', 'success');
    }, 1000);
    
    // ===== ОБРАБОТЧИКИ СОБЫТИЙ КЛАВИАТУРЫ =====
    document.addEventListener('keydown', function(e) {
        // Закрытие модального окна по ESC
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
        
        // Переключение темы по Ctrl+T
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            themeToggle.click();
        }
    });
    
    // ===== ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
    console.log('Учебник по Bootstrap 5 готов к использованию!');
});