/* =========================================================
   SURREAL — IT & Civil Engineering | script.js
   ========================================================= */

   document.addEventListener('DOMContentLoaded', function () {

    var header = document.querySelector('.site-header');
  
    /* ---------- Smooth scroll for every in-page nav link ---------- */
    var navLinks = document.querySelectorAll('[data-nav]');
  
    navLinks.forEach(function (link) {
  
      link.addEventListener('click', function (e) {
  
        var href = link.getAttribute('href');
  
        if (!href || href.charAt(0) !== '#') return;
  
        var targetId = href.slice(1);
        var target = targetId === '' ? document.body : document.getElementById(targetId);
  
        if (!target) return;
  
        e.preventDefault();
  
        var headerHeight = header ? header.offsetHeight : 0;
  
        var top =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight +
          1;
  
        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
  
        closeMobileNav();
        closeSearch();

        var serviceTarget = link.getAttribute('data-service-target');
        if (serviceTarget) {
          document.querySelectorAll('.service-card').forEach(function (card) {
            card.classList.remove('service-highlight');
          });

          var serviceCard = document.querySelector('.service-card.card-' + serviceTarget);
          if (serviceCard) {
            setTimeout(function () {
              serviceCard.classList.add('service-highlight');
            }, 500);
          }
        }

        if (link.classList.contains('nav-link')) {
          setActiveNav(link);
        }
  
      });
  
    });
  
    /* ---------- Highlight active nav link on scroll ---------- */
  
    var sections = ['top', 'about', 'services', 'contact']
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);
  
    var mainNavLinks = document.querySelectorAll('.nav-link');
  
    function setActiveNav(activeLink) {
  
      mainNavLinks.forEach(function (l) {
        l.classList.remove('active');
      });
  
      activeLink.classList.add('active');
  
    }
  
    function onScrollSpy() {
  
      var scrollPos =
        window.pageYOffset +
        (header ? header.offsetHeight : 0) +
        40;
  
      var current = sections[0];
  
      sections.forEach(function (sec) {
  
        if (sec.offsetTop <= scrollPos) {
          current = sec;
        }
  
      });
  
      var match =
        document.querySelector('.nav-link[href="#' + current.id + '"]');
  
      if (match) {
        setActiveNav(match);
      }
  
    }
  
    window.addEventListener('scroll', onScrollSpy, {
      passive: true
    });
  
    onScrollSpy();
  
    /* ---------- Mobile hamburger nav ---------- */
  
    var hamburger = document.getElementById('hamburger');
    var mainNav = document.getElementById('mainNav');
  
    function closeMobileNav() {
  
      if (mainNav) {
        mainNav.classList.remove('open');
      }
  
      if (hamburger) {
        hamburger.classList.remove('active');
      }
  
    }
  
    if (hamburger) {
  
      hamburger.addEventListener('click', function () {
  
        mainNav.classList.toggle('open');
        hamburger.classList.toggle('active');
  
        closeSearch();
  
      });
  
    }
  
    /* ---------- Search expand / page search ---------- */
  
    var searchBox = document.getElementById('searchBox');
    var searchToggle = document.getElementById('searchToggle');
    var siteSearch = document.getElementById('siteSearch');
  
    function closeSearch() {
  
      if (searchBox) {
        searchBox.classList.remove('open');
      }
  
    }
  
    function clearSearchHighlights() {
  
      document.querySelectorAll('mark.search-hit').forEach(function (mark) {
  
        var parent = mark.parentNode;
  
        while (mark.firstChild) {
          parent.insertBefore(mark.firstChild, mark);
        }
  
        parent.removeChild(mark);
        parent.normalize();
  
      });
  
    }
  
    function highlightSearchTerm(term) {
  
      clearSearchHighlights();
  
      if (!term) return [];
  
      var escaped =
        term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
      var regex = new RegExp(escaped, 'gi');
      var testRegex = new RegExp(escaped, 'i');
  
      var hits = [];
  
      var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function (node) {
  
            var parent = node.parentElement;
  
            if (!parent) {
              return NodeFilter.FILTER_REJECT;
            }
  
            if (parent.closest('#searchBox')) {
              return NodeFilter.FILTER_REJECT;
            }
  
            if (
              parent.closest(
                'script, style, textarea, input, select, option, svg, canvas, mark'
              )
            ) {
              return NodeFilter.FILTER_REJECT;
            }
  
            if (!node.nodeValue.trim()) {
              return NodeFilter.FILTER_REJECT;
            }
  
            return testRegex.test(node.nodeValue)
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_REJECT;
  
          }
        }
      );
  
      var nodes = [];
  
      while (walker.nextNode()) {
        nodes.push(walker.currentNode);
      }
  
      nodes.forEach(function (node) {
  
        var text = node.nodeValue;
        var fragment = document.createDocumentFragment();
        var lastIndex = 0;
  
        regex.lastIndex = 0;
  
        text.replace(regex, function (match, offset) {
  
          fragment.appendChild(
            document.createTextNode(
              text.slice(lastIndex, offset)
            )
          );
  
          var mark = document.createElement('mark');
  
          mark.className = 'search-hit';
          mark.textContent = match;
  
          fragment.appendChild(mark);
  
          hits.push(mark);
  
          lastIndex = offset + match.length;
  
          return match;
  
        });
  
        fragment.appendChild(
          document.createTextNode(
            text.slice(lastIndex)
          )
        );
  
        node.parentNode.replaceChild(fragment, node);
  
      });
  
      return hits;
  
    }
  
    function performSearch() {
  
      if (!siteSearch) return;
  
      var term = siteSearch.value.trim();
  
      var hits = highlightSearchTerm(term);
  
      if (hits.length) {
  
        hits[0].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
  
      }
  
    }
  
    if (searchToggle) {
  
      searchToggle.addEventListener('click', function (e) {
  
        e.stopPropagation();
  
        if (!searchBox.classList.contains('open')) {
  
          searchBox.classList.add('open');
  
          setTimeout(function () {
  
            if (siteSearch) {
              siteSearch.focus();
            }
  
          }, 250);
  
        } else {
  
          performSearch();
          closeSearch();
  
        }
  
      });
  
    }
  
    if (siteSearch) {
  
      siteSearch.addEventListener('keydown', function (e) {
  
        if (e.key === 'Enter') {
  
          e.preventDefault();
  
          performSearch();
          closeSearch();
  
        }
  
        if (e.key === 'Escape') {
  
          siteSearch.value = '';
  
          clearSearchHighlights();
  
          closeSearch();
  
        }
  
      });
  
      siteSearch.addEventListener('input', function () {
  
        highlightSearchTerm(
          siteSearch.value.trim()
        );
  
      });
  
    }
  
    document.addEventListener('click', function (e) {
  
      if (
        searchBox &&
        !searchBox.contains(e.target) &&
        searchBox.classList.contains('open')
      ) {
  
        closeSearch();
  
      }
  
    });
  
    /* ---------- Scroll reveal animations ---------- */
  
    var revealSections =
      document.querySelectorAll('.scroll-section');
  
    if ('IntersectionObserver' in window) {
  
      var sectionObserver =
        new IntersectionObserver(function (entries, observer) {
  
          entries.forEach(function (entry) {
  
            if (entry.isIntersecting) {
  
              entry.target.classList.add('in-view');
  
              observer.unobserve(entry.target);
  
            }
  
          });
  
        }, {
          threshold: 0.14
        });
  
      revealSections.forEach(function (section) {
  
        sectionObserver.observe(section);
  
      });
  
    } else {
  
      revealSections.forEach(function (section) {
  
        section.classList.add('in-view');
  
      });
  
    }
  
    /* ---------- Counting numbers when statistics enter the screen ---------- */
  
    var counters =
      document.querySelectorAll('.counter');
  
    function animateCounter(counter) {
  
      if (counter.dataset.counted === 'true') {
        return;
      }
  
      counter.dataset.counted = 'true';
  
      var target =
        Number(counter.getAttribute('data-target')) || 0;
  
      var start = 0;
      var duration = 1400;
      var startTime = null;
  
      function updateCounter(timestamp) {
  
        if (!startTime) {
          startTime = timestamp;
        }
  
        var progress =
          Math.min(
            (timestamp - startTime) / duration,
            1
          );
  
        var eased =
          1 - Math.pow(1 - progress, 3);
  
        var value =
          Math.floor(
            start + (target - start) * eased
          );
  
        counter.textContent = value + '+';
  
        if (progress < 1) {
  
          requestAnimationFrame(updateCounter);
  
        } else {
  
          counter.textContent = target + '+';
  
        }
  
      }
  
      requestAnimationFrame(updateCounter);
  
    }
  
    if ('IntersectionObserver' in window) {
  
      var counterObserver =
        new IntersectionObserver(function (entries, observer) {
  
          entries.forEach(function (entry) {
  
            if (entry.isIntersecting) {
  
              animateCounter(entry.target);
  
              observer.unobserve(entry.target);
  
            }
  
          });
  
        }, {
          threshold: 0.7
        });
  
      counters.forEach(function (counter) {
  
        counterObserver.observe(counter);
  
      });
  
    } else {
  
      counters.forEach(animateCounter);
  
    }
  
    /* ---------- Contact social icons wave ---------- */

    var socialLinks =
      document.querySelectorAll('.contact-social a');

    var socialWaveToken = 0;
    var socialHovering = false;

    function playSocialWave(startIndex) {

      socialWaveToken += 1;
      var token = socialWaveToken;

      socialLinks.forEach(function (item) {
        item.classList.remove('wave');
      });

      socialLinks.forEach(function (item, itemIndex) {

        var distance = startIndex === null
          ? itemIndex
          : Math.abs(itemIndex - startIndex);

        if (startIndex === null || distance <= 2) {
          setTimeout(function () {

            if (token !== socialWaveToken) {
              return;
            }

            item.classList.remove('wave');
            void item.offsetWidth;
            item.classList.add('wave');

          }, distance * 110);
        }
      });
    }

    socialLinks.forEach(function (link, index) {

      link.addEventListener('mouseenter', function () {
        socialHovering = true;
        playSocialWave(index);
      });

      link.addEventListener('mouseleave', function () {
        socialHovering = false;
      });
    });

    setInterval(function () {
      if (!socialHovering && socialLinks.length) {
        playSocialWave(null);
      }
    }, 5000);

    /* ---------- Interactive full-page network background ---------- */

    var canvas =
      document.getElementById('heroNetwork');

    if (canvas) {

      var ctx =
        canvas.getContext('2d');

      var nodes = [];

      var mouse = {
        x: null,
        y: null,
        radius: 170
      };

      var animationFrame;

      function getNodeCount() {
        if (window.innerWidth < 560) {
          return 36;
        }

        if (window.innerWidth < 860) {
          return 56;
        }

        return 88;
      }

      function resizeNetwork() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        createNodes(width, height);
      }

      function createNodes(width, height) {
        nodes = [];

        for (var i = 0; i < getNodeCount(); i++) {
          nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.42,
            vy: (Math.random() - 0.5) * 0.42,
            r: Math.random() * 2.2 + 1.2
          });
        }
      }

      function drawNetwork() {
        var width = window.innerWidth;
        var height = window.innerHeight;

        ctx.clearRect(0, 0, width, height);

        nodes.forEach(function (node) {
          if (mouse.x !== null && mouse.y !== null) {
            var dx = mouse.x - node.x;
            var dy = mouse.y - node.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius && distance > 0) {
              var force = (mouse.radius - distance) / mouse.radius;
              node.x -= (dx / distance) * force * 0.9;
              node.y -= (dy / distance) * force * 0.9;
            }
          }

          node.x += node.vx;
          node.y += node.vy;

          if (node.x < -10 || node.x > width + 10) {
            node.vx *= -1;
          }

          if (node.y < -10 || node.y > height + 10) {
            node.vy *= -1;
          }

          node.x = Math.max(-10, Math.min(width + 10, node.x));
          node.y = Math.max(-10, Math.min(height + 10, node.y));
        });

        for (var i = 0; i < nodes.length; i++) {
          for (var j = i + 1; j < nodes.length; j++) {
            var a = nodes[i];
            var b = nodes[j];
            var dx = a.x - b.x;
            var dy = a.y - b.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 145) {
              var opacity = (1 - distance / 145) * 0.19;

              if (mouse.x !== null && mouse.y !== null) {
                var mdx = (a.x + b.x) / 2 - mouse.x;
                var mdy = (a.y + b.y) / 2 - mouse.y;
                var mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

                if (mouseDistance < 190) {
                  opacity += (1 - mouseDistance / 190) * 0.3;
                }
              }

              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = 'rgba(244,121,29,' + opacity + ')';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }

        nodes.forEach(function (node) {
          var nodeOpacity = 0.30;

          if (mouse.x !== null && mouse.y !== null) {
            var dx = mouse.x - node.x;
            var dy = mouse.y - node.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
              nodeOpacity = 0.9;
            }
          }

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(109,79,209,' + nodeOpacity + ')';
          ctx.fill();
        });

        animationFrame = requestAnimationFrame(drawNetwork);
      }

      window.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }, { passive: true });

      window.addEventListener('mouseleave', function () {
        mouse.x = null;
        mouse.y = null;
      });

      window.addEventListener('resize', resizeNetwork);

      resizeNetwork();
      drawNetwork();

      window.addEventListener('beforeunload', function () {
        cancelAnimationFrame(animationFrame);
      });

    }

    /* ---------- Contact form (front-end only demo) ---------- */
  
    var contactForm =
      document.getElementById('contactForm');
  
    var formNote =
      document.getElementById('formNote');
  
    if (contactForm) {
  
      contactForm.addEventListener(
        'submit',
        function (e) {
  
          e.preventDefault();
  
          formNote.textContent =
            'Thanks! Your message has been noted — we will get back to you soon.';
  
          contactForm.reset();
  
          setTimeout(function () {
  
            formNote.textContent = '';
  
          }, 5000);
  
        }
      );
  
    }
  
    /* ---------- Newsletter form (front-end only demo) ---------- */
  
    var newsletterForm =
      document.getElementById('newsletterForm');
  
    if (newsletterForm) {
  
      newsletterForm.addEventListener(
        'submit',
        function (e) {
  
          e.preventDefault();
  
          var input =
            newsletterForm.querySelector('input');
  
          input.value = '';
  
          input.placeholder =
            'Subscribed! Thank you.';
  
          setTimeout(function () {
  
            input.placeholder =
              'Enter your email';
  
          }, 4000);
  
        }
      );
  
    }
  
  });