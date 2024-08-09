<template>
    <div>
      <div class="hamburger-icon" @click="toggleMenu">
        <div class="line" :class="{ open: isOpen }"></div>
        <div class="line" :class="{ open: isOpen }"></div>
        <div class="line" :class="{ open: isOpen }"></div>
      </div>
      <nav class="menu" :class="{ open: isOpen }">
        <div class="col-menu" :style="{ background: `var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
            <div class="hamburger-icon" @click="toggleMenu">
                <div class="line" :class="{ open: isOpen }"></div>
                <div class="line" :class="{ open: isOpen }"></div>
                <div class="line" :class="{ open: isOpen }"></div>
            </div>
        </div>
        <ul>
          <li><router-link :to="'/'">Scopri gli altri menu di Mamma Elvira</router-link> </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HamburgerMenu',
    data() {
      return {
        isOpen: false
      };
    },
    props:{
        venuePath: {
            type: String,
            required: true
        }
    },
    methods: {
      toggleMenu() {
        this.isOpen = !this.isOpen;
      }
    }
  };
  </script>
  
  <style scoped>
  .hamburger-icon {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 10;
  }
  
  .line {
    width: 100%;
    height: 3px;
    background-color: var(--white);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .line.open:nth-child(1) {
    transform: translateY(10px) rotate(45deg);
  }
  
  .line.open:nth-child(2) {
    opacity: 0;
  }
  
  .line.open:nth-child(3) {
    transform: translateY(-10px) rotate(-45deg);
  }
  
  .menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    z-index: 999;
    display: flex;
    .col-menu{
        height: 100vh;
        .hamburger-icon {
          margin: 5px;
        }
    }
  }
  
  .menu.open {
    right: 0;
  }
  
  .menu ul {
    list-style: none;
    padding: 20px;
  }
  
  .menu ul li {
    margin: 20px 0;
  }
  
  .menu ul li a {
    text-decoration: none;
    color: #333;
  }
  </style>
  