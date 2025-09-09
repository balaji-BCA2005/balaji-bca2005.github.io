  // Scroll-triggered fade-in animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        // Projects and modal functionality
        const grid = document.getElementById('grid');
        const emptyMsg = document.getElementById('emptyMsg');
        const modal = document.getElementById('modal');
        const modalGrid = document.getElementById('modalGrid');
        const modalClose = document.querySelector('.modal-close');

        const projects = [
            {
                title: "Clock Digital",
                url: "https://balaji-bca2005.github.io/clock.github.io/",
                desc: "A simple analog/digital clock project.",
                logo: "iamges/clock.png"
            },
            {
                title: "Door Shop",
                url: "https://balaji-bca2005.github.io/door.github.io/",
                desc: "A simple door shop Web-Design",
                logo: "iamges/D.png"
            },
            {
                title: "Color Palete",
                url: " https://balaji-bca2005.github.io/color.github.io/",
                desc: "Select The color for website ",
                logo: "iamges/color.png"
            }
        ];

        function createCard(p) {
            const card = document.createElement('div');
            card.className = 'card';
            const img = document.createElement('div');
            img.className = 'project-img';
            if (p.logo) {
                img.innerHTML = `<img src="${p.logo}" alt="Project Logo">`;
            } else {
                img.innerHTML = `<span>${p.title ? p.title.charAt(0).toUpperCase() : "P"}</span>`;
            }
            card.appendChild(img);

            const h3 = document.createElement('h3');
            h3.textContent = p.title || p.url;
            card.appendChild(h3);

            const desc = document.createElement('p');
            desc.textContent = p.desc || '';
            card.appendChild(desc);

            const meta = document.createElement('div');
            meta.className = 'meta';
            const open = document.createElement('button');
            open.className = "openbtn";
            open.textContent = "Open";
            open.onclick = (e) => { e.stopPropagation(); window.open(p.url, '_blank'); };
            meta.appendChild(open);
            card.appendChild(meta);

            return card;
        }

        function render(list) {
            grid.innerHTML = '';
            if (!list || list.length === 0) {
                emptyMsg.style.display = 'block';
                return;
            }
            emptyMsg.style.display = 'none';
            list.forEach((p, i) => {
                const card = createCard(p);
                card.onclick = () => openModal();
                grid.appendChild(card);
            });
        }

        function openModal() {
            modalGrid.innerHTML = '';
            projects.forEach((p) => {
                const card = createCard(p);
                card.onclick = null;
                modalGrid.appendChild(card);
            });
            modal.classList.add('active');
        }
        modalClose.onclick = () => { modal.classList.remove('active'); };
        modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };

        render(projects);
          // Scrollspy for navbar active link
        const navLinks = document.querySelectorAll('nav a');
        const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));

        function onScroll() {
            let scrollPos = window.scrollY + 120; // adjust offset for sticky nav
            let current = sections[0];
            for (let section of sections) {
                if (section && section.offsetTop <= scrollPos) current = section;
            }
            navLinks.forEach(link => link.classList.remove('active'));
            let activeLink = Array.from(navLinks).find(link => link.getAttribute('href') === `#${current.id}`);
            if (activeLink) activeLink.classList.add('active');
        }
        window.addEventListener('scroll', onScroll);
        onScroll();
         // Hamburger menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinksDiv = document.querySelector('.nav-links');
        hamburger.onclick = () => navLinksDiv.classList.toggle('open');
        // Optional: close menu on link click (mobile)
        navLinksDiv.querySelectorAll('a').forEach(link => {
            link.onclick = () => navLinksDiv.classList.remove('open');
        });
        document.getElementById('contactForm').onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const msgDiv = document.getElementById('formMsg');
    if (!name || !email || !message) {
        msgDiv.textContent = "Please fill all fields.";
        msgDiv.style.color = "#de381a";
        return;
    }
    // Simple email validation
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        msgDiv.textContent = "Please enter a valid email.";
        msgDiv.style.color = "#de381a";
        return;
    }
    msgDiv.textContent = "Thank you! Your message is not actually sent (demo only).";
    msgDiv.style.color = "#2464df";
    this.reset();
};
const darkBtn = document.getElementById('darkToggle');
const darkClass = 'dark';
darkBtn.onclick = function() {
    document.body.classList.toggle(darkClass);
    // Change icon
    darkBtn.textContent = document.body.classList.contains(darkClass) ? "☀️" : "🌙";
};
// Optional: Remember mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add(darkClass);
    darkBtn.textContent = "☀️";
}
darkBtn.onclick = function() {
    document.body.classList.toggle(darkClass);
    const isDark = document.body.classList.contains(darkClass);
    darkBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem('darkMode', isDark);

};
