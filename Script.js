
document.addEventListener("DOMContentLoaded", () => {
  // 1. Ambil elemen yang dibutuhkan
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar nav a");
  const destinationCards = document.querySelectorAll(".destination-card");
  const heroButton = document.querySelector(".hero .button");

  // 2. Efek navbar saat halaman digulir
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 3. Navigasi menuju bagian yang dipilih
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 4. Tombol eksplorasi
  if (heroButton) {
    heroButton.addEventListener("click", (event) => {
      const destinationSection = document.querySelector("#destinasi");

      if (destinationSection) {
        event.preventDefault();
        destinationSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // 5. Animasi kartu saat masuk ke layar
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    destinationCards.forEach((card) => {
      card.classList.add("reveal");
      observer.observe(card);
    });
  } else {
    destinationCards.forEach((card) => {
      card.classList.add("visible");
    });
  }

  // 6. Informasi saat kartu destinasi diklik
  destinationCards.forEach((card) => {
    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.classList.toggle("selected");
      }
    });

    card.addEventListener("click", (event) => {
      // Jangan mengubah pilihan jika pengguna mengeklik tautan di dalam kartu
      if (event.target.closest("a")) return;

      card.classList.toggle("selected");
    });
  });

  console.log("Jelajah Lampung berhasil dimuat!");
});
